function start() {
  document.querySelector("#bet").value = "25";

  let cardContainers = document.querySelectorAll(".card-container");
  let dealerContainers;



  removeAllCards(cardContainers);

  shuffledValues = createDeckValues();
  shuffledSuits = createDeckSuits();

  initialTurn(shuffledValues, shuffledSuits);

  let dealerStartIndex = 0;
  let dealerEndIndex = 5;
  let playerStartIndex = 5;
  let playerEndIndex = 9;

  let dealerCardValue = getCardValues(cardContainers, dealerStartIndex, dealerEndIndex);
  let playerCardValue = getCardValues(cardContainers, playerStartIndex, playerEndIndex);

  let dealerSum = checkForBlackjack(dealerCardValue);
  let playerSum = checkForBlackjack(playerCardValue);

  winConditionCheck(dealerSum, playerSum);


  playerTurn();

}

function createDeckValues() {
  let playingCardValues = ["A", "A", "A", "A", 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, "J", "K", "Q", 10, "J", "K", "Q", 10, "J", "K", "Q", 10, "J", "K", "Q"];

  shuffledValues = shuffleDeck(playingCardValues);

  return shuffledValues;
}

function createDeckSuits() {
  let playingCardSuits = ["Hearts", "Hearts", "Hearts", "Hearts", "Hearts", "Hearts", "Hearts", "Hearts", "Hearts", "Hearts", "Hearts", "Hearts", "Hearts", "Diamonds", "Diamonds", "Diamonds", "Diamonds",
   "Diamonds", "Diamonds", "Diamonds", "Diamonds", "Diamonds", "Diamonds", "Diamonds", "Diamonds", "Diamonds", "Spades", "Spades", "Spades", "Spades", "Spades", "Spades", "Spades", "Spades", "Spades", "Spades", "Spades", "Spades", "Spades",
   "Clubs", "Clubs", "Clubs", "Clubs", "Clubs", "Clubs", "Clubs", "Clubs", "Clubs", "Clubs", "Clubs", "Clubs", "Clubs"];

  shuffledSuits = shuffleDeck(playingCardSuits); 

  return shuffledSuits;
}

function shuffleDeck(playingCardsDeck) {
	var i = playingCardsDeck.length;
	var j, k;

	while (0 !== i) {
		k = Math.floor(Math.random() * i);
		i -= 1;
		j = playingCardsDeck[i];
		playingCardsDeck[i] = playingCardsDeck[k];
		playingCardsDeck[k] = j;
	}

	return playingCardsDeck;
}

function playerHardTable() {
  const hardTable = [
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "stand", "stand", "stand", "hit", "hit", "hit", "hit", "hit"],
    ["stand", "stand", "stand", "stand", "stand", "stand", "stand", "hit", "hit", "hit"],
    ["stand", "stand", "stand", "stand", "stand", "stand", "stand", "stand", "stand", "stand"]
  ];

  return hardTable;
}

function playerSoftTable() {
  const softTable = [
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"],
    ["hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit", "hit"]
  ];

  return softTable;
}

function getFirstTwoCardValues() {
  const cardContainerList = document.querySelector(".card-container");
  let dealerCardList = [];

  for (let i = 0; i < 2; i++) {
    dealerCardList[i] = cardContainerList[i].value;
  }
}

function determineAceInHand() {
  
}

function initialTurn(newDeckValues, newDeckSuits) {
  let playerCard1Value = newDeckValues.pop();
  let playerCard1Suit = newDeckSuits.pop()

  let dealerCard1Value = newDeckValues.pop();
  let dealerCard1Suit = newDeckSuits.pop();

  let playerCard2Value = newDeckValues.pop();
  let playerCard2Suit = newDeckSuits.pop()

  let dealerCard2Value = newDeckValues.pop();
  let dealerCard2Suit = newDeckSuits.pop();

  let playerCardContainer1 = document.querySelector("#player1");
  let playerCardContainer2 = document.querySelector("#player2");
  let dealerCardContainer1 = document.querySelector("#dealer1");
  let dealerCardContainer2 = document.querySelector("#dealer2");

  createCard(playerCard1Suit, playerCard1Value, playerCardContainer1);
  createCard(dealerCard1Suit, dealerCard1Value, dealerCardContainer1);
  createCard(playerCard2Suit, playerCard2Value, playerCardContainer2);
  createCardBack(dealerCard2Suit, dealerCard2Value, dealerCardContainer2);
}

