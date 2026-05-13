const display = document.getElementById('calc-display');
let currentInput = '0';
let previousInput = '';
let operator = null;
let resetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function handleNumber(num) {
    if (currentInput === '0' || resetDisplay) {
        currentInput = num;
        resetDisplay = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function handleDot() {
    if (resetDisplay) {
        currentInput = '0.';
        resetDisplay = false;
        updateDisplay();
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function handleOperator(op) {
    if (operator !== null && !resetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    resetDisplay = true;
}

function calculate() {
    if (operator === null || resetDisplay) return;
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '×': result = prev * curr; break;
        case '÷': result = prev / curr; break;
        case '%': result = prev % curr; break;
        default: return;
    }
    currentInput = result.toString();
    operator = null;
    resetDisplay = true;
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    resetDisplay = false;
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1 && currentInput !== '0') {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// event listeners (using IDs)
document.getElementById('0').addEventListener('click', () => handleNumber('0'));
document.getElementById('1').addEventListener('click', () => handleNumber('1'));
document.getElementById('2').addEventListener('click', () => handleNumber('2'));
document.getElementById('3').addEventListener('click', () => handleNumber('3'));
document.getElementById('4').addEventListener('click', () => handleNumber('4'));
document.getElementById('5').addEventListener('click', () => handleNumber('5'));
document.getElementById('6').addEventListener('click', () => handleNumber('6'));
document.getElementById('7').addEventListener('click', () => handleNumber('7'));
document.getElementById('8').addEventListener('click', () => handleNumber('8'));
document.getElementById('9').addEventListener('click', () => handleNumber('9'));
document.getElementById('dot').addEventListener('click', handleDot);
document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('backspace').addEventListener('click', backspace);
document.getElementById('add').addEventListener('click', () => handleOperator('+'));
document.getElementById('subtract').addEventListener('click', () => handleOperator('-'));
document.getElementById('multiply').addEventListener('click', () => handleOperator('×'));
document.getElementById('divide').addEventListener('click', () => handleOperator('÷'));
document.getElementById('percent').addEventListener('click', () => handleOperator('%'));
document.getElementById('equals').addEventListener('click', calculate);