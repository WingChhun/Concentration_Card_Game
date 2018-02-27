let Deck = null;
let cardArr = [];


$(document).ready(function () {

    const $btnNew = document.querySelector("#btn__new-game");

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
            <img src="${cardElement.image}" class="Card__img" alt="card-front">
          
        
            </div>
            <div class="back">
            <img src="./assets/playing-card-back.png" class="Card__img" alt="card front">
            </div>
        </div>`;
    return strTemplate;
};

function cardFlip() {
    // $("#card__flip").flip();
    $(".Card__item").flip();
    $(".Card__item").flip(true);
    //Event listener
    $(".Card__item").on('click', function () {
        $(this).addClass("active active-flipped");
        $(this).data("flipped", "true"); //change flipped to true

        checkCards($(this));
    });



}

function checkCards(SelectedCard) {
    /*
    Every time a card is selected, We check all the cards, with data attribute of flipped =true, thne compar the codes
    */
    //check the value
    const $flippedArray = $(".active-flipped");

    console.log("Flipped array lenmgth", $flippedArray.length);
    if ($flippedArray.length == 2) {
        //2 cards are shown, now check
        console.log("Performing action...");
    } 

};