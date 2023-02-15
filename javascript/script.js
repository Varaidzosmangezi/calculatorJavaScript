const digitButtons = document.querySelectorAll('.digits');
const operatorButtons = document.querySelectorAll('.operators');
const allClearButton = document.querySelector('.all-clear');
const deleteButton = document.querySelector('.delete');
const equalToButton = document.querySelector('.equal-to');
const currentOperandDisplay = document.querySelector('.current-operand')
const previousOperandDisplay = document.querySelector('.previous-operand')

let currentOperand = '';
let previousOperand = '';
let operation = '';

function appendNumber (number) {
    if(number === '.'&& currentOperand.includes('.') ) return
    if(currentOperand[0] === '0' && number ==='0' && currentOperand.length === 1) return
    if(currentOperand.length > 8)return
    let appendedNum = currentOperand + number;
    currentOperand = appendedNum;
    return currentOperand
}
function chooseOperation (operator) {
    if (currentOperand === '' && previousOperand === '' && operation === '') return
    if (operation !== ''&& previousOperand !== ''  && currentOperand === ''){
        previousOperand = previousOperand.slice(0,-1) + operator;
        currentOperand ='';
        operation = operator;
        return
    }
    if (previousOperand === ''&& operation === ''  ) {
        previousOperand = currentOperand + operator;
        currentOperand = '';
        operation = operator;
        return
        }
    if ( previousOperand !== '' && currentOperand !=='' &&operation !== ''){
        operate ();
        operation = operator
        previousOperand = currentOperand + operator;
        if (currentOperand === `Oops! you can't divide by zero`){
            previousOperand = '';
            operation = ''
            return
        }
        else {
            currentOperand = '';
            operation = operator;
            return
        }
    }

}
function operate (){
    const floatCurrentOperand = parseFloat(currentOperand);
    const floatPreviousOperand = parseFloat(previousOperand);
    if (isNaN(floatCurrentOperand) || isNaN(floatPreviousOperand)) return
    switch (operation){
        case '+':
            addition (floatPreviousOperand, floatCurrentOperand);
            break;
        case '-':
            subtraction(floatPreviousOperand, floatCurrentOperand);
            break;
        case '*':
            multiplication(floatPreviousOperand, floatCurrentOperand);
            break;
        case '/':
            if (floatCurrentOperand === 0) {
                currentOperand = `Oops! you can't divide by zero`;
                previousOperand ='';
                operation = '';
                return
            }
            else{
                division(floatPreviousOperand, floatCurrentOperand);
            break;
            }
        default:
            break;
    }
    previousOperand = '';
    operation = '';
}

function updateDisplay () {
    currentOperandDisplay.textContent = displayFormat(currentOperand);
    previousOperandDisplay.textContent = displayFormat(previousOperand) + operation;
}

function addition (a,b) {
    let answer = a + b;
    currentOperand = answer;
    return currentOperand

}
function subtraction (a,b) {
    let answer = a - b;
    currentOperand = answer;
    return currentOperand;
}
function multiplication (a,b) {
    let answer = a * b;
    currentOperand = answer;
    return currentOperand;
}
function division (a,b) {
        let answer = a / b;
        currentOperand = answer;
}
function allClear (){
    currentOperand = '';
    previousOperand = '';
    operation ='';
}
function deleteNum (){
    currentOperand = currentOperand.slice(0,-1);
}
function displayFormat (value) {
    if (value === `Oops! you can't divide by zero`){
        let numberToDisplay = `Oops! you can't divide by zero`
        return numberToDisplay
    }
    else{
        let valueValue = parseFloat(value).toFixed(4);
        numberToDisplay = new Intl.NumberFormat().format(valueValue);
        console.log(numberToDisplay);
        if (numberToDisplay === 'NaN') {
            numberToDisplay = '';
            return numberToDisplay;
        }
        return numberToDisplay;
    }
    }


digitButtons.forEach((button) => {
    button.addEventListener('click', () => {
        appendNumber(button.id);
        updateDisplay();
        console.log(currentOperand+typeof(currentOperand), previousOperand + typeof (previousOperand));

    })
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        chooseOperation(button.id);
        updateDisplay();
        console.log(currentOperand+typeof(currentOperand), previousOperand + typeof (previousOperand))

    })
})


equalToButton.addEventListener('click', button => {
    operate();
    updateDisplay();
    })

allClearButton.addEventListener('click', button => {
    allClear();
    updateDisplay ();
    })
deleteButton.addEventListener('click', button => {
    deleteNum ();
    updateDisplay ();
})
