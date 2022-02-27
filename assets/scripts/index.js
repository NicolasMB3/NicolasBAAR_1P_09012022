// Version
version(0.05);
// Version
const textTerminal = document.getElementById('terminal-text');
let inputValue = document.querySelector('#command');
const binImage = document.getElementById('image-bin');

//
// Version
//
function version(version) {
   const versionClass = document.getElementsByClassName('version');
   Array.from(versionClass).forEach(element => {
      element.innerHTML += 'v' + '[' + version + ']'
   });
   return version;
}

//
// Display time in header -> HH:MM AM/PM
//
function time() {
   setInterval(() => {
      let getTime = new Date();
      let time = ("0" + getTime.getHours()).slice(-2) + ':' + ("0" + getTime.getMinutes()).slice(-2);
      if (getTime.getHours() <= 12) {
         time += ' AM';
      } else {
         time += ' PM';
      }
      document.getElementById('time').innerHTML = time;
   }, 1000);
}

//
// Display date in header -> DD/MM/YY
//
function date() {
   let getDate = new Date();
   let date = getDate.getDate() + '/' + ("0" + (getDate.getMonth() + 1)).slice(-2) + '/' + getDate.getFullYear();
   document.getElementById('date').innerHTML = date;
}

//
// Replace input's value to text and place value in text
//
function inputToText() {
   // Stockage de la valeur écrite
   const tempDataInput = inputValue.value;
   removeInput();
   textTerminal.innerHTML +=  `
      <div id="terminal-input-new">
         <span class="text--bold" id="terminal-title">C:\\Users\\Nicolas></span>
         <span id="new-input--style">` + tempDataInput + `</span>
      </div>`;
}

//
// Remove old input
//
function removeInput() {
   let removedInput = document.querySelector('#terminal-input');
   removedInput.remove();
}

//
// Create new input
//
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

//
// Create new text
//
function writeAnwser(text) {
   const newDiv = document.createElement('div');
   const newContent = document.createTextNode(`Information : ` + text);
   newDiv.append(newContent);
   textTerminal.appendChild(newDiv);
   inputValue.disabled = true;
}

//
// Write awnser when words/sentences are pressed
//
function pressKey() {
   inputValue.addEventListener("keypress", (e) => {
      if (e.key === 'Enter') {
         switch (inputValue.value) {
            case 'status':
               inputToText();
               writeAnwser(`Je recherche activement une alternance pour Janvier 2022 🧑‍💻 ! Pour plus d'information tapez dans la console [alternance]`);
               newInput();
               break;
            case 'clear':
               binImage.src = "assets/images/folder-bin-not-empty.png";
               textTerminal.innerHTML = '';
               newInput();
               break;
            case 'clear bin':
               inputToText();
               writeAnwser(`La corbeille a été vidée.`);
               binImage.src = "assets/images/folder-bin.png";
               newInput();
              break;
            case 'help':
               inputToText();
               writeAnwser(`En cours de création`);
               newInput();
              break;
            case 'theme light':
               if (document.documentElement.getAttribute('data-theme') == 'light') {
                  inputToText();
                  writeAnwser(`Le thème est déjà clair`);
                  newInput();
               } else {
                  inputToText();
                  document.documentElement.setAttribute('data-theme', 'light')
                  localStorage.setItem('mode', 'light');
                  writeAnwser(`Le thème est maitenant clair`);
                  newInput();
               }
               break;
            case 'theme dark':
               if (document.documentElement.getAttribute('data-theme') == 'dark') {
                  inputToText();
                  writeAnwser(`Le thème est déjà sombre`);
                  newInput();
               } else {
                  inputToText();
                  document.documentElement.setAttribute('data-theme', 'dark')
                  localStorage.setItem('mode', 'dark');
                  writeAnwser(`Le thème est maitenant sombre`);
                  newInput();
               }
               break;
            default:
               inputToText();
               writeAnwser(`Merci d'écrire une commande (liste disponible avec la commande help)`);
               newInput();
         };
      };
   });
}

