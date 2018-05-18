// constructs each individual letter as either a visible guessed letter or a blank space.

var letter = function(character) {
    this.character = character.toUpperCase();
    this.guessedLetter = false;
    this.showLetter = function() {
        if (this.guessedLetter) {
            console.log(this.character);
        }
        else {
            console.log("_");
        }
    }
}

// make this constructor visible to other files by exporting contents and expecting an import command to create the link.
module.exports = letter