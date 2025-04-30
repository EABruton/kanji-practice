const elementMain = document.querySelector('main');
const elementFileInput = document.querySelector('input[type="file"]');
const elementQuestionsContainer = document.querySelector('#questions-container');
const elementToggleAnswersButton = document.querySelector('#toggle-answers__button');
const elementQuestionCountSetter = document.querySelector('#question-counter-setter');
const elementButtonClearFile = document.querySelector('#clear-file');
const elementRandomizeQuestionCheckbox = document.querySelector('#question-randomizer');
const elementQuestionInverter = document.querySelector('#invert-questions');

/**
 * Shuffles an array randomly.
 * Note that this will mutate the original array.
 *
 * @param {any[]} array
 */
function shuffleArray(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

/**
  * @param {string} question - the question to ask
  * @param {string} answer - the answer to the question (initially hidden)
  * @param {HTMLElement} location - where to put the question in the DOM
  */
function addQuestion(question, answer, location) {
  const elementQuestionContainer = document.createElement('li');
  elementQuestionContainer.classList.add('question', 'card')
  elementQuestionContainer.dataset.answered = 'false';

  const elementQuestion = document.createElement('p');
  elementQuestion.classList.add('question__question')
  elementQuestion.innerHTML = `${question}`;

  const elementAnswer = document.createElement('p');
  elementAnswer.classList.add('question__answer')
  elementAnswer.innerHTML = answer;

  elementQuestionContainer.append(elementQuestion, elementAnswer);
  location.append(elementQuestionContainer);
}

/**
  * @param {Event} eventFileChange 
  * @param {HTMLElement} location - where in the DOM to add questions
  * @param {number} maxQuestionCount - the maximum number of questions to show
  * @param {boolean} areRandomized - whether to randomize the order of the questions
  * @param {boolean} areQuestionsInverted - whether to switch the questions and answers
  */
async function readQuestionsFromFile(eventFileChange, location, maxQuestionCount, areRandomized, areQuestionsInverted) {
  const file = eventFileChange.target.files[0];

  if (!file) {
    console.error('No file uploaded');
    return;
  }

  if (!file.type.endsWith('json')) {
    console.error('Unsuppored file type');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const parsed = JSON.parse(reader.result);
    updateQuestions(location, parsed, maxQuestionCount, areRandomized, areQuestionsInverted);
  }
  reader.onerror = () => {
    console.error("Error reading file");
  }
  reader.readAsText(file, "utf-8");
}

/**
  * @param {HTMLElement} location - where in the DOM to add questions
  * @param {{
  * question: string,
  * answer: string
  * }[]} questions
  * @param {number} questionCount - the number of questions; if undefined, will use all questions
  * @param {boolean} areRandomized - whether the order of questions is randomized
  * @param {boolean} areQuestionsInverted - whether to invert the questions and answers
  */
function updateQuestions(location, questions, questionCount, areRandomized, areQuestionsInverted) {
  const elementPreviousQuestions = [...document.querySelectorAll('.question')];
  for (const elementQuestion of elementPreviousQuestions) {
    elementQuestion.remove();
  }

  const maxQuestionCount = questionCount || questions.length;

  let currentQuestionCount = 0;

  if (areRandomized) shuffleArray(questions);

  for (const { question, answer } of questions) {
    if (currentQuestionCount >= maxQuestionCount) continue;

    if (areQuestionsInverted) {
      addQuestion(answer, question, location);
    }
    else {

      addQuestion(question, answer, location);
    }
    currentQuestionCount++;
  }
}

/**
  * Toggles the answer visibility.
  */
function onToggleAnswers() {
  const elementAnswers = [...document.querySelectorAll('.question[data-answered]')];
  for (const elementAnswer of elementAnswers) {
    const isHidden = elementAnswer.dataset.answered === "false";
    if (isHidden) elementAnswer.dataset.answered = "true";
    else {
      elementAnswer.dataset.answered = "false";
    }
  }
}

elementButtonClearFile.addEventListener('click', () => {
  elementFileInput.value = '';
})

elementFileInput.addEventListener('change', (e) => {
  const maxQuestionCount = parseInt(elementQuestionCountSetter.value);
  readQuestionsFromFile(e, elementQuestionsContainer, maxQuestionCount, elementRandomizeQuestionCheckbox.checked, elementQuestionInverter.checked);
})
elementToggleAnswersButton.addEventListener("click", onToggleAnswers);
