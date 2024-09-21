const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "&lt;javascript&gt;", correct: false },
            { text: "&lt;js&gt;", correct: false },
            { text: "&lt;script&gt;", correct: true },
            { text: "&lt;scripting&gt;", correct: false },
        ]
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            { text: "The &lt;head&gt; section", correct: false },
            { text: "The &lt;body&gt; section", correct: false },
            { text: "Both the &lt;head&gt; section and the &lt;body&gt; section are correct", correct: true },
        ]
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answers: [
            { text: "&lt;script name = 'xxx.js'&gt;", correct: false },
            { text: "&lt;script href = 'xxx.js'&gt;", correct: false },
            { text: "&lt;script src = 'xxx.js'&gt;", correct: true },
        ]
    },
    {
        question: "console.log(typeof NaN);",
        answers: [
            { text: "NaN", correct: false },
            { text: "number", correct: true },
            { text: "null", correct: false },
            { text: "undefined", correct: false },
        ]
    },
    {
        question: "console.log(3 > 2 > 1);",
        answers: [
            { text: "true", correct: false },
            { text: "false", correct: true },
        ]
    },   
    {
        question: "console.log(0.1 + 0.2 == 0.3);",
        answers: [
            { text: "true", correct: false },
            { text: "false", correct: true },
        ]
    },
    {
        question: "Who is creator of JavaScript?",
        answers: [
            { text: "James Gosling", correct: false},
            { text: "Guido Van Rossum", correct: false},
            { text: "Brendan Eich", correct: true},
            { text: "Bjarne Stroustrup", correct: false},
        ]
    },
    {
        question: "(function(){<br>&nbsp;&nbsp;&nbsp;var x = 5;<br>&nbsp;&nbsp;&nbsp;(function(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(x); // Line 1<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var x = 10;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(x); // Line 2<br>&nbsp;&nbsp;&nbsp;})();<br>})();<br>What will be the output and why?",
        answers: [
            { text: "undefined, 10", correct: true },
            { text: "5, 10", correct: false },
            { text: "ReferenceError", correct: false },
            { text: "undefined, undefined", correct: false },
        ]
    },{
        question: "function sayHi() {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(name);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var name = 'John'<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;sayHi();",
        answers: [
            { text: "undefined", correct: true},
            { text: "John", correct: false},
            { text: "null", correct: false},
            { text: "ReferenceError", correct: false},
        ]
    },
    {
        question: "let foo = 10 + '20';<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log(foo);",
        answers: [
            { text: "30", correct: false},
            { text: "1020", correct: true},
            { text: "NaN", correct: false},
            { text: "Error", correct: false},
        ]
    },
    {
        question: "let a = [1, 2, 3];<br>&nbsp;&nbsp;&nbsp;&nbsp;let b = [1, 2, 3];<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log(a == b);&nbsp;&nbsp;&nbsp;&nbsp;// Line 1<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log(a === b);&nbsp;&nbsp;&nbsp;&nbsp;//Line 2",
        answers: [
            { text: "true,true", correct: false},
            { text: "true,false", correct: false},
            { text: "false,true", correct: false},
            { text: "false,false", correct: true},
        ]
    }      
];

const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const getCertificate=document.querySelector("#getCertificate")
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    watchReset();
    watchStart();
    getCertificate.style.display="none"
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    questionElement.style.fontFamily="Calibiri"

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonElement.appendChild(button);
        answerButtonElement.classList.add("button")
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display="none";
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtonElement.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    })
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    let percentage=Math.round(((score/questions.length)*100),4);
    let quizzes=document.querySelector("#head1")
    let quizName = quizzes.textContent;
    console.log(quizName);

    // Store the Quiz Name in local storage
    localStorage.setItem("quizName",quizName);

    // Store the percentage in local storage
    localStorage.setItem("quizScore",percentage);
    
    questionElement.innerHTML=`You Scored ${percentage}% in ${quizName}.`
    nextButton.innerHTML="Play Again!"
    nextButton.style.display="block";
    getCertificate.style.display="block";
    document.querySelector('#getCertificate').addEventListener('click', function() {
        window.location.href = 'certificate1.html'; // Redirect to certificate page
    });
    watchStop();
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();