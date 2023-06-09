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
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

document.getElementById("maxWrong").innerHTML = maxWrong;

function randomWord() {
  answer = programming_languages[Math.floor(Math.random() * programming_languages.length)].toUpperCase();
};
randomWord();

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('').map(letter =>
    `
        <button
            class="btn btn-lg btn-primary m-2"
            id='` + letter + `'
            onClick="handleGuess('` + letter + `')"
        >
            ` + letter + `
        </button>
    `).join('');
    document.getElementById('keyboard').innerHTML = buttonsHTML;
};
generateButtons();

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
};
guessedWord();

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWin();
        document.getElementById("success").play();
    } else if (answer.indexOf(chosenLetter) >= -1) {
        document.getElementById("wrong").play();
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    };
};
handleGuess();

function updateMistakes() {
    document.getElementById("mistakes").innerHTML = mistakes;
};

function checkIfGameWin() {
    if (wordStatus === answer) {
        document.getElementById("keyboard").innerHTML = "You Win!!!";
        document.getElementById("winGame").play("");
    };
};

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById("wordSpotlight").innerHTML = `The answer was ${answer}`;
        document.getElementById("keyboard").innerHTML = "You Lost!!!";
        document.getElementById("lostGame").play();
    };
};

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById("hangmanPic").src = "imgs/0.jpg";
    randomWord();
    guessedWord();
    generateButtons();
    updateMistakes();
};
reset();

function updateHangmanPicture() {
    document.getElementById("hangmanPic").src = 'imgs/' + mistakes +'.jpg';
};