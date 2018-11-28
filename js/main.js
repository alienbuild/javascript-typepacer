window.addEventListener('load', init);

// Globals

// Levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
};

// Change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

// Static Words
const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition'
];

// Init game
function init(){
    // Show seconds
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(words);
    // Start matching input
    wordInput.addEventListener('input', startMatch);
    // Call countdown
    setInterval(countdown, 1000);
    // Check status
    setInterval(checkStatus, 50);
}

// Pick & show random word
function showWord(words){
    // Generate random index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
}

function startMatch(){
    if(matchWords()){
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    // If score is -1 display 0
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    } else{
        scoreDisplay.innerHTML = score;
    }
}

// Match words from input
function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'Correct!';
        return true;
    } else{
        message.innerHTML = '';
        return false;
    }
}

// Countdown
function countdown() {
    // Check time left
    if(time > 0) {
        time--;
    }else if(time === 0){
        // Game over
        isPlaying = false;
    }
    // Show timer
    timeDisplay.innerHTML = time;
}

// Check status
function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = 'Game over!';
        score = -1;
    }
}