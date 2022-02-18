const textTerminal = document.getElementById('terminal-text');
let inputValue = document.querySelector('#command');

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
            const binImage = document.getElementById('image-bin');
            binImage.src = "assets/images/folder-bin-not-empty.png";
            textTerminal.innerHTML = ``;
            newInput();
         } else if (inputValue.value == 'unclear') {
            inputToText();
            const binImage = document.getElementById('image-bin');
            binImage.src = "assets/images/folder-bin.png";
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
            writeAnwser(`La commande ` + inputValue.value + ` est introuvable, tapez 'help' pour plus d'informations ..`);
            newInput();
         }
      }
   });
}

function dragAndDrop() {
   // target elements with the "draggable" class
   interact('.container').styleCursor(false)
   .draggable({
   // enable inertial throwing
   inertia: true,
   // keep the element within the area of it's parent
   modifiers: [
      interact.modifiers.restrictRect({
         restriction: 'parent',
         endOnly: false
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

function snapping() {
   const onClick = function() {

      var element = document.getElementById(this.id);
      var x = 0; var y = 0
      
      interact(element).styleCursor(false)
      .draggable({
         modifiers: [
            interact.modifiers.snap({
            targets: [
               interact.snappers.grid({ x: 25, y: 25 })
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ]
            }),
            interact.modifiers.restrict({
            restriction: element.parentNode,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
            endOnly: true
            })
         ],
         inertia: true
      })
      .on('dragmove', function (event) {
         x += event.dx
         y += event.dy
      
         event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
      })
   }
   document.getElementById('image-desktop-google').onclick = onClick;
   document.getElementById('image-desktop-vsc').onclick = onClick;
   document.getElementById('image-desktop-folder').onclick = onClick;
}

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
        outer: 'self'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 726, height: 600 }
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

resize();
snapping();
dragAndDrop();
time();
date();
pressKey();