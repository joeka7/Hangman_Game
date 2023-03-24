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
    "ruby",
];

let answer = "";
let maxWrong = 6;
let mistakes = 0;
let gussed = [];

function randomWord() {
    answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
};

function generateButtons() {
    let buttonsHTML = "abcdefghijklmnopqrstuvwxyz";
    let buttonsHTMLArray = Array.from(buttonsHTML);
    buttonsHTMLArray.forEach(letter => {
        let button = document.createElement("button");
        let buttonText = document.createTextNode(letter);
        button.className = "btn btn-lg btn-primary m-2";
        button.id = letter;
        button.appendChild(buttonText);
        document.getElementById("keyboard").appendChild(button);
    });
};
randomWord();
generateButtons();