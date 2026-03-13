let bookedSeats = JSON.parse(sessionStorage.getItem('bookedSeats')) || []; // To store booked seats

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {

  // Form submission - User Details
  const userForm = document.getElementById('userForm');
  
  if (userForm) {
    // Add event listener to handle form submission
    userForm.addEventListener('submit', function (e) {
      // Prevent default form submission behavior
      e.preventDefault();

      // Get form data values
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const movieName = document.getElementById('movie').value;
      const showTime = document.getElementById('showTime').value;
      const email = document.getElementById('email').value;
      const paymentMethod = document.getElementById('paymentMethod').value;

      // Store the user details in sessionStorage
      sessionStorage.setItem('firstName', firstName);
      sessionStorage.setItem('lastName', lastName);
      sessionStorage.setItem('movieName', movieName);
      sessionStorage.setItem('showTime', showTime);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('paymentMethod', paymentMethod);

      // Redirect to the seats selection page
      window.location.href = 'seats.html';
    });
  }

  // Seat Selection Page
  const seatContainer = document.getElementById('seats');

  if (seatContainer) {
    // Generate seats (50 seats as an example)
    for (let i = 0; i < 50; i++) {
      const seat = document.createElement('div');
      seat.classList.add('seat');
      seat.setAttribute('data-seat-number', i + 1);

      // Check if the seat is already booked
      if (bookedSeats.includes(i + 1)) {
        seat.classList.add('booked');
      } else {
        seat.addEventListener('click', selectSeat);
      }

      seatContainer.appendChild(seat);
    }
  }

  // Handle seat selection
  function selectSeat() {
    this.classList.toggle('selected');
  }

  // Handle seat submission
  const submitSeats = document.getElementById('submitSeats');
  if (submitSeats) {
    submitSeats.addEventListener('click', function () {
      const selectedSeats = [...document.querySelectorAll('.seat.selected')].map(seat => seat.getAttribute('data-seat-number'));

      // Store selected seats in sessionStorage
      sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));

      // Update the booked seats
      bookedSeats.push(...selectedSeats.map(Number));
      sessionStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));

      // Redirect to the receipt page
      window.location.href = 'receipt.html';
    });
  }

// Receipt Page
const userName = document.getElementById('userName');
if (userName) {
  // Retrieve user data from sessionStorage
  const firstName = sessionStorage.getItem('firstName');
  const lastName = sessionStorage.getItem('lastName');
  const movieName = sessionStorage.getItem('movieName');
  const showTime = sessionStorage.getItem('showTime'); // Retrieve show time
  const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));
  const pricePerSeat = 180; // Assuming the price is 10 units per seat
  const totalPrice = selectedSeats.length * pricePerSeat;

  // Display receipt details
  document.getElementById('userName').textContent = `${firstName} ${lastName}`;
  document.getElementById('movieDetails').textContent = movieName;
  document.getElementById('showTime').textContent = showTime; // Display show time
  document.getElementById('selectedSeats').textContent = selectedSeats.join(', ');
  document.getElementById('totalPrice').textContent = `₹${totalPrice}`;
}


});
