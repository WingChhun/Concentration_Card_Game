let Deck = null;
let cardArr = [];


$(document).ready(function () {

    const $btnNew = document.querySelector("#btn__new-game");
    $("#card__flip").flip();
    $(".Card__item").flip();
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
    cardArr = []; //reset cardArr, in case resetting game
    let shuffleURL = `https://deckofcardsapi.com/api/deck/${Deck.deck_id}/draw/?count=52`;
    $.ajax({
            url: shuffleURL,
            method: "GET",
            json: "jQuery.parseJSON"
        })
        .done((results) => {


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
    for (let i = 0; i < 5; i++) {
        console.log("Card element " + cardArr[i].code);
    }
}

function createTemplate(strTemplate, cardElement) {


    strTemplate += `
        <div class="Card__item" id="card__flip" data-value ="${cardElement.value}" data-suit ="${cardElement.suit}" data-code ="${cardElement.code}">
            <div class="front">
                <img src="${cardElement.image}" class="Card__img" alt="card-front">
            </div>
            <div class="back">
                <img src="./assets/playing-card-back.png" class="Card__img" alt="card front">
            </div>
        </div>`;
    return strTemplate;
};