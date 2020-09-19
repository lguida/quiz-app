/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Which of the following researchers is responsible for the Stanford Prison Experiment?',
      answers: [
        'Stanley Milgrim',
        'Noam Chompsky',
        'Philip Zimbardo',
        'Sigmund Freud'
      ],
      correctAnswer: 'Philip Zimbardo'
    },
    {
      question: 'Which of the following is NOT one of the Big Five Personality Facets?',
      answers: [
        'Openness',
        'Regulation',
        'Extroversion',
        'Agreeableness'
      ],
      correctAnswer: 'Regulation'
    },
    {
      question: 'Which of the following is responsible for visual processing in the brain?',
      answers: [
        'Occipital lobe',
        'Parietal lobe',
        'Hypothalamus',
        'Amygdala'
      ],
      correctAnswer: 'Occipital lobe'
    },
    {
      question: 'What is the function of the hippocampus?',
      answers: [
        'Aural processing',
        'Executive functioning',
        'Motor control',
        'Memory'
      ],
      correctAnswer: 'Memory'
    },
    {
      question: 'Which of the following is a description of Theory of Mind?',
      answers: [
        'The idea that people around you have thoughts that are distinct from your own.',
        'The understanding that objects generally remain where they are even if you don’t see them anymore',
        'The concept that the final number is the important one when you are counting.',
        'The ability to use language to communicate ideas.'
      ],
      correctAnswer: 'The idea that people around you have thoughts that are distinct from your own.'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  questionCorrect: false,
  questionAnswered: false
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function createStartPageTemp(){
  return`
  <div class='start-page'>
    <p class='start-p'>Welcome to the Psychology Quiz App. Press the button below when you are ready to begin.</p>
    <button class='js-begin-quiz'>Begin Quiz</button>
  </div> `;
}
function createEndPageTemp(){
  return`
  <div class="quiz-end">
            <p>You completed the quiz! Your score is: ${store.score}/5</p>
            <button class="js-restart-quiz">Restart Quiz</button>
        </div>
  `;
}

function createQuestionPageTemp(){
  console.log("createQuestionPageTemp run");
  let qNum = store.questionNumber;
  let qNumToPrint = qNum + 1;
  return`
  <div class='question-page'>
            <form id="js-question-form" class="qn-form">
                <p class="question">${store.questions[qNum].question}</p>
                <div class="answer-options">
                    <input type='radio' id="q1" name="answer" value="${store.questions[qNum].answers[0]}" required>
                    <label for='q1'>${store.questions[qNum].answers[0]}</label>
                    <br>
                    <input type='radio' id="q2" name="answer" value="${store.questions[qNum].answers[1]}" required>
                    <label for='q2'>${store.questions[qNum].answers[1]}</label>
                    <br>
                    <input type='radio' id="q3" name="answer" value="${store.questions[qNum].answers[2]}" required>
                    <label for='q3'>${store.questions[qNum].answers[2]}</label>
                    <br>
                    <input type='radio' id="q4" name="answer" value="${store.questions[qNum].answers[3]}" required>
                    <label for='q4'>${store.questions[qNum].answers[3]}</label>
                </div>
                <input type="submit" class="js-submit-answer submit-answer" value="Submit Answer">
              </form>
                <p class="scoring">Question number: ${qNumToPrint}/5</p>
                <p class='scoring'>Score: ${store.score}/5</p>
            
        </div>`;
}

function createCheckedAnswerPageTemp(questionCorrect){
  console.log("createCheckedAnswerPageTemp run");
  let qNumToPrint = store.questionNumber;
  let qNum = qNumToPrint - 1;
  if (questionCorrect){
    return `<div class='question-page'>
    <form id="js-question-form" class="qn-form">
        <p class="question">${store.questions[qNum].question}</p>
        <div class="correct">
          <span class="correct-span" style="background-color: #D3EFBD">Correct! Well done!</span>
        </div>
        <button class='js-next'>Next</button>
        </form>
        <p class="scoring">Question number: ${qNumToPrint}/5</p>
        <p class='scoring'>Score: ${store.score}/5</p>
    </div>`;
  }
  else{
    return `<div class='question-page'>
    <form id="js-question-form" class="qn-form">
        <p class="question">${store.questions[qNum].question}</p>
        <div class="incorrect">
          <span class="incorrect-span" style="background-color: #cab1b5">Nope, that is not correct. The correct answer is: ${store.questions[qNum].correctAnswer}</span>
        </div>
        <button class='js-next'>Next</button>
        </form>
        <p class="scoring">Question number: ${qNumToPrint}/5</p>
        <p class='scoring'>Score: ${store.score}/5</p>
    </div>`;
  }
}



/********** HELPER FUNCTIONS **********/
// These are extra functions used to help execute the event handler and render functions

function checkAnswer(){
  console.log("running checkAnswer");
  const chosenAnswer = $("input[name='answer']:checked", "#js-question-form").val(); 
  console.log(chosenAnswer);
  store.questionNumber += 1;
  qNum = store.questionNumber - 1;
  if (chosenAnswer === store.questions[qNum].correctAnswer){
    questionCorrect = true;
    console.log("correct!");
    store.score += 1;
  }
  else{
    console.log("nope :(");
    questionCorrect = false;
  }
  questionPage = createCheckedAnswerPageTemp(questionCorrect)
  return questionPage;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function whichPageToRender(){
  console.log("whichPageToRender run");
  let htmlString = ""
  if (store.quizStarted === false){
    console.log('sending to start');
    htmlString = createStartPageTemp();
  }
  else if (store.questionAnswered === true){
    console.log("question needs to be graded");
    htmlString = checkAnswer();
  }
  else if(store.questionNumber === 5){
    console.log('sending to end');
    htmlString = createEndPageTemp();
  }
  else{
    htmlString = createQuestionPageTemp();
    console.log('sending to question');
  }
  return htmlString
}

function renderContent(){
  console.log("renderContent run");
  const pageToRender = whichPageToRender(); 
  $('main').html(pageToRender);
}




/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

function handleStartClick(){
  $('main').on('click','.js-begin-quiz', event =>{  
    console.log("handleStartClick run"); 
    store.quizStarted = !store.quizStarted;
    console.log(store.quizStarted);
    renderContent();
  })
}

function handleSubmitAnswerClick(){
  $('main').on('click','.js-submit-answer', event => {
    console.log("handleSubmitAnswerClick");
    event.preventDefault();
    const ansValue = $("input[name='answer']:checked", "#js-question-form").val(); 
    if (ansValue === undefined){
      alert("You must select an answer before continuing to the next question.")
    }
    else{
      store.questionAnswered = !store.questionAnswered;
      console.log(store.questionAnswered);
      renderContent();
    }
  })
}

function handleStartNewQuiz(){
  $('main').on('click','.js-restart-quiz', event => {
    console.log("handleStartNewQuiz");
    store.questionNumber = 0;
    store.quizStarted = !store.quizStarted;
    store.score = 0;
    renderContent();
  })
}

function handleNextButton(){
  console.log("handleNextButton");
  $('main').on('click', '.js-next', event =>{
    event.preventDefault();
    store.questionAnswered = !store.questionAnswered;
    renderContent();
  });
}

/********** CALLBACK FUNCTIONS **********/
function callbackFun(){
  renderContent();
  handleStartClick();
  handleSubmitAnswerClick();
  handleStartNewQuiz();
  handleNextButton();
}

$(callbackFun);