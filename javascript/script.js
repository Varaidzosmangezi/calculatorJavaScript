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
        console.log(this.currentOperand)
    }
    chooseOperator (operator) {
        if (this.currentOperand ==='') {
            return;
        }
        if (this.previousOperand !== '') {
            this.operate ();
        }
        this.operator = operator;
        console.log(this.operator)
        this.previousOperand = this.currentOperand + this.operator;
        this.currentOperand = ''
    }
    operate () {
        let answer;
        const floatCurrentOperand = parseFloat(this.currentOperand);
        const floatPreviousOperand = parseFloat(this.previousOperand);
        console.log(floatCurrentOperand , floatPreviousOperand)
        if (isNaN(floatPreviousOperand) || isNaN(floatCurrentOperand)) return
            switch (this.operator) {
                case '+':
                    answer = floatPreviousOperand + floatCurrentOperand;
                    break;
                case '-':
                    answer = floatPreviousOperand - floatCurrentOperand;
                    break;
                case '*':
                    answer = floatPreviousOperand * floatCurrentOperand;
                    break;
                case '/':
                    if (floatCurrentOperand === 0){
                        this.currentOperand = '';
                        this.previousOperand = '';
                        this.operator = undefined;
                        return
                    }
                    answer = floatPreviousOperand / floatCurrentOperand;
                    break;
                default:
                    return
        }
        this.currentOperand = answer;
        this.previousOperand = ''
        this.operation = undefined;
    }

    updateDisplay (){
        currentOperandDisplay.textContent = this.currentOperand;
        previousOperandDisplay.textContent = this.previousOperand ;
    }
   
    delete () {
        this.currentOperand = this.currentOperand.slice(0,-1);

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
