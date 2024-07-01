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

// let x4 = 5; // 101
// let y4 = 10; // 1010

// console.log(x4 & y4); // 0
// console.log(x4 | y4); // 15
// console.log(~x4); // -6
// console.log(x4 ^ y4); // 15
// console.log(x4 << 1); // 10
// console.log(x4 >> 1); // 2
// console.log(x4 >>> 1); // 2

// String operators
// The + operator can also be used to add (concatenate) strings.

let firstName = "John";
let lastName = "Doe";

console.log(firstName + " " + lastName); // John Doe

// Conditional (ternary) operator
// The conditional operator assigns a value to a variable based on a condition.

// Syntax
// variable = (condition) ? value1 : value2

let age1 = 20;
let status = (age1 >= 18) ? "adult" : "minor"; // adult
console.log(status);

// Comma operator
// The comma operator is used to evaluate multiple expressions. 
// how it works ?
// The comma operator evaluates each of its operands (from left to right) and returns the value of the last operand.


let a2 = 1;
let b2 = 2;
let c2 = 3;

let d = (a2, b2, c2);
console.log(d); // 3

// Unary operators
// Unary operators are used to perform operations on a single operand.

// The following unary operators are available in JavaScript:

// Operator	Description
// +	Converts an operand into a number
// -	Negates an operand
// ++	Increment
// --	Decrement
// !	Logical NOT

let x5 = 5;
let y5 = -x5;
console.log(y5); // -5

let z5 = "5";
let a5 = +z5;
console.log(a5); // 5

let b5 = 5;
b5++;
console.log(b5); // 6

let c5 = 5;
c5--;
console.log(c5); // 4

let d5 = 5;
let e5 = !d5;
console.log(e5); // false

// Relational operators
// Relational operators are used to determine the relationship between two operands.

// The following relational operators are available in JavaScript:

// Operator	Description
// in	Property in Object
// instanceof	Instance of Object
// <	Less than
// >	Greater than
// <=	Less than or equal to
// >=	Greater than or equal to

let cars = ["BMW", "Volvo", "Saab", "Ford"];
console.log(0 in cars); // true, why ? because 0 is the index of the array

let person1 = { firstName: "John", lastName: "Doe", age: 30 };
console.log("firstName" in person1); // true, why ? because firstName is the key of the object

let person2 = { firstName: "John", lastName: "Doe", age: 30 };
console.log(person2 instanceof Object); // true , why ? because person2 is an object

// Functions
// A JavaScript function is a block of code designed to perform a particular task.

// A JavaScript function is executed when "something" invokes it (calls it).

// Example

function greet() {
    console.log("Hello");
}
greet(); // Hello

// Function Parameters
// Function parameters are the names listed in the function definition.

// Function arguments are the real values passed to the function.

// Parameters are specified after the function name, inside the parentheses.

// You can add as many parameters as you want, just separate them with a comma.

// The following example has a function with one parameter (fname). When the function is called, we pass along a first name, which is used inside the function to output the full name:

function greet1(fname) {
    console.log("Hello " + fname);
}
greet1("John"); // Hello John

// The following example has a function with two parameters (fname, lname). When the function is called, we pass along two first names, which are used inside the function to output the full names:

function greet2(fname, lname) {
    console.log("Hello " + fname + " " + lname);
}

greet2("John", "Doe"); // Hello John Doe

// Function Return

// When JavaScript reaches a return statement, the function will stop executing.

// If the function was invoked from a statement, JavaScript will "return" to execute the code after the invoking statement.

// Functions often compute a return value. The return value is "returned" back to the "caller":

function add(a, b) {
    return a + b;
}

let sum1 = add(5, 10);
console.log(sum1); // 15

// Objects
// JavaScript objects are containers for named values called properties or methods.

// Properties are values associated with an object.

// Methods are actions that can be performed on objects.

// Example

let person3 = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
};

console.log(person3.firstName); // John
console.log(person3.age); // 30
console.log(person3.fullName()); // John Doe

// Arrays
// JavaScript arrays are used to store multiple values in a single variable.

// Example

let fruits1 = ["Apple", "Banana", "Mango"];
console.log(fruits1[0]); // Apple
console.log(fruits1[1]); // Banana
console.log(fruits1[2]); // Mango

// Loops
// Loops can execute a block of code a number of times.

// Loops are handy, if you want to run the same code over and over again, each time with a different value.

// Different Kinds of Loops

// JavaScript supports different kinds of loops:

