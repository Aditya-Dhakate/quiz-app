
const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const  _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');


let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;


// enent listener
function enentListeners(){
    _checkBtn.addEventListener('click', checkAnswer);
    // _playAgainBtn.addEventListener('click', restartQuiz);
}


document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    enentListeners();
  _totalQuestion.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
});


async function loadQuestion(){
    const APIUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    // console.log(data.results[0]);
    _result.innerHTML = "";
    showQuestion(data.results[0]);
}

// display question and options
function showQuestion(data){
    _checkBtn.disabled = false
  let correctAnswer = data.correct_answer;
  let inCorrectAnswer = data.incorrect_answers;
//   let optionsList = inCorrectAnswer;
  let optionsList = [correctAnswer,  inCorrectAnswer[0],inCorrectAnswer[1],inCorrectAnswer[2]]
//   optionsList.splice(Math.floor(Math.floor(Math.random() * (inCorrectAnswer.lenght + 1)), 0, correctAnswer))
//   let optionsList=correctAnswer+inCorrectAnswer))
//   console.log(optionsList);    ////option in console
  console.log(correctAnswer);   ////answer in console

  _question.innerHTML = `${data.question} <br> <spna class = "category">${data.category}</span>`;
 _options.innerHTML = `
 ${optionsList.map((option, index) =>`
 <li> ${index + 1}. <span> ${option} </span> </li>`).join('')}`;
  
 selectOption();
}


// options Selection
function selectOption(){
 _options.querySelectorAll('li').forEach((option) =>{
    option.addEventListener('click' , () => {
        // console.log("hello")
        if(_options.querySelector('.selected')){
            const activeOption = _options.querySelector('.selected');
            activeOption.classList.remove('selected');
        }
        option.classList.add('selected');
    });
 });
//  console.log(correctAnswer);
}



// ansewr checked
function checkAnswer() {
 _checkBtn.disabled = true;
 if(_options.querySelector('.selected')){
    let selectedAnswer = _options.querySelector('.selected span').
     textContent;
    //  console.log(selectedAnswer)
     if(selectedAnswer.trim() == HTMLDecode(correctAnswer)){
        correctScore++;
        _result.innerHTML = `<p> <i class="fas fa-check"></i>Correct Answer!</p>`;
     }else{
        _result.innerHTML = `<p> <i class= "fas fa-times"></i>Incorrect Answer! <small><p> Correct Answer: ${correctAnswer}</small></p>`;
     }
     checkCount();
 }else{
    _result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`
    _checkBtn.disabled = false
 }
}


// 

function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
     return doc.documentElement.textContent;
}



function checkCount() {
    askedCount++;
    setCount();
    if(askedCount == _totalQuestion){
       _result.innerHTML += `<p> your score is ${correctScore}. </p>`;
       _playAgainBtn.style.display = "block";
       _checkBtn.style.display = "none"
    }else{
        setTimeout(() =>{
            loadQuestion();
        }, 300);
    }
}

function setCount() {
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}


// function restartQuiz(){
//     correctScore = askedCount = 0;
//     _playAgainBtn.style.display = "none";
//     _checkBtn.style.display = "block";
//     _checkBtn.disabled = false;
//     setCount();
//     loadQuestion();
// }