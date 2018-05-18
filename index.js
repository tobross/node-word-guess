var word = require("./word.js");
var inquirer = require("inquirer");
var isLetter = require("is-letter");

var userGuessedLetter = false;
var wordBank = ["Sword", "Shield", "Lance", "Fireball", "Barbute", "Chainmail", "Portal", "Mythos", "Viking", "Battleaxe"];

var rando;
var currentWord;
var win = 0;
var lose = 0;
var lives = 10;
var userGuess = "";
var guessedLetters = "";
var guessedArr = [];
var blanksFilled = 0;
var deco = "\n" + "====================================================================" + "\n";
var instructions = deco + "INSTRUCTIONS" + deco + "When prompted, press any letter (a-z) on the keyboard to guess." + "\n" +
"When you guess a letter, your choice is deemed right or wrong." + "\n" +
"If wrong, the letter you guessed does not appear in the word" + "\n" + 
"For every wrong guess, the number of guesses remaining decrease by 1." + "\n" +
"If right, the letter you guessed appears on screen in it's place." + "\n" +
"If you correctly guess all the letters in the word before the number of guesses remaining reaches 0, you win." + "\n" +
"If you run out of guesses before the entire word is revealed, you lose. Game over." + "\n" + deco + "Exit any time with Ctrl + C (Cmd + C for Mac users" + deco;

function confirmStart() {
    var ready = [
        {
            type: 'text',
            name: 'player',
            message: 'Who is playing?'
        },
        {
           type: 'confirm',
           name: 'begin',
           message: 'Shall we begin?',
           default: true
         }
       ];
       inquirer.prompt(ready).then(answers=>{
           if (answers.begin) {
               console.log(deco + "Excellent! " + answers.player + ", let's begin!");
               start();
           }
           else {
               console.log(deco + "No time for games today, I see... be well " + answers.player);
               return;
           }
       });
};

function start() {
    lives = 10;
    randomize();
    guessedLetters = "";
    guessedArr = [];
}
function randomize() {
    rando = wordBank[Math.floor(Math.random()*wordBank.length)].toUpperCase();
    currentWord = new word(rando);
    console.log(deco + "The answer is " + currentWord.length + " letters." + deco);
    console.log("Goal: ");
    currentWord.breakWord();
    currentWord.populateLetters();
    letterGuess();
}
function letterGuess(){
    if (blanksFilled < currentWord.letters.length && lives > 0) {
        inquirer.prompt([
            {
                name: "letter",
                message: "Pick a letter",
                validate: function(value) {
                    if(isLetter(value)){
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        ]).then(function(guess){
            var answerLetter = guess.letter.toUpperCase();
            console.log("You chose: " + answerLetter);
            userGuessedLetter = false;
            if (guessedArr.indexOf(answerLetter) > -1) {
                console.log(deco + "You cannot chose a letter that has already been chosen!" + deco);
                gameEnd();
            }
            else if (guessedArr.indexOf(answerLetter) === -1) {
                guessedLetters = guessedLetters.concat(" " + answerLetter);
                guessedArr.push(answerLetter);
                console.log("Guessed Letters so far: " + guessedLetters);
                for (i = 0; i < currentWord.letters.length; i++) {
                    if (answerLetter === currentWord.letters[i].character && currentWord.letters[i].guessedLetter === false) {
                        currentWord.letters[i].guessedLetter === true;
                        userGuessedLetter = true;
                        currentWord.blanks[i] = answerLetter;
                        blanksFilled++
                    }
                }
                console.log("Goal: ");
                currentWord.breakWord();
                currentWord.populateLetters();
                if (userGuessedLetter) {
                    console.log(deco+"Good Guess!"+deco);
                    gameEnd();
                }
                else {
                    console.log(deco+"Guess better next time!"+deco);
                    lives--;
                    console.log("You have "+lives+" guesses remaining, tread carefully!"+deco);
                    gameEnd();
                }
            }
        });
    }
}
function gameEnd() {
    if (lives === 0) {
        console.log(deco +"Better luck next time!" + deco + "The correct answer was " + rando);
        lose++;
        console.log(deco + "Wins: "+win);
        console.log(deco);
        console.log("Losses: "+lose+ deco);
        again();
    }
    else if (blanksFilled === currentWord.letters.length) {
        win++;
        console.log("CONGRATULATIONS! You guessed the word!");
        console.log(deco +"The word was " + rando + "!" + deco);
        console.log("Current Wins: "+win);
        console.log("Current Losses: "+lose+deco+"\n");

        again();
    } 
    else {
        letterGuess("");
    }
}
function again() {
    var playAgain = [
        {
            type: "confirm",
            name: "again",
            message: "Do you want to continue playing?",
            default: true
        }
    ];
    inquirer.prompt(playAgain).then(userWantsTo => {
        if (userWantsTo.again){
            guessedLetters = "";
            guessedArr = [];
            blanksFilled = 0;
            console.log("Excellent! I'll reset the board!");
            start();
        }
        else {
            console.log("Very well... Good bye, "+"!");
            return;
        }
    });
}
confirmStart();