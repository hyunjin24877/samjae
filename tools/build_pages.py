"""Build the static site for GitHub Pages without changing local URLs."""
import argparse
from pathlib import Path
import re
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def build(output, base):
    output = Path(output).resolve()
    if output == ROOT or ROOT in output.parents:
        raise ValueError('Choose an output directory outside the source tree')
    output.mkdir(parents=True, exist_ok=True)
    # Only rewrite URLs to actual site directories/pages, preserving selectors
    # such as img[src$="/home.svg"] and external URLs.
    pattern = re.compile(r'''(["'`(])/((?:img|css|js|font|diagnosis-result)/|(?:landing|welcome|diagnosis|example|gather|samjaerok|testimony|index)(?=[.\-$]))''')
    tracked = subprocess.check_output(['git', 'ls-files', '-z'], cwd=ROOT).split(b'\0')
    directories = {'css', 'js', 'font', 'img', 'diagnosis-result'}
    paths = [ROOT / item.decode() for item in tracked if item and (
        (b'/' not in item and item.endswith(b'.html'))
        or item.decode().split('/', 1)[0] in directories
    )]
    for source in paths:
        target = output / source.relative_to(ROOT)
        target.parent.mkdir(parents=True, exist_ok=True)
        if source.suffix in ('.html', '.css', '.js'):
            text = pattern.sub(lambda m: m[1] + base + m[2], source.read_text())
            target.write_text(text)
        else:
            shutil.copy2(source, target)
    (output / '.nojekyll').touch()
    print(f'Built {len(paths)} files in {output}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('output')
    parser.add_argument('--base', default='/samjae/')
    args = parser.parse_args()
    build(args.output, '/' + args.base.strip('/') + '/')