function removeAllCards(cardContainers) {
  let i;
  for (i = 0; i < cardContainers.length; i++) {
    if (typeof(cardContainers[i].getAttribute("value")) === "string") {
      cardContainers[i].removeAttribute("value");
      cardContainers[i].removeChild(cardContainers[i].childNodes[0]);
      cardContainers[i].removeChild(cardContainers[i].childNodes[0]);
      cardContainers[i].removeChild(cardContainers[i].childNodes[0]);
    }
  }
}

function createCard(cardSuit, cardValue, cardContainer) {
  const topLeftSymbol = document.createElement("div");
  const middleSymbol = document.createElement("div");
  const bottomRightSymbol = document.createElement("div");

  topLeftSymbol.setAttribute("class", "top-left-symbol");
  middleSymbol.setAttribute("class", "middle-symbol");
  bottomRightSymbol.setAttribute("class", "bottom-right-symbol");

  cardContainer.setAttribute("value", cardValue);
  
  if (cardSuit == "Hearts" | cardSuit == "Diamonds") {
    topLeftSymbol.innerHTML = "<span style='color:red'>" + String(cardValue) +"</span><br><span style='color:red'><i class='fab fa-d-and-d'></i></span>";
    middleSymbol.innerHTML = "<span class='hearts' style='color: red'><i class='fab fa-d-and-d'></i></span>";
    bottomRightSymbol.innerHTML = "<span style='color:red'>" + String(cardValue) +"</span><br><span style='color:red'><i class='fab fa-d-and-d'></i></span>";
  } else if (cardSuit == "Spades" | cardSuit == "Clubs") {
    topLeftSymbol.innerHTML = "<span style='color:black'>" + String(cardValue) +"</span><br><span style='color:black'><i class='fab fa-d-and-d'></i></span>";
    middleSymbol.innerHTML = "<span class='hearts' style='color: black'><i class='fab fa-d-and-d'></i></span>";
    bottomRightSymbol.innerHTML = "<span style='color:black'>" + String(cardValue) +"</span><br><span style='color:black'><i class='fab fa-d-and-d'></i></span>";
  } 

  cardContainer.appendChild(topLeftSymbol);
  cardContainer.appendChild(middleSymbol);
  cardContainer.appendChild(bottomRightSymbol);
}

function createCardBack(cardSuit, cardValue, cardContainer) {
  const topLeftSymbol = document.createElement("div");
  const middleSymbol = document.createElement("div");
  const bottomRightSymbol = document.createElement("div");

  topLeftSymbol.setAttribute("class", "top-left-symbol");
  middleSymbol.setAttribute("class", "middle-symbol");
  bottomRightSymbol.setAttribute("class", "bottom-right-symbol");

  cardContainer.setAttribute("value", cardValue);
  
  topLeftSymbol.innerHTML = "<span style='color:red'></span><span style='color:black'><i class='fab fa-wizards-of-the-coast'></i></span>";
  middleSymbol.innerHTML = "<span class='hearts' style='color: black'><i class='fab fa-wizards-of-the-coast'></i></span>";
  bottomRightSymbol.innerHTML = "<span style='color:red'></span><br><span style='color:black'><i class='fab fa-wizards-of-the-coast'></i></span>";

  cardContainer.appendChild(topLeftSymbol);
  cardContainer.appendChild(middleSymbol);
  cardContainer.appendChild(bottomRightSymbol);
}

function getCardValues(cardContainers,startIndex, endIndex) {
  let cardValueList = [];

  for (let i = startIndex; i < endIndex; i++) {
    if (cardContainers[i].hasChildNodes() != false) {
      cardValueList.push(cardContainers[i].getAttribute("value"));
    } else {
      continue;
    }
  }

  console.log(cardValueList);
  return cardValueList;
}

