//pulls constructor information from letter.js to make words appear correctly.
var letter = require("./letter");
//constructs words based on input and functions to create blank spaces for letters that have not been guessed.
var word = function (anyWord) {
    this.anyWord = anyWord;
    this.letters = [];
    this.blanks = [];
    this.breakWord = function () {
        this.letters = this.anyWord.split("");
        // console.log(this.letters);
        blanksNeeded = this.letters.length;
        // console.log("Blanks: " + blanksNeeded);
        // for (var i = 0; i < blanksNeeded; i++) {
        //     this.blanks.push("_ ");
        // }
    }
    console.log(this.blanks.join(" "));
    this.populateLetters = function () {
        for (i = 0; i < this.letters.length; i++) {
            this.letters[i] = new letter(this.letters[i]);
            //     this.letters[i].guessedLetter = true;
            //     console.log(this.letters[i]);
            // }
            this.letters[i].showLetter();
        }
    }
}

// var spoot = new word("Norbert");
// spoot.breakWord();
// spoot.populateLetters();

module.exports = word;