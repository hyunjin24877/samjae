#!/usr/bin/env python3
"""Local static site and 576-dot ESC/POS spooler. Run from any directory."""
import argparse
import json
from http.server import SimpleHTTPRequestHandler, HTTPServer
from pathlib import Path
import subprocess
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
WIDTH_BYTES = 72
CUT = b'\x1dV\x42\x20'  # Feed to cutter + 32 motion units, then partial cut.


def encode_raster(raster):
    if not raster or len(raster) % WIDTH_BYTES:
        raise ValueError('576dots 래스터 데이터 길이가 올바르지 않습니다.')
    # Standard mode; left margin 0; print area exactly 576 dots.
    job = bytearray(b'\x1b@\x1bS\x1dL\x00\x00\x1dW\x40\x02')
    for offset in range(0, len(raster), WIDTH_BYTES * 128):
        strip = raster[offset:offset + WIDTH_BYTES * 128]
        rows = len(strip) // WIDTH_BYTES
        job.extend(b'\x1dv0\x00' + bytes((WIDTH_BYTES, 0, rows & 255, rows >> 8)))
        job.extend(strip)
    # One job, one cut, strictly AFTER all raster bytes. No page height or form feed.
    job.extend(CUT)
    return bytes(job)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def allowed(self):
        origin = self.headers.get('Origin', '')
        parsed = urlsplit(origin)
        return parsed.scheme == 'http' and parsed.hostname in ('localhost', '127.0.0.1')

    def end_headers(self):
        if self.allowed():
            self.send_header('Access-Control-Allow-Origin', self.headers['Origin'])
            self.send_header('Vary', 'Origin')
        super().end_headers()

    def reply(self, status, data):
        payload = json.dumps(data, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_OPTIONS(self):
        if not self.allowed():
            self.reply(403, {'error': '로컬 웹페이지에서만 출력할 수 있습니다.'})
            return
        self.send_response(204)
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path != '/print' or not self.allowed():
            self.reply(403, {'error': '허용되지 않은 출력 요청입니다.'})
            return
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if self.headers.get('Content-Type') != 'application/octet-stream':
                raise ValueError('래스터 형식이 필요합니다.')
            # Request memory limit only; oversized jobs are rejected, never truncated/cut.
            if not 0 < length <= 16 * 1024 * 1024:
                raise ValueError('출력 요청 크기가 올바르지 않습니다.')
            self.connection.settimeout(30)
            raster = self.rfile.read(length)
            if len(raster) != length:
                raise ValueError('전체 데이터를 수신하지 못했습니다. 출력하지 않았습니다.')
            job = encode_raster(raster)
        except (ValueError, TimeoutError) as error:
            self.reply(400, {'error': str(error)})
            return
        try:
            # raw bypasses page sizing and driver-generated cut commands.
            result = subprocess.run(
                ['/usr/bin/lp', '-d', self.server.printer, '-o', 'raw', '-t', 'Samjae receipt'],
                input=job, capture_output=True, check=True, timeout=60)
            self.reply(200, {'queued': True, 'job': result.stdout.decode().strip()})
        except (subprocess.SubprocessError, OSError) as error:
            self.log_error('Spool failed: %s', error)
            self.reply(503, {'error': '프린터 작업 접수를 확인하지 못했습니다. 대기열을 확인하세요.'})


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--printer', default='EPSON_TM_T83III_KOR_42C')
    args = parser.parse_args()
    server = HTTPServer(('127.0.0.1', 8765), Handler)
    server.printer = args.printer
    print('영수증 서버: http://127.0.0.1:8765', flush=True)
    server.serve_forever()


if __name__ == '__main__':
    main()
