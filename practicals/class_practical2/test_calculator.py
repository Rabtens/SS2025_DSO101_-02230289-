import unittest
from calculator import add, subtract, multiply, divide

class TestCalculator(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(5, 3), 8)

    def test_subtract(self):
        self.assertEqual(subtract(10, 4), 6)

    def test_multiply(self):
        self.assertEqual(multiply(6, 7), 42)

    def test_divide(self):
        self.assertEqual(divide(8, 2), 4)

    def test_divide_by_zero(self):
        self.assertEqual(divide(5, 0), "Error: Division by zero")

if __name__ == "__main__":
    unittest.main()
