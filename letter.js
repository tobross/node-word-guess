// constructs each individual letter as either a visible guessed letter or a blank space.

var Letter = function(character) {
    this.character = toUpperCase();
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
module.exports = Letter