//
// Drag and drop system -> InteractJS
//
function dragAndDrop() {
   // target elements with the "draggable" class
   interact('.drag').styleCursor(false)
   .draggable({
   // enable inertial throwing
   inertia: true,
   // keep the element within the area of it's parent
   modifiers: [
      interact.modifiers.restrictRect({
         restriction: 'parent'
      })
   ],
   // enable autoScroll
   autoScroll: false,

   listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,
   }
   })

   function dragMoveListener (event) {
   var target = event.target
   // keep the dragged position in the data-x/data-y attributes
   var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
   var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

   // translate the element
   target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

   // update the posiion attributes
   target.setAttribute('data-x', x)
   target.setAttribute('data-y', y)
   }

   // this function is used later in the resizing and gesture demos
   window.dragMoveListener = dragMoveListener
}

//
// Open and close terminal when doublie click on icon or button close is pressed
//
function closeOpenTerminal() {
   const buttonClose = document.getElementsByClassName('circle-red');
   const openAndClose = document.getElementsByClassName('openClose');

   Array.from(buttonClose).forEach((button) => {
      button.addEventListener('click', function() {
         const container = document.getElementsByClassName('container');
         Array.from(container).forEach((ctn) => {
            this.closest('.container').classList.add("close-animation");
         });
      });
   })

   Array.from(openAndClose).forEach((icon) => {
      icon.addEventListener('dblclick', function(e) {
         const containerTerminal = document.getElementById('container-terminal');
         const containerFile = document.getElementById('container-file');
         const containerContact = document.getElementById('container-contact');

         if (icon.getAttribute('data-id') == 123) {
            containerFile.classList.remove("close-animation");
            containerFile.style.visibility = 'visible';
         } else if (icon.getAttribute('data-id') == 456) {
            containerContact.classList.remove("close-animation");
            containerContact.style.visibility = 'visible';
         } else {
            containerTerminal.classList.remove("close-animation");
            containerTerminal.style.visibility = 'visible';
         }
      });
   })
}

//
// Resize window on right and bottom corner
//
function resize() {
   interact('.resize-drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: false, right: true, bottom: true, top: false },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'rem,' + y + 'rem)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
         inner: {
            left: 100,  // the left edge must be <= 100
            right: 200  // the right edge must be >= 200
         }
      }),

      // minimum size
      interact.modifiers.restrictSize({
         min: { width: 740, height: 150 },
         max: { width: 1800, height: 700 }
      })
    ],

    inertia: true
  })
  .draggable({
    listeners: { move: window.dragMoveListener },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ]
  })
}

//
// Dark mode and light mode
//
function darkMode() {
   const switchButton = document.getElementsByClassName('button-switch')
   const mode = localStorage.getItem('mode');

   if (mode == 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
   } else {
      document.documentElement.setAttribute('data-theme', 'dark');
   }

   Array.from(switchButton).forEach((button) => {
      button.addEventListener('click', function() {
         if(document.documentElement.getAttribute("data-theme") == "dark") {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('mode', 'light');
         } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('mode', 'dark');
         }
      });
   })
}

function sendEmail() {
   const getFormButton = document.getElementById('form-button');
   const formOk = document.getElementById('form-ok');
   const formProblem = document.getElementById('form-problem');

   getFormButton.addEventListener('click', function() {
      var templateParams = {
         name: document.getElementById('name').value,
         entreprise: document.getElementById('entreprise').value,
         phone: document.getElementById('phone').value,
         email: document.getElementById('email').value,
         description: document.getElementById('description').value
      };

      emailjs.send('service_a80h2ni', 'template_766uk3r', templateParams)
      .then(function(response) {
         formOk.style.visibility = 'visible';
         formOk.classList.add("ending-animation");
      }, function(error) {
         formProblem.style.visibility = 'visible'
         formProblem.classList.add("ending-animation");
      });
   })
}

function displayWindows() {
   const allWindows = [...document.getElementsByClassName('container')];
   let dataActive = '50';
   allWindows.forEach((item) => {
      item.addEventListener('click', () => {
         item.style.zIndex = dataActive; 
         dataActive++;
      });
   });
};

displayWindows();

//
// Run functions
//
time();
date();
darkMode();
closeOpenTerminal();
resize();
dragAndDrop();
pressKey();
sendEmail();