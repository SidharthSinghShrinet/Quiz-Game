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
        question: "Which country has the largest population in the world?",
        answers: [
            { text: "India", correct: true },
            { text: "Canada", correct: false },
            { text: "China", correct: false },
            { text: "UAE", correct: false },
        ]
    },
    {
        question: "Statue of Unity is located at?",
        answers: [
            { text: "New Delhi", correct: false },
            { text: "Maharashtra", correct: false },
            { text: "Tamil Nadu", correct: false },
            { text: "Gujarat", correct: true },
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Bengaluru", correct: false },
            { text: "Lucknow", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Kolkata", correct: false },
        ]
    },
    {
        question: "Who is the current prime minister of India?",
        answers: [
            { text: "Manmohan Singh", correct: false },
            { text: "Narendra Modi", correct: true },
            { text: "Rahul Gandhi", correct: false },
            { text: "Yogi Aditya Nath", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}

function resetState(){
    nextButton.style.display="none"
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
    Array.from(answerButtonElement.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again!";
    nextButton.style.display="block";
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
})

startQuiz();
        