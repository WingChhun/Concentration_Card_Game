/*
 - Global variables Deck and cardArr
        -Deck will be populated from DeckofCards API
            -CardArr depends on ObjectID retrieved from Deck and will be populated using API as well
*/
let Deck = null;
let cardArr = [];

$(document).ready(function () {
    console.log("Document loaded and ready...");
    const $btnNew = document.querySelector("#btn__new-game");

    $btnNew.addEventListener("click", startGame);
    start();
});

//Run loadSpinner function as well as setDeck() to start the program
const start = () => {
    loadSpinner();
    setDeck();

}

/*
 - Function startGame, only runs when user clicked 'newGame', run setDeck() start game over, prevent any page refresh default behavior
*/
const startGame = (e) => {
    e.preventDefault(); //prevent a page Refresh
    setDeck();

}

/*
 - Function setDeck
 - Main function, will handle starting the game and ajax calls
    - 1. Reset the Deck to NULL, clear it in case multiple games have already been played
    - 2. Make Ajax request to DeckOfCards API,
        -populate Deck with data retrieved from API
        -Show 'Shuffled' to user
    - 3. Once done, run setCards(), will handle populating cardArr, b/c cardArr depends on Deck not being NULL.
*/
const setDeck = () => {
    Deck = null;
    $.ajax({
            url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
            method: "GET",
            json: "jQuery.parseJSON"

        })
        .done((data) => {

            Deck = data;
            $(".u-alert--success-2").toggleClass("success-shown");

            setTimeout(() => {
                $(".u-alert--success-2").toggleClass("success-shown");
            }, 500);

            // console.log("Deck success", Deck);
            this.setCards();
        })
        .fail((err) => {
            alert("Error getting New deck!");
            // console.log("Error", err);
        });

    /*
        -Function setCards()
            - 1.Request, to draw cards, depends on using deck_id from the Deck 
            - 2.Return array containing cards, will be used rto lay out the cards

    
    */
    this.setCards = () => {

        let shuffleURL = `https://deckofcardsapi.com/api/deck/${Deck.deck_id}/draw/?count=52`;
        $.ajax({
                url: shuffleURL,
                method: "GET",
                json: "jQuery.parseJSON"
            })
            .done((results) => {

                cardArr = []; //reset cardArr, in case resetting game
                results.cards.forEach((card) => {
                    cardArr.push(card);
                });
                // console.log("Card success", cardArr);
                //After, run outer consts
                populateCards(); //go to other function to continue
            })
            .fail((err) => {
                // console.log("Error returning Cards...", err);
            });
    }
};

/*
 -Function populateCards
    -1. Loop through cardArr, create a string template, depends on function createTemplate()
    -2. Reset the innerHTML of cardContainer
        -insert string Template into Card__feed for cards
    -DEPENDENCIES
        -function createTemplate()
        -checkCards();
*/
const populateCards = () => {
    let template = "";
    const $cardContainer = document.querySelector("#Card_feed");
    for (let cardElement of cardArr) {
        template = createTemplate(template, cardElement);
    }
    $cardContainer.innerHTML = ''; //Reset before iterating again and again
    $cardContainer.insertAdjacentHTML("afterbegin", template);

    /*
         -function cardFlip(),
             -1. use jQuery plugin jquery-flip, apply flip() to cardItems
             -2. Add event listener 'click', add class and data-attribute for flipped
             -3. Pass in the Card Item Clicked into checkCards();
      */
    this.cardFlip = () => {

        $(".Card__item").flip();
        //Event listener
        $(".Card__item").on('click', function () {
            $(this).addClass("active-flipped");
            $(this).data("flipped", "true");

            checkCards($(this));
        });

    }
    this.cardFlip(); //run this.cardFlip function, 
}

/* Function createTemplate()
    - 1. Accept template String and cardElement of cardArr
    -2. Appeend to templateString HTML that adds multiple data -attributes depending on the cardElement
        -Data attributes include value, image, suit, code, and custom - flipped
*/
const createTemplate = (strTemplate, cardElement) => {

    strTemplate += `
        <div class="Card__item"  id="card__flip" data-value ="${cardElement.value}" data-suit ="${cardElement.suit}" data-code ="${cardElement.code}" data-flipped="false">
            <div class="front">

            <img src="./assets/playing-card-back.png" class="Card__img" alt="card front">
            </div><!-- end front -->
            <div class="back">
            <img src="${cardElement.image}" class="Card__img" alt="card-front">            
            
            </div><!-- end back -->
        </div><!-- end card__item -->`;
    return strTemplate;
};


/*
Every time a card is selected, We check all the cards, with data attribute of flipped =true, thne compar the codes
*/
const checkCards = (SelectedCard) => {

    let $flippedCards = document.querySelectorAll(".active-flipped");
    let $cardItemArr = document.querySelectorAll(".Card__item");
    let $cardArr = [];

    for (let element of $cardItemArr) {
        $cardArr.push(element);
    }
    // console.log("Flipped array length", $flippedCards.length);
    //console.log("Flipped array length", $flippedCards.length);
    if ($flippedCards.length == 2) {
        //2 cards are shown, now check
        // console.log("Flipped Cards - Length 2","Performing action...");
        let $firstCard = $flippedCards[0];
        let $secondCard = $flippedCards[1];


        if ($firstCard.dataset.value === $secondCard.dataset.value) {
            /*
              -Remove cards from cardArr
              -Remove cards HTML from cardFeed
              -Show success message to user
            */
            $(".u-alert--success").toggleClass("success-shown");
            cardArr = cardArr.filter((element) => {
                return element.code != $firstCard.dataset.code && element.code != $secondCard.dataset.code;
            });

            setTimeout(() => {
                $firstCard.remove();
                $secondCard.remove();
                $(".u-alert--success").toggleClass("success-shown");
            }, 450);

        } else if (!($firstCard.dataset.value == $secondCard.dataset.value)) {
            // console.log("checkCards() -No match""The cards do not match, handling it...");
            $(".u-alert--danger").toggleClass("success-shown");
            setTimeout(() => {
                this.flipActive();
            }, 500);
            $flippedCards == 0; //reset flippedCards length to 0
        } //end else if datasets dont match

    } //end initial if


    this.flipActive = () => {
        /*
         - The cards do not match,
         -Empty the flippedArray, to be reusable
         - toggle all 
            -Timeout, allow user to see cards before flipping
        -Show mismatch error
        */
        //clearTimeout(); //clear timeout, in case user clicks too fast
        $(".active-flipped").flip('toggle');
        $flippedCards.forEach((element) => {
            element.classList.remove("active-flipped");
        })
        $(".u-alert--danger").toggleClass("success-shown");


    }

} //end else if datasets dont match