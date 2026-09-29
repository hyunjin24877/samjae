import unittest
from receipt_server import encode_raster, CUT


class RasterTests(unittest.TestCase):
    def test_all_rows_before_single_trailing_cut(self):
        # Covers final short strip and images longer than the old page limit.
        for rows in (1, 128, 129, 2145, 20001):
            raster = bytes((i % 256 for i in range(rows * 72)))
            job = encode_raster(raster)
            pos = 12
            decoded = bytearray()
            while job[pos:pos + 4] == b'\x1dv0\x00':
                width = int.from_bytes(job[pos + 4:pos + 6], 'little')
                height = int.from_bytes(job[pos + 6:pos + 8], 'little')
                self.assertEqual(width, 72)
                self.assertLessEqual(height, 128)
                pos += 8
                decoded.extend(job[pos:pos + width * height])
                pos += width * height
            self.assertEqual(decoded, raster)
            self.assertEqual(job[pos:], CUT)

    def test_invalid_raster_rejected(self):
        for data in (b'', b'\x00' * 73):
            with self.assertRaises(ValueError):
                encode_raster(data)


if __name__ == '__main__':
    unittest.main()
