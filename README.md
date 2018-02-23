# Concentration_Card_Game
Single person card game called Concentration, will make use of the API from http://deckofcardsapi.com/

# cards-coding-challenge

### Game Description
-	When the user clicks the ‘New Game’ button, shuffle the deck of cards, then layout the cards, face down, in 4-rows with 13 cards in each row.
-	The user clicks on two cards. As the user clicks on a card, the card is flipped over so users can see the # and suit of the card.
-	If the numbers on the two cards selected by the user are the same, then those two cards are removed from the board. If the numbers on the cards do not match, then the cards are flipped back over and remain on the board.
-	The game ends when the user has matched all cards.

### Requirements
1.	Use one of the following frameworks/languages to develop your game:
-	React.js [create-react-app](https://github.com/facebook/create-react-app), OR
-	Angular 2/4 with Typescript [Angular CLI](https://github.com/angular/angular-cli), OR
-	Javascript 

2.	Use APIs on http://deckofcardsapi.com/  for shuffling the deck and selecting cards when laying them out on the board. We realize that you could simulate shuffling the cards and selecting cards without using these apis, but we would like you to demonstrate using asynchronous api calls in your code.

3.	You can optionally use the graphic files in the /assets folder of this repository for displaying the cards


### Goals / Approach
- Will be implemented using Javascript
 - Create separate Class to handle Ajax calls, and create object of that class
    -Follow (OOP) methodology
-Leave door open to approach using Angular in the future
- Accomplish unit testing with Jest
    - Or use of Mocha / Chai (less familiar, need to learn as I go)
### Bonus Points
You will get bonus points for:
-	creating unit tests for your game.
-	Using ES6 if developing with React.js
