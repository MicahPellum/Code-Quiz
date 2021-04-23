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