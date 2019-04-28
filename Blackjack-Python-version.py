import os
import random

decks = input("Enter number of decks to use: ")

# user chooses number of decks of cards to use
deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]*(int(decks)*4)

# initialize scores
wins = 0
losses = 0
draws = 0

def deal(deck):
    hand = []
    for i in range(2):
        random.shuffle(deck)
        card = deck.pop()
        if card == 11:
            card = "J"
        if card == 12:
            card = "Q"
        if card == 13:
            card = "K"
        if card == 14:
            card = "A"
        hand.append(card)
    return hand

def play_again():
    global deck
    dealer_hand = []
    player_hand = []
    deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]*4
    return

def total(hand):
    total = 0
    for card in hand:
        if card == "J" or card == "Q" or card == "K":
            total+= 10
        elif card == "A":
            if total >= 11: total+= 1
            else: total+= 11
        else: total += card
    return total

def hit(hand):
    card = deck.pop()
    if card == 11:
        card = "J"
    if card == 12:
        card = "Q"
    if card == 13:
        card = "K"
    if card == 14:
        card = "A"
    hand.append(card)
    return hand

def clear():
    if os.name == 'nt':
        os.system('CLS')
    if os.name == 'posix':
        os.system('clear')

def print_results(dealer_hand, player_hand):
    print ("The dealer has a " + str(dealer_hand) + " for a total of " + str(total(dealer_hand)))
    print ("You have a " + str(player_hand) + " for a total of " + str(total(player_hand)))

def blackjack(dealer_hand, player_hand):
    global wins
    global losses
    if total(player_hand) == 21:
        print_results(dealer_hand, player_hand)
        print ("Congratulations! You got a Blackjack!\n")
        wins += 1
        return True
    elif total(dealer_hand) == 21:
        print_results(dealer_hand, player_hand)
        print ("Sorry, you lose. The dealer got a blackjack.\n")
        losses += 1
        return True
    return False

def score(dealer_hand, player_hand):
        global wins
        global losses
        global draws
        if total(player_hand) == 21:
            print_results(dealer_hand, player_hand)
            print ("Congratulations! You got a Blackjack!\n")
            wins += 1
        elif total(dealer_hand) == 21:
            print_results(dealer_hand, player_hand)
            print ("Sorry, you lose. The dealer got a blackjack.\n")
            losses += 1
        elif total(player_hand) > 21:
            print_results(dealer_hand, player_hand)
            print ("Sorry. You busted. You lose.\n")
            losses += 1
        elif total(dealer_hand) > 21:
            print_results(dealer_hand, player_hand)
            print ("Dealer busts. You win!\n")
            wins += 1
        elif total(player_hand) < total(dealer_hand):
            print_results(dealer_hand, player_hand)
            print ("Sorry. Your score isn't higher than the dealer. You lose.\n")
            losses += 1
        elif total(player_hand) > total(dealer_hand):
            print_results(dealer_hand, player_hand)
            print ("Congratulations. Your score is higher than the dealer. You win\n")
            wins += 1
        else:
            print_results(dealer_hand, player_hand)
            print("Deal.")
            draws += 1

def game():
    global wins
    global losses
    global draws

    print("\n    WELCOME TO BLACKJACK!\n")
    quit=False
    i = 0
    
    while not quit:
        i += 1
        new_game = False
        
        print("-"*30+"\n")
        print("    WINS: %s   LOSSES: %s   DRAWS: %s\n" % (wins, losses,draws))
        print("-"*30+"\n")
        
        dealer_hand = deal(deck)
        player_hand = deal(deck)
        
        print ("The dealer is showing a " + str(dealer_hand[0]))
        print ("You have a " + str(player_hand) + " for a total of " + str(total(player_hand)))
        new_game = blackjack(dealer_hand, player_hand)

        if not new_game:
            while total(player_hand) < 17:
                print('Player Hit...')
                hit(player_hand)
                print(player_hand)
                print("Player hand total: " + str(total(player_hand)))
                if total(player_hand) > 21:
                    print('You busted')
                    losses += 1
                    new_game = True
        if not new_game:
            while total(dealer_hand) < 17:
                print('Dealer Hit...')
                hit(dealer_hand)
                print(dealer_hand)
                print('Dealer hand total: ' + str(total(dealer_hand)))
                if total(dealer_hand) > 21:
                    print('Dealer busts, you win!')
                    wins += 1
                    new_game = True
            if not new_game:
                score(dealer_hand, player_hand)
        if i == 100:
            quit = True
        else:
            play_again()
    print("-"*30+"\n")
    print("    WINS: %s   LOSSES: %s   DRAWS: %s\n" % (wins, losses,draws))
    print("-"*30+"\n")
    print('Total games: %s)' %(wins + losses + draws))

if __name__ == "__main__":
   game()
