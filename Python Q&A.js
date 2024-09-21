const questions = [
    {
        question: "What is the correct syntax to output 'Hello, World' in Python?",
        answers: [
            { text: "echo('Hello, World');", correct: false },
            { text: "printf('Hello, World');", correct: false },
            { text: "print('Hello, World');", correct: true },
            { text: "cout << 'Hello, World'", correct: false },
        ]
    },
    {
        question: "What data type is the result of: 5 / 2 in Python?",
        answers: [
            { text: "int", correct: false },
            { text: "float", correct: true },
            { text: "double", correct: false },
            { text: "string", correct: false },
        ]
    },
    {
        question: "Which of the following is used to create a comment in Python?",
        answers: [
            { text: "//", correct: false },
            { text: "''' '''", correct: false },
            { text: "#", correct: false },
            { text: "Both (B) and (C) are correct", correct: true },
        ]
    },
    {
        question: "What does the following code output?<br><br>&nbsp;&nbsp;&nbsp;&nbsp;x = [i**2 for i in range(5)]<br>&nbsp;&nbsp;&nbsp;&nbsp;print(x)",
        answers: [
            { text: "[1, 4, 9, 16, 25]", correct: false },
            { text: "[0, 1, 4, 9, 16]", correct: true },
            { text: "[0, 1, 8, 27, 64]", correct: false },
            { text: "[1, 4, 9, 16]", correct: false },
        ]
    },
    {
        question: "What will be following code output;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;def&nbsp;&nbsp;func(x, y = []):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;y.append(x)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return y<br>&nbsp;&nbsp;&nbsp;&nbsp;a = func(1)<br>&nbsp;&nbsp;&nbsp;&nbsp;b = func(2, [])<br>&nbsp;&nbsp;&nbsp;&nbsp;c = func(3)<br>&nbsp;&nbsp;&nbsp;&nbsp;print(a)<br>&nbsp;&nbsp;&nbsp;&nbsp;print(b)<br>&nbsp;&nbsp;&nbsp;&nbsp;print(c)",
        answers: [
            { text: "[1] [2] [3]", correct: false },
            { text: "[1, 3] [2] [1, 3]", correct: true },
            { text: "[1, 3] [2] [3]", correct: false },
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
    watchReset();
    watchStart();
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
        answerButtonElement.classList.add("button");
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
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`
    nextButton.innerHTML="Play Again!"
    nextButton.style.display="block";
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
})


startQuiz();