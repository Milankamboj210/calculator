// =====================
// DOM Elements
// =====================
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

const scientific = document.querySelector(".scientific");
const sciBtn = document.getElementById("scientificBtn");

const themeBtn = document.getElementById("themeBtn");

const historyBtn = document.getElementById("historyBtn");
const historyPanel = document.querySelector(".history-panel");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

const copyBtn = document.getElementById("copyBtn");

const clickSound = document.getElementById("clickSound");

let expression = "";

// =====================
// Calculator Buttons
// =====================
buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        const value = btn.innerText;

        switch(value){

            case "AC":

                expression="";
                display.value="";
                break;

            case "⌫":

                expression=expression.slice(0,-1);
                display.value=expression;
                break;

            case "=":

                calculate();
                break;

            default:

                expression+=value;
                display.value=expression;

        }

    });

});

// =====================
// Calculate
// =====================
function calculate(){

    try{

        let exp=expression
        .replace(/×/g,"*")
        .replace(/÷/g,"/")
        .replace(/−/g,"-");

        const result=eval(exp);

        addHistory(expression,result);

        display.value=result;

        expression=result.toString();

        display.classList.add("result");

        setTimeout(()=>{

            display.classList.remove("result");

        },250);

    }

    catch{

        display.value="Error";
        expression="";

    }

}

// =====================
// Keyboard Support
// =====================
document.addEventListener("keydown",(e)=>{

    const key=e.key;

    if(!isNaN(key) || "+-*/().%".includes(key)){

        expression+=key;
        display.value=expression;

    }

    else if(key==="Enter"){

        e.preventDefault();
        calculate();

    }

    else if(key==="Backspace"){

        expression=expression.slice(0,-1);
        display.value=expression;

    }

    else if(key==="Escape"){

        expression="";
        display.value="";

    }

});

// =====================
// History
// =====================
function addHistory(exp,result){

    const li=document.createElement("li");

    li.innerText=`${exp} = ${result}`;

    historyList.prepend(li);

    saveHistory();

}

function saveHistory(){

    let arr=[];

    historyList.querySelectorAll("li").forEach(li=>{

        arr.push(li.innerText);

    });

    localStorage.setItem("history",JSON.stringify(arr));

}

function loadHistory(){

    let arr=JSON.parse(localStorage.getItem("history")) || [];

    arr.forEach(item=>{

        const li=document.createElement("li");

        li.innerText=item;

        historyList.appendChild(li);

    });

}

loadHistory();

historyBtn.onclick=()=>{

    historyPanel.classList.toggle("active");

};

clearHistory.onclick=()=>{

    historyList.innerHTML="";

    localStorage.removeItem("history");

};

// =====================
// Scientific Panel
// =====================
sciBtn.onclick=()=>{

    scientific.classList.toggle("active");

};

// =====================
// Theme
// =====================
themeBtn.onclick=()=>{

    document.body.classList.toggle("light");

};

// =====================
// Copy Result
// =====================
copyBtn.onclick=()=>{

    navigator.clipboard.writeText(display.value);

    copyBtn.innerText="✅";

    setTimeout(()=>{

        copyBtn.innerText="📋";

    },1000);

};

// =====================
// Button Sound
// =====================
if(clickSound){

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("click",()=>{

clickSound.currentTime=0;

clickSound.play();

});

});

}

// =====================
// Scientific Functions
// =====================
document.querySelectorAll(".sci").forEach(btn=>{

btn.addEventListener("click",()=>{

const val=btn.innerText;

let num=parseFloat(display.value);

switch(val){

case "√":

display.value=Math.sqrt(num);

expression=display.value;

break;

case "sin":

display.value=Math.sin(num*Math.PI/180);

expression=display.value;

break;

case "cos":

display.value=Math.cos(num*Math.PI/180);

expression=display.value;

break;

case "tan":

display.value=Math.tan(num*Math.PI/180);

expression=display.value;

break;

case "log":

display.value=Math.log10(num);

expression=display.value;

break;

case "ln":

display.value=Math.log(num);

expression=display.value;

break;

case "π":

expression+="3.1415926535";
display.value=expression;
break;

case "e":

expression+="2.718281828";
display.value=expression;
break;

case "x²":

display.value=num*num;
expression=display.value;
break;

case "!":

let ans=1;

for(let i=2;i<=num;i++){

ans*=i;

}

display.value=ans;

expression=display.value;

break;

}

});

});
