class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperant = '';
        this.previousOperant = '';
    }
    delete(){
        this.currentOperant = this.currentOperant.toString().slice(0, -1)
    }    
    percent(){
        this.currentOperant = eval(this.currentOperant + "/100").toString();
    }
    fraction(){
        this.currentOperant = eval("1/" + this.currentOperant).toString();
    }
    chooseOperation(opr){
        if(this.currentOperant === '') return
        if(this.currentOperant.slice(-1) === "(") return
        if(this.previousOperant.includes("(")){
            this.previousOperant = "";
        }
        if(this.currentOperant.includes('(')){
            this.currentOperant += opr
        }
        else{
            this.previousOperant += this.currentOperant + opr;
            this.currentOperant = "";
        }
    }
    compute(){
        if(this.currentOperant === "")
        return
        if(this.currentOperant.slice(-1) === "(") return
        if(this.currentOperant.match(/[()]/g) !== null){
            if((this.currentOperant.match(/[(]/g).length > this.currentOperant.match(/[)]/g).length)) return 
        }
        // if((!parseFloat(this.currentOperant.slice(-1)))) return 

        const prev = this.previousOperant
        const current = this.currentOperant

        //psaní příkladu do prevOpt 
        if(this.currentOperant.includes("(")){
            this.previousOperant = prev + current
            this.currentOperant = eval(prev + current).toString();
        }
        else{
            this.currentOperant = eval(prev + current).toString();
            this.previousOperant = "";
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperant;
        this.previousOperandTextElement.innerText = this.previousOperant;
    }
    appendNumber(number){
        //zajištění že mi zmizí bývalý příklad jestli píšu nový
        if(this.previousOperant.includes("(")){
            this.previousOperant = "";
        }
        if(this.conditions(number)){
            this.currentOperant += number;
        }   
    }
    conditions(number){
        //ověření pro psaní .
        if(number === "." && this.currentOperant.includes('.') || (number === "." && this.currentOperant === "" )) return false
        //ověření že ) je vždy po ( a ověření aby se nedalo napsat . když tam je (
        if((number === ")" && !this.currentOperant.includes("(")) || (number === "." && this.currentOperant.slice(-1) == "(") ) return false
        //ověření aby bylo vždy stejný počet závorek
        if(this.currentOperant.match(/[)]/g) !== null){
            if((number === ")" && this.currentOperant.match(/[(]/g).length <= this.currentOperant.match(/[)]/g).length)) return false
        }
        //ověření aby nepovoloval dávat 0 když tam už je 0
        if(number === "0" && this.currentOperant === "0") return false

        //psaní * když se dotýkají závorky
        if((number === "(" && parseFloat(this.currentOperant.slice(-1))) || (number === "(" && this.currentOperant.slice(-1)===")")){
            this.currentOperant += "*"
            return true
        }
        //psaní 0 jestli do závorek se nic nenapíše
        if(number === ")" && this.currentOperant.slice(-1) === "("){
            this.currentOperant += 0;
            return true
        }
        //ověření aby mepovoloval uzavřít závorku, když tam je operátor
        if(number !== ")"){
            if((number === ")" && !parseFloat(this.currentOperant.slice(-1)))) return false
        }
        //psaní * jestli za závorku se píše číslo
        if(parseFloat(number) && this.currentOperant.slice(-1) === ")"){
            this.currentOperant += "*"
            return true
        }
        else 
        return true
    }

}


let kal = document.getElementsByClassName('container')

kal[0].innerHTML += "<div class='kalDisplay'><div data-previous-operand class='previous-opr'></div><div data-current-operand class='current-opr'></div></div>"

let pomoc = ["AC","DEL", ">", "(", ")", "%", "/", "7", "8", "9", "*", "4", "5", "6", "+", "1", "2", "3", "-", ".", "0", "1/x","="]

for(let i = 0; i < pomoc.length; i++){
    if(pomoc[i] === "AC"){
        kal[0].innerHTML += `<button data-all-clear style="grid-column: span 2;">${pomoc[i]}</button>`
    }
    else if(pomoc[i] === "%"){
        kal[0].innerHTML += `<button data-precent>${pomoc[i]}</button>`
    }
    else if(pomoc[i] === "1/x"){
        kal[0].innerHTML += `<button data-fraction>${pomoc[i]}</button>`
    }
    else if(pomoc[i] === "(" || pomoc[i] === ")"){
        kal[0].innerHTML += `<button data-number >${pomoc[i]}</button>`
    }
    else if (pomoc[i] === "DEL"){
        kal[0].innerHTML += `<button data-delete class="btn">${pomoc[i]}</button>`
    }
    else if (pomoc[i] === "/" || pomoc[i] === "*" || pomoc[i] === "+" || pomoc[i] === "-" ){
        kal[0].innerHTML += `<button data-operation class="btn">${pomoc[i]}</button>`
    }
    else if(pomoc[i] === "="){
        kal[0].innerHTML += `<button data-equals >${pomoc[i]}</button>`
    }
    else if(pomoc[i] === ">"){
        kal[0].innerHTML += `<button data-show >${pomoc[i]}</button>`
    }
    else {
        kal[0].innerHTML += `<button data-number class="btn">${pomoc[i]}</button>`
    }
}

// let pomoc2 = ["X²", "√x", "π"]

// let kal2 = document.querySelector('.side-container')

// for(let i = 0; i < pomoc2.length; i++){
//     kal2.innerHTML += `<button data-prop2">${pomoc2[i]}</button>`
// }


const numberButtons = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const precentButton = document.querySelector('[data-precent]');
const fractionButton = document.querySelector('[data-fraction]');
const showButton = document.querySelector('[data-show]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const cal = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    cal.appendNumber(button.innerText);
    cal.updateDisplay()
  })
})
operationButton.forEach(button => {
   button.addEventListener('click', () => {
    cal.chooseOperation(button.innerText)
    cal.updateDisplay()
  })
})
equalsButton.addEventListener('click', () => {
    cal.compute()
    cal.updateDisplay()
})
deleteButton.addEventListener('click', () => {
    cal.delete();
    cal.updateDisplay()
})
allClearButton.addEventListener('click', () => {
    cal.clear();
    cal.updateDisplay();
})
precentButton.addEventListener('click', () => {
    cal.percent();
    cal.updateDisplay();
})
fractionButton.addEventListener('click', () => {
    cal.fraction()
    cal.updateDisplay();
})
// showButton.addEventListener('click', () => {
//     kal2.style.dislplay = "flex";
// })




