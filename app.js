// theme changer
const lightIcon = document.getElementById('sun-icon');
const darkIcon = document.getElementById('moon-icon');

window.addEventListener('load', function() {
  if(document.body.classList.contains('dark')) {
    lightIcon.style.opacity = "0.5";
    darkIcon.style.opacity = "1";
    } else {
      darkIcon.style.opacity = "0.5";
    lightIcon.style.opacity = "1";
  }
});

// dark icon click event
darkIcon.addEventListener('click', () => {
  document.body.classList.add('dark');
  lightIcon.style.opacity = "o.5";
  darkIcon.style.opacity = "1";
});

// light icon click event
lightIcon.addEventListener('click', () => {
  document.body.classList.remove('dark');
  darkIcon.style.opacity = "0.5";
  lightIcon.style.opacity = "1";
});

// selector
const historyValue = document.getElementById('history-value');
const outputValue = document.getElementById('output-value');

// getHistory function
function getHistory() {
  return historyValue.innerText;
}

// printHistory function
function printHistory(num) {
  historyValue.innerText = num;
}

// getOutput function
function getOutput() {
  return outputValue.innerText;
}

// printOutput function
function printOutput(num) {
  if(num == "") {
    outputValue.innerHTML = num;
  } else {
    outputValue.innerText = getFormattedNumber(num);
  }
}

// add comma to the number
function getFormattedNumber(num) {
  if(num == "-") {
    return "";
  }

  let n = Number(num);
  let value = n.toLocaleString("eg");
  return value;
}

// remove comma in reverse
function reverseFormattedNumber(num) {
  return Number(num.replace(/,/g, ''));
}

// select all operator buttons
const operator = document.getElementsByClassName('operator');
// run for loop 
for(let i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', function() {
    
    if(this.id == "clear") {
      printOutput("");
      printHistory("");
    } else if(this.id == "backspace") {
      let output = reverseFormattedNumber(getOutput()).toString();

      // if output has a value
      if(output) {
        output = output.substring(0, output.length - 1);
        printOutput(output);
      }
    } else {
      
      let history = getHistory();
      let output = getOutput();

      if(output == "" && history != "") {
        if(isNaN(history[history.length - 1])) {
          history = history.substring(0, history.length - 1);
        }
      }

      if(output != "" || history != "") {
        output = output == "" ? output : reverseFormattedNumber(output);
        history += output;

        if(this.id == "=") {
          let result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history += this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  })
};

// select all number buttons
const number = document.getElementsByClassName('number');
// run for loop
for(let i = 0; i < number.length; i++) {
  number[i].addEventListener('click', function() {
    let output = reverseFormattedNumber(getOutput());
    if(output != NaN) {
      output += this.id;
      printOutput(output);
    }
  })
};