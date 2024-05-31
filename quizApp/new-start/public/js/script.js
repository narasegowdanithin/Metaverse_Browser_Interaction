let answers=[];

//arrangement where user responses are saved

let choosen_option=[];

let result=0;

let quizContainerText="";
let grades="none";
let levelSubjectContainerText="";


var quizcontainer = document.getElementById("quizcontainer");

let currentQuestion=0;

let currentURL = window.location.href;
let socket = new WebSocket('8080 WebSocket url'); // Change the URL as needed //buttons passing msgs
let ws = new WebSocket('8081 WebSocket url');//whole button and page sync
ws.onopen = () => {
    console.log('WebSocket ws  connection opened');
};
socket.onopen = () => {
    console.log('WebSocket socket  connection opened');
};

socket.onmessage = (event) => {
    console.log("Received message:", event.data);
    let message  = JSON.parse(event.data);
    console.log("Received message:",message);
    if(message.url == currentURL){
        if(message.type === 'exit_button'){
            if (message.data !== undefined) {
                // Update the scroll position based on the received data
                let buttonId=message.data.button_Id;
                let buttonToClick = document.getElementById(buttonId);
                if (buttonToClick) {
                    if(buttonToClick.id === "exitquiz" && !buttonToClick.disabled){
                        buttonToClick.disabled = true;
                        exitQuiz();
                    } 
                }
            }

        }
	if(message.type === 'send_button'){
            if (message.data !== undefined) {
                const buttonId=message.data.button_Id;
                const buttonToClick = document.getElementById(buttonId);
                if (buttonToClick) {
                    if(buttonToClick.id === "sendMsgButton" && !buttonToClick.disabled){
                        buttonToClick.disabled = true;
                        sendMsg();
                    } 
                }
            }

        }
    }
};
ws.onmessage = (event) => {

    //const currentURL = window.location.href;
    console.log("Received message:", event.data);
    let message  = JSON.parse(event.data);
    console.log("Received message:",message);
    //const { questionId, selectedValue, styleSelected, styleUnSelected } = message;
    if(message.url == currentURL){
        if(message.type === 'scroll'){
            if (message.data !== undefined) {
                // Update the scroll position based on the received data
                window.scrollTo(0, message.data);
            }

        }
    // Update radio button selection and style in the same section
        else if(message.type === 'radio_selection') {
            let question_num = message.data.question_num;
            //const selectedAnswer = message.data.selected_answer;
            let questionId = "p" + question_num;
            let selectedValue=message.data.selected_answer
            let questionSection = document.getElementById(questionId);
            let radioButtons = questionSection.querySelectorAll('input[type=radio]');

            for (let i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].value === selectedValue) {
                    responseSync(question_num,radioButtons[i]);
                }
            }

            //responseSync(questionNum,selectedAnswer);

        }
        else if(message.type === 'send_button') {
            let buttonId=message.data.button_Id;
            let buttonToClick = document.getElementById(buttonId);
            if (buttonToClick) {
                if(buttonToClick.id === "sendMsgButton"){
                    sendMsgSync();
                } 
                else if (buttonToClick.id === "submit") {
                    correctSync();
                }
            }
        }
    }
};


// Define a debounce function
function debounce(func, wait) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        let later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to send scroll updates
function sendScrollUpdate() {
    let scrollY = window.scrollY;
    let type = "scroll";
    let message = {
        url: currentURL,
        type: type,
        data: scrollY
    };
    // Send the scroll position to the server
    ws.send(JSON.stringify(message));
}

// Attach the debounced scroll event listener
window.addEventListener('scroll', debounce(sendScrollUpdate, 100));


/
//load the questions 

const loadQuizData=async(getquestionsurl)=>{
    console.log(getquestionsurl);
    let res = await fetch(getquestionsurl);
    console.log(quizData = await res.json());
    
    showquestions();
}
//document.addEventListener('DOMContentLoaded', loadQuizData(url));
function loadQuiz(getquestionsurl){
    loadQuizData(getquestionsurl);
}
document.body.onload = function () {
    let getquestionsurl = document.body.getAttribute('data-quiz-url');
    loadQuizData(getquestionsurl);
};


//adding the questions to the page

function showquestions(){
    
    quizContainerText+=`<div class="levelsubjectcontainer" id="levelSubjectcontainerid"><div><h2>Level: ${quizData[0].level}</h2></div><div><h2>Topic: ${quizData[0].subject}</h2></div></div>`
    for(let i=1 ;i<=quizData.length;i++){
        quizContainerText += `<p id="validationError" style="color: red; font-size: 60px"></p><section id="p${i-1}"><h3 id = questionHeader>Q: ${i}. ${quizData[i-1].question}</h3>`
        for(let j=1;j<=quizData[i-1].options.length;j++){
            quizContainerText +=`<label>
                    <input type="radio" value ="${quizData[i-1].options[j-1]}" name="p${i-1}" onclick="response(${i-1},this)">${quizData[i-1].options[j-1]}
                </label>`
        }
        quizContainerText += `</section>`
            
    }
    quizContainerText +=`<button onclick="correct()" id="submit">submit</button>
            <h3>correct answers: <span id="results"></span></h3>
            <button onclick="reset()" id="submit">Reset</button> <br/><br />
            <button onclick="sendMsg()" id="sendMsgButton">Next Level</button><br/><br />
            <button onclick="exitQuiz()" id="exitquiz">Exit</button>`

   var quizcontainer = document.getElementById("quizcontainer");  
            
            
    quizcontainer.innerHTML=quizContainerText;
}

