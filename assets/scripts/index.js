const textTerminal = document.getElementById('terminal-text');
let inputValue = document.querySelector('#command');

function time() {
   let getTime;
   let time;
   setInterval(() => {
      getTime = new Date();
      time = getTime.getHours() + ':' + getTime.getMinutes();
      document.getElementById('time').innerHTML = time;
   }, 1000);
}

function date() {
   let getDate;
   getDate = new Date();
   let date = getDate.getDate() + '/' + ("0" + (getDate.getMonth() + 1)).slice(-2) + '/' + getDate.getFullYear();
   document.getElementById('date').innerHTML = date;;
}

function inputToText() {
   // Stockage de la valeur écrite
   const tempDataInput = inputValue.value;
   removeInput();
   textTerminal.innerHTML +=  `
   <div id="terminal-input-new">
      <span class="text--bold" id="terminal-title">C:\\Users\\Nicolas></span>
      <span id="teest">` + tempDataInput + `</span>
   </div>`;
}

function removeInput() {
   let inputValue2 = document.querySelector('#terminal-input');
   inputValue2.remove();
}

function newInput() {
   textTerminal.innerHTML += 
      `<div id="terminal-input">
         <p><span class="text--bold">C:\\Users\\Nicolas></span></p>
         <input type="text" id="command" name="command" required minlength="4" maxlength="14" autocomplete="off" autofocus>
      </div>`
   inputValue = document.querySelector('#command');
   inputValue.focus();
   pressKey();
}

function writeAnwser(text) {
   const newDiv = document.createElement('div');
   const newContent = document.createTextNode(`Information : ` + text);
   newDiv.append(newContent);
   textTerminal.appendChild(newDiv);
   inputValue.disabled = true;
}

function pressKey() {
   inputValue.addEventListener("keypress", (e) => {
      if (e.key === 'Enter') {
         if(inputValue.value === 'nicolas') {
            inputToText();
            writeAnwser(`Développeur web full-stack. Mordu d’informatique, j’ai appris à programmer dès mon plus jeune âge dans divers langages informatiques comme JavaScript, PHP ... 
            Polyvalent, je maîtrise les différentes étapes techniques de la création d’un site web ; de la compréhension des besoins utilisateurs, à la conception des maquettes jusqu’au 
            développement front-end et back-end.`);
            newInput();
         }  else if (inputValue.value === 'status') {
            inputToText();
            writeAnwser(`Oui ! Je suis toujours à la recherche d'une alternance pour Janvier 2022 🧑‍💻`);
            newInput();
         } else if (inputValue.value == 'clear') {
            textTerminal.innerHTML = ``;
            newInput();
         } else if (inputValue.value == 'help') {
            inputToText();
            writeAnwser(`En cours de création`);
            newInput();
         } else if (inputValue.value === '') {
            inputToText();
            writeAnwser(`Merci d'écrire une commande (liste disponible avec la commande help)`);
            newInput();
         } else {
            inputToText();
            writeAnwser(`La commande ` + inputValue.value + ` n'est pas disponible pour le moment ..`);
            newInput();
         }
      }
   });
}

time();
date();
pressKey();