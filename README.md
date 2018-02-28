# Concentration_Card_Game
Single person card game called Concentration, will make use of the API from http://deckofcardsapi.com/

# cards-coding-challenge

### Game Description
-	When the user clicks the ‘New Game’ button, shuffle the deck of cards, then layout the cards, face down, in 4-rows with 13 cards in each row.
-	The user clicks on two cards. As the user clicks on a card, the card is flipped over so users can see the # and suit of the card.
-	If the numbers on the two cards selected by the user are the same, then those two cards are removed from the board. If the numbers on the cards do not match, then the cards are flipped back over and remain on the board.
-	The game ends when the user has matched all cards.

### Requirements

- vanillJS

2.	Use APIs on http://deckofcardsapi.com/  for shuffling the deck and selecting cards when laying them out on the board. We realize that you could simulate shuffling the cards and selecting cards without using these apis, but we would like you to demonstrate using asynchronous api calls in your code.

3.	You can optionally use the graphic files in the /assets folder of this repository for displaying the cards

# Directions on running web app
- Within the package.json I have created a script
    - Within Bash, navigate to the project directory and run:
       -"npm install"
       -"npm run start"
    -If there are no errors, then this web app should deploy successfully to localhost:3000
    
## Dependencies

- jQuery, jQuery-flip, Bootstrap, popper.js

## DevDependencies
-Gulp, Gulp-Sass, BrowserSync

## Plans for future

- Unit testing with Jest
- Separate Deck of API into separate Class to follow more traditional OOP and cleaner architecture
- Write my own JS promises to navigate through asynchronous JS smoother 
