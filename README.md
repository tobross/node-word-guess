# node-word-guess
node constructor word guess

This is a node based word guessing game like hangman. This game is rennaisance fantasy themed.

In this game, a user will Give their name, then be given a random word to guess the letters of. They will be told only how long the word is.

They will then use the keyboard to enter 1 letter at a time and the game will keep track of letters that have been used already.

The user stars with 10 "lives" and each time they guess an incorrect letter, that number will decrement until finally, the user reaches 0 and the game ends, prompting the user to play again.

Any letter, once guessed, cannot be guessed again to the benefit of the user.

Current bugs:

The program knows how many letters exist inside a word, but does not display them correctly. A minor error in syntax no doubt.

Due to this first error, the user can not tell where in the span of their word the correctly guessed letters are. So the game becomes exponentially harder.