//Immediately-Invoked Function, set all globla values
let deckAPI = new Deck();

(function starter() {
    //Create object of Deck API
    //   deckAPI.test();
    // deckAPI.peek();
    // deckAPI.returnCards();
})();

$(document).ready(function () {

    const $btnNew = document.querySelector("#btn__new-game");


    $btnNew.addEventListener("click", startGame);
    //    deckAPI.startShuffle();
    //  deckAPI.returnCards();

    start();
});

function start() {
    console.log("Document loaded and ready...");
}

function startGame(e) {
    e.preventDefault(); //prevent a page Refresh

    const p1 = new Promise((resolve, reject) => {

        
    });
    deckAPI = new Deck();

    deckAPI.returnCards();
    console.log("User has clicked start game!");

    setTimeout(() => {
        const cardArray = deckAPI.cards;
        console.log("Card array", cardArray);

    }, 1000);

}