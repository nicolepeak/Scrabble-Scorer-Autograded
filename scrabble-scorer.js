// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
let userAnswer
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const simplePointStructure = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T','D', 'G', 'B', 'C', 'M', 'P', 'F', 'H', 'V', 'W', 'Y', 'K', 'J', 'X', 'Q', 'Z']

const vowels = ['A', 'E', 'I', 'O', 'U'];
const consonates = ['B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let userAnswer = input.question("Let's play some scrabble! Enter a word: ");
   return userAnswer
};

function simpleScorer (word) {
   word = word.toUpperCase();
   let simplePoints= 0;

   for (let i = 0; i <word.length; i++){
      if (simplePointStructure.includes(word[i])) {
         simplePoints = simplePoints + 1
      } 
   }
   return simplePoints
};

function vowelBonusScorer (word) {
word = word.toUpperCase();
let vowelTotalPoints = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         vowelTotalPoints = vowelTotalPoints + 3
      } else if (consonates.includes(word[i])) {
         vowelTotalPoints = vowelTotalPoints + 1
      }
   }

   return vowelTotalPoints
};

let scrabbleScorer;


let scoreSystemZero = {
   "name": "Simple Score",
   "description": "Each letter is worth 1 point",
   "scorerFunction": simpleScorer
};
let scoreSystemOne = {
   "name": "Bonus Vowels", 
   "description": "Vowels are 3 pts, consonants are 1 pt.",
   "scorerFunction": vowelBonusScorer
};
let scoreSystemTwo = {
   "name": "Scrabble",
   "description": "The traditional scoring algorithm.",
   "scorerFunction": oldScrabbleScorer
};

const scoringAlgorithms = [scoreSystemZero, scoreSystemOne, scoreSystemTwo];

function scorerPrompt(word) {
   let finalScore = 0
   let userAnswer2 = input.question 
   (`Choose a scorer system:
    0- Simple: ${scoreSystemZero.description} 
    1- Vowel Bonus: ${scoreSystemOne.description} 
    2- Scrabble: ${scoreSystemTwo.description}
    Enter a number from above: `);

console.log("Algorithm name: " , scoringAlgorithms[userAnswer2].name); 
console.log("scorerFunction result: ");
finalScore = scoringAlgorithms[userAnswer2].scorerFunction(word);
   return finalScore
}

function transform(pointStructureObject) {
let transformedObject= {};

   for (key in pointStructureObject) {

      for (let i = 0; i < pointStructureObject[key].length; i++){
         let letter = pointStructureObject[key][i].toLowerCase();
         transformedObject[letter] = Number(key);
      }
   } 

   return transformedObject
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
console.log(scorerPrompt(initialPrompt()))
//console.log(transform(oldPointStructure));
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
