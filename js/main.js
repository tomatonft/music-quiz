'use strict';
{
  // スマホでの100vhの見え方の違いを調節（#main-visual) 
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // iOSでのスクロール禁止
  function disableScroll(event) {
    event.preventDefault();
  }
  document.addEventListener('touchmove', disableScroll, { passive: false });

  // クイズのコード
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.getElementById('score-label');
  const scoreLabelMessage = document.getElementById('score-label-message');
  const correctAnswer = document.getElementById('correct-answer');
  const wrongAnswer = document.getElementById('wrong-answer');
  const correction = document.getElementById('correction');
  const celebration = document.getElementById('celebration');
  const balloons = document.querySelectorAll('.balloons > i');
  const remainingNumbers = document.querySelector('#remaining-numbers > p');
  let vw = window.innerWidth;

  const quizSet = shuffle([
    {q: 'img/do.png', c: ['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ']},
    {q: 'img/re.png', c: ['レ', 'ド', 'ミ', 'ファ', 'ソ', 'ラ', 'シ']},
    {q: 'img/mi.png', c: ['ミ', 'レ', 'ド', 'ファ', 'ソ', 'ラ', 'シ']},
    {q: 'img/fa.png', c: ['ファ', 'レ', 'ド', 'ミ', 'ソ', 'ラ', 'シ']},
    {q: 'img/sol.png', c: ['ソ', 'レ', 'ド', 'ミ', 'ファ', 'ラ', 'シ']},
    {q: 'img/la.png', c: ['ラ', 'レ', 'ド', 'ミ', 'ソ', 'ファ', 'シ']},
    {q: 'img/si.png', c: ['シ', 'レ', 'ド', 'ミ', 'ソ', 'ラ', 'ファ']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    // if (isAnswered === true) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      correctAnswer.classList.remove('hidden');  // 追加
      score++;
    } else {
      li.classList.add('wrong');
      wrongAnswer.classList.remove('hidden');  // 追加
      correction.textContent = `せいかいは、${quizSet[currentNum].c[0]}だよ！`;
    }

    btn.classList.remove('disabled');
 }

  function setQuiz() {
    isAnswered = false;
    const img_notes = document.createElement('img');
    img_notes.src = quizSet[currentNum].q;
      if (vw > 600) {
        img_notes.height = 350 - 24 - 14;
      } else {
        img_notes.height = 350 - 24 - 14 - 60;
      }
     
    question.appendChild(img_notes);
    remainingNumbers.textContent = `あと${quizSet.length - currentNum}もん！！`;
    correctAnswer.classList.add('hidden');  // 追加
    wrongAnswer.classList.add('hidden');  // 追加

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1 ) {
      btn.textContent = 'けっかはっぴょう！';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1 && score === quizSet.length) {
      
      remainingNumbers.textContent = '';
      celebration.classList.remove('hidden');
      balloons.forEach(balloon => {
        balloon.classList.add('appear');
      });

    }  else if (currentNum === quizSet.length - 1) {

      scoreLabel.textContent = `${quizSet.length}もんちゅう ${score}もんせいかい！`;
      result.classList.remove('hidden');
      remainingNumbers.textContent = '';

      if (score >= quizSet.length * 0.8) {
        scoreLabelMessage.textContent = 'おしい！あとすこし！！';
      } else if (score < quizSet.length * 0.8 && score >= quizSet.length * 0.5) {
        scoreLabelMessage.textContent = 'もうすこしがんばろう！';
      } else {
        scoreLabelMessage.textContent = 'もういちどふくしゅうしよう！';
      }

    } else {
      
      currentNum++;
      while(question.firstChild) {
       question.removeChild(question.firstChild);
     }
      setQuiz();
    }
    // if (currentNum === quizSet.length - 1) {
    //    scoreLabel.textContent = `${quizSet.length}もんちゅう ${score}もんせいかい！`;
    //    result.classList.remove('hidden');

    //    if (score === quizSet.length) {
    //     celebration.classList.remove('hidden');
    //    }
    // } else {
    //   currentNum++;
    //   while(question.firstChild) {
    //    question.removeChild(question.firstChild);
    //  }
    //   setQuiz();
    // }
  });

  // 全問正解の場合は風船フワー
  // もう一回やってみようは点滅させる

  // const imageArea = document.getElementById('imageArea');
  // const images = ['img/do.png', 'img/re.png', 'img/mi.png', 'img/fa.png', 'img/sol.png', 'img/la.png', 'img/si.png'];
  
  // const imageNo = Math.floor( Math.random() * images.length)
  // imageArea.src = images[imageNo];

}