// DOM Manipulation

// Traverse the DOM

// Selecting Elements

// Manipulating Elements

// Creating Elements

// Inserting Elements

// Removing Elements

// Replacing Elements


// Event Listeners

// Event Bubbling

// Event Delegation


let reveal = document.getElementById('reveal');
let container = document.getElementById('container');

reveal.addEventListener('click', function() {
    let hidden = document.getElementById('hidden-text');
    hidden.style.display = 'block';
    // reveal.style.display = 'none';
    container.classList.add('active');
});



// Define the API URL and headers
const url = 'https://random-quote-generator2.p.rapidapi.com/randomQuote';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'random-quote-generator2.p.rapidapi.com',
    'x-rapidapi-key': '58878dcc93msh09193201ff4808ap1acfa9jsnedca644fc89b'
  }
};


// using async await

async function getQuote() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        const quote = data[0].Quote;
        const author = data[0].Author;
        console.log(quote, author);
    } catch (error) {
        console.error('Error:', error);
    }
}

getQuote();
