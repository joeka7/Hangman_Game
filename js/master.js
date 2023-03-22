const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
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
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters  Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {
    // Create Empty Span
    let emptySpan = document.createElement("span");
    if (letter === " ") {
        // Add Class To The Span
        emptySpan.className = "has-space";
    };
    // Append Span To The Letters Guess Container
    lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attemps
let wrongAttemps = 0;

// Select the Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
    // Set The Chose Status
    let theStatus = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        // The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        theChosenWord.forEach((wordLetter, Wordindex) => {
            // If The Clicked Letter Equal To One Of The Chosen Word Letter 
            if (theClickedLetter == wordLetter) {
                // Set Status To Correct
                theStatus = true;
                // Loop On All Guess Spans
                guessSpans.forEach((span, spanindex) => {
                    if (Wordindex === spanindex) {
                        span.innerHTML = theClickedLetter
                    }
                });
            };
        });
        // If Letter Is Wrong
        if (theStatus !== true) {
            // Increase The Wrong Attempts
            wrongAttemps++;
            // Add Class Wrong  On The Draw Element
            theDraw.classList.add(`wrong-${wrongAttemps}`);
            // Play Fail Sound
            document.getElementById("fail").play();
            if (wrongAttemps === 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }
        } else {
            // Play success Sound
            document.getElementById("success").play();
        };
    };
});

// End Game Function
function endGame() {
    // Create Popup Div
    let div = document.createElement("div");
    // Create text
    let divText = document.createTextNode(`Game Over, The Word Is "${randomValueValue}"`);
    // Append Text to Div
    div.appendChild(divText);
    // Add Class On Div
    div.className = "popup";
    // Append To The Body
    document.body.appendChild(div);
    // Play Game Over Sound
    document.getElementById("game-over").play();
};