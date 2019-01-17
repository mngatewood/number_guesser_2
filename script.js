var guessInput = document.querySelector('.input-guess')
// this is a shortcut variable to the input field
var submitButton = document.querySelector('.submit-button')
// this is a shortcut variable to the submit button
var clearButton = document.querySelector('.clear-button')
// this is a shortcut variable to the clear button
var resetButton = document.querySelector('.reset-button')
// this is a shortcut variable to the reset button
var gameData = {rangeMinimum: 0, rangeMaximum: 100}
// this declares an object with the starting min and max numbers for the game

guessInput.addEventListener('keyup', enableSubmitAndClearButtons)
// this adds an event listener that invokes a function whenever a key is pressed inside the guess input field
generateRandomNumber()
//this invokes the the generateRandomNumber function on load

function generateRandomNumber() {
//this declares a function
  gameData.randomNumber = Math.floor(Math.random() * (gameData.rangeMaximum - gameData.rangeMinimum) + gameData.rangeMinimum)
//this returns a random number within min and max values
  console.log(gameData.randomNumber)
//this logs the guess for debugging
}

function enableSubmitAndClearButtons() {
//this declares a function
  if (guessInput.value) {
//this evaluates if a value exists for the input field
    submitButton.removeAttribute('disabled', true);
//this removes the disabled attribute from the submit button if evaluates to true
    clearButton.removeAttribute('disabled', true);
//this removes the disabled attribute from the clear button if evaluates to true
    submitButton.addEventListener('click', submitGuessInput)
//this adds an click event listener to invoke a function if evaluates to true
    clearButton.addEventListener('click', clearGuessInput)
//this adds an click event listener to invoke a function if evaluates to true
  } else {
//this creates a block if above evaluates to false
    clearGuessInput()
//this invokes a function
  }
}

function submitGuessInput() {
//this declares a function
  event.preventDefault();
//this prevents the default behavior of the submit button
  if (isValidGuess() === 'valid') {
//this evaluates if the function returns a string of "valid"
    validGuessFeedback()
//this invokes a function
    enableResetButton()
//this invokes a function
  } else {
//this creates a block if above evaluates to false
    invalidGuessFeedback()
//this invokes a function
  }
}

function isValidGuess() {
//this declares a function
  if (guessInput.value <= gameData.rangeMaximum && guessInput.value >= gameData.rangeMinimum) {
//this evaluates if the input field value is between min and max
    return 'valid'
//this returns a string
  } else if (isNaN(guessInput.value)){
//this evaluates if the input field value is a number
    return 'That is not a number.';
//this returns a string
  } else if (guessInput.value < gameData.rangeMinimum || guessInput.value > gameData.rangeMaximum) {
//this evaluates if the input field value is outside the range of min and max
    return 'That is outside the range of valid numbers.';
//this returns a string
  } else {
//this creates a block if all above conditions evaluate to false
    return 'unknown error';
//this returns a string
  }
}

function assessValidGuess() {
//this declares a function
  if (guessInput.value == gameData.randomNumber) {
//this evaluates if the input field value is equal to the random number
    levelUp()
//this invokes a function
    return "BOOM!!!"
//this returns a string
  } else if (guessInput.value < gameData.randomNumber) {
//this evaluates if the input field value is less than the random number
    return "That is too low."
//this returns a string
  } else if (guessInput.value > gameData.randomNumber) {
//this evaluates if the input field value is greater than the random number
    return "That is too high"
//this returns a string
  }
}

function validGuessFeedback() {
//this declares a function
  document.querySelector('.feedback-error').innerHTML = "";
//this sets the html of the error element to a blank string
  document.querySelector('.feedback-prompt').innerHTML = "Your last guess was";
//this sets the html of the prompt element to a string
  document.querySelector('.last-guess').innerHTML = guessInput.value;
//this sets the html of the last guess element to the value of the input field
  document.querySelector('.feedback-result').innerHTML = assessValidGuess();
//this sets the html of the result element to the return value of the assessValidGuess function
}

function invalidGuessFeedback() {
//this declares a function
  document.querySelector('.feedback-error').innerHTML = isValidGuess();
//this sets the html of the error element to the return value of the isValidGuess function
}

function clearGuessInput() {
//this declares a function
  event.preventDefault();
//this prevents the default behavior of the submit button
  guessInput.value = '';
//this sets the value of the input field to a blank string
  document.querySelector('.feedback-error').innerHTML = "";
//this sets the html of the error element to a blank string
  submitButton.setAttribute('disabled', true);
//this adds a disabled attribute to the submit button
  clearButton.setAttribute('disabled', true);
//this adds a disabled attribute to the clear button
} 

function enableResetButton() {
//this declares a function
  resetButton.removeAttribute('disabled', true);
//this removes the disabled attribute from the reset button
  resetButton.addEventListener('click', resetGame)
//this adds a click event listener to the reset button to invoke a function
}

function resetGame() {
//this declares a function
  clearGuessInput()
//this invokes a function
  resetButton.setAttribute('disabled', true);
//this adds a disabled attribute to the reset button
  document.querySelector('.feedback-error').innerHTML = "The game has been reset.";
//this sets the html of the error element to indicated string
  document.querySelector('.feedback-prompt').innerHTML = "Guess a number between 0 and 100.";
//this sets the html of the prompt element to indicated string
  document.querySelector('.last-guess').innerHTML = "";
//this sets the html of the feedback element to a blank string
  document.querySelector('.feedback-result').innerHTML = "";
//this sets the html of the feedback element to a blank string
  gameData = { rangeMinimum: 0, rangeMaximum: 100 }
//this resets the min and max values to the default values
}

function levelUp() {
//this declares a function
  gameData.rangeMinimum -= 10
//this subtracts 10 from the current minimum
  gameData.rangeMaximum += 10
//this adds 10 to the current maximum
  generateRandomNumber()
//this invokes a function
  document.querySelector('.feedback-error').innerHTML = "You have leveled up.  The range of valid numbers will now increase.";
//this sets the html of the error element to the indicated string
  document.querySelector('.feedback-prompt').innerHTML = `Guess a number between ${gameData.rangeMinimum} and ${gameData.rangeMaximum}.`;
//this sets the html of the prompt element to the indicated string
}