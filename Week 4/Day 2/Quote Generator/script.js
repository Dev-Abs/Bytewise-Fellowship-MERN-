
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

let text = document.getElementById('text');
let authorName = document.getElementById('author');
async function getQuote() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        const quote = data[0].Quote;
        const author = data[0].Author;
        text.textContent = quote;
        authorName.textContent = author;
        console.log(quote, author);
    } catch (error) {
        console.error('Error:', error);
    }
}


let btn = document.getElementById('new-quote');

btn.addEventListener('click', getQuote);