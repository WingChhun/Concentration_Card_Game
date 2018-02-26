/*

*/

/*

*/
class Deck {

    constructor() {
        /*
        Initially, make a request to the API to get a deck of Cards, store into an array;
            -Open a brand new deck of cards
        */
        this.deck = {};
        this.cards = {};
        $.ajax({
                url: "https://deckofcardsapi.com/api/deck/new/",
                method: "GET",
                json: "jQuery.parseJSON"

            })
            .done((data) => {
                //success, this.deck now contains JSON data, will use for ID
                this.deck = data;
                console.log("Success new deck", this.deck);
            })
            .fail((err) => {
                alert("Error getting New deck!");
                console.log("Error", err);
            })
        this.startShuffle(); //shuffle cards immediately after
    }

    /*
    Functions
    */
    test() {
        console.log("Testing from apiDeck class, SUCCESS!");
    }
    startShuffle() {
        /*
            -Function start
                -activated when user clicks 'New Game'
                    -shuffle the deck of cards, then lay out the cards, face down , in 4 rows with 13 cards in each row          
        
            -NOTE :have to use timeout, because this function depmends on making the initial request to the API
                    */
        setTimeout(() => {
            let shuffleURL = `https://deckofcardsapi.com/api/deck/${this.deck.deck_id}/shuffle/`;

            $.ajax({
                    url: shuffleURL,
                    method: "GET",
                    json: "jQuery.parseJSON"
                })
                .done((data) => {
                    this.deck = data;
                    console.log("Success shuffling Deck at function Deck.start()", this.deck);

                })
                .fail((err) => {
                    console.log("Error, shuffling Deck", err);
                });
        }, 800);

    }
    peek() {
        /*
            -function peek,
                -Will be used for testing, and to see what cards have been discarded
        */
        setTimeout(() => {
            console.log("Starting deck", this.deck);
        }, 400);

    }
    returnDeck() {
        //Return the deck as it is
    }
    returnCards() {
        /*
            -Request, to draw cards, 
            -Return array containing cards, will be used rto lay out the cards
        */


        setTimeout(() => {
            let shuffleURL = `https://deckofcardsapi.com/api/deck/${this.deck.deck_id}/draw/?count=52`;
            $.ajax({
                    url: shuffleURL,
                    method: "GET",
                    json: "jQuery.parseJSON"
                })
                .done((cards) => {

                    this.cards = cards;
                    console.log("Success returning Cards", this.cards);
                })
                .fail((err) => {
                    console.log("Error returning Cards...", err);
                });
        }, 600);



    }
}