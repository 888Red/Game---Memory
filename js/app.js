/*
 * Create a list that holds all of 16 cards - so this is the Array
 */
const list = ["fa-anchor","fa-anchor",  "fa-bicycle", "fa-bicycle",  
            "fa-bolt", "fa-bolt", "fa-bomb", "fa-bomb",  
            "fa-cube", "fa-cube",  "fa-diamond", "fa-diamond",  
            "fa-leaf", "fa-leaf", "fa-paper-plane-o", "fa-paper-plane-o"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let shuffledCards = []; // Array for new set of cards
let viewedCards = []; // Temporary array for viewed cards
let pairedCards = []; // Array for matched cards

// Timer
let timerBegin;
let timerEnd;
let timerInterval;
let timerCounter = 0;
let timerMin = 0;

// Count player's moves
let moves = 0;
const movesOnPanel = document.querySelector('.moves');

// Select the stars
const stars = document.querySelectorAll(".fa-star");
const starsList = document.querySelectorAll(".stars li");

// Select all cards and the deck
const tile = document.querySelectorAll(".deck li");
const deck = document.querySelector(".deck");

// Select restart buttons on score panel and on modal
const restartBtn = document.querySelector(".restart");
const restartBtnModal = document.querySelector(".awesome .again");

/*
 * Event Listeners
 */

 // Restart button on score panel and on modal
 restartBtn.addEventListener("click", function () {
        newGame();
    })
  restartBtnModal.addEventListener("click", function () {
        document.querySelector(".awesome").className = "awesome hide"; newGame()});

/* When player clicks the card and viewed two cards,
 * then show the symbols, add card to viewed array and start counting the moves.
 * Get the playing time and then reset the stars on score panel.
 */

deck.addEventListener('click', function (evt) {

   if (!(evt.target.className === 'deck') && (viewedCards.length <= 2) && !(evt.target.isClicked === 1) && !(evt.target.localName === 'i')) {
         showCard(evt);
         addTileToViewedCards(evt);
         countMoves();

            //timer on the desk

          if (moves === 1) {
              timerInterval = setInterval(function () {
                  OnTimer();
              }, 1000);
            }
           gameTime();
           resetStarOnPanel();
        }
    })
