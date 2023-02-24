// Object array with questions, choices, and correct answer 
const questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

//Getting the document children to be used later
let wrapper = document.querySelector("#wrapper");
let timerDisplay = document.querySelector("#timer");
let questionsDiv = document.querySelector("#questions");
let timer = document.querySelector("#start");


// Declared variables
let score = 0;
let questionIndex = 0;
let secondsLeft = 76;
let holdInterval = 0;
const penalty = 10;

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            timerDisplay.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                timerDisplay.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page 
function render(questionIndex) {
    //Declare variables
    let userQuestion;
    let userChoices;
    let answersUl = document.createElement("ul");
    answersUl.setAttribute("id", "answers");

    // Clears existing data
    questionsDiv.innerHTML = "";
    answersUl.innerHTML = "";
    timer.remove();
    // For loop to iterate through all info in the array
    for (let i = 0; i < questions.length; i++) {
        // Appends question title and choices to their respective variables
        userQuestion = questions[questionIndex].title;
        userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    let number = 1;
    userChoices.forEach(function (newItem) {
        let listElement = document.createElement("li")
        let listItem = document.createElement("button");
        let option = number + ". " + newItem;
        number++;
        listItem.textContent = option;
        listElement.appendChild(listItem);
        questionsDiv.appendChild(answersUl);
        answersUl.appendChild(listElement);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(event) {
    let element = event.target;
    let response = document.createElement("p");

    if (element.matches("button")) {
        response.setAttribute("id", "response");
        let choice = element.textContent;
        choice = choice.substring(3); 
        if (choice == questions[questionIndex].answer) {
            score++;
            response.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            response.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        response.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(response);

}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    timerDisplay.innerHTML = "";
    let timeRemaining;

    // Heading
    let createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        timeRemaining = secondsLeft;
        let createP2 = document.createElement("p");
        createP2.setAttribute("id", "response")
        clearInterval(holdInterval);
        createP2.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label
    let createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // Input
    let createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // Submit
    let createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        
        let initials = createInput.value;

        console.log(initials);

        if(initials.length > 1){
            let finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            let allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                    allScores = [];
                } else {
                    allScores = JSON.parse(allScores);
                }
            allScores.push(finalScore);
            let newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.open("/Scores.html");
        }
        
    });

}