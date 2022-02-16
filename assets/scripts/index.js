const textTerminal = document.getElementById('terminal-text');
let inputValue = document.querySelector('#command');

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
         <input type="text" id="command" name="command" required minlength="4" maxlength="8" autocomplete="off" autofocus>
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
         if(inputValue.value === 'help') {
            inputToText();
            writeAnwser(`La commande help n'est pas encore disponible`);
            newInput();
         } else {
            inputToText();
            writeAnwser(`La commande ` + inputValue.value + ` n'est pas disponible pour le moment ..`);
            newInput();
         }
      }
   });
}

pressKey();