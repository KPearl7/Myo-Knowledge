let currentNumber = 0;
let score = 0;
let quizSize = quizStore.length

$(document).ready(function () {
  
  $('#start-button').click(function (e) {
    event.preventDefault();
    $('header').hide();
    $('.passFail').hide();
    $('.quiz-content').show();
    questionTemplate();
  });

  $('main form').on('click', 'input[type="radio"]', function () {
    $('.highlight').removeClass('highlight');
    let id = $(this).attr('id');
    $(this).addClass('highlight');
    $(this).siblings('label[for="' + id + '"]').addClass('highlight');
  });

  $(' form').submit(function (e) {
    e.preventDefault();
    if ($('input.highlight').length) {
      let guess = parseInt($('input.highlight').attr('id')
      );
      console.log(guess);
      checkAnswer(guess);
    } else {
      alert('Flex your knowledge, select an answer');
    }
  });

  $('#restart-button').click(function (e) {
    e.preventDefault();
    restartQuiz();
  });

  $('.continue').on('click', function(e) {
    e.preventDefault();
    $('.passFail').hide();
    $('.quizContent').show();
    if (currentNumber >= quizStore.length) {
     loadSummary();
    } else {
     questionTemplate();
    }
  })

});



//render question template
function questionTemplate() {
  let quizQuestion = quizStore[currentNumber];
  $('main h1').text(quizQuestion.question);
  $('main form .answers').html('');
  for (var i = 0; i < quizQuestion.choices.length; i++) {
    $('main form .answers').append(`<p><input type="radio" name="answer" id="${i}"/><label for="${i}">${quizQuestion.choices[i]}</label></p>`);
  }
  let questionStatus = `Question: ${quizQuestion.questionNumber}/${quizSize}`
  let scoreStatus = `Score: ${score}/${currentNumber}`

  $('main #question-info').text(questionStatus);
  $('main #score-info').text(scoreStatus);
}

function rightAnswer() {
  $('#correctAnswer').show();
}

function wrongAnswer() {
  $('#incorrectAnswer').show();
   let quizQuestion = quizStore[currentNumber]
  $('#answerSolution').text(`The right answer is:              ${quizQuestion.choices[quizQuestion.answer]}`);
 
}
function checkAnswer(guess) {
  $('.quizContent').hide();
  let quizQuestion = quizStore[currentNumber] 
  if (quizQuestion.answer === guess) {
    rightAnswer()
    score++
  } else {
    wrongAnswer();
  }
  currentNumber++;
}

function loadSummary() {
  $('main').hide();
  $('.lastPage').show();
  $('.lastPage p').text(`Your score is ${score} out of ${quizStore.length}`)
}

function restartQuiz() {
  $('.lastPage').hide();
  $('main').show();
  currentNumber = 0;
  score = 0;
  questionTemplate();
}