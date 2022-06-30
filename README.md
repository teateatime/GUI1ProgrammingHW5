# GUI1ProgrammingHW5

Overview:
-----------------------
The program or website rather is basically a watered down version of the normal family game of Scrabble
where instead of implementing a word on a huge board which is 15 by 15, were only trying to fit a word
into 1 single board line of the game based on the tiles that we are randomly given by the computer.

Features:
-----------------------
The letter tiles are randomly selected by the computer until it generates 7 tiles for the user and for each
particular tile the amount remaining for that tile decreases each time it is randomly selected and once that amount reaches zero, the computer keeps on finding a tile that has a tile left.

Used an associative array based on the one given in the pdf by a previous student, added a couple modifications
to help with my particular issues that I have encountered.
And a for loop that starts out from zero to 7 so I can randomly generate tiles.

Also enables restart capabilities and continue on playing and adding more to your total score.

Write-Up
------------------------

•(4) letter tiles in the player’s “hand” are selected randomly from a data structure with the proper 
distribution of the letters. -> Currently/Fully Working -> Used .random() and an associative array
to keep track of how many tiles of that letters are left while randomly choosing one

• (4) letter tiles can be dragged-and-dropped onto target Scrabble squares.
-> Currently/Fully Working -> Used the drop and drag implementation from jQuery UI

• (4) program identifies which letter tile is dropped onto which Scrabble square.
-> Currently/Fully Working -> Have an array and variable to keep track of what letter that was last used and
the drop_tile number that the user put in

• (4) board includes bonus squares.
-> Currently/Fully Working -> Have a condition where if tile is placed on the bonus squares, add more points to
the score based on the bonuses

• (4) score is tallied correctly, including consideration of bonus square multiplier.
-> Currently/Fully Working -> Based on the example given in Piazza and in class

• (3) any number of words can be played until the player wishes to quit or depletes all tile.
-> Currently/Fully Working -> When user clicks Submit Word it clears up the board so that users can play more words for the next round until the tile amount reaches 0

• (3) the board is cleared after each round so that a new word can be played.
-> Currently/Fully Working -> When user clicks Submit Word it clears up the board so that users can play more words for the next round

• (3) after playing a word, only the number of letter tiles needed to bring the player’s “hand” back 
to 7 tiles are selected.
-> Currently/Fully Working -> I had a variable to keep track of how many tiles was used in that round and
replaced the tiles used and append it with the unused tiles and put them back to the rack

• (3) score is kept for multiple words until the user restart a new game.
-> Currently/Fully Working -> Have a variable called total sum that pretty much gets added from the previous round sum when user hits Submit Word button

• (2) Tiles can only be dragged from the “rack” to Scrabble board. If the user drop them anywhere 
else, they will be bounced back to the “rack”.
-> Currently/Fully Working -> Used the revert handler and set it to invalid so that if the drag tiles are not in the drop targets, it goes back to its original position

• (2) Once the tile is placed on the Scrabble board, it can not be moved.
-> Currently/Fully Working -> After I dropped the tile into the drop target I immediately set the .draggable for that drag tile to disable so it would no longer be draggable once in drop tile

• (2) Except for the first letter, all sub-subsequent letters must be placed directly next to or below 
another letter with no space. Else, they will bounce back to the “rack”.
-> Not working -> Failed to implement it

• (2) user can always restart the game.
-> Currently/Fully Working -> Have a button called restart to allow the user to start a new game and replenish all
the tiles back to their original amounts

Other Stuff
--------------------

One other issue is that when the user puts in more than one tile at the same drop_tile, the last tile is not reverted back to its original position and the drop tile still accepts it.
(Currently being worked on)

https://teateatime.github.io/GUI1ProgrammingHW5/

https://github.com/teateatime/GUI1ProgrammingHW5