
version(0.06);
const textTerminal = document.getElementById('terminal-text');
let inputValue = document.querySelector('#command');

const commands = {
	nicolas: `> Développeur web full-stack à la recherche de sa première expérience professionnelle. <br>Mordu d'informatique, j’ai appris à programmer dès mon plus jeune âge dans divers langages informatiques comme JavaScript, PHP et Lua. 
	<br>Polyvalent, je maîtrise les différentes étapes techniques de la création d'un site web ; de la compréhension des besoins utilisateurs, à la conception des 
      maquettes jusqu'au développement front-end et back-end.`,
	contactOpen: `Merci de remplir le formulaire de contact déjà afficher sur la page [Me contacter].`,
	contactClose: `Ouverture du dossier [Me contacter] en cours.`,
	clearbin: `La corbeille a été vidée.`,
	alreadytheme: `Le thème est déjà `,
	theme: `Le thème a correctement été changé.`,
	application: `Ouverture du menu ...`,
	unknow: `Merci d'écrire une commande (liste disponible avec la commande help)`,
	errorTheme: `Merci de spécifier un thème [dark/light]`
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
	textTerminal.innerHTML += `
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
         <input type="text" id="command" name="command" required minlength="4" maxlength="14" autocomplete="off" placeholder="/..." autofocus>
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
	const newContent = document.createTextNode(`C:\\> : ` + text);
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
                  <span class="custom-side-right">- X</span>
                  <p>****** COMMANDES DISPONIBLES ******</p>
                  <ul id="commands-help">
                     <li>help : Affiche toutes les commandes disponibles</li>
                     <li>about : En savoir plus sur moi</li>
                     <li>theme [light/dark] : Change le thème du site</li>
                     <li>contact : Rentrer en contact avec moi</li>
							<li>application : Ouvre le menu application</li>
                     <li>clear : Nettoie la console</li>
                  </ul>
               </div>`
				newInput();
				break;
			case 'about':
				inputToText();
				textTerminal.innerHTML += `
               <div id="header-request">
                  <span class="custom-side-right">- X</span>
                  <p>****** À PROPOS DE MOI ******</p>
						<div id="my-self-flex">
							<div id="my-self-flex--image">
								<img src="assets/images/picture.png" alt="Photo de profil">
							</div>
							<div>
								${commands.nicolas}
							</div>
						</div>
               </div>`
				newInput();
				break;
			case 'contact':
				inputToText();
				const containerContact = document.getElementById('container-contact');
				if(containerContact.style.visibility === 'visible') {
					writeAnwser(commands.contactOpen);
					setTimeout(function() {
						containerContact.classList.remove("close-animation");
						containerContact.style.zIndex = '50';
					}, 2000);
				} else {
					writeAnwser(commands.contactClose);
					setTimeout(function() {
						containerContact.classList.remove("close-animation");
						containerContact.style.visibility = 'visible';
						containerContact.style.zIndex = '50';
					}, 1000);
				}
				newInput();
				break;
			case 'clear':
				binImage.src = "assets/images/bin-full.svg";
				textTerminal.innerHTML = '';
				newInput();
				break;
			case 'clear bin':
				inputToText();
				writeAnwser(commands.clearbin);
				binImage.src = "assets/images/bin.svg";
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
			case 'theme':
				inputToText();
				writeAnwser(commands.errorTheme);
				newInput();
				break;
			case 'application':
				inputToText();
				writeAnwser(commands.application);
				const hiddenMenu = document.body.childNodes[1];
				const header = document.getElementById('header-section');
				header.classList.add('hideElement');
				hiddenMenu.classList.remove('hideElement');
				hiddenMenu.dataset.active = true;
				document.body.children[2].classList.add('hideElement');
				newInput();
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

	function dragMoveListener(event) {
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
	const buttonClose = document.getElementsByClassName('closeAction');
	const openAndClose = document.getElementsByClassName('openClose');
	const appClose = document.getElementById('application-contact');

	appClose.addEventListener('click', function() {
		const hiddenMenu = document.body.childNodes[1];
		const header = document.getElementById('header-section');
		const containerContact = document.getElementById('container-contact');
		hiddenMenu.classList.add('hideElement');
		hiddenMenu.dataset.active = false;
		header.classList.remove('hideElement');
		document.body.children[2].classList.remove('hideElement');
		containerContact.classList.remove("close-animation");
		containerContact.style.visibility = 'visible';
		containerContact.style.zIndex = '500';
	});

	[...buttonClose].forEach(function(button) {
		button.addEventListener('click', function() {
			const container = document.getElementsByClassName('container');
			Array.from(container).forEach((ctn) => {
				this.closest('.container').classList.add("close-animation");
			});
		});
	});

	[...openAndClose].forEach(function(icon) {
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
			edges: {
				left: false,
				right: true,
				bottom: true,
				top: false
			},

			listeners: {
				move(event) {
					var target = event.target
					var x = (parseFloat(target.getAttribute('data-x')) || 0)
					var y = (parseFloat(target.getAttribute('data-y')) || 0)

					// update the element's style
					target.style.width = ((100 * event.rect.width) / window.innerWidth)  + 'vw'
					target.style.height = ((100 * event.rect.height) / window.innerHeight) + 'vh'

					// translate when resizing from top or left edges
					x += event.deltaRect.left
					y += event.deltaRect.top

					target.style.transform = 'translate(' + x + 'vw,' + y + 'vh)'

					target.setAttribute('data-x', x)
					target.setAttribute('data-y', y)
				}
			},
			modifiers: [
				// keep the edges inside the parent
				interact.modifiers.restrictEdges({
					inner: {
						left: 100, // the left edge must be <= 100
						right: 200 // the right edge must be >= 200
					}
				}),

				// minimum size
				interact.modifiers.restrictSize({
					min: {
						width: 740,
						height: 150
					},
					max: {
						width: 1800,
						height: 700
					}
				})
			],

			inertia: true
		})
		.draggable({
			listeners: {
				move: window.dragMoveListener
			},
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

	if (mode == 'dark') {
		document.documentElement.setAttribute('data-theme', 'dark');
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
	}

	[...switchButton].forEach(function(button) {
		button.addEventListener('click', function() {
			if (document.documentElement.getAttribute("data-theme") == "dark") {
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
	var templateParams = {
		name: document.getElementById('name').value,
		entreprise: document.getElementById('entreprise').value,
		phone: document.getElementById('phone').value,
		email: document.getElementById('email').value,
		description: document.getElementById('description').value
	};

	emailjs.send('service_a80h2ni', 'template_766uk3r', templateParams)
		.then(function(response) {
			notification("Message envoyé", '#57B40F');
		}, function(error) {
			notification("Problème lors de l'envoie", '#973c34');
		});
}

function displayWindows() {
	const allWindows = [...document.getElementsByClassName('container')];
	let dataActive = '10';
	allWindows.forEach(function(item) {
		item.addEventListener('click', () => {
			item.style.zIndex = dataActive;
			dataActive++;
		});
	});
};

//
// @param {String} {String}   text    Text on notification
// @return {String}  Notification send
//
function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(function() {
		notification("E-mail copié", '#57B40F');
	}, function(err) {
		notification("Problème lors de la copie", '#973c34');
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

	[...reduceButton].forEach(function(element) {
		element.addEventListener('click', () => {
			var nameID = this.closest('.container').id;
			this.closest('.container').style.visibility = 'hidden';

			if (nameID === 'container-terminal') {
				var terminalOpen = document.getElementById('button-terminal--header');
				terminalOpen.style.display = 'inline';
			} else if (nameID === 'container-file') {
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

// @Params {String} {String}	(Text), (#fff)
function notification(text, color) {
	const notificationArea = document.getElementById('notification-area');
	const notificationId = new Date().getTime();
	const para = document.createElement("div");
	para.classList.add("notification-area-box");
	para.style.borderRight = '5px solid ' + color;
	para.innerText = text;
	para.id = notificationId;
	notificationArea.appendChild(para);
	para.setAttribute("created-at", new Date().getTime());
};

function hideElement() {
	var test = document.getElementsByClassName('notification-area-box');
	for (let i = 0; i < test.length; i++) {
		if ((new Date().getTime() - test[i].getAttribute("created-at")) / 1000 > 7) {
			test[i].remove();
		}
	}
}

setInterval(function() {
	hideElement();
}, 200);

function removeResize() {
	const getData = document.querySelectorAll('.terminal');
	window.addEventListener("resize", function() {
		[...getData].forEach(function(element) {
			if (window.innerWidth < 992) {
				element.classList.remove('resize-drag');
			} else {
				element.classList.add('resize-drag')
			}
		})
	})
}

// @Params null
function displayMenu() {
	const hamburgerIcon = document.getElementById('openNavMenu');
	const hiddenMenu = document.body.childNodes[1];
	const header = document.getElementById('header-section');
	const closeButton = document.getElementById('close-hiddenMenu');
	
	hamburgerIcon.addEventListener('click', function() {
		if (hiddenMenu.dataset.active) {
			hiddenMenu.classList.remove('hideElement');
			hiddenMenu.dataset.active = true;
			header.classList.add('hideElement');
			document.body.children[2].classList.add('hideElement');
		}
	})

	closeButton.addEventListener('click', function() {
		if (hiddenMenu.dataset.active) {
			hiddenMenu.classList.add('hideElement');
			hiddenMenu.dataset.active = false;
			header.classList.remove('hideElement');
			document.body.children[2].classList.remove('hideElement');
		}
	})
}

function displayResponsive() {
	const container = document.getElementById('container-terminal');
	const textTerminal = container.childNodes[3];
	const contact = document.getElementById('container-contact');
	const textContact = contact.childNodes[3];

	if(document.documentElement.clientWidth < 992) {
		container.classList.remove('drag');
		textTerminal.classList.remove('resize-drag');
		contact.classList.remove('drag');
		textContact.classList.remove('resize-drag');
	} else {
		container.classList.add('drag');
		textTerminal.classList.add('resize-drag');
		contact.classList.add('drag');
		textContact.classList.add('resize-drag');
	}	
}

function validateForm() {
	const getFormButton = document.getElementById('form-button');

	getFormButton.addEventListener('click', function(e) {
		const firstname = document.forms["contact-form"]["name"].value;
		const phoneNumber = document.forms["contact-form"]["phone"].value;
		const email = document.forms["contact-form"]["email"].value;
		const contactText = document.forms["contact-form"]["description"].value;
		const regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
		const regexLetter = /^[a-zA-Z-]+$/;

		if (!firstname.match(regexLetter)) {
			notification(firstname + " n'est pas un prénom valide", '#973c34');
		} else if (!phoneNumber.match(phoneNumber)) {
			notification(phoneNumber + " n'est pas un numéro valide", '#973c34');
		} else if (!email.match(regexEmail)) {
			notification(phoneNumber + " n'est pas un e-mail valide", '#973c34');
		} else if (!contactText.match(regexLetter)) {
			notification(phoneNumber + " n'est pas un texte valide", '#973c34');
		} else {
			sendEmail();
			e.preventDefault();
		}
	});
}
//
// Run functions
//
displayWindows(); time();
date(); darkMode(); closeOpenTerminal();
resize(); dragAndDrop(); pressKey(); reduce();
openReduce(); removeResize();
displayMenu(); displayResponsive(); validateForm();