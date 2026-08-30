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
  expect(fn("umair")).tobe("Umair");
})
test("check the Reverse string", () => {
  expect(fn("umair")).tobe("riamu");
})
test("check the obejct method ADD", () => {
  expect(add(3, 5)).tobe(8);
})
test("check the sub method of object", () => {
  expect(fn(3, 5)).tobe(-2);
})
test("check the sub method of object", () => {
  expect(fn(5, 3)).tobe(2);
})
test("check the Multipy method of object", () => {
  expect(fn(5, 3)).tobe(15);
})
test("check the Divide method of object", () => {
  expect(fn(5, 3)).tobe(5/3);
})
