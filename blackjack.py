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

def choice(dealer_hand, player_hand):
    # Return True if player should hit, False otherwise.
    p_hand_total = total(player_hand)
    dealer_face_up = dealer_hand[0]
    if (p_hand_total <= 15):
        return True
    elif (p_hand_total >= 14 and p_hand_total <= 16):
        if (dealer_face_up == 5 or dealer_face_up == 6):
            return False
        return True
    elif (p_hand_total == 17 and dealer_face_up == 'A'):
        return True
    else:
        return False

def clear():
    if os.name == 'nt':
        os.system('CLS')
    if os.name == 'posix':
        os.system('clear')

def blackjack(dealer_hand, player_hand):
    global wins
    global losses
    global draws
    if total(player_hand) == 21:
        if total(dealer_hand) == 21:
            draws += 1
        else:
           wins += 1
        return True
    elif total(dealer_hand) == 21:
        losses += 1
        return True
    return False

def score(dealer_hand, player_hand):
        global wins
        global losses
        global draws
        if total(player_hand) == 21:
            if total(dealer_hand) == 21:
                draws += 1
            else:
               wins += 1
        elif total(dealer_hand) == 21:
            losses += 1
        elif total(player_hand) > 21:
            losses += 1
        elif total(dealer_hand) > 21:
            wins += 1
        elif total(player_hand) < total(dealer_hand):
            losses += 1
        elif total(player_hand) > total(dealer_hand):
            wins += 1
        else:
            draws += 1
def game():
    global wins
    global losses
    global draws

    wins25 = wins50 = wins75 = 0
    losses25 = losses50 = losses75 = 0
    draws25 = draws50 = draws75 = 0

    print("\n    WELCOME TO BLACKJACK!\n")
    quit=False
    i = 0
    print('Starting game %s' %(str(1)))
    
    while not quit:
        i += 1
        new_game = False

        if i % 10000 == 0:
            print('Starting game %s' %(i))

        dealer_hand = deal(deck)
        player_hand = deal(deck)

        new_game = blackjack(dealer_hand, player_hand)
        p_choice = ''
        
        if not new_game:
            while choice(dealer_hand, player_hand):
                hit(player_hand)
                if total(player_hand) > 21:
                    losses += 1
                    new_game = True

        if not new_game:
            while total(dealer_hand) < 17:
                hit(dealer_hand)
                if total(dealer_hand) > 21:
                    wins += 1
                    new_game = True
            if not new_game:
                score(dealer_hand, player_hand)
                
        if i == 100000:
            quit = True
            
        else:
            if i == 25000:
                wins25 = wins
                losses25 = losses
                draws25 = draws
            elif i == 50000:
                wins50 = wins
                losses50 = losses
                draws50 = draws
            elif i == 75000:
                wins75 = wins
                losses75 = losses
                draws75 = draws

            play_again()
            
    total_games = wins + losses + draws
    print('Total games: %s' %(total_games))

    print('\n25,000 games played results: ')
    print('Win-rate: ' + str(wins25/25000))
    print('Loss-rate: ' + str(losses25/25000))
    print('Draw-rate: ' + str(draws25/25000))

    print('\n50,000 games played results: ')
    print('Win-rate: ' + str(wins50/50000))
    print('Loss-rate: ' + str(losses50/50000))
    print('Draw-rate: ' + str(draws50/50000))

    print('\n75,000 games played results: ')
    print('Win-rate: ' + str(wins75/75000))
    print('Loss-rate: ' + str(losses75/75000))
    print('Draw-rate: ' + str(draws75/75000))

    print('\n100,000 games played results: ')
    print('Win-rate: ' + str(wins/total_games))
    print('Loss-rate: ' + str(losses/total_games))
    print('Draw-rate: ' + str(draws/total_games))

    average_win = ((wins25/25000) + (wins50/50000) + (wins75/75000) + (wins/total_games)) / 4
    print('\nAverage win-rate: %s' %(str(average_win)))

    average_loss = ((losses25/25000) + (losses50/50000) + (losses75/75000) + (losses/total_games)) / 4
    print('Average loss-rate: %s' %(str(average_loss)))

    average_draw = ( (draws25/25000) + (draws50/50000) + (draws75/75000) + (draws/total_games)) / 4
    print('Average draw-rate: %s' %(str(average_draw)))


if __name__ == "__main__":
   game()
