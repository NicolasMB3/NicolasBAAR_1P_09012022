// Version
version(0.06);
// Version
const textTerminal = document.getElementById('terminal-text');
let inputValue = document.querySelector('#command');

const commands = { 
   nicolas: `Développeur web full-stack. Mordu d informatique, j’ai appris à programmer dès mon plus jeune âge dans divers langages informatiques comme JavaScript, PHP ... 
      Polyvalent, je maîtrise les différentes étapes techniques de la création d un site web ; de la compréhension des besoins utilisateurs, à la conception des 
      maquettes jusqu'au développement front-end et back-end.`,
   contact: `Vous pouvez être en contact avec moi envoyant un e-mail à nicolasbaar@outlook.fr ou en cliquant sur le dossier 'Me contacter' à gauche de l'écran.`,
   clearbin: `La corbeille a été vidée.`,
   alreadytheme: `Le thème est déjà `,
   theme: `Le thème a correctement été changé.`,
   unknow: `Merci d'écrire une commande (liste disponible avec la commande help)`
};

//
// @param {String}   version    Website version
// @return {String}  v[0.00]
//
function version(version) {
   const versionClass = document.getElementsByClassName('version');
   [...versionClass].forEach(element => {
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
   let date = ("0" + getDate.getDate()).slice(-2) + '/' + ("0" + (getDate.getMonth() + 1)).slice(-2) + '/' + getDate.getFullYear();
   document.getElementById('date').innerHTML = date;
}

//
// Remove old input
//
function removeInput() {
   let removedInput = document.querySelector('#terminal-input');
   removedInput.remove();
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
// @param {String}   text    Display text in terminal (Object.name)
// @return {String}  Sentence in Object
//
function writeAnwser(text) {
   const newDiv = document.createElement('div');
   const newContent = document.createTextNode(`C\\ > : ` + text);
   newDiv.append(newContent);
   textTerminal.appendChild(newDiv);
   inputValue.disabled = true;
}

//
// Write awnser when words/sentences are pressed
//
function pressKey() {
   inputValue.addEventListener("keypress", (e) => {
      if (e.key !== 'Enter') return
      const binImage = document.getElementById('image-bin');
      switch (inputValue.value.toLowerCase()) {
         case 'help':
            inputToText();
            textTerminal.innerHTML += `
               <div id="header-request">
                  <p>C\\ > : Voici les commandes disponibles :</p>
                  <ul id="commands-help">
                     <li>help : Affiche toutes les commandes disponibles</li>
                     <li>nicolas : En savoir plus sur moi</li>
                     <li>theme [light/dark] : Change le thème du site</li>
                     <li>contact : Rentrer en contact avec moi</li>
                     <li>clear : Nettoie la console</li>
                  </ul>
               </div>`
            newInput();
            break;
         case 'nicolas':
            inputToText();
            writeAnwser(commands.nicolas);
            newInput();
            break;
         case 'contact':
            inputToText();
            writeAnwser(commands.contact);
            newInput();
            break;
         case 'clear':
            binImage.src = "assets/images/folder-bin-not-empty.png";
            textTerminal.innerHTML = '';
            newInput();
            break;
         case 'clear bin':
            inputToText();
            writeAnwser(commands.clearbin);
            binImage.src = "assets/images/folder-bin.png";
            newInput();
         break;
         case 'theme light':
            if (document.documentElement.getAttribute('data-theme') == 'light') {
               inputToText();
               writeAnwser(commands.alreadytheme + 'light.');
               newInput();
            } else {
               inputToText();
               document.documentElement.setAttribute('data-theme', 'light')
               localStorage.setItem('mode', 'light');
               writeAnwser(commands.theme);
               newInput();
            }
            break;
         case 'theme dark':
            if (document.documentElement.getAttribute('data-theme') == 'dark') {
               inputToText();
               writeAnwser(commands.alreadytheme + 'dark.');
               newInput();
            } else {
               inputToText();
               document.documentElement.setAttribute('data-theme', 'dark')
               localStorage.setItem('mode', 'dark');
               writeAnwser(commands.theme);
               newInput();
            }
            break;
         default:
            inputToText();
            writeAnwser(commands.unknow);
            newInput();
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

   [...buttonClose].forEach((button) => {
      button.addEventListener('click', function() {
         const container = document.getElementsByClassName('container');
         Array.from(container).forEach((ctn) => {
            this.closest('.container').classList.add("close-animation");
         });
      });
   });

   [...openAndClose].forEach((icon) => {
      icon.addEventListener('dblclick', function(e) {
         const containerTerminal = document.getElementById('container-terminal');
         const containerFile = document.getElementById('container-file');
         const containerContact = document.getElementById('container-contact');

         if (icon.getAttribute('data-id') == 123) {
            containerFile.classList.remove("close-animation");
            containerFile.style.visibility = 'visible';
            containerFile.style.zIndex = '5';
         } else if (icon.getAttribute('data-id') == 456) {
            containerContact.classList.remove("close-animation");
            containerContact.style.visibility = 'visible';
            containerContact.style.zIndex = '5';
         } else {
            containerTerminal.classList.remove("close-animation");
            containerTerminal.style.visibility = 'visible';
            containerTerminal.style.zIndex = '5';
         }
      });
   });
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

   [...switchButton].forEach((button) => {
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
         notification("Message envoyé");
      }, function(error) {
         notification("Problème lors de l'envoie");
      });
   })
}

function displayWindows() {
   const allWindows = [...document.getElementsByClassName('container')];
   let dataActive = '10';
   allWindows.forEach((item) => {
      item.addEventListener('click', () => {
         item.style.zIndex = dataActive; 
         dataActive++;
      });
   });
};

//
// @param {String}   text    Text on notification
// @return {String}  Notification send
//
function copyTextToClipboard(text) {
   if (!navigator.clipboard) {
     fallbackCopyTextToClipboard(text);
     return;
   }
   navigator.clipboard.writeText(text).then(function() {
      notification("E-mail copié");
   }, function(err) {
     console.error('Async: Impossible de copier l\'e-mail : ', err);
   });
}

var copyBobBtn = document.getElementById('email-copy')

copyBobBtn.addEventListener('click', function() {
  copyTextToClipboard('nicolasbaar@outlook.fr');
});

//
// Reduce Windows in header
//
function reduce() {
   var reduceButton = document.getElementsByClassName('circle-grey');

   [...reduceButton].forEach((element) => {
      element.addEventListener('click', function() {
         var nameID = this.closest('.container').id;
         this.closest('.container').style.visibility = 'hidden';

         if(nameID === 'container-terminal') {
            var terminalOpen = document.getElementById('button-terminal--header');
            terminalOpen.style.display = 'inline';
         } else if(nameID === 'container-file') {
            var terminalOpen = document.getElementById('button-file--header');
            terminalOpen.style.display = 'inline';
         } else {
            var terminalOpen = document.getElementById('button-contact--header');
            terminalOpen.style.display = 'inline';
         }

      }); 
   }); 
}

//
// Open reduce Windows in header (need update????)
//
function openReduce() {
   var reduceButtonOne = document.getElementById('button-terminal--header');
   reduceButtonOne.addEventListener('dblclick', () => {
      reduceButtonOne.style.display = 'none';
      const containerTerminal = document.getElementById('container-terminal');
      containerTerminal.style.visibility = 'visible';
   })
   var reduceButtonTwo = document.getElementById('button-contact--header');
   reduceButtonTwo.addEventListener('dblclick', () => {
      reduceButtonTwo.style.display = 'none';
      const containerContact = document.getElementById('container-contact');
      containerContact.style.visibility = 'visible';
   })
   var reduceButtonThird = document.getElementById('button-file--header');
   reduceButtonThird.addEventListener('dblclick', () => {
      reduceButtonThird.style.display = 'none';
      const containerFile = document.getElementById('container-file');
      containerFile.style.visibility = 'visible';
   })
}

function notification(text) {
   const notificationArea = document.getElementById('notification-area');
   const notificationId = new Date().getTime();
   const para = document.createElement("div");
   para.classList.add("notification-area-box");
   para.innerText = text;
   para.id = notificationId;
   notificationArea.appendChild(para);
   para.setAttribute("created-at", new Date().getTime());
};

function hideElement() {
   var test = document.getElementsByClassName('notification-area-box');
   for(let i = 0; i < test.length; i++) {
      if((new Date().getTime() - test[i].getAttribute("created-at")) / 1000 > 7) {
         test[i].remove();
      }
   }
}

setInterval(function () {
	hideElement();
}, 200);

//
// Run functions
//
displayWindows();
time();
date();
darkMode();
closeOpenTerminal();
resize();
dragAndDrop();
pressKey();
reduce();
openReduce();
sendEmail();