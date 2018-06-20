/*
 * Create a list that holds all of your cards
 */

//Put all your globals up top
const icons = [
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-bomb"
];
var openedCards = [];
var matchedCards = [];


function startGame() {
    displayCards();

}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards() {
    // you don't need deck as a global variable, define it here.
    const deck = document.querySelector(".deck");
    deck.innerHTML = "";

    //call shuffle here before you create the cards
    shuffle(icons);

    //loop through array of icons and create cards
    for (i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class = "${icons[i]}"></i>`;
        deck.appendChild(card);
    }

    // It's more efficient to assign a click event to a parent element
    // The deck, rather than each card
    click(deck);

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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

// This is your click() function from your codepen
// With a few things taken out
function click(elem) {
    elem.addEventListener("click", function(e) {
        // what we are clicking
        const target = e.target;

        // If we don't click on the li element, do nothing
        // else, call the click handler
        if (target.tagName !== 'LI') {
            return;
        } else {
            clickHandler(target);
        }
    });
}

function clickHandler(card) {
    const cardOpen = card.classList.contains('open');
    const cardShow = card.classList.contains('show');
    const cardMatch = card.classList.contains('match');
    const cardDisabled = card.classList.contains('disabled');

    // Check for classes on cards
    if (!cardOpen && !cardShow && !cardMatch && !cardDisabled && openedCards.length < 2) {
        // add Classes
        showCard(card);
        // now push to array
        openedCards.push(card);

        // Nest next check
        // Check array length
        if (openedCards.length === 2) {
            // Check for match
            checkForAMatch();
        }
    }
}

function showCard(card) {
    card.classList.add('open', 'show', 'disabled');
}

function hideCards() {
    console.log(openedCards);
    openedCards[0].classList.remove("open", "show", "disabled");
    openedCards[1].classList.remove("open", "show", "disabled");
    openedCards = [];
}

function lockCards(){
    console.log("match");
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    matchedCards.push(card1);
    matchedCards.push(card2);
    openedCards = [];
}

function checkForAMatch() {
  const justClickedCard = openedCards[1];
  const previousCard = openedCards[0];
  if (justClickedCard.innerHTML === previousCard.innerHTML) {
    lockCards(justClickedCard, previousCard);
  } else {
    setTimeout(hideCards, 1000);
  }
}


startGame();