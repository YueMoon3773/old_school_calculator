/*

*/

let num1Arr = [];
let num2Arr = [];
let equation = {
    num1: null,
    num2: null,
    operator: '',
    operatorSymbol: '',
    result: null,
};
let isFirstNum = true;

const btnNumList = Array.from(document.querySelectorAll('.btn_num'));
const btnOperatorList = Array.from(document.querySelectorAll('.btn_operator'));

const btnResult = document.querySelector('#result');
const btnInverse = document.querySelector('#inverse');
const btnPercentage = document.querySelector('#percent');

const btnClear = document.querySelector('#clear');
const btnDel = document.querySelector('#del');

const displayLine1 = document.querySelector('.display_line_1');
const displayLine2 = document.querySelector('.display_line_2');

const add = (a, b) => {
    let ret = a + b;
    if (Number.isInteger(ret)) {
        return ret;
    } else {
        let tmp = (ret + '').split('.');
        if (tmp[1].length > 3) {
            return Number(ret.toFixed(3));
        } else {
            return Number(ret);
        }
    }
};
const subtract = (a, b) => {
    let ret = a - b;
    if (Number.isInteger(ret)) {
        return ret;
    } else {
        let tmp = (ret + '').split('.');
        if (tmp[1].length > 3) {
            return Number(ret.toFixed(3));
        } else {
            return Number(ret);
        }
    }
};
const multiply = (a, b) => {
    let ret = a * b;
    if (Number.isInteger(ret)) {
        return ret;
    } else {
        let tmp = (ret + '').split('.');
        if (tmp[1].length > 3) {
            return Number(ret.toFixed(3));
        } else {
            return Number(ret);
        }
    }
};
const divide = (a, b) => {
    let ret = a / b;
    if (Number.isInteger(ret)) {
        return ret;
    } else {
        let tmp = (ret + '').split('.');
        if (tmp[1].length > 3) {
            return Number(ret.toFixed(3));
        } else {
            return Number(ret);
        }
    }
};

const operate = (a, operator, b) => {
    switch (operator) {
        case 'add':
            equation.result = add(a, b);
            break;
        case 'subtract':
            equation.result = subtract(a, b);
            break;
        case 'multiply':
            equation.result = multiply(a, b);
            break;
        case 'divide':
            equation.result = divide(a, b);
            break;
        default:
            throw new Error('Unknown operation, please check again.');
    }
};

const clearAllMemory = (equation) => {
    num1Arr.length = 0;
    num2Arr.length = 0;
    equation.num1 = null;
    equation.num2 = null;
    equation.operator = '';
    equation.operatorSymbol = '';
    equation.result = null;
    isFirstNum = true;
    displayLine1.textContent = '';
    displayLine2.textContent = '';
};

btnOperatorList.forEach((btnOperator) => {
    btnOperator.addEventListener('click', () => {
        // console.log('***isFirstNum status OPERATION start: ', isFirstNum);

        let displayFirstNum = '';
        let tmpOperator = '';
        let tmpOperatorSymbol = '';

        if (equation.operator === '') {
            equation.operator = btnOperator.value;
        } else {
            tmpOperator = equation.operator;
            tmpOperatorSymbol = equation.operatorSymbol;
            equation.operator = btnOperator.value;
        }
        switch (equation.operator) {
            case 'add':
                equation.operatorSymbol = '+';
                break;
            case 'subtract':
                equation.operatorSymbol = '-';
                break;
            case 'multiply':
                equation.operatorSymbol = 'x';
                break;
            case 'divide':
                equation.operatorSymbol = '÷';
                break;
            default:
                alert('Unknown operation, please check again.');
                throw new Error('Unknown operation, please check again.');
        }

        if (equation.num2 === 0 && tmpOperator === 'divide') {
            //in case user divide to 0 show error and clear all
            // console.log('~~~IF1');

            clearAllMemory(equation);
            displayFirstNum = '';
            alert('INVALID OPERATION! CLEARED ALL STORED NUMBERS IN MEMORY');
        } else if (isFirstNum && equation.num1 !== null && equation.num2 === null && equation.result === null) {
            //normal equation num1 + num2 =
            // console.log('~~~IF2');

            isFirstNum = false;
            displayFirstNum = equation.num1;
            num1Arr.length = 0;
        } else if (isFirstNum && equation.num1 === null && equation.num2 === null && equation.result !== null) {
            //after press = press more equation
            // console.log('~~~IF3');
            equation.num1 = equation.result;
            displayFirstNum = equation.num1;
            isFirstNum = false;
            num2Arr.length = 0;
            displayLine2.textContent = equation.result;
        } else if (
            (!isFirstNum && equation.num1 !== null && equation.num2 !== null && equation.result !== null) ||
            (!isFirstNum && equation.num1 !== null && equation.num2 !== null && equation.result === null)
        ) {
            //case operation after operation => calculate the previous operation and continue
            // console.log('~~~IF4');

            operate(equation.num1, tmpOperator, equation.num2);
            equation.num1 = equation.result;
            displayFirstNum = equation.num1;
            // equation.result = null;
            equation.num2 = null;
            num1Arr.length = 0;
            num2Arr.length = 0;
            displayLine2.textContent = equation.result;
        } else if (!isFirstNum && equation.num1 !== null && equation.num2 === null && equation.result !== null) {
            //user want to change equation
            // console.log('~~~IF5');

            displayFirstNum = equation.num1;
        }

        // }

        displayLine1.textContent = displayFirstNum + ` ${equation.operatorSymbol} `;

        // console.log(`${num1Arr}   |   ${num2Arr}`);
        // console.log('operation btn: ', equation);
        // console.log('***isFirstNum status OPERATION end: ', isFirstNum);
    });
});

