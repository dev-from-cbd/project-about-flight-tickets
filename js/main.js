const formSearch = document.querySelector(".form-search"),
  inputCitiesFrom = document.querySelector(".input__cities-from"),
  dropdownCitiesFrom = document.querySelector(".dropdown__cities-from"),
  inputCitiesTo = document.querySelector(".input__cities-to"),
  dropdownCitiesTo = document.querySelector(".dropdown__cities-to");

const obj = {
  key: "value",
  "key two": "value2",
  key3: true,
  key4: {
    a: 1,
    b: "two",
  },
  keyNext: ["array", 5, { a: 1, b: 2 }, [true, false, 0]],
};

let a = 100;
//let a = true;
//var a = 100;
let b = a + "1";

console.log(a);
console.log(typeof a);

console.log(b);
console.log(typeof b);

let value = true;
console.log(typeof value); // boolean