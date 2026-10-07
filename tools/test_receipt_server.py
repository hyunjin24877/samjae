import io
import unittest
from receipt_server import encode_raster, CUT, HEADER, STRIP_ROWS, Handler


class RasterTests(unittest.TestCase):
    def test_all_rows_before_single_trailing_cut(self):
        # Covers final short strip and images longer than the old page limit.
        for rows in (1, STRIP_ROWS, STRIP_ROWS + 1, 2145, 20001):
            raster = bytes((i % 256 for i in range(rows * 72)))
            job = encode_raster(raster)
            self.assertEqual(job[:len(HEADER)], HEADER)
            pos = len(HEADER)
            decoded = bytearray()
            while job[pos:pos + 4] == b'\x1dv0\x00':
                width = int.from_bytes(job[pos + 4:pos + 6], 'little')
                height = int.from_bytes(job[pos + 6:pos + 8], 'little')
                self.assertEqual(width, 72)
                self.assertLessEqual(height, STRIP_ROWS)
                pos += 8
                decoded.extend(job[pos:pos + width * height])
                pos += width * height
            self.assertEqual(decoded, raster)
            self.assertEqual(job[pos:], CUT)

    def test_invalid_raster_rejected(self):
        for data in (b'', b'\x00' * 73):
            with self.assertRaises(ValueError):
                encode_raster(data)

    def test_allowed_origin_sets_cors_headers_on_json_errors(self):
        handler = Handler.__new__(Handler)
        handler.headers = {'Origin': 'http://127.0.0.1:8000'}
        handler.wfile = io.BytesIO()
        sent = []

        def send_header(name, value):
            sent.append((name, value))

        handler.send_response = lambda status: None
        handler.send_header = send_header
        handler.allowed = lambda: True
        handler.end_headers = lambda: (
            send_header('Access-Control-Allow-Origin', handler.headers['Origin']),
            send_header('Vary', 'Origin'),
        )

        handler.reply(403, {'error': '허용되지 않은 출력 요청입니다.'})

        self.assertEqual(sum(1 for name, _ in sent if name == 'Access-Control-Allow-Origin'), 1)
        self.assertEqual(sum(1 for name, _ in sent if name == 'Vary'), 1)


if __name__ == '__main__':
    unittest.main()
