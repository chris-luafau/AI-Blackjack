
 // @constructor

function Card(value, suit) {

    this.suit = -1;
    this.value = -1;

    if (arguments.length >= 2)
       this.set(arguments[0], arguments[1]);

}

Card.ACE = 1;
Card.JACK = 11;
Card.QUEEN = 12;
Card.KING = 13;
Card.CLUB = 1;
Card.DIAMOND = 2;
Card.SPADE = 4;
Card.HEART = 3;

// Erase card;
Card.prototype.clear = function() {
   this.suit = -1;
   this.value = -1;
}

// Set value and suit of card.
Card.prototype.set = function (value, suit) {
   if (arguments.length < 2)
      throw "The set function requires two arguments.";
   var v = Math.round(Number(value));
   var s = Math.round(Number(suit));
   if ( ! (v >- 1 && v <= 13) )
      throw "The value of a card must be in the range 1 to 13.";
   if ( ! (s >= 1 && s <= 4) )
      throw "The suit of a card must be 1, 2, 3, or 4.";
   this.suit = s;
   this.value = v;
}

// Return string value of a card.
Card.prototype.toString = function() {
    if (this.value == -1)
       return "(Card not shown)";
    var s = "";
    switch (this.value) {
       case 1: s += "Ace"; break;
       case 11: s += "Jack"; break;
       case 12: s += "Queen"; break;
       case 13: s += "King"; break;
       default: s += this.value; break;
    }
    s += " of ";
    switch (this.suit) {
       case 1: s += "Clubs"; break;
       case 2: s += "Diamonds"; break;
       case 3: s += "Hearts"; break;
       case 4: s += "Spades"; break;
    }
    return s;
}

// Construct a deck of 52 cards.
function Deck() {
   this.deck = new Array(52);
   this.count = 52;
   var c = 0;
   for (var i = 1; i <= 4; i++)
      for (var j = 1; j <= 13; j++)
         this.deck[c++] = new Card(j,i);
}

// Shuffle deck.
Deck.prototype.shuffle = function() {
   for (var i = 51; i > 0; i--) {
       var r = Math.floor((i+1)*Math.random(i));
       var temp = this.deck[r];
       this.deck[r] = this.deck[i];
       this.deck[i] = temp;
   }
   this.count = 52;
}

// Draw card.
Deck.prototype.drawCard = function() {
   if (this.count == 0)
      throw "Deck is out of cards";
   return this.deck[--this.count];
}
