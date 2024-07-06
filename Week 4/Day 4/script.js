// JavaScript Functions


    // What is a function?

    // A function is a block of code that performs a specific task. Functions are used to organize code into reusable blocks of code. Functions can take input, called parameters, and return output, called a return value. Functions are used to perform specific tasks, such as calculating a value, displaying a message, or processing data.

    // Functions are defined using the function keyword, followed by the function name, a list of parameters enclosed in parentheses, and a block of code enclosed in curly braces. The function name is used to call the function and execute the code inside the function.

    // Functions can take parameters, which are values that are passed to the function when it is called. Parameters are used to customize the behavior of the function and perform different tasks based on the input values. Parameters are defined inside the parentheses after the function name, separated by commas.

    // Functions can return a value, which is the result of the function's computation. The return value is specified using the return keyword, followed by the value to be returned. The return value can be used to pass data back to the calling code and perform further processing.

    // Functions can be called by using the function name followed by parentheses. When a function is called, the code inside the function is executed, and any return value is passed back to the calling code. Functions can be called multiple times with different input values to perform different tasks.


    // examples

    // Function to add two numbers

    function addNumbers(a, b) {
        var sum = a + b;
        return sum;
        }

    // Function to calculate the area of a rectangle

    function calculateArea(width, height) {
        var area = width * height;
        return area;
        }

    // Function to display a message

    function displayMessage(message) {
        console.log(message);
        }

        

        // What is a callback function?

        // A callback function is a function that is passed as an argument to another function and is executed inside the other function. Callback functions are used to customize the behavior of a function and perform different tasks based on the input values.

        // Callback functions are commonly used in JavaScript to perform asynchronous operations, such as fetching data from a server, handling user input, or processing data. Callback functions are passed as arguments to functions that perform asynchronous operations, and are executed when the operation is complete.

        // Callback functions are defined as regular functions, and are passed as arguments to other functions using the function name. The callback function is executed inside the other function, and can access the input values and return values of the other function.


        // examples

        // Function to perform an asynchronous operation

        function fetchData(url, callback) {
            // Perform asynchronous operation
            // When operation is complete, call callback function
            var data = "Data fetched from " + url;
            callback(data);
            } 

        // Callback function to display data

        function displayData(data) {
            console.log(data);
            }

        // Call fetchData function with callback function

        fetchData("https://example.com/data", displayData);

        // Output: Data fetched from https://example.com/data

        // In this example, the fetchData function performs an asynchronous operation to fetch data from a URL. The fetchData function takes two arguments: the URL of the data to fetch, and a callback function to execute when the operation is complete. The fetchData function fetches the data and calls the callback function with the fetched data as an argument.



        // arrow functions

        // Arrow functions are a new feature introduced in ECMAScript 6 (ES6) that provide a more concise syntax for defining functions. Arrow functions are a shorthand way to define functions using the => (fat arrow) syntax.



        // examples

        // Regular function

        function addNumbers(a, b) {
            return a + b;
            }

        // Arrow function

        const addNumbers = (a, b) => a + b;


        // Function to get the current date

function getCurrentDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var fullDate = day + "/" + month + "/" + year;
    return fullDate;
    }

// Function to get the current time

function getCurrentTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var fullTime = hours + ":" + minutes + ":" + seconds;
    return fullTime;
    }

// Function to get the current date and time

function getCurrentDateTime() {
    var currentDateTime = getCurrentDate() + " " + getCurrentTime();
    return currentDateTime;
    }

// Function to get the current day

function getCurrentDay() {
    var currentDate = new Date();
    var day = currentDate.getDay();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var currentDay = days[day];
    return currentDay;
    }

// Function to get the current month

function getCurrentMonth() {
    var currentDate = new Date();
    var month = currentDate.getMonth();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currentMonth = months[month];
    return currentMonth;
    }

