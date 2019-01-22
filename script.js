var guessInput = document.querySelector('.input-guess')
var submitButton = document.querySelector('.submit-button')
var clearButton = document.querySelector('.clear-button')
var resetButton = document.querySelector('.reset-button')
var gameData = {rangeMinimum: 0, rangeMaximum: 100}

guessInput.addEventListener('keyup', enableSubmitAndClearButtons)
generateRandomNumber()

function generateRandomNumber() {
  gameData.randomNumber = Math.floor(Math.random() * (gameData.rangeMaximum - gameData.rangeMinimum) + gameData.rangeMinimum)
  console.log(gameData.randomNumber)
}

function enableSubmitAndClearButtons() {
  if (guessInput.value) {
    submitButton.removeAttribute('disabled', true);
    clearButton.removeAttribute('disabled', true);
    submitButton.addEventListener('click', submitGuessInput)
    clearButton.addEventListener('click', clearGuessInput)
  } else {
    clearGuessInput()
  }
}

function submitGuessInput() {
  event.preventDefault();
  if (isValidGuess() === 'valid') {
    validGuessFeedback()
    enableResetButton()
  } else {
    invalidGuessFeedback()
  }
}

function isValidGuess() {
  console.log(`rangemax: ${gameData.rangeMaximum}`)
  console.log(`rangemin: ${gameData.rangeMinimum}`)
  console.log(`random number: ${gameData.randomNumber}`)
  console.log(`guess: ${guessInput.value}`)
  if (guessInput.value <= gameData.rangeMaximum && guessInput.value >= gameData.rangeMinimum) {
    return 'valid'
  } else if (isNaN(guessInput.value)){
    return 'That is not a number.';
  } else if (guessInput.value < gameData.rangeMinimum || guessInput.value > gameData.rangeMaximum) {
    return 'That is outside the range of valid numbers.';
  } else {
    return 'unknown error';
  }
}

function assessValidGuess() {
  if (guessInput.value == gameData.randomNumber) {
    levelUp()
    return "BOOM!!!"
  } else if (guessInput.value < gameData.randomNumber) {
    return "That is too low."
  } else if (guessInput.value > gameData.randomNumber) {
    return "That is too high"
  }
}

function validGuessFeedback() {
  document.querySelector('.feedback-error').innerHTML = "";
  document.querySelector('.feedback-prompt').innerHTML = "Your last guess was";
  document.querySelector('.last-guess').innerHTML = guessInput.value;
  document.querySelector('.feedback-result').innerHTML = assessValidGuess();
}

function invalidGuessFeedback() {
  document.querySelector('.feedback-error').innerHTML = isValidGuess();
}

function clearGuessInput() {
  event.preventDefault();
  guessInput.value = '';
  document.querySelector('.feedback-error').innerHTML = "";
  submitButton.setAttribute('disabled', true);
  clearButton.setAttribute('disabled', true);
} 

function enableResetButton() {
  resetButton.removeAttribute('disabled', true);
  resetButton.addEventListener('click', resetGame)
}

function resetGame() {
  clearGuessInput()
  resetButton.setAttribute('disabled', true);
  document.querySelector('.feedback-error').innerHTML = "The game has been reset.";
  document.querySelector('.feedback-prompt').innerHTML = "Guess a number between 0 and 100.";
  document.querySelector('.last-guess').innerHTML = "";
  document.querySelector('.feedback-result').innerHTML = "";
  gameData = { rangeMinimum: 0, rangeMaximum: 100 }
  generateRandomNumber()
}

function levelUp() {
  gameData.rangeMinimum -= 10
  gameData.rangeMaximum += 10
  generateRandomNumber()
  document.querySelector('.feedback-error').innerHTML = "You have leveled up.  The range of valid numbers will now increase.";
  document.querySelector('.feedback-prompt').innerHTML = `Guess a number between ${gameData.rangeMinimum} and ${gameData.rangeMaximum}.`;
}