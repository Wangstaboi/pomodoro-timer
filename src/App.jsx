
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {

const [minutes, setMinutes] = useState('00');
const [seconds, setSeconds] = useState('10');
const [buttonText, setButtonText] = useState('Pause');
const [start, setStart] = useState(false);

const myRef = useRef(null);
const audio = document.querySelector('#alarm');
const num = {
  0: '00',
  1: '01',
  2: '02',
  3: '03',
  4: '04',
  5: '05',
  6: '06',
  7: '07',
  8: '08',
  9: '09',
}

function startButton() {
  setStart(true);
  console.log({"Path": myRef.current.src})
}

function pauseButton() {
  const resume = 'Resume';

  if (start) {
    setStart(false);
    setButtonText('Resume');
  } else {
    setStart(true);
    setButtonText('Pause');
  }
}

function resetButton() {

}

/*
function startTimer() {
 
    if (seconds === '00') {
      const intervalMin = setInterval(() => {
        setMinutes(decrementMinutes());
      }, 1000);
      return () => clearInterval(intervalMin);
    } else {
      const intervalSec = setInterval(() => {
        setSeconds(decrementSeconds());
      }, 1000);
      return () => clearInterval(intervalSec);
    }
  }
*/
useEffect(() => {
  if (start === true) {
    if ((seconds === '0' || seconds === '00') && minutes > 0) {
      const intervalMin = setInterval(() => {
        setMinutes(decrementMinutes());
      }, 1000);
      return () => clearInterval(intervalMin);
    } else {
      if (seconds > 0) {
        const intervalSec = setInterval(() => {
          setSeconds(decrementSeconds());
        }, 1000);
        return () => clearInterval(intervalSec);
      }
    }
  }

  if (seconds === '00' && minutes === '00') {
    myRef.current.play();
    if (audio.currentTime == 10) {
      myRef.current.currentTime = 0;
      myRef.current.stop();
    }
  }

//Async function needed? This doesn't work.
/*const playSound = async () => {
    let path = myRef.current.src;
    let importRes = await import(path);
    let sound = new Audio(importRes.default);
    sound.type = 'audio/mp3';
    if (seconds === '00' && minutes === '00') {
      sound.play();
      if (sound.currentTime == 10) {
        sound.currentTime = 0;
        sound.stop();
      }
    }
  }
  playSound();
  */

}, [start, minutes, seconds, decrementMinutes, decrementSeconds, audio])

//Functions that change time
function decrementMinutes() {
  let intMinute = Number(minutes);
  intMinute--;
  setSeconds('59');
  if (intMinute < 10) {
    return num[intMinute];
  } else 
  return intMinute.toString();
 
}


function decrementSeconds() {
  let intSeconds = Number(seconds);
  intSeconds--;
  if (intSeconds < 10) {
    return num[intSeconds];
  } else {
    return intSeconds.toString();
  }
  
}

function reset(){
  setStart(false);
  setMinutes('00');
  setSeconds('10');
  setButtonText('Pause');

}

//https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav
//./public/assets/Softchime.mp3
  return (
    <div className="App">
      <h1 id="title">Pomodoro Timer</h1>
        <div id="timer">
          <h1 id="test" dangerouslySetInnerHTML={{__html: minutes}}></h1>
            <div id="colon">
              <h1 id="idk">:</h1>
            </div>
          <h1 id="seconds" dangerouslySetInnerHTML={{__html: seconds}}></h1>
          <audio id="alarm" type="audio/mpeg" src="./public/assets/Softchime.mp3" ref={myRef}></audio>
        </div>
      <div>
        <button id="start" className='buttons' onClick={startButton}>Start</button>
        <button id="pause" className='buttons' onClick={pauseButton}>{buttonText}</button>
        <button id="reset" className='buttons' onClick={reset}>Reset</button>
      </div>
      
    </div>
  );
}

export default App;
