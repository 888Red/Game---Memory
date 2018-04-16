/*
 * Create a list that holds all of 16 cards - so this is the Array
 */

const list = [
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-bomb",
    "fa fa-bomb",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o"
];

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

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
const movesOnPanel = document.querySelector(".moves");

// Select the stars
const stars = document.querySelector(".stars");
const starsList = document.querySelectorAll(".stars li");

// Select all cards and the deck
const tiles = document.querySelectorAll(".deck li");
const deck = document.querySelector(".deck");

// Select restart buttons on score panel and on modal
const restartBtn = document.querySelector(".restart");
const restartBtnModal = document.querySelector(".again");

/*
 * Event Listeners
 */

// Restart button on score panel and on modal
restartBtn.addEventListener("click", function () {
    newGame();
});
restartBtnModal.addEventListener("click", function () {
    document.querySelector(".awesome").style.display = "none";
    newGame();
});

/* When player clicks the card and viewed two cards,
* then show the symbols, add card to viewed array and start counting the moves.
* Get the playing time and then reset the stars on score panel.
*/

deck.addEventListener("click", function (event) {
    if (
        !(event.target.className === "deck") &&
        viewedCards.length <= 2 &&
        !(event.target.isClicked === 1) &&
        !(event.target.localName === "i")
    ) {
        showCard(event);
        addTileToViewedCards(event);
        countMoves();

        // Timer on the score panel

        if (moves === 1) {
            timerInterval = setInterval(function () {
                onTimer();
            }, 1000);
        }
        gameTime();
        resetStarOnPanel();
    }
});

/*
* Functions for the game
*/

function showCard(event) {
    event.target.className = "card open show";
    event.target.isClicked = 1;
}

function addTileToViewedCards(event) {
    viewedCards.push(event.target.firstElementChild);
    matched(viewedCards);
    mismatched(viewedCards);
}

function matched(array) {
    if (array.length === 2 && array[0].className === array[1].className) {
        array[0].parentNode.className = "card match show";
        array[1].parentNode.className = "card match show";
        pairedCards.push(array[0]);
        viewedCardsReset(array);
    }
}

function mismatched(array) {
    if (array.length === 2 && array[0].className !== array[1].className) {
        setTimeout(function () {
            array[0].parentNode.className = "card close";
            array[1].parentNode.className = "card close";
            array[0].parentNode.isClicked = 0;
            array[1].parentNode.isClicked = 0;
            viewedCardsReset(array);
        }, 1000);
    }
}

function viewedCardsReset(array) {
    for (let i = 0; i < 2; i++) {
        array.shift();
    }
    return array;
}

function tilesShuffle(array) {
    let shuffledArray = shuffle(list);
    for (i = 0; i < array.length; i++) {
        array[i].firstElementChild.className = shuffledArray[i];
    }
}

function onTimer() {
    let sec;
    timerCounter++;
    sec = timerCounter;
    if (timerCounter === 60) {
        timerMin++;
        sec = 0;
        timerCounter = 0;
    }
    document.querySelector("#timer").innerHTML =
        addTimer(timerMin) + ":" + addTimer(sec);
}

function addTimer(number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number;
    }
}
/*
* Score panel
*/
function resetStarOnPanel() {
    if (moves === 30) {
        stars.lastElementChild.style.visibility = "hidden";
    } else if (moves === 50) {
        stars.lastElementChild.previousElementSibling.style.visibility = "hidden";
    }
}

function newGame() {
    tilesShuffle(tiles);
    for (let card of tiles) {
        card.className = "card close";
        card.isClicked = 0;
    }
    for (let star of starsList) {
        star.style.visibility = "visible";
    }
    offTimer();
    moves = 0;
    movesOnPanel.innerHTML = moves;
    pairedCards = [];
    viewedCards = [];
    document.querySelector('.awesome').style.display = "none";
}


function getMoves() {
    let moves = 0;
    return moves;
}

function setMoves(number) { }

function countMoves() {
    moves++;
    movesOnPanel.innerHTML = moves;
}

// Show modal

function showModal() {
    document.querySelector(".lastMove").innerText = document.querySelector(".moves").innerText;
    document.querySelector(".starRate").innerText = document.getElementsByClassName("fa-star").length;
    document.querySelector(".totalTime").innerText = document.querySelector('#timer').innerHTML;

    setTimeout(function () { document.querySelector(".awesome").style.display = "flex" }, 1000);

}


/*
* When game is over
*/

function gameTime() {
    if (moves === 1) {
        timeBegin = Date.now();
    }

    if (pairedCards.length === 8) {
        timeEnd = Date.now() - timeBegin;
        showModal();
        offTimer();
    }
}

function getScore() {
    let score = 100 - Math.floor(endTime / 1000) + (100 - moves);
    return score;
}

function offTimer() {
    clearInterval(timerInterval);
    timerCounter = 0;
    timerMin = 0;
    document.querySelector("#timer").innerHTML = "00:00";
}
