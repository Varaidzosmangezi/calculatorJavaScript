const digitButtons = document.querySelectorAll('.digits');
const operatorButtons = document.querySelectorAll('.operators');
const allClearButton = document.querySelector('.all-clear');
const deleteButton = document.querySelector('.delete');
const equalToButton = document.querySelector('.equal-to');
const currentOperandDisplay = document.querySelector('.current-operand')
const previousOperandDisplay = document.querySelector('.previous-operand')

class Calculator {
    constructor(previousOperandDisplay, currentOperandDisplay) {
        this.previousOperandDisplay = previousOperandDisplay;
        this.currentOperandDisplay = currentOperandDisplay;
        this.allClear()
    }
    allClear () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = undefined;

    }
    appendNumber (number) {
        if (number === '.' && this.currentOperand.includes('.'))return;
        this.currentOperand += number;
    }
    chooseOperator (operator) {
        if (this.currentOperand ==='') {
            return;
        }
        if (this.previousOperand !== '') {
            this.operate ();
        }
        this.operator = operator;
       if (this.previousOperand.includes(operator))return
        this.previousOperand = this.currentOperand + this.operator;
        this.currentOperand = ''
    }
    
    operate (answer) {
        const floatCurrentOperand = parseFloat(this.currentOperand);
        const floatPreviousOperand = parseFloat(this.previousOperand);
        (floatCurrentOperand , floatPreviousOperand)
        if (isNaN(floatPreviousOperand) || isNaN(floatCurrentOperand)) return
            switch (this.operator) {
                case '+':
                    this.addition(floatPreviousOperand,floatCurrentOperand);
                    (floatCurrentOperand, floatPreviousOperand)
                    break;
                case '-':
                    this.subtraction(floatPreviousOperand,floatCurrentOperand);
                    break;
                case '*':
                    this.multiplication(floatPreviousOperand,floatCurrentOperand);
                    break;
                case '/':
                    if (floatCurrentOperand === 0){
                        this.currentOperand = `Oh no! you can't divide by zero`;
                        this.previousOperand = '';
                        this.operator = undefined;
                        return
                    }
                    this.division (floatPreviousOperand,floatCurrentOperand);
                    break;
                default:
                    return
        }
        this.previousOperand = ''
        this.operation = undefined;
    }

    addition(a,b) {
        let answer = 0
        answer = a + b;
        this.currentOperand = answer;
    }
    subtraction (a,b) {
        let answer = 0
        answer = a - b;
        this.currentOperand = answer;
    }
    multiplication (a,b) {
        let answer = 0
        answer = a * b;
        this.currentOperand = answer;
    }
    division (a,b) {
        if (b === 0) return;
        let answer = 0
        answer = a / b;
        this.currentOperand = answer;
    }

    updateDisplay (){
        currentOperandDisplay.textContent = this.currentOperand;
        previousOperandDisplay.textContent = this.previousOperand ;
    }
    
    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);

    }
}
const calculator = new Calculator ();

digitButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.id)
        calculator.updateDisplay ();
    })
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.id)
        calculator.updateDisplay ();
    })
})


equalToButton.addEventListener('click', button => {
    calculator.operate ();
    calculator.updateDisplay ();;
    })

allClearButton.addEventListener('click', button => {
    calculator.allClear ();
    calculator.updateDisplay ();
    })

deleteButton.addEventListener('click', button => {
    calculator.delete ();
    calculator.updateDisplay ();   
    })
