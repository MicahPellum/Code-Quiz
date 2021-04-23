var quizHeaderEl = document.querySelector(".secondary-header");
var quizContentEl = document.querySelector(".quiz-content");
var startButtonEl = document.querySelector("#start");
var submitFormEl = document.querySelector(".submit-score");
var submitButtonEl = document.querySelector("#submit");
var showHighScoresEl = document.querySelector("#showHighScores");
var answerCorrectEl = document.querySelector("#answer-correct");
var answerIncorrectEl = document.querySelector("#answer-incorrect");

const questions = [
    {
        question: "How do you call a function named myFunction?",
        answers: {
            A: "myFunction()",
            B: "function myFunction()",
            C: "call myFunction()"
        },
        correctAnswer: "A"
    },
    {
        question: "Inside which HTML element to we put the Javascript?",
        answers: {
            A: "<Javascript>",
            B: "<script>",
            C: "<js>"
        },
        correctAnswer: "B"
    },
    {
        question: "How do you make a comment in Javascript?",
        answers: {
            A: "'This is a comment",
            B: "//This is a comment",
            C: "<!--This is a comment-->",
        },
        correctAnswer: "B"
    },
    {
        question: "How do you declare a variable in Javascript?",
        answers: {
            A: "variable codeQuiz;",
            B: "variable = codeQuiz;",
            C: "var codeQuiz;",
        },
        correctAnswer: "C"
    },
    {
        question: "Is Javascript a case-sensitive language?",
        answers: {
            A: "Yes",
            B: "No",
            C: "Only on Wednesdays",
        },
        correctAnswer: "A"
    }
]

var startQuiz = function (){
    timer();
    nextQuestion(questions, questionIndex);
};

startButtonEl.addEventListener("click", startQuiz);

var questionTextEl = document.createElement("h3");
quizContentEl.appendChild(questionTextEl);
var questionAnswersEl = document.createElement("ul");

// timer
var timeLeft = 60;
var score = 0;
var questionIndex = 0;
highScores = [];





var timer = function(){
    var countdown = setInterval(function(){
        if (questionIndex >= questions.length){
            clearInterval(countdown);
        }
        else if (timeLeft > 1){
            quizHeaderEl.textContent = "Time Remaining: " + timeLeft + " seconds.";
            timeLeft--;
        }
        else if (timeLeft === 1){
            quizHeaderEl.textContent = "Time Remaining: " + timeLeft + " second.";
            timeLeft--;
        }
        else {
            clearInterval(countdown);
            endQuiz();
        }
    }, 1000)
};

// var timeInterval = setInterval(function() {
//     // As long as the `timeLeft` is greater than 1
//     if (timeLeft > 1) {
//       // Set the `textContent` of `timerEl` to show the remaining seconds
//       timerEl.textContent = timeLeft + ' seconds remaining';
//       // Decrement `timeLeft` by 1
//       timeLeft--;
//     } else if (timeLeft === 1) {
//       // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
//       timerEl.textContent = timeLeft + ' second remaining';
//       timeLeft--;
//     } else {
//       // Once `timeLeft` gets to 0, set `timerEl` to an empty string
//       timerEl.textContent = '';
//       // Use `clearInterval()` to stop the timer
//       clearInterval(timeInterval);
//       // Call the `displayMessage()` function
//       displayMessage();
//     }
//   }, 1000);


var nextQuestion = function (questionArray, questionIndex){
    // clear previous question content
    quizContentEl.innerHTML = "";
    questionAnswersEl.innerHTML = "";

    // populate question text
    questionTextEl.textContent = questionArray[questionIndex].question;
    quizContentEl.appendChild(questionTextEl);

    // add question answers to list
    var answerAEl = document.createElement("li");
    answerAEl.textContent = "A. " + questionArray[questionIndex].answers.A;
    answerAEl.className = "answer-choice";
    answerAEl.setAttribute("data-choiceId", "A");
    questionAnswersEl.appendChild(answerAEl);
    var answerBEl = document.createElement("li");
    answerBEl.className = "answer-choice";
    answerBEl.setAttribute("data-choiceId", "B");
    answerBEl.textContent = "B. " + questionArray[questionIndex].answers.B;
    questionAnswersEl.appendChild(answerBEl);
    var answerCEl = document.createElement("li");
    answerCEl.className = "answer-choice";
    answerCEl.setAttribute("data-choiceId", "C");
    answerCEl.textContent = "C. " + questionArray[questionIndex].answers.C;
    questionAnswersEl.appendChild(answerCEl);



    quizContentEl.appendChild(questionAnswersEl);


    document.querySelectorAll(".answer-choice").forEach(item => {item.addEventListener("click", checkAnswer)});
};

