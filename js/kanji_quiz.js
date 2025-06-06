const elementQuestionsContainer = document.querySelector('#questions-container');
const urlParams = new URLSearchParams(window.location.search);
const shouldReverseQuestions = urlParams.get('reverse') === 'true';
const elementToggleAnswersButton = document.querySelector('#toggle-answers__button');
const elementQuestionTemplate = document.querySelector('#question-template');

/**
 * @param {string} question - the question to ask
 * @param {string} answer - the answer to the question (initially hidden)
 * @param {HTMLElement} location - where to put the question in the DOM
 * @param {number} questionNumber - what question number it is out of the total questions
 */
function addQuestion(question, answer, location, questionNumber) {
    const elementQuestionContainer = elementQuestionTemplate.content.cloneNode(true);
    const elementQuestion = elementQuestionContainer.querySelector('.question');
    const elementQuestionCount = elementQuestionContainer.querySelector('.question__count');
    const elementQuestionText = elementQuestionContainer.querySelector('.question__question');
    const elementAnswer = elementQuestionContainer.querySelector('.question__answer');
    const elementToggleAnswerButton = elementQuestionContainer.querySelector('.question__toggle-answer-button');

    elementQuestionCount.textContent = `${questionNumber}: `;
    elementQuestionText.innerHTML = question;
    elementAnswer.innerHTML = answer;

    elementToggleAnswerButton.addEventListener('click', () => {
        toggleDatasetAnswered(elementQuestion);
    });

    location.append(elementQuestionContainer);
}

/**
 * Toggles between the hidden and shown states using the dataset of the given element.
 *
 * @param {HTMLElement} element
 */
function toggleDatasetAnswered(element) {
    const isHidden = element.dataset.answered === "false";
    if (isHidden) element.dataset.answered = "true";
    else {
        element.dataset.answered = "false";
    }
}

/**
 * Toggles the answer visibility.
 */
function onToggleAnswers() {
    const elementAnswers = [...document.querySelectorAll('.question[data-answered]')];
    for (const elementAnswer of elementAnswers) {
        toggleDatasetAnswered(elementAnswer);
    }
}

/**
 * Shuffles an array randomly.
 * Note that this will mutate the original array.
 *
 * @param {any[]} array
 */
function shuffleArray(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

// Initialize the quiz with the provided questions
function initializeQuiz(questions) {
    const elementQuestionsContainer = document.querySelector('#questions-container');
    const elementToggleAnswersButton = document.querySelector('#toggle-answers__button');
    const elementQuestionTemplate = document.querySelector('#question-template');

    // Create a copy of questions array and shuffle it
    const questionsToDisplay = [...questions];
    shuffleArray(questionsToDisplay);

    // Initialize questions
    questionsToDisplay.forEach(({ question, answer }, index) => {
        const displayQuestion = shouldReverseQuestions ? answer : question;
        const displayAnswer = shouldReverseQuestions ? question : answer;
        addQuestion(displayQuestion, displayAnswer, elementQuestionsContainer, index + 1);
    });

    elementToggleAnswersButton.addEventListener("click", onToggleAnswers);
}

initializeQuiz(questions);