function reset(){
   
    window.location.reload();
}

//function that takes question number and the input answer 
function response(question_num, selected_answer){
    responseSync(question_num,selected_answer);
    sendMessageSync('radio_selection', {
        question_num: question_num,
        selected_answer: selected_answer.value

    });

}

function responseSync(question_num, selected_answer)
{
    choosen_option[question_num]=selected_answer;

    //following code is to set the color blue
    //the background of the inputs when you choose another option
    // set the id to select the corresponding section

    id="p"+question_num;

    labels=document.getElementById(id).childNodes;
    //console.log(labels);
    labels[1].style.backgroundColor="White";
    labels[2].style.backgroundColor="White";
    labels[3].style.backgroundColor="White";
    labels[4].style.backgroundColor="White";
    let styleUnSelected = window.getComputedStyle(labels[1]).backgroundColor;

    selected_answer.parentNode.style.backgroundColor="#cec0fc"
    let styleSelected = window.getComputedStyle(selected_answer.parentNode).backgroundColor;

    let questionSection = document.getElementById(id);

    questionSection.classList.remove("unanswered"); 

    let questionId = "p" + question_num;
    let selectedValue = selected_answer.value;
    selected_answer.checked=true;
}



function correct(){
    correctSync();
    let Sendbutton=document.getElementById("submit")
        if (Sendbutton) {
            sendMessageSync('send_button', {
                button_Id:Sendbutton.id  
            });
         }
}

//function that compares the array to know how many were correct
function correctSync(){

        result=0;
        let totalQuestion = quizData.length;
        let unansweredCount = 0; // Track the count of unanswered questions

        for(i=0;i<totalQuestion;i++){
            let value = choosen_option[i] !== undefined ? choosen_option[i].value : undefined;
            if (value === undefined){
                let questionSection = document.getElementById(`p${i}`);
                questionSection.classList.add("unanswered"); // Add a CSS class for unanswered questions
                unansweredCount++;
            }
            if(value !== undefined ){
                let questionSection = document.getElementById(`p${i}`);
                questionSection.classList.remove("unanswered"); // Remove the CSS class if answered
            }          
        }

        if (unansweredCount > 0) {
            document.getElementById("validationError").textContent = "Please answer all questions before submitting.";
            alert("some questions are unanswered");
            return;
        }

        if (unansweredCount === 0) {
            document.getElementById("validationError").style.display='none';
            for(i=0;i<totalQuestion;i++){
                //const check=JSON.stringify(quizData[i].answer).replaceAll("\"", "");
				let check = JSON.stringify(quizData[i].answer).replace(/"/g, "");
                let value = choosen_option[i] !== undefined ? choosen_option[i].value : undefined;
               if(value !== undefined ){
                    if (check === value) {                        
                          result++;
                          choosen_option[i].parentNode.style.backgroundColor="green";
                    }else{
                            choosen_option[i].parentNode.style.backgroundColor="red";
                    }                    
                }          
            }
            const totalResult = result + '/' + totalQuestion;
            document.getElementById("results").innerHTML = totalResult;
            document.getElementById("submit").disabled = true; // Disable the "Submit" button
            let percentage = (result / totalQuestion) * 100; 
            if (percentage >= 50 ){
                grades="pass"
            }else{
                grades="fail"
                //document.getElementById("sendMsgButton").disabled = true; // Disable the "Submit" button
            }
        }

}

function sendMsg() {

    sendMsgSync();
        //const message = document.getElementById('messageInput').value;
        let Sendbutton=document.getElementById("sendMsgButton")
	Sendbutton.disabled = true;
        if (Sendbutton && !Sendbutton.disabled) {
            sendMessageSync('send_button', {
                button_Id:Sendbutton.id   
            	
            });
         } 
}

function sendMsgSync(){
    const Sendbutton=document.getElementById("sendMsgButton");
    Sendbutton.disabled = true;
    if (grades === "pass") {
         sendMessageSyncSocket('send_button', {
            button_Id:Sendbutton.id,
            data: grades   
        
        });
        console.log('msg sent'+ grades);
        
    } 
    else{
        console.log('msg sent'+ grades);
        //alert("Please complete the quiz/pass quiz before sending your grade!.");
    }
    Sendbutton.disabled = true;
}


function exitQuiz(){
    //socket.send("exit");
    let Sendbutton=document.getElementById("exitquiz");
    if (Sendbutton && !Sendbutton.disabled) {
        Sendbutton.disabled = true;
        sendMessageSyncSocket('exit_button', {
            button_Id:Sendbutton.id,
            data:"exit"   
        
        });
        
    }
    
    console.log('msg sent exit');
    
}

function sendMessageSyncSocket(type, data) {
    let message = {
        url: currentURL,
        type: type,
        data: data
    };
    socket.send(JSON.stringify(message));
}


function sendMessageSync(type, data) {
    let message = {
        url: currentURL,
        type: type,
        data: data
    };
    ws.send(JSON.stringify(message));
}
