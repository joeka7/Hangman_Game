var programming_languages = [
    "python",
	"javascript",
	"mongodb",
	"json",
	"java",
	"html",
	"css",
	"c",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
	"ruby"
];

let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatues = null;

function randomLanguage() {
    answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
};
randomLanguage();

function generateButtons() {
    let buttonHTML = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("").map(letter => 
            `
                <button 
                    class="btn btn-lg btn-primary m-2"
                    id="` + letter + `"
                    onClick="handleGuess('` + letter + `')"
                >
                    ` + letter + `
                </button>
            `
        ).join("");
        document.getElementById("keyboard").innerHTML = buttonHTML;
};
generateButtons();

document.getElementById("maxWrong").innerHTML = maxWrong;

function guessedWord() {
    wordStatues = answer.split("").map(letter => guessed.indexOf(letter) >= 0 ? letter : " _ ").join("");
    document.getElementById("wordSpotlight").innerHTML = wordStatues;
};
guessedWord();

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
    alert(answer);
    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
    };
};
handleGuess();