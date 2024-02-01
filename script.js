const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false}

        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican city", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Sri Lanka", correct: false}

        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Australia", correct: true},
            { text: "Artic", correct: false},
            { text: "Asia", correct: false},
            { text: "Africa", correct: false}

        ]
    },
    {
        question: "Which is the smallest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antractica", correct: true}

        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
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
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        answerButtons.appendChild(btn);
        progress.innerHTML = `${questionNo} out of ${questions.length}`;
        if (answer.correct){
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click", selectAnswer);
        
        //nextButton.style.display = "block";
    
    });
}

function resetState(){
    nextButton.style.display = "none";
    
    while( answerButtons.firstChild ){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    
}

function selectAnswer(e){
const selectedBtn = e.target;
const isCorrect = selectedBtn.dataset.correct === "true";
if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
}else{
    selectedBtn.classList.add("incorrect");
}
Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
})
nextButton.style.display = "block";
progress.innerHTML = `${questionNo} out of ${questions.length}`;
}

function showScore(){
    resetState()
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }

}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
     startQuiz();       
    }
})

startQuiz();

//showQuestion();