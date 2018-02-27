let Deck = null;
let cardArr = [];


$(document).ready(function () {
    const $btnNew = document.querySelector("#btn__new-game");

    const $loadSpinner = $(".loader");
    window.addEventListener("load", function (e) {
        $loadSpinner.css({
            'display': 'none'
        });
    });

    $btnNew.addEventListener("click", startGame);
    start();
});

function start() {
    console.log("Document loaded and ready...");

    setDeck();

}

function startGame(e) {
    /*
        -Within this function, I must create a new deck, shuffled
        -Create a string template to append to my card container, 
            -String templlate must have embedded data attr for data-value, to allow for pattern matching
    */
    e.preventDefault(); //prevent a page Refresh
    console.log("User has clicked start game!");
    setDeck();

}

function setDeck() {
    Deck = null;
    $.ajax({
            url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
            method: "GET",
            json: "jQuery.parseJSON"

        })
        .done((data) => {

            Deck = data;
            console.log("Deck success", Deck);
            setCards();
        })
        .fail((err) => {
            alert("Error getting New deck!");
            console.log("Error", err);
        });

};

function setCards() {
    /*
        -Request, to draw cards, 
        -Return array containing cards, will be used rto lay out the cards
    */
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
            console.log("Card success", cardArr);
            //After, run outer functions
            populateCards(); //go to other function to continue
        })
        .fail((err) => {
            console.log("Error returning Cards...", err);
        });
};

function populateCards() {
    let template = "";
    const $cardContainer = document.querySelector("#Card_feed");
    //Loop through cardArr, create a string template
    for (let cardElement of cardArr) {
        template = createTemplate(template, cardElement);
    }
    $cardContainer.innerHTML = ''; //Reset before iterating again and again
    $cardContainer.insertAdjacentHTML("afterbegin", template);

    cardFlip();
}

function createTemplate(strTemplate, cardElement) {

    strTemplate += `
        <div class="Card__item"  id="card__flip" data-value ="${cardElement.value}" data-suit ="${cardElement.suit}" data-code ="${cardElement.code}" data-flipped="false">
            <div class="front">
            <img src="./assets/playing-card-back.png" class="Card__img" alt="card front">
            </div>
            <div class="back">
            <img src="${cardElement.image}" class="Card__img" alt="card-front">
  
            </div>
        </div>`;
    return strTemplate;
};

function cardFlip() {
    // $("#card__flip").flip();

    $(".Card__item").flip();
    //Event listener
    $(".Card__item").on('click', function () {
        $(this).addClass("active-flipped");
        $(this).data("flipped", "true");

        checkCards($(this));
    });



}

function checkCards(SelectedCard) {
    /*
    Every time a card is selected, We check all the cards, with data attribute of flipped =true, thne compar the codes
    */
    //check the value
    let $flippedCards = document.querySelectorAll(".active-flipped");
    let $cardItemArr = document.querySelectorAll(".Card__item");
    let $cardArr = [];


    for (let element of $cardItemArr) {
        $cardArr.push(element);
    }

    console.log("Flipped array lenmgth", $flippedCards.length);
    if ($flippedCards.length == 2) {
        //2 cards are shown, now check
        console.log("Performing action...");
        let $firstCard = $flippedCards[0];
        let $secondCard = $flippedCards[1];

        if ($firstCard.dataset.value === $secondCard.dataset.value) {
            //Remove the cards from the array
            //Only return if they do not match the value AND dont match the respective codes
            //Show success alert
            $(".alert-success").toggleClass("success-shown");
            $firstCard.remove();
            $secondCard.remove();
            let newArr = cardArr.filter((element) => {
                return element.code != $firstCard.dataset.code && element.code != $secondCard.dataset.code;
            });
            cardArr = newArr;
            setTimeout(() => {
                $(".alert-success").toggleClass("success-shown");
                //User has completed the game, toggle success
                if (cardArr.length == 0) {
                    $('.toggle-success').toggleClass('hidden, success-shown');
                }
            }, 600);

        } else if (!($firstCard.dataset.value == $secondCard.dataset.value)) {
            /*
             - The cards do not match,
             -Empty the flippedArray, to be reusable
             - toggle all 

                -Timeout, allow user to see cards before flipping
            -Show mismatch error
            */
            $(".alert-danger").toggleClass("success-shown");
            console.log("The cards do not match, handling it...");
            $flippedCards == 0;

            setTimeout(() => {
                $(".active-flipped").flip('toggle');
                $flippedCards.forEach((element) => {
                    element.classList.toggle("active-flipped");
                })
                $(".alert-danger").toggleClass("success-shown");
            }, 700);


        }



    }

};