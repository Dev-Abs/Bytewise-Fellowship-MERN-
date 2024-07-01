// what is javscript?

// JavaScript is a programming language that enables you to create dynamically updating content, control multimedia, animate images, and much more.

// Why learn JS?

// JavaScript is one of the 3 languages all web developers must learn:

// 1. HTML to define the content of web pages
// 2. CSS to specify the layout of web pages
// 3. JavaScript to program the behavior of web pages
// more?

// JavaScript is the most popular programming language in the world.
// JavaScript is the programming language of the Web.
// JavaScript is easy to learn.
// JavaScript is versatile.
// JavaScript is fast.


console.log("Hello World");

// Variables
// Variables are containers for storing data values.

// In this example, x, y, and z, are variables:

// var x = 5;
// var y = 6;
// var z = x + y;
// console.log(z);

// variables types

// var x = 6; // Number
// var x = "Hello"; // String
// var x = true; // Boolean
// var x = null; // Null
// var x = undefined; // Undefined
// var x = [1,2,3,4,5]; // Array
// var x = {name: "John", age: 30}; // Object


// let, const and var

// let and const are two relatively new types of variable declarations in JavaScript. They are block-scoped, which means they are only accessible within the block they’re declared. var is function-scoped, which means it is accessible within the function it’s declared.


// let
let x = 5;
x = 6;
console.log(x);

// const
const y = 5;
// y = 6; // error
console.log(y);

// var
var z = 5;
z = 6;
console.log(z);

// permitive and non- permitive data types

// Primitive data types are data types that have a primitive value, i.e., they are not objects. They are immutable (cannot be changed) and have a fixed memory size.

// There are 7 primitive data types in JavaScript:

// String
// Number
// BigInt
// Boolean
// Undefined
// Null
// Symbol

// Non-primitive data types are data types that are not primitive values. They are mutable and can be changed. They are not fixed in memory size.

// There are 1 non-primitive data types in JavaScript:

// Object

// String
let name = "John";
console.log(name);

// Number
let age = 30;
console.log(age);

// BigInt
let bigInt = 1234567890123456789012345678901234567890n;
console.log(bigInt);

// Boolean
let isTrue = true;
console.log(isTrue);

// Undefined
let a;
console.log(a);

// Null
let b = null;
console.log(b);

// Symbol
let sym1 = Symbol("foo");
let sym2 = Symbol("foo");
console.log(sym1 === sym2); // false

// Object
let person = { name: "John", age: 30 };
console.log(person);

// Array
let fruits = ["Apple", "Banana", "Mango"];
console.log(fruits);

// Function
function greet() {
    console.log("Hello");
}
greet();

// Operators
// Operators are used to perform operations on variables and values.

// JavaScript operators can be categorized into the following types:

// Arithmetic operators
// Assignment operators
// Comparison operators
// Logical operators
// Bitwise operators
// String operators
// Conditional (ternary) operator
// Comma operator
// Unary operators
// Relational operators
// Arithmetic operators
// Arithmetic operators are used to perform arithmetic calculations on numbers.

// The following arithmetic operators are available in JavaScript:

// Operator	Description
// +	Addition
// -	Subtraction
// *	Multiplication
// /	Division
// %	Modulus (division remainder)
// ++	Increment
// --	Decrement

let a1 = 5;
let b1 = 2;

let sum = a1 + b1;
console.log('sum', sum);

let sub = a1 - b1;
console.log('sub', sub);    

let mul = a1 * b1;
console.log('mul', mul);

let div = a1 / b1;
console.log('div', div);

let mod = a1 % b1;
console.log('mod', mod);

let inc = a1++;
console.log('inc', inc);

let dec = a1--;
console.log('dec', dec);

// Assignment operators
// Assignment operators are used to assign values to variables.

// The following assignment operators are available in JavaScript:

// Operator	Example	Same As
// =	x = y	x = y
// +=	x += y	x = x + y
// -=	x -= y	x = x - y
// *=	x *= y	x = x * y
// /=	x /= y	x = x / y
// %=	x %= y	x = x % y
// **=	x **= y	x = x ** y

let x1 = 5;
let y1 = 10;

x1 += y1;
console.log('x1', x1);

x1 -= y1;
console.log('x1', x1); // expected 5

x1 *= y1;
console.log('x1', x1); // expected 50 , why ? because x1 is 5 and y1 is 10, so 5*10 = 50

x1 /= y1;
console.log('x1', x1); // expected 5, why? because x1 is 50 and y1 is 10, so 50/10 = 5    

x1 %= y1;
console.log('x1', x1); 

x1 **= y1;
console.log('x1', x1);

// Comparison operators

// Comparison operators are used to compare two values.

// The following comparison operators are available in JavaScript:

// Operator	Description
// ==	Equal to
// ===	Equal value and equal type
// !=	Not equal
// !==	Not equal value or not equal type
// >	Greater than
// <	Less than
// >=	Greater than or equal to
// <=	Less than or equal to

let x2 = 5;
let y2 = 10;

console.log(x2 == y2); // false
console.log(x2 === y2); // false
console.log(x2 != y2); // true
console.log(x2 !== y2); // true
console.log(x2 > y2); // false
console.log(x2 < y2); // true
console.log(x2 >= y2); // false
console.log(x2 <= y2); // true

// Logical operators
// Logical operators are used to determine the logic between variables or values.

// The following logical operators are available in JavaScript:

// Operator	Description
// &&	Logical AND
// ||	Logical OR
// !	Logical NOT

let x3 = 5;
let y3 = 10;

console.log(x3 > 3 && x3 < 10); // true
console.log(x3 > 3 || x3 < 4); // true
console.log(!(x3 > 3 && x3 < 10)); // false

// Bitwise operators
// Bitwise operators are used to perform bitwise calculations on variables.

// The following bitwise operators are available in JavaScript:

// Operator	Name	Description
// &	AND	Both bits are 1
// |	OR	Either bit is 1
// ~	NOT	1 is 0 and 0 is 1
// ^	XOR	One bit is 0 and the other is 1
// <<	Zero fill left shift	Shift left by pushing zeros in from the right and let the leftmost bits fall off
// >>	Signed right shift	Shift right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off
// >>>	Zero fill right shift	Shift right by pushing zeros in from the left, and let the rightmost bits fall off

let x4 = 5; // 101
let y4 = 10; // 1010

console.log(x4 & y4); // 0
console.log(x4 | y4); // 15
console.log(~x4); // -6
console.log(x4 ^ y4); // 15
console.log(x4 << 1); // 10
console.log(x4 >> 1); // 2
console.log(x4 >>> 1); // 2




