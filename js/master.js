let container = document.createElement("div");
container.className = "container";
document.body.appendChild(container);
let gameInfo = document.createElement("div");
gameInfo.className = "game-info";
container.appendChild(gameInfo);
let gameName = document.createElement("div");
gameName.className = "game-name";
gameName.innerHTML = "Hangman Game";
gameInfo.appendChild(gameName);
let category = document.createElement("div");
category.className = "category";
category.innerHTML = "Word From: ";
gameInfo.appendChild(category);
let span = document.createElement("span");
category.appendChild(span);
let hr1 = document.createElement("hr");
container.appendChild(hr1);
let row = document.createElement("div");
row.className = "row";
container.appendChild(row);
let hangmanDrawHtml = document.createElement("div");
hangmanDrawHtml.className = "hangman-draw";
row.appendChild(hangmanDrawHtml);
let theDraw = document.createElement("div");
theDraw.className = "the-draw";
hangmanDrawHtml.appendChild(theDraw);
let theStand = document.createElement("div");
theStand.className = "the-stand";
theDraw.appendChild(theStand);
let theHang = document.createElement("div");
theHang.className = "the-hang";
theDraw.appendChild(theHang);
let theRope = document.createElement("div");
theRope.className = "the-rope";
theDraw.appendChild(theRope);
let theMan = document.createElement("div");
theMan.className = "the-man";
theDraw.appendChild(theMan);
let head = document.createElement("div");
head.className = "head";
theMan.appendChild(head);
let body = document.createElement("div");
body.className = "body";
theMan.appendChild(body);
let hands = document.createElement("div");
hands.className = "hands";
theMan.appendChild(hands);
let legs = document.createElement("div");
legs.className = "legs";
theMan.appendChild(legs);
let lettersHtml = document.createElement("div");
lettersHtml.className = "letters";
row.appendChild(lettersHtml);
let hr2 = document.createElement("hr");
container.appendChild(hr2);
let lettersGuess = document.createElement("div");
lettersGuess.className = "letters-guess";
container.appendChild(lettersGuess);

const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let letterText = document.createTextNode(letter);
    span.className = "letter-box";
    span.appendChild(letterText);
    lettersContainer.appendChild(span);
});

// Object Of Words + Category
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get Random Property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randompropValue = words[randomPropName];
let randomvValueNumber = Math.floor(Math.random() * randompropValue.length);
let randomValueValue = randompropValue[randomvValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName;
let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement("span");
    if (letter === " ") {
        emptySpan.className = "has-space";
    };
    lettersGuessContainer.appendChild(emptySpan);
});

let guessSpan = document.querySelectorAll(".letters-guess span");
let wrongAttemps = 0;
let hangmanDraw = document.querySelector(".hangman-draw");

// Handel Clicking On Letters
document.addEventListener('click', (e) => {
    let status = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        console.log(theChosenWord);
        theChosenWord.forEach((wordLetter, WordIndex) => {
            if (theClickedLetter == wordLetter) {
                status = true;
                guessSpan.forEach((span, spanIndex) => {
                    if (WordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                    };
                });
            };
        });
        // If Letter Is Wrong
        if (status !== true) {
            wrongAttemps++;
            hangmanDraw.classList.add(`wrong-${wrongAttemps}`);
            document.getElementById("fail").play();
            if (wrongAttemps === 8) {
                endGame();
                lettersContainer.classList.add("finished");
            };
        } else {
            document.getElementById("success").play();
        };
    };
});

// End Game Function
function endGame() {
    let div = document.createElement("div");
    div.className = "popup";
    let divText = document.createTextNode(`Game Over, The Word Is "${randomValueValue}"`);
    let btnAgain = document.createElement("button");
    btnAgain.className = "btn-again";
    btnAgain.innerHTML = "Play Again";
    div.appendChild(divText);
    div.appendChild(btnAgain);
    document.body.appendChild(div);
    document.getElementById("game-over").play();
    btnAgain.addEventListener("click", () => {
        window.location.reload();
    });
};