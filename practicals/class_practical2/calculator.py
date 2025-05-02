def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Division by zero"
    return a / b

def main():
    try:
        a = float(input("Enter first number: "))
        b = float(input("Enter second number: "))
        print("Addition:", add(a, b))
        print("Subtraction:", subtract(a, b))
        print("Multiplication:", multiply(a, b))
        print("Division:", divide(a, b))
    except ValueError:
        print("Invalid input. Please enter numeric values.")

if __name__ == "__main__":
    main()