// for - loops through a block of code a number of times
// for/in - loops through the properties of an object
// for/of - loops through the values of an iterable object
// while - loops through a block of code while a specified condition is true
// do/while - also loops through a block of code while a specified condition is true

// for loop
// The for loop has the following syntax:

// for (statement 1; statement 2; statement 3) {
//   // code block to be executed
// }

// Statement 1 is executed (one time) before the execution of the code block.

// Statement 2 defines the condition for executing the code block.

// Statement 3 is executed (every time) after the code block has been executed.

for (let i = 0; i < 5; i++) {
    console.log(i);
}

// for/in loop
// The for/in loop has the following syntax:

// for (variable in object) {
//   // code block to be executed
// }

let person4 = { name: "John", age: 30, city: "New York" };

for (let x in person4) {
    console.log(person4[x]); // John 30 New York
}

// for/of loop
// The for/of loop has the following syntax:

// for (variable of iterable) {
//   // code block to be executed
// }

let fruits2 = ["Apple", "Banana", "Mango"];

for (let x of fruits2) {
    console.log(x); // Apple Banana Mango
}

// while loop

// The while loop loops through a block of code as long as a specified condition is true.

// The following syntax is used for the while loop:

// while (condition) {
//   // code block to be executed
// }

let i = 0;

while (i < 5) {
    console.log(i);
    i++;
}

// do/while loop

// The do/while loop is a variant of the while loop. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is true.

// The following syntax is used for the do/while loop:

// do {
//   // code block to be executed
// }
// while (condition);

let j = 0;

do {
    console.log(j);
    j++;
}
while (j < 5);

// Conditional Statements

// Conditional statements are used to perform different actions based on different conditions.

// In JavaScript we have the following conditional statements:

// Use if to specify a block of code to be executed, if a specified condition is true
// Use else to specify a block of code to be executed, if the same condition is false
// Use else if to specify a new condition to test, if the first condition is false
// Use switch to specify many alternative blocks of code to be executed

// if statement
// The if statement has the following syntax:

// if (condition) {
//   // code block to be executed
// }

let time = 20;

if (time < 18) {
    console.log("Good day"); //
}

// else statement
// The else statement has the following syntax:

// if (condition) {
//   // code block to be executed
// } else {
//   // code block to be executed
// }

let time1 = 20;

if (time1 < 18) {
    console.log("Good day");
}
else {
    console.log("Good evening"); // Good evening
}

// else if statement

// The else if statement has the following syntax:

// if (condition1) {
//   // code block to be executed
// } else if (condition2) {
//   // code block to be executed
// } else {
//   // code block to be executed
// }

let time2 = 20;

if (time2 < 18) {
    console.log("Good day");
}
else if (time2 < 20) {
    console.log("Good evening");
}
else {
    console.log("Good night");
}


// switch statement
// The switch statement is used to perform different actions based on different conditions.

// The following syntax is used for the switch statement:

// switch (expression) {
//   case x:
//     // code block
//     break;
//   case y:
//     // code block
//     break;
//   default:
//     // code block
// }

let day = 2;

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    default:
        console.log("Another day");
}

// Type Conversion
// JavaScript is a loosely typed or a dynamic language. This means that you don't have to declare the type of a variable ahead of time.
// implicit convesion
let x6 = 5;
let y6 = "5";

console.log(x6 + y6); // 55

console.log(6 - '5'); // 1

// explicit conversion
let x7 = 5;
let y7 = "5";

console.log(x7 + parseInt(y7)); // 10
console.log(6 - parseInt('5')); // 1

// JavaScript Type Operators
// There are two JavaScript type operators:

// typeof
// instanceof

// typeof operator
// The typeof operator returns the type of a variable or an expression.

let x8 = 5;
let y8 = "Hello";

console.log(typeof x8); // number
console.log(typeof y8); // string

// instanceof operator

// The instanceof operator returns true if an object is an instance of an object type.

let cars1 = ["BMW", "Volvo", "Saab", "Ford"];
console.log(cars1 instanceof Array); // true


// scope
// In JavaScript, scope refers to the current context of your code. Scopes can be globally or locally defined.

// Global Scope
// Variables declared outside a function become global variables (all scripts and functions on a web page can access it).

// Local Scope
// Variables declared within a JavaScript function become local to the function.

// Scope determines the accessibility (visibility) of variables.

// Variables defined inside a function are not accessible (visible) from outside the function.

// Example

// code here can NOT use carName

function myFunction() {
    let carName = "Volvo";

    // code here CAN use carName
}

// code here can NOT use carName









