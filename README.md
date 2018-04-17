# Memory Game Project

## Instructions - Project

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Game Mechanics

* The deck has 16 cards with 8 hidden symbols and the player has to flip the cards one by one.
* Player has to find the matching cards as quickly as possible.
* Once completed the player will get the playing time and rating through stars:
  - 3 stars when 30 moves or less
  - 2 stars when 40 moves or less
  - 1 star when more than 50 moves

![Screenshot](https://github.com/888Red/Game---Memory/blob/master/img/screenshot.JPG)

## Demo

Play it here and test your memory skills. Have fun!

[Let's play!](https://888red.github.io/Game---Memory/)
 
## Game Functionality for the JavaScript

* Make a grid with 16 tiles or cards containing 8 pairs of symbols
* Game should start with timer set to zero and shuffled cards.  `function shuffle ()` is already provided in the `js/app.js` by **@Udacity**
* All symbols must be hidden at the start
* When player clicks the card the symbol should appear and the timer starts
* When the next card is the same all cards remain open
* When the two cards do not match both will close
* If the player completes the 8 pairs of cards a popup screen or modal appears
* The timer stops and reset
* The popup screen shows the number of moves, the time and the star rating
* A new game can be done through the reset button on the score panel or through the play again button

## Dependencies

* Fonts - [Google](https://fonts.google.com/)
* Icons - [Font Awesome](https://fontawesome.com/)

## Credits and references

* https://calexxxxx.github.io/memory/
* https://docs.google.com/document/d/14C15Izc71QsQFTMO_VbV1kb_dXzFPy7AfEIMW0fKiW0/edit
* https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript

* Udacity Mentors, Student Leaders, my study buddies on Slack and my family --- THANK YOU! 


