/* The words are chosen from the 
   following array */

 var wordBank = [ 'test'

	// 'frodo','sam','mary','pippin','strider',
	// 'aragorn','gandalf','legolas','gimli',
	// 'boromir', 'galadriel', 'saruman'
 ];

//Initialize a variable where random word will be stored
 var word;

//Initialize a variable for string to be displayed on screen
 var dispStr;

//Initialize a variable for guesses left
//start with +1 guesses, so when game starts the function shows
//intended number of guesses.
 var guessesLeft;

//Start an empty array to push the user input in.
 var usedLetters;

//Initialize a variable to match the guessed word against
//chosen word.
 var guessDone;

// initialize a boolean variable to check if game has started
 // var gameStarted = false;

// create a variable to push the guesses to the html
 var targetDiv = document.getElementById("guesses");

// initialize variables to track wins.
var wins;


//add a listener
document.addEventListener("keyup", function(event){

	function reset(){
			word = '';
			dispStr = '';
			guessesLeft = 11;
			usedLetters = [];
			guessDone = '';
			wins = 0;

			console.log(usedLetters);
		// when spacebar is pressed for the first time, the game starts.
		// if (gameStarted === false){

			//choose a random word from the library
			word = chooseWord(wordBank);
			//write the word as blanks on the page. 
			dispStr = display(word);
			//counts the guesses
			guessesLeft = guessesCounter(guessesLeft);
			//shows used letters
			showUsedLetters(usedLetters);
			//show wins
			showWins(wins);

			document.addEventListener("keyup", function(event){
		
				var key = String.fromCharCode(event.keyCode).toLowerCase();
				var characterCode = event.keyCode;

				console.log(key);
				console.log(characterCode);
						
				//Check if they user input is letters.
				if ((characterCode >= 65 )	&& (characterCode <= 90)){
			
					usedLetters.push(key);

					console.log(usedLetters);

					showUsedLetters(usedLetters);

					var userGuess = checkGuess(key,word);

					console.log(userGuess);

					//if user guesses wrong, subtract guesses left
					if (userGuess === false){
						guessesLeft = guessesCounter(guessesLeft);
					}

				//function to place the correct guess in proper places.
					dispStr = pushGuess(key,word,dispStr);

					if (guessesLeft > 0 && word !== guessDone){
					// if the array has any element, check if key matches that element 
					// and if the letter has been used do nothing
					if (alreadyExists(key,usedLetters) === true){}

					else {
						// push the guess to used letter array
						// usedLetters.push(key);
						//show the used letter array on the screen.
						// showUsedLetters(usedLetters);
						//see if the letter exists in the word.
						var userGuess = checkGuess(key,word);
						//if user guesses wrong, subtract guesses left
						if (userGuess === false){
							guessesLeft = guessesCounter(guessesLeft);
						}
						//if guess is correct place the correct guess in proper places.
						
						dispStr = pushGuess(key,word,dispStr);
						console.log(dispStr);
						guessDone = removeSpaces(dispStr);
						console.log(guessDone);
						console.log(word);

					}

				}
					
			}

	});

} //close for the reset function



reset();

});


// Write all the functions under this line.

//function to check if user input already exists;
function alreadyExists(x,array){
	//check each element of array to see if argument passed as x exists
	//in the array.
	if (array.indexOf(x) !== -1) { 
		return true;}

		return false;
}

//function to choose a word from the word bank.
function chooseWord(array){
	//choose a random word from the library
	var chosenWord = wordBank[Math.floor(Math.random()*
	wordBank.length)]; 

	// console.log(chosenWord)
	return chosenWord;
}

function display(word){
	//displays blanks for each letter of chosen word
	var showThis = "";
	for (var i = 0; i < word.length; i++){			
		showThis = showThis + "_" + " ";
	}

	document.getElementById("content").innerHTML = showThis;

	return showThis;
}

// following functions returns true if the letter exists 
// in the chosen word
function checkGuess(guess,chosenWord){

	if (chosenWord.indexOf(guess) !== -1){
		return true;
	}
		return false;
}

// following function pushes the correct guess to all the
// instances where it exists in the chosen word.	
function pushGuess(guess,chosenWord,display){
	//iterate through the length of the string
	for (var i=0; i < chosenWord.length; i++){
		// if the guess matches the letter at position i 
		// in the string
		if (chosenWord.charAt(i) === guess){
			// add the characted in the display string
			// i*2 accounts for the spaces between blanks.			
			display= display.substring(0, i*2) + guess + 
				display.substring((i*2)+1);
		} // checking if guess exists in the word ends here				
	}
	document.getElementById("content").innerHTML = display;
	return display;	
}

function guessesCounter(guessesLeft){
	guessesLeft--;
	targetDiv.innerHTML = "Guesses left:" + guessesLeft;
	// targetDiv.appendChild(counterDiv);
	return guessesLeft;
}

function removeSpaces(wordWithSpaces){

	var noSpaces = wordWithSpaces.replace(/\s/g,'');	
	return noSpaces;
}

function showUsedLetters(array){

	var display = "Used Letters: " + array;

	document.getElementById("guessedLetters").innerHTML = display;
	return display;
}

function showWins(wins){
	document.getElementById("wins").innerHTML = "Wins: " + wins;
	return;
}