function checkForBlackjack(cardValueList) {
  let sum = 0;
  let cardValue = 0;

  for (let i = 0; i < cardValueList.length; i++) {
    if (cardValueList[i] == "J" | cardValueList[i] == "Q" | cardValueList[i] == "K") {
      cardValue = 10;
    } else if (cardValueList[i] == "A") {
      // ace can either be 1 or 11, 11 is the default value, 1 is the value if the sum goes over 21 with 11
      if (sum < 11) {
        cardValue = 11;
      } else if (sum >= 11) {
        cardValue = 1;
      } else {
        console.log("Error at line 24!, checkValue.js");
      }
    } else {
      // if not an ace or 10 value
      cardValue = parseInt(cardValueList[i]);
    }

      sum = sum + cardValue;
  }

  console.log(sum);
  return sum;
}

function winConditionCheck(dealerSum, playerSum) {
  const message = document.querySelector("#message");
  // blackjack win
  if (playerSum != dealerSum) {
    if (playerSum == 21) {
      showFrontSide();
      message.innerHTML = "Player got Blackjack! Player <span style='color: green'>Wins!</span>";
      gainBank();
    } else if (dealerSum == 21) {
      showFrontSide();
      message.innerHTML = "Dealer got Blackjack! Player <span style='color: red'>Loses!</span>";
      deductBank();
    } else {
      message.innerHTML = "No automatic win on the initial play";
    }
  } else if (playerSum == dealerSum && playerSum == 21 && dealerSum == 21) {
    showFrontSide();
    message.innerHTML = "Tie! Player <span style='color: red'>loses</span> on ties.";
    deductBank();
  }
}

function deductBank() {
  const deductionValue = parseInt(document.querySelector("#bet").value);
  const bankValue = parseInt(document.querySelector("#money").innerHTML);
  let newBankValue = bankValue - deductionValue;

  document.querySelector("#money").innerHTML = String(newBankValue);
}

function gainBank() {
  const deductionValue = parseInt(document.querySelector("#bet").value);
  const bankValue = parseInt(document.querySelector("#money").innerHTML);
  let newBankValue = bankValue + deductionValue;

  document.querySelector("#money").innerHTML = String(newBankValue);
}


// remove placeholder card and put into place new one based one value
function showFrontSide() {
  let dealerCardFaceDown = document.querySelectorAll(".card-container");
  // get second container
  dealerCardFaceDown = dealerCardFaceDown[1];
  let dealerCardFaceDownValue = dealerCardFaceDown.getAttribute("value");

  dealerCardFaceDown.removeChild(dealerCardFaceDown.childNodes[0]);
  dealerCardFaceDown.removeChild(dealerCardFaceDown.childNodes[0]);
  dealerCardFaceDown.removeChild(dealerCardFaceDown.childNodes[0]);

  createDealerCard(dealerCardFaceDown, dealerCardFaceDownValue);
}

function createDealerCard(cardContainer, cardValue) {
  const topLeftSymbol = document.createElement("div");
  const middleSymbol = document.createElement("div");
  const bottomRightSymbol = document.createElement("div");

  topLeftSymbol.setAttribute("class", "top-left-symbol");
  middleSymbol.setAttribute("class", "middle-symbol");
  bottomRightSymbol.setAttribute("class", "bottom-right-symbol");

  topLeftSymbol.innerHTML = "<span style='color:black'>" + String(cardValue) +"</span><br><span style='color:black'><i class='fab fa-d-and-d'></i></span>";
  middleSymbol.innerHTML = "<span class='hearts' style='color: black'><i class='fab fa-d-and-d'></i></span>";
  bottomRightSymbol.innerHTML = "<span style='color:black'>" + String(cardValue) +"</span><br><span style='color:black'><i class='fab fa-d-and-d'></i></span>"; 

  cardContainer.appendChild(topLeftSymbol);
  cardContainer.appendChild(middleSymbol);
  cardContainer.appendChild(bottomRightSymbol);
}
// determine is blackjack is in either player's hand
// if not, continue with player's turn
// determine dealer's face card value
// determine player's hand value
// determine if an ace is inside player's hand to determine which table to use
// determine coordinates to retrieve value from table
// if player hasn't lost by the end of their turn, then dealer gets to start
function playerTurn() {

}

function dealerTurn() {

}
