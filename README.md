# AI-Blackjack

# Overview
AI-Blackjack is a web-based game that focuses on creating a player AI based off of two data tables (hard and soft hands). This version of Blackjack is specifically geared around the "Charlie Rule". 

# Instructions to run
1. Download the files (index.html, index.css, and game.js)
2. Save the files
3. Once the first two steps are completed, double click on index.html
4. Once the index.html page is shown there will be a button named "NEW GAME", click on this button to start the game

# External Libraries/ Stylesheets Used
For this project we used icons from FontAwesome and a font from Google fonts.
We included these two libraries through CDNs.

# Functional Description of main files
<h2><b>index.html</b></h2>
This file defines the primary structure of the web page shown to the user. 
<br>
<h2><b>index.css</b></h2>
This file defines the aesthetic of the elements shown and the formatting of the web page. 
<h2><b>game.js</b></h2>
This file contains all the necessary functions for the game to run. There are 4 man phases that the game can go through.
The 4 main phases can be broken down into the initial turn, player's turn, dealer's turn, and result calculation.
In the initial turn both players are given two cards and if only one of the player has a Blackjack then they automatically win. However, in an event of a tie the dealer will always win. If neither player wins on the initial turn we move onto the player's turn. In the player's turn 
the algorithm determines whether the player has a soft or hard hand. Depending on the type of hand the algorithm chooses either to use the hard table or soft table to make decisions. If the player does not bust on their turn then the algorithm will move onto the dealer's turn. In the dealer's turn the algorithm will decide whether to hit or stand based on if the total of their hand is at least 17. If the dealer does not go over 21 then the sum of the player's hand and dealer's hand are compared to each other. If the player's hand is greater than the dealer's hand then the player wins. If the dealer's hand is greater than the player's hand then the dealer wins. If there is a tie then the dealer wins.
    
