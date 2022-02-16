const inputValue = document.querySelector('#command');
const textTerminal = document.getElementById('terminal-text');

function writeAnwser(text) {
   const newDiv = document.createElement('div');
   const newContent = document.createTextNode(`C:\\Users\\Nicolas> ` + text);
   newDiv.append(newContent);
   textTerminal.appendChild(newDiv);
   inputValue.disabled = true;
}

function newInput() {
   const tempDataInput = inputValue.value;
   const inputTitle = document.getElementById('terminal-title');
   textTerminal.innerHTML += 
      `<div id="terminal-input">
         <p><span class="text--bold">C:\\Users\\Nicolas></span></p>
         <input type="text" id="command" name="command" required minlength="4" maxlength="8" autocomplete="off" autofocus class="test">
      </div>`
   inputValue.focus()
}

function pressKey() {
   inputValue.addEventListener("keypress", (e) => {
      if (e.key === 'Enter') {
         if(inputValue.value === 'help') {
            writeAnwser(`La commande help n'est pas encore disponible`);
            newInput();
         } else {
            writeAnwser(`La commande ` + inputValue.value + ` n'est pas disponible`)
         }
      }
   });
}

pressKey();