// Get references to search input and artist cards
const searchBar = document.getElementById('searchBar');
const artistCards = document.querySelectorAll('.artist-card');

// Add an event listener for input on the search bar
searchBar.addEventListener('input', function () {
    const searchTerm = searchBar.value.toLowerCase();

    // Loop through each artist card and show/hide based on the search term
    artistCards.forEach(function (card) {
        const artistName = card.querySelector('h3').textContent.toLowerCase();
        
        if (artistName.includes(searchTerm)) {
            card.style.display = 'block';  // Show the card
        } else {
            card.style.display = 'none';   // Hide the card
        }
    });
});
