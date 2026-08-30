test("description about the test", () => {
  expect(fn()).tobe(expected);
})

test("adds numbers", () => {
  expect(add(2, 3)).toBe(5);
});

// I expect this value to behave like this.
expect(value).toEqual(object);
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(array).toContain("hero");
expect(fn).toThrow();


tobe vs toEqual

expect(2 + 3).toBe(5);
expect("hello").toBe("hello");

toEqual();
Useful for comparing objects/arrays by their contents:

expect(getCoordinates()).toEqual({
  lat: 25.2048,
  lon: 55.2708,
});


// Here's the part I really want you to understand.

// TDD changes your mindset from:

// "How do I implement this?"

// to:

// "What should this code do?"

// For example, instead of immediately thinking:


// capitalization
test("check the first Capital alphabet", () => {
  expect(fn("umair")).toBe("Umair");
})
test("check the Reverse string", () => {
  expect(fn("umair")).toBe("riamu");
})
test("check the obejct method ADD", () => {
  expect(add(3, 5)).toBe(8);
})
test("check the sub method of object", () => {
  expect(fn(3, 5)).toBe(-2);
})
test("check the sub method of object", () => {
  expect(fn(5, 3)).toBe(2);
})
test("check the Multipy method of object", () => {
  expect(fn(5, 3)).toBe(15);
})
test("check the Divide method of object", () => {
  expect(fn(5, 3)).toBe(5/3);
})


capitalize("umair")
reverseString("umair")
calculator.add(3, 5)
calculator.subtract(3, 5)

test("subtracts a smaller number from a larger number", () => {
  ...
});

test("subtracts a larger number from a smaller number", () => {
  ...
});



// You could also split them into individual files, but one implementation file + one test file is perfectly fine for this exercise.

  // functions.js

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export function reverseString(string) {
  return string.split("").reverse().join("");
}


export const calculator = {
  add(a, b) {
    return a + b;
  },

  subtract(a, b) {
    return a - b;
  },

  multiply(a, b) {
    return a * b;
  },

  divide(a, b) {
    return a / b;
  },
};


export function caesarCipher(string, shift) {
  return string
    .split("")
    .map((char) => {

      if (char >= "a" && char <= "z") {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 97 + shift) % 26 + 26) % 26 + 97
        );
      }

      if (char >= "A" && char <= "Z") {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 65 + shift) % 26 + 26) % 26 + 65
        );
      }

      return char;
    })
    .join("");
}


export function analyzeArray(array) {
  const sum = array.reduce((total, number) => total + number, 0);

  return {
    average: sum / array.length,
    min: Math.min(...array),
    max: Math.max(...array),
    length: array.length,
  };
}


// after writting all the function then import into test.js file 
// functions.test.js

import {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} from "./functions.js";


test("capitalizes the first character", () => {
  expect(capitalize("umair")).toBe("Umair");
});

test("does not change the rest of the string", () => {
  expect(capitalize("hello world")).toBe("Hello world");
});

test("reverses a string", () => {
  expect(reverseString("umair")).toBe("riamu");
});

test("reverses a string with spaces", () => {
  expect(reverseString("hello world")).toBe("dlrow olleh");
});

test("calculator adds two numbers", () => {
  expect(calculator.add(3, 5)).toBe(8);
});
Subtract
test("calculator subtracts two numbers", () => {
  expect(calculator.subtract(3, 5)).toBe(-2);
});

test("calculator subtracts correctly when first number is larger", () => {
  expect(calculator.subtract(5, 3)).toBe(2);
});


  test("calculator multiplies two numbers", () => {
  expect(calculator.multiply(5, 3)).toBe(15);
});
Divide
test("calculator divides two numbers", () => {
  expect(calculator.divide(5, 3)).toBe(5 / 3);
});

// Now you've properly covered all four operations

test("shifts characters by the given factor", () => {
  expect(caesarCipher("abc", 3)).toBe("def");
});

xyz → abc

So:

test("wraps from z back to a", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});

//Case preservation
// The assignment gives:
// HeLLo → KhOOr

test("preserves letter case", () => {
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});.


// Punctuation
// The assignment gives:
// Hello, World!
// Khoor, Zruog!
// So:

test("preserves punctuation and spaces", () => {
  expect(caesarCipher("Hello, World!", 3))
    .toBe("Khoor, Zruog!");
});

// This is exactly the kind of testing the assignment wants you to practice.


test("analyzes an array of numbers", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]))
    .toEqual({
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    });
});


// Notice toEqual() here
// This is important.
// We're comparing objects.
// So use:

.toEqual()
