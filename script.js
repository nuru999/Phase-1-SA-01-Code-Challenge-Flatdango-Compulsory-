// DOM elements
const filmsList = document.getElementById('films');
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.getElementById('movie-title');
const movieRuntime = document.getElementById('movie-runtime');
const movieShowtime = document.getElementById('movie-showtime');
const availableTickets = document.getElementById('available-tickets');
const buyTicketBtn = document.getElementById('buy-ticket');

fetch('http://localhost:3000/films/1')
    .then(response => response.json())
    .then(data => displayMovieDetails(data));

fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(data => populateMovieMenu(data));


    function displayMovieDetails(movie) {
    moviePoster.src = movie.poster;
    movieTitle.textContent = movie.title;
    movieRuntime.textContent = movie.runtime;
    movieShowtime.textContent = movie.showtime;
    const ticketsAvailable = movie.capacity - movie.tickets_sold;
    availableTickets.textContent = ticketsAvailable;

    if (ticketsAvailable <= 0) {
        buyTicketBtn.textContent = 'Sold Out';
        buyTicketBtn.disabled = true;
    } else {
        buyTicketBtn.textContent = 'Buy Ticket';
        buyTicketBtn.disabled = false;
    }

    buyTicketBtn.addEventListener('click', () => {
        if (ticketsAvailable > 0) {
            availableTickets.textContent = ticketsAvailable - 1;
        }
    });
}

function populateMovieMenu(movies) {
    filmsList.innerHTML = '';

    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        li.classList.add('film', 'item');
        if (movie.capacity - movie.tickets_sold <= 0) {
            li.classList.add('sold-out');
        }

        li.addEventListener('click', () => {
            displayMovieDetails(movie);
        });

        filmsList.appendChild(li);
    });
}