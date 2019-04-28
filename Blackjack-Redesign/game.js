function start() {
  document.querySelector("#bet").value = "25";
  const message = document.querySelector("#message");
  message.innerHTML = "No automatic win on the initial play";

  let cardContainers = document.querySelectorAll(".card-container");
  let dealerContainers;

  let numberOfRounds = 1;



  removeAllCards(cardContainers);
  removeAllCards(cardContainers);

  shuffledValues = createDeckValues();
  shuffledSuits = createDeckSuits();

  initialTurn(shuffledValues, shuffledSuits);

  let dealerStartIndex = 0;
  let dealerEndIndex = 5;
  let playerStartIndex = 5;
  let playerEndIndex = 10;

  let dealerCardValue = getCardValues(cardContainers, dealerStartIndex, dealerEndIndex);
  let playerCardValue = getCardValues(cardContainers, playerStartIndex, playerEndIndex);

  let dealerSum = checkForBlackjack(dealerCardValue);
  let playerSum = checkForBlackjack(playerCardValue);

  const win = winConditionCheck(dealerSum, playerSum);
  if (win == true) {
    return;
  } else if (win == false) {
    return;
  } else {
    playerTurn(playerSum, playerCardValue, shuffledValues, shuffledSuits, false, message, numberOfRounds);
  }
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
    ["two", "hit", "hit", "hit", "hit", "two", "two", "two", "two", "two"],
    ["one", "one", "one", "one", "one", "one", "one", "one", "two", "one"],
    ["one", "one", "one", "one", "one", "one", "one", "one", "one", "one"],
    ["one", "one", "one", "one", "one", "one", "one", "one", "one", "one"]
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

// create card asset
function createCard(cardSuit, cardValue, cardContainer) {
  const topLeftSymbol = document.createElement("div");
  const middleSymbol = document.createElement("div");
  const bottomRightSymbol = document.createElement("div");

  topLeftSymbol.setAttribute("class", "top-left-symbol");
  middleSymbol.setAttribute("class", "middle-symbol");
  bottomRightSymbol.setAttribute("class", "bottom-right-symbol");

  cardContainer.setAttribute("value", cardValue);
  
  if (cardSuit == "Hearts" || cardSuit == "Diamonds") {
    topLeftSymbol.innerHTML = "<span style='color:red'>" + String(cardValue) +"</span><br><span style='color:red'><i class='fab fa-d-and-d'></i></span>";
    middleSymbol.innerHTML = "<span class='hearts' style='color: red'><i class='fab fa-d-and-d'></i></span>";
    bottomRightSymbol.innerHTML = "<span style='color:red'>" + String(cardValue) +"</span><br><span style='color:red'><i class='fab fa-d-and-d'></i></span>";
  } else if (cardSuit == "Spades" || cardSuit == "Clubs") {
    topLeftSymbol.innerHTML = "<span style='color:black'>" + String(cardValue) +"</span><br><span style='color:black'><i class='fab fa-d-and-d'></i></span>";
    middleSymbol.innerHTML = "<span class='hearts' style='color: black'><i class='fab fa-d-and-d'></i></span>";
    bottomRightSymbol.innerHTML = "<span style='color:black'>" + String(cardValue) +"</span><br><span style='color:black'><i class='fab fa-d-and-d'></i></span>";
  } 

  cardContainer.appendChild(topLeftSymbol);
  cardContainer.appendChild(middleSymbol);
  cardContainer.appendChild(bottomRightSymbol);
}


// show only the backside of the card
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

// array of first two cards
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


// checks for blackjack
function checkForBlackjack(cardValueList) {
  let sum = 0;
  let cardValue = 0;

  for (let i = 0; i < cardValueList.length; i++) {
    if (cardValueList[i] == "J" || cardValueList[i] == "Q" || cardValueList[i] == "K") {
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
      return true;
    } else if (dealerSum == 21) {
      showFrontSide();
      message.innerHTML = "Dealer got Blackjack! Player <span style='color: red'>Loses!</span>";
      deductBank();
      return false;
    } else {
      message.innerHTML = "No automatic win on the initial play";
    }
  } else if (playerSum == dealerSum && playerSum == 21 && dealerSum == 21) {
    showFrontSide();
    message.innerHTML = "Tie! Player <span style='color: red'>loses</span> on ties.";
    deductBank();
    return;
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
function playerTurn(playerSum, playerCardValue, shuffledValues, shuffledSuits, aceBool, message, numberOfRounds) {
  console.log(playerSum);
  getDealerFaceCard(playerSum, playerCardValue, shuffledValues, shuffledSuits, aceBool, message, numberOfRounds);
}

function getDealerFaceCard(playerSum, playerCardValue, shuffledValues, shuffledSuits, aceBool, message, numberOfRounds) {
  console.log(numberOfRounds);
  if (numberOfRounds == 4) {
    return;
  }
  // get face card value
  const cardContainerList = document.querySelectorAll(".card-container");
  const dealerFaceCardValue = cardContainerList[0].getAttribute("value");


  // if playerHandContainsAce returns true then the player has a soft hand
  let softOrHardHand = playerHandContainsAce(playerCardValue);
  // player uses two different tables to determine whether to hit or stand
  if (softOrHardHand === true) {

    let softTableXIndex = determineSoftTableXIndex(playerSum);
    let softTableYIndex = determineSoftTableYIndex(dealerFaceCardValue);

    if (softTableXIndex === false || softTableYIndex === false) {
      console.log("Not valid index");
      return;
    }

    let softDecision = determineSoftDecision(softTableXIndex, softTableYIndex);
    console.log(softDecision);

    let numberOfCardsAway = determineHowManyCardsAwayFromCharlie(cardContainerList);
    console.log(numberOfCardsAway);

    if (numberOfCardsAway === 3) {
      console.log("hi");
    }

    switch (softDecision) {
      case "hit":
        hit(shuffledValues, shuffledSuits);
        let cardValueList = getCardValues(cardContainerList, 5, 10);
        let cardSum = checkForBlackjack(cardValueList);
        console.log(cardSum);
        if (aceBool == false) { // if 10 hasnt been taken off already
          if (cardSum > 21) {
            cardSum = cardSum - 10;
            console.log(cardSum);
            if (cardSum > 21) { // if card sum doesnt go under 21 then user loses
              message.innerHTML = "Player <span style='color: red'>loses</span>!";
              deductBank();
              return;
            } else {
              if (cardSum <= 21) {
                numberOfRounds = numberOfRounds + 1;
                getDealerFaceCard(cardSum, cardValueList, shuffledValues, shuffledSuits, true, message, numberOfRounds);
              }
            }
          } else {
            if (cardSum <= 21) {
              numberOfRounds = numberOfRounds + 1;
              getDealerFaceCard(cardSum, cardValueList, shuffledValues, shuffledSuits, true, message, numberOfRounds);
            }
          }
        }
        if (aceBool == true) {
          cardSum = cardSum - 10;
          console.log(cardSum);
          if (cardSum > 21) {
            message.innerHTML = "Player went over 21! Player <span style='color: red'>loses</span>!";
            deductBank();
            return;
          } else {
            if (cardValueList.length == 5) {
              message.innerHTML = "Player got 5 cards! Player <span style='color: red'>wins</span>!";
              gainBank();
              return;
            } else if (cardSum == 21) {
              //stand;
              return;
            } else if (cardSum <= 21) {
              numberOfRounds = numberOfRounds + 1;
              getDealerFaceCard(cardSum, cardValueList, shuffledValues, shuffledSuits, true, message, numberOfRounds);
            }
          }
        }
        // reset card value list
        // need to determine sum especially with multiple aces in
        // if the sum is greater than 21 then subtract 10 from the sum and set the ace bool to true
        // then check again if sum is greater than 21 
        break;
      case "stand":
        console.log("Stand");
        return;
      case "one":
        // hit(shuffledValues, shuffledSuits);
        // let cardValueList2 = getCardValues(cardContainerList, 5, 9);
        // let cardSum2 = checkForBlackjack(cardValueList2);
        // console.log(cardSum2);
        // if (aceBool == false) {
        //   if (cardSum2 == 21) {
        //     //stand;
        //     console.log("Player got 21");
        //     return;
        //   } else if (cardSum2 <= 21) {
        //     if (cardValueList2.length == 5) {
        //       message.innerHTML = "Player got 5 cards! Player <span style='color: red'>wins</span>!";
        //       gainBank();
        //       return;
        //     } else {
        //       if (cardSum2 <= 21) {
        //         getDealerFaceCard(cardSum2, cardValueList2, shuffledValues, shuffledSuits, true, message);
        //       }
        //     }
        //     return;
        //   } else if (cardSum2 > 21) {
        //     cardSum2 = cardSum2 - 10;
        //     console.log(cardSum2);
        //     if (cardSum2 > 21) { // if card sum doesnt go under 21 then user loses
        //       message.innerHTML = "Player went over 21! Player <span style='color: red'>loses</span>!";
        //       deductBank();
        //       return;
        //     } else {
        //       if (cardSum2 <= 21) {
        //         getDealerFaceCard(cardSum2, cardValueList2, shuffledValues, shuffledSuits, true, message);
        //       }
        //     }
        //   }
        // } else {
        //   cardSum2 = cardSum2 - 10;
        //   console.log(cardSum2);
        //   if (cardSum2 > 21) {
        //     message.innerHTML = "Player went over 21! Player <span style='color: red'>loses</span>!";
        //     deductBank();
        //     return;
        //   } else {
        //     if (cardValueList2.length == 5) {
        //       message.innerHTML = "Player got 5 cards! Player <span style='color: red'>wins</span>!";
        //       gainBank();
        //       return;
        //     } else if (cardSum2 == 21) {
        //       //stand;
        //       return;
        //     } else {
        //       if (cardSum2 <= 21) {
        //         getDealerFaceCard(cardSum2, cardValueList2, shuffledValues, shuffledSuits, true, message);
        //       }
        //     }
        //     return;
        //   }
        // }
        // console.log("One");
        // return;
      case "two":
        console.log("Two");
        return;
      default:
        return;
    }


  } else {
    return;
  }

}















function charlieCheck(cardValueList, playerSum) {

  let cardValue = 0;

  if (cardValueList == "J" || cardValueList == "Q" || cardValueList == "K") {
    cardValue = 10;
  } else if (cardValueList == "A") {
    // ace can either be 1 or 11, 11 is the default value, 1 is the value if the sum goes over 21 with 11
    if (playerSum < 11) {
      cardValue = 11;
    } else if (playerSum >= 11) {
      cardValue = 1;
    } else {
      console.log("Error at line 24!, checkValue.js");
    }
  } else {
    // if not an ace or 10 value
    cardValue = parseInt(cardValueList);
  }

  console.log(cardValue);
  return cardValue;
}

function determineSoftTableXIndex(playerSum) {
  switch(playerSum) {
    case 12:
      return 0;
    case 13:
      return 1;
    case 14:
      return 2;
    case 15:
      return 3;
    case 16:
      return 4;
    case 17:
      return 5;
    case 18:
      return 6;
    case 19:
      return 7;
    case 20:
      return 8;
    case 21:
      return 9;
    default:
      return 0;
  }
}

function determineSoftTableYIndex(dealerFaceCardValue) {
  switch(dealerFaceCardValue) {
    case "2":
      return 0;
    case "3":
      return 1;
    case "4":
      return 2;
    case "5":
      return 3;
    case "6":
      return 4;
    case "7":
      return 5;
    case "8":
      return 6;
    case "9":
      return 7;
    case "10":
    case "J":
    case "K":
    case "Q":
      return 8;
    case "A":
      return 9;
    default:
      return false;
  }
}

function determineSoftDecision(softTableXIndex, softTableYIndex) {
  const softTable = playerSoftTable();

  const softX = softTable[softTableXIndex];
  const decision = softX[softTableYIndex];

  return decision;
}

function determineHowManyCardsAwayFromCharlie(cardContainerList) {
  let numberOfCardsInHand = 0;

  // specific for player's card
  for (let i = 5; i < 9; i++) {
    if (cardContainerList[i].hasChildNodes() != false) {
      numberOfCardsInHand = numberOfCardsInHand + 1;
    } else {
      continue;
    }
  }

  return (5-numberOfCardsInHand);
}

function hit(newDeckValues, newDeckSuits) {
  const playerCard3 = document.querySelector("#player3");
  const playerCard4 = document.querySelector("#player4");
  const playerCard5 = document.querySelector("#player5");

  let playerCardValue = newDeckValues.pop();
  let playerCardSuit = newDeckSuits.pop()

  if (playerCard3.hasChildNodes() === false) {
    createCard(playerCardSuit, playerCardValue, playerCard3);
    return;
  }
  if (playerCard4.hasChildNodes() === false) {
    createCard(playerCardSuit, playerCardValue, playerCard4);
    return;
  }
  if (playerCard5.hasChildNodes() === false) {
    createCard(playerCardSuit, playerCardValue, playerCard5);
    return;
  }
}

function stand() {

}

function playerHandContainsAce(playerCardValue) {
  let numberOfAces = 0;
  for (let i = 0; i < playerCardValue.length; i++) {
    if (playerCardValue[i] === "A") {
      return true;
    } else {
      continue;
    }
  }

  return false;
}

function dealerTurn() {

}

function checkIfOver21(playerSum) {
  console.log(playerSum);
  if (playerSum > 21) {
    return true;
  } else {
    return false;
  }
}