var checkAnswer = function() {
    var userChoice = event.target;
    var choiceId = userChoice.getAttribute("data-choiceId");


    var correctAnswer = questions[questionIndex].correctAnswer;


    if (choiceId === correctAnswer){
        var answerStatus = document.createElement("p");
        answerCorrectEl.setAttribute("style","display:block");
        quizContentEl.appendChild(answerStatus);
        score++;
    }
    else {
        timeLeft = timeLeft - 10;
        answerIncorrectEl.setAttribute("style","display:block");
    }


    questionIndex++;

    if (questionIndex < questions.length) {
        setTimeout(hideIndicators, 200);
        nextQuestion(questions, questionIndex);
    }
    else {
        setTimeout(hideIndicators, 200);
        endQuiz();
    }
};

var hideIndicators = function(){
    answerCorrectEl.setAttribute("style","display:none");
    answerIncorrectEl.setAttribute("style","display:none");
}

var endQuiz = function(){
  
    quizContentEl.innerHTML = "";
    questionAnswersEl.innerHTML = "";
    quizHeaderEl.innerHTML= "";
    if (timeLeft === 0){
        quizHeaderEl.textContent = "Your time is up!";
    }

    else {
        quizHeaderEl.textContent = "You've completed all questions!";
    }

    var endMessage = document.createElement("p");
    endMessage.textContent = `Your final score is  ${score} out of ${questions.length}!`; 
    quizContentEl.appendChild(endMessage);

    submitFormEl.setAttribute("style", "display:block");
    
};

// var getHighScores = function(){
//     var retrievedScores = localStorage.getItem("highScores");
//     if (!retrievedScores){
//         highScores = [];
//     }
//     else {
//         highScores = JSON.parse(retrievedScores);
//     }
// }
// var saveScore = function() {
//     event.preventDefault();
//     var initials = document.querySelector('#userInitials').value;
//     if (initials === ''){
//         alert('Please enter your initials!');
//     }
//     else {
//         var newScorePair = {
//             userInitials: initials,
//             userScore: score
//         };
//         getHighScores();
//         highScores.push(newScorePair);
//         localStorage.setItem("highScores", JSON.stringify(highScores));
//         printHighScores();
//     }
    
// };
// var sortHighScores = function() {
//     getHighScores();
//     var compare = function(a, b) {
//         const scoreA = a.userScore;
//         const scoreB = b.userScore;

//         let comparison = 0;
//         if (scoreA < scoreB){
//             comparison = 1;
//         }
//         else if (scoreA >= scoreB){
//             comparison = -1;
//         }
//         return comparison;
//     }
//     highScores.sort(compare);
// }


// var printHighScores = function() {
//     sortHighScores();
//     quizHeaderEl.textContent = "High Scores";
//     quizContentEl.innerHTML = "";
//     submitFormEl.setAttribute("style","display:none");
//     var highScoreList = document.createElement("ol");
//     for(var i = 0; i < highScores.length; i++){
//         var newScoreListItem = document.createElement("li");
//         newScoreListItem.textContent = `${highScores[i].userInitials} with a score of ${highScores[i].userScore}`;
//         highScoreList.appendChild(newScoreListItem);
//     }
//     quizContentEl.appendChild(highScoreList);
//     var playAgainFormEl = document.createElement("form");
//     var playAgainBtnEl = document.createElement("button");
//     playAgainBtnEl.setAttribute("type", "submit");
//     playAgainBtnEl.textContent = "Play Again";
//     playAgainFormEl.appendChild(playAgainBtnEl);
//     quizContentEl.appendChild(playAgainFormEl);
// }

var highScores = document.createElement("div");
highScores.textContent = newScore.name + " - " + newScore.score;
highScores.className = "scores";
scoreWrapper.insertBefore(highScores, scoreWrapper.childNodes[0]);
    

//grab all scores in the scoreWrapper
for (let i = 0; i < scoreWrapper.children.length; i++) {
    scoreArray.push(scoreWrapper.children[i].textContent)
}
    

if (scoreArray[0] === "") {
    scoreArray.shift();
    localStorage.setItem("scores", JSON.stringify(scoreArray));
}
else {
localStorage.setItem("scores", JSON.stringify(scoreArray));
}




// save the score when initials are entered
submitButtonEl.addEventListener("click", saveScore);

startBtn.onclick = countdown;