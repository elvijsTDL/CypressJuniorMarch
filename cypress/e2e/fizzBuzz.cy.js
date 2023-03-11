//Imagine this is your application code

function fizzBuzz(number) {
  if (number % 3 === 0 && number % 5 === 0) {
    return "FizzBuzz";
  }
  if (number % 3 === 0) {
    return "Fizz";
  }
  if (number % 5 === 0) {
    return "Buzz";
  }
  return "Not a multiple of 3 or 5";
}

function fizzBuzzChecker(array, expectedResult) {
  array.forEach((number) => {
    expect(fizzBuzz(number)).to.eq(expectedResult);
  });
}

describe("Fizz buzz unit tests", () => {
  it("Returns FizzBuzz if the number is a multiple of 3 and 5", () => {
    fizzBuzzChecker([15, 30, 45, 60, 75], "FizzBuzz");
  });

  it("Returns FizzBuzz if the number is a multiple of 3", () => {
    fizzBuzzChecker([3, 6, 9, 12, 18, 21], "Fizz");
  });

  it("Returns FizzBuzz if the number is a multiple of 5", () => {
    fizzBuzzChecker([5, 10, 20, 25, 35, 40], "Buzz");
  });

  it("Returns a string indicating that the number is not a multiple of 3 or 5", () => {
    fizzBuzzChecker([1, 2, 4, 7, 8, 11], "Not a multiple of 3 or 5");
  });

  it("Fizz buzz works with negative numbers", () => {
    fizzBuzzChecker([-3], "Fizz");
  });
});
