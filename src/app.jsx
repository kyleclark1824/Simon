import React from 'react';
import Navigation from './components/Navigation';
import 'normalize.css';
import 'styles/index.scss';

const controller = function(){
  this.sequence = [];
  this.guessNum = 0;
};
var inst = new controller();

controller.prototype.updateState = function(num){
  console.log("guessed: ", num, " seq: ", this.sequence);
  if (parseInt(num) !== this.sequence[this.guessNum]){
    alert("failed: " + "  Correct response = " +  this.sequence[this.guessNum]);
    toggleStart();
    this.resetState();
    return;
  }
  if (this.guessNum + 1 === this.sequence.length){
    this.guessNum = 0;
    this.incrementSequence()
      .then(function(){
        return;
      })
  } else {
    this.guessNum++;
  }
};

controller.prototype.resetState = function(){
  this.sequence = [];
  this.guessNum = 0;
};

controller.prototype.incrementSequence = function() {
  var that = this;
  return Promise.resolve()
    .then(function(){
      that.sequence.push(getRandomArbitrary());
      return runSequence(that.sequence);
    })

}

controller.prototype.start = function(){
  toggleStart();
  this.incrementSequence();
};

function toggleStart() {
  var button = document.getElementById('startButton');
  if (button.style.display == 'none'){
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
}

function getRandomArbitrary() {
    return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
}

const delay = (duration) =>
  new Promise(resolve => setTimeout(resolve, duration));

const runSequence =  (seq) => {
  return Promise.resolve()
  .then(async () => {
    seq.forEach(async (val, i) => {
      await delay(i * 1000);
      if (seq[i] === seq[i+1]){
        switch (val){
          case 1:
            document.getElementById(val).classList.add('glowingYellowRepeat');
            break;
          case 2:
            document.getElementById(val).classList.add('glowingBlueRepeat');
            break;
          case 3:
            document.getElementById(val).classList.add('glowingGreenRepeat');
            break;
          case 4:
            document.getElementById(val).classList.add('glowingRedRepeat');
            break;
        }
        await delay(2000);
      } else {
        switch (val){
          case 1:
            document.getElementById(val).classList.add('glowingYellow');
            break;
          case 2:
            document.getElementById(val).classList.add('glowingBlue');
            break;
          case 3:
            document.getElementById(val).classList.add('glowingGreen');
            break;
          case 4:
            document.getElementById(val).classList.add('glowingRed');
            break;
        }
        await delay(1000);
      }
      var el = document.getElementById(val);
      var prefix = "glowing";
      var classes = el.className.split(" ").filter(function(c) {
          return c.lastIndexOf(prefix, 0) !== 0;
      });
      el.className = classes.join(" ").trim();
    });
    return await delay(seq.length + 1 * 2000);

  })
  .then(() => {
    //showButtons();
  })

}


const showButtons = () => {
  var buttons = document.getElementsByClassName('buttonGroup');
  buttons[0].style.display = "block";
  buttons[1].style.display = "block";
  buttons[2].style.display = "block";
  buttons[3].style.display = "block";
};

const hideButtons = () => {
  var buttons = document.getElementsByClassName('buttonGroup');
  buttons[0].style.display = "none";
  buttons[1].style.display = "none";
  buttons[2].style.display = "none";
  buttons[3].style.display = "none";
}

const App = function(){
  return (
    <div style= {{textAlign:'center'}}>
      <div>
        <h1>Hello</h1>
        <p>This is a test</p>
      </div>
      <table className="center">
        <tbody>
          <tr className="row">
            <td className="col">
              <Yellow/>
            </td>
            <td className="col">
              <Blue/>
            </td>
          </tr>
          <tr className="row">
            <td className="col">
              <Green/>
            </td>
            <td className="col">
              <Red/>
            </td>
          </tr>
        </tbody>
      </table>
      <Start/>
    </div>
  );
}

export default App;

const Yellow = function(){
    return (
        <button id="1" onClick={ () => {inst.updateState(1)}} className="yellow buttonGroup">
        </button>
    );
};

const Blue = function() {
    return (
        <button id="2"onClick={ () => {inst.updateState(2)}} className="blue buttonGroup">
        </button>
    );

};

const Green = function(){
    return (
      <button id="3"onClick={ () => {inst.updateState(3)}} className="green buttonGroup">
      </button>
    );
};

const Red = function(){
    return (
        <button id="4" onClick={ () => {inst.updateState(4)}} className="red buttonGroup">
        </button>
    );

};

const Start = function() {
  return (
    <button id ="startButton" onClick={ () => {inst.start()}} className="startButton">
      Start
    </button>
  )
};
