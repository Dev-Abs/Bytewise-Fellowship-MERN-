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



