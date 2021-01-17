let buffer = "";
let symbol = "";
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
    console.log("handle symbol: ", value);
    symbol = value;
    switch (symbol) {
        case "C":
            display.innerText = "0"
            buffer = "";            
            stack = [];
            break;
        case "=":
            calc();
            break;
        }
    
    stack.push(value);
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
}

function rerender() {
    display.innerText = buffer;
}

function init() {
    console.log("run init...");
    document.querySelector(".keypad-buttons").addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
      });
}

init();
