const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        switch(value){

            case "AC":
                expression = "";
                display.value = "";
                break;

            case "⌫":
                expression = expression.slice(0,-1);
                display.value = expression;
                break;

            case "=":

                try{

                    let result = expression
                        .replace(/×/g,"*")
                        .replace(/÷/g,"/");

                    display.value = eval(result);
                    display.classList.add("result");

                     setTimeout(()=>{

                    display.classList.remove("result");

                    },250);

                    expression = display.value;

                }

                catch{

                    display.value = "Error";
                    expression = "";

                }

                break;

            default:

                expression += value;
                display.value = expression;

        }

    });

});
document.addEventListener("keydown",(e)=>{

    const key = e.key;

    if(!isNaN(key) || "+-*/().%".includes(key)){

        expression += key;

        display.value = expression;

    }

    else if(key==="Enter"){

        e.preventDefault();

        try{

            display.value = eval(expression);

            expression = display.value;

        }

        catch{

            display.value="Error";

            expression="";

        }

    }

    else if(key==="Backspace"){

        expression = expression.slice(0,-1);

        display.value = expression;

    }

    else if(key==="Escape"){

        expression="";

        display.value="";

    }

});
