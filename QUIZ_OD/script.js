//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: " Qui est l'auteur du célèbre anime Dragon ball?",
        options: ["Masashi Kishimoto", "Akira Toriyama", "One", "Boiichi"],
        correct: "Akira Toriyama" ,
    },
    {
        id: "1",
        question: " Qui est l'homme le plus fort du monde ",
        options: ["Saitama", "Edward Newgate", "Ashura", "Limule"],
        correct: "Edward Newgate",
    },
    {
        id: "2",
        question: " Continuez ce nom, Kibutsuji ?",
        options: ["Mulan", "Muzan", "Muran", "Jackson"],
        correct: "Muzan",
    },
    {
        id: "3",
        question: " Je peux me perdre en allant tout droit, Qui suis-je ?",
        options: ["Saitama", "Vegeta", "Zorro", "Goku"],
        correct: "Zorro",
    },
    {
        id: "4",
        question: "Eternuement sérieux vient de quel anime",
        options: ["Gintama", "One Punch Man", "Fairy Tail", "Chuck"],
        correct: "One Punch Man",
    },
    {
        id: "5",
        question: "Le mot AO désigne quelle couleur",
        options: ["Bleu", "Blanc", "Rouge", "Fluo"],
        correct: "Bleu",
    }, {
        id: "6",
        question: "Quel age a Luffy?",
        options: ["19", "15", "17", "C'est un gamin"],
        correct: "19",
    },
    {
        id: "7",
        question: "Un Hashira est un...",
        options: ["Pilier", "Assassin", "Rodeurs de la nuit", "Epeiste"],
        correct: "Pilier",
    },
    {
        id: "8",
        question: "Qui n'est pas un homme vert?",
        options: ["Picolo", "Dende", "The Mask", "Kurapika"],
        correct: "Kurapika",
    },
    {
        id: "9",
        question: "Trouver l'intrus?",
        options: ["Jolies femmes", "Sabre", "Viande", "Alcool"],
        correct: "Sabre",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};