btnNumList.forEach((btnNum) => {
    btnNum.addEventListener('click', () => {
        // console.log('***isFirstNum status NUM btn start: ', isFirstNum);

        if (isFirstNum) {
            if (btnNum.textContent !== '-') {
            }
            if (num1Arr.includes('.')) {
                if (btnNum.textContent !== '.') {
                    num1Arr.push(btnNum.textContent);
                }
            } else {
                if (num1Arr.length === 0 && btnNum.textContent === '.') {
                    num1Arr.push(0);
                    num1Arr.push(btnNum.textContent);
                } else if (num1Arr.length === 0 && btnNum.textContent !== '.') {
                    num1Arr.push(btnNum.textContent);
                } else if (num1Arr.length !== 0 && btnNum.textContent === '.') {
                    num1Arr.push('.');
                } else {
                    num1Arr.push(btnNum.textContent);
                }
            }
            equation.num1 = Number(num1Arr.join(''));
            displayLine2.textContent = num1Arr.join('');
        } else {
            if (num2Arr.includes('.')) {
                if (btnNum.textContent !== '.') {
                    num2Arr.push(btnNum.textContent);
                }
            } else {
                if (num2Arr.length === 0 && btnNum.textContent === '.') {
                    num2Arr.push(0);
                    num2Arr.push(btnNum.textContent);
                } else if (num2Arr.length === 0 && btnNum.textContent !== '.') {
                    num2Arr.push(btnNum.textContent);
                } else if (num2Arr.length !== 0 && btnNum.textContent === '.') {
                    num2Arr.push('.');
                } else {
                    num2Arr.push(btnNum.textContent);
                }
            }
            equation.num2 = Number(num2Arr.join(''));
            displayLine2.textContent = num2Arr.join('');
        }

        // console.log(`${num1Arr}   |   ${num2Arr}`);
        // console.log('add num final: ', equation);
        // console.log('***isFirstNum status NUM btn end: ', isFirstNum);

        return equation;
    });
});

btnResult.addEventListener('click', () => {
    if (equation.num1 !== null && equation.num2 !== null) {
        if (equation.num2 === 0 && equation.operator === 'divide') {
            clearAllMemory(equation);
            displayLine1.textContent = '';
            displayLine2.textContent = '';
            alert('INVALID OPERATION! CLEARED ALL STORED NUMBERS IN MEMORY');
        } else {
            operate(equation.num1, equation.operator, equation.num2);

            displayLine1.textContent = `${equation.num1} ${equation.operatorSymbol} ${equation.num2} =`;
            displayLine2.textContent = `${equation.result}`;

            // console.log('result btn start: ', equation);
            isFirstNum = true;
            equation.num1 = null;
            equation.num2 = null;
            num1Arr.length = 0;
            num2Arr.length = 0;
            // console.log('result btn end: ', equation);
            // console.log('***isFirstNum RESULT num btn: ', isFirstNum);
        }
    } else {
        alert('Please enter the number to calculate.');
    }
});

btnClear.addEventListener('click', () => {
    clearAllMemory(equation);
});

btnDel.addEventListener('click', () => {
    if (isFirstNum) {
        num1Arr.pop();
        equation.num1 = num1Arr.join('');
        displayLine2.textContent = num1Arr.join('');
    } else {
        num2Arr.pop();
        equation.num2 = num2Arr.join('');
        displayLine2.textContent = num2Arr.join('');
    }
    // console.log('del btn end: ', equation);
    // console.log(`${num1Arr}   |   ${num2Arr}`);
    // console.log('***isFirstNum status DEL btn end: ', isFirstNum);
});

btnInverse.addEventListener('click', () => {
    if (equation.num1 !== null || equation.num2 !== null) {
        if (equation.num1 > 0 || equation.num2 > 0) {
            displayLine2.prepend('-');
            if (isFirstNum) {
                num1Arr.unshift('-');
                equation.num1 = -Math.abs(equation.num1);
            } else {
                num2Arr.unshift('-');
                equation.num2 = -Math.abs(equation.num2);
            }
        } else if (equation.num1 < 0 || equation.num2 < 0) {
            displayLine2.textContent = displayLine2.textContent.slice(1);
            if (isFirstNum) {
                num1Arr.shift();
                equation.num1 = Math.abs(equation.num1);
            } else {
                num2Arr.shift();
                equation.num2 = Math.abs(equation.num2);
            }
        }
    }

    // console.log('invert btn end: ', equation);
    // console.log(`${num1Arr}   |   ${num2Arr}`);
    // console.log('***isFirstNum status INVERT btn end: ', isFirstNum);
});

btnPercentage.addEventListener('click', () => {
    if (isFirstNum) {
        num1Arr.length = 0;
        // num1Arr.push(0);
        equation.num1 = equation.num1 / 100;
        displayLine1.textContent = equation.num1;
        displayLine2.textContent = equation.num1;
    } else {
        num2Arr.length = 0;
        equation.num2 = equation.num2 / 100;
        displayLine2.textContent = equation.num2;
        displayLine1.textContent = equation.num1 + ' ' + equation.operatorSymbol + ' ' + equation.num2;
    }

    // console.log('percent btn end: ', equation);
    // console.log(`${num1Arr}   |   ${num2Arr}`);
    // console.log('***isFirstNum status PERCENT btn end: ', isFirstNum);
});
