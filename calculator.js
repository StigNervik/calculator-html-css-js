let buffer = "";
let stack = [];

const display = document.querySelector(".display");

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
      handleSymbol(value);
    } else {
      handleNumber(value);
    }
}

function handleNumber(value) {
    if (stack.length == 0) {
        buffer = value;
        stack.push(value);
    } else if (stack.length == 1) {
        buffer = buffer + value;
        stack[0] = buffer;
    } else if (stack.length == 2) {
        buffer = value;
        stack[2] = value;
    } else if (stack.length == 3) {
        buffer = buffer + value;
        stack[2] = buffer;
    }
    
    rerender();
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            display.innerText = "0";
            buffer = "";            
            stack = [];
            break;
        case "=":
            calc();
            break;
        case "<-":
            if (display.innerText.length === 1) {
                display.innerText = "0";
                buffer = "";
            } else {
                display.innerText = display.innerText.slice(0, -1);
                buffer = display.innerText;
                stack[stack.length-1] = buffer;
            }
            break;    
        default:
            if (stack.length == 1) {
                stack.push(value);
            } else {
                calc();
                stack.push(value);
            }
        }
}

function calc() {
    if (stack.length !== 3) {
        return;
    }

    switch (stack[1]) {
        case "/":
            display.innerText = parseInt(stack[0]) / parseInt(stack[2]);
            break;
        case "X":
            display.innerText = parseInt(stack[0]) * parseInt(stack[2]);
            break;
        case "-":
            display.innerText = parseInt(stack[0]) - parseInt(stack[2]);
            break;
        case "+":
            display.innerText = parseInt(stack[0]) + parseInt(stack[2]);
            break;
    }        

    buffer = "";
    stack = [];
    stack.push(display.innerText);
}

function rerender() {
    display.innerText = buffer;
}

function init() {
    document.querySelector(".keypad-buttons").addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
      });
}

init();
