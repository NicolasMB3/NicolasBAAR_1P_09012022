version(.06);const textTerminal=document.getElementById("terminal-text");let inputValue=document.querySelector("#command");const commands={nicolas:"Développeur web full-stack. Mordu d informatique, j’ai appris à programmer dès mon plus jeune âge dans divers langages informatiques comme JavaScript, PHP ... \n      Polyvalent, je maîtrise les différentes étapes techniques de la création d un site web ; de la compréhension des besoins utilisateurs, à la conception des \n      maquettes jusqu'au développement front-end et back-end.",contact:"Pour me contacter => nicolasbaar@outlook.fr ou en cliquant sur le dossier 'Me contacter' à gauche de l'écran.",clearbin:"La corbeille a été vidée.",alreadytheme:"Le thème est déjà ",theme:"Le thème a correctement été changé.",unknow:"Merci d'écrire une commande (liste disponible avec la commande help)",errorTheme:"Merci de spécifier un thème [dark/light]"};function version(e){return[...document.getElementsByClassName("version")].forEach((t=>{t.innerHTML+="v["+e+"]"})),e}function time(){setInterval((()=>{let e=new Date,t=("0"+e.getHours()).slice(-2)+":"+("0"+e.getMinutes()).slice(-2);e.getHours()<=12?t+=" AM":t+=" PM",document.getElementById("time").innerHTML=t}),1e3)}function date(){let e=new Date,t=("0"+e.getDate()).slice(-2)+"/"+("0"+(e.getMonth()+1)).slice(-2)+"/"+e.getFullYear();document.getElementById("date").innerHTML=t}function removeInput(){document.querySelector("#terminal-input").remove()}function inputToText(){const e=inputValue.value;removeInput(),textTerminal.innerHTML+='\n      <div id="terminal-input-new">\n         <span class="text--bold" id="terminal-title">C:\\Users\\Nicolas></span>\n         <span id="new-input--style">'+e+"</span>\n      </div>"}function newInput(){textTerminal.innerHTML+='<div id="terminal-input">\n         <p><span class="text--bold">C:\\Users\\Nicolas></span></p>\n         <input type="text" id="command" name="command" required minlength="4" maxlength="14" autocomplete="off" autofocus>\n      </div>',inputValue=document.querySelector("#command"),inputValue.focus(),pressKey()}function writeAnwser(e){const t=document.createElement("div"),n=document.createTextNode("C:\\ > : "+e);t.append(n),textTerminal.appendChild(t),inputValue.disabled=!0}function pressKey(){inputValue.addEventListener("keypress",(e=>{if("Enter"!==e.key)return;const t=document.getElementById("image-bin");switch(inputValue.value.toLowerCase()){case"help":inputToText(),textTerminal.innerHTML+='\n               <div id="header-request">\n                  <span class="custom-side-right">- X</span>\n                  <p>****** Commandes disponibles ******</p>\n                  <ul id="commands-help">\n                     <li>help : Affiche toutes les commandes disponibles</li>\n                     <li>nicolas : En savoir plus sur moi</li>\n                     <li>theme [light/dark] : Change le thème du site</li>\n                     <li>contact : Rentrer en contact avec moi</li>\n                     <li>clear : Nettoie la console</li>\n                  </ul>\n               </div>',newInput();break;case"nicolas":inputToText(),writeAnwser(commands.nicolas),newInput();break;case"contact":inputToText(),writeAnwser(commands.contact),newInput();break;case"clear":t.src="assets/images/folder-bin-not-empty.png",textTerminal.innerHTML="",newInput();break;case"clear bin":inputToText(),writeAnwser(commands.clearbin),t.src="assets/images/folder-bin.png",newInput();break;case"theme light":"light"==document.documentElement.getAttribute("data-theme")?(inputToText(),writeAnwser(commands.alreadytheme+"light."),newInput()):(inputToText(),document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("mode","light"),writeAnwser(commands.theme),newInput());break;case"theme dark":"dark"==document.documentElement.getAttribute("data-theme")?(inputToText(),writeAnwser(commands.alreadytheme+"dark."),newInput()):(inputToText(),document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("mode","dark"),writeAnwser(commands.theme),newInput());break;case"theme":inputToText(),writeAnwser(commands.errorTheme),newInput();break;default:inputToText(),writeAnwser(commands.unknow),newInput()}}))}function dragAndDrop(){function e(e){var t=e.target,n=(parseFloat(t.getAttribute("data-x"))||0)+e.dx,i=(parseFloat(t.getAttribute("data-y"))||0)+e.dy;t.style.transform="translate("+n+"px, "+i+"px)",t.setAttribute("data-x",n),t.setAttribute("data-y",i)}interact(".drag").styleCursor(!1).draggable({inertia:!0,modifiers:[interact.modifiers.restrictRect({restriction:"parent"})],autoScroll:!1,listeners:{move:e}}),window.dragMoveListener=e}function closeOpenTerminal(){const e=document.getElementsByClassName("circle-red"),t=document.getElementsByClassName("openClose");[...e].forEach((e=>{e.addEventListener("click",(function(){const e=document.getElementsByClassName("container");Array.from(e).forEach((e=>{this.closest(".container").classList.add("close-animation")}))}))})),[...t].forEach((e=>{e.addEventListener("dblclick",(function(t){const n=document.getElementById("container-terminal"),i=document.getElementById("container-file"),a=document.getElementById("container-contact");123==e.getAttribute("data-id")?(i.classList.remove("close-animation"),i.style.visibility="visible",i.style.zIndex="5"):456==e.getAttribute("data-id")?(a.classList.remove("close-animation"),a.style.visibility="visible",a.style.zIndex="5"):(n.classList.remove("close-animation"),n.style.visibility="visible",n.style.zIndex="5")}))}))}function resize(){interact(".resize-drag").resizable({edges:{left:!1,right:!0,bottom:!0,top:!1},listeners:{move(e){var t=e.target,n=parseFloat(t.getAttribute("data-x"))||0,i=parseFloat(t.getAttribute("data-y"))||0;t.style.width=e.rect.width+"px",t.style.height=e.rect.height+"px",n+=e.deltaRect.left,i+=e.deltaRect.top,t.style.transform="translate("+n+"rem,"+i+"rem)",t.setAttribute("data-x",n),t.setAttribute("data-y",i)}},modifiers:[interact.modifiers.restrictEdges({inner:{left:100,right:200}}),interact.modifiers.restrictSize({min:{width:740,height:150},max:{width:1800,height:700}})],inertia:!0}).draggable({listeners:{move:window.dragMoveListener},inertia:!0,modifiers:[interact.modifiers.restrictRect({restriction:"parent",endOnly:!0})]})}function darkMode(){const e=document.getElementsByClassName("button-switch");"dark"==localStorage.getItem("mode")?document.documentElement.setAttribute("data-theme","dark"):document.documentElement.setAttribute("data-theme","light"),[...e].forEach((e=>{e.addEventListener("click",(function(){"dark"==document.documentElement.getAttribute("data-theme")?(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("mode","light")):(document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("mode","dark"))}))}))}function sendEmail(){document.getElementById("form-button").addEventListener("click",(function(){var e={name:document.getElementById("name").value,entreprise:document.getElementById("entreprise").value,phone:document.getElementById("phone").value,email:document.getElementById("email").value,description:document.getElementById("description").value};emailjs.send("service_a80h2ni","template_766uk3r",e).then((function(e){notification("Message envoyé")}),(function(e){notification("Problème lors de l'envoie")}))}))}function displayWindows(){const e=[...document.getElementsByClassName("container")];let t="10";e.forEach((e=>{e.addEventListener("click",(()=>{e.style.zIndex=t,t++}))}))}function copyTextToClipboard(e){navigator.clipboard?navigator.clipboard.writeText(e).then((function(){notification("E-mail copié")}),(function(e){console.error("Async: Impossible de copier l'e-mail : ",e)})):fallbackCopyTextToClipboard(e)}var copyBobBtn=document.getElementById("email-copy");function reduce(){[...document.getElementsByClassName("circle-grey")].forEach((e=>{e.addEventListener("click",(function(){var e=this.closest(".container").id;if(this.closest(".container").style.visibility="hidden","container-terminal"===e)document.getElementById("button-terminal--header").style.display="inline";else if("container-file"===e){document.getElementById("button-file--header").style.display="inline"}else{document.getElementById("button-contact--header").style.display="inline"}}))}))}function openReduce(){var e=document.getElementById("button-terminal--header");e.addEventListener("dblclick",(()=>{e.style.display="none";document.getElementById("container-terminal").style.visibility="visible"}));var t=document.getElementById("button-contact--header");t.addEventListener("dblclick",(()=>{t.style.display="none";document.getElementById("container-contact").style.visibility="visible"}));var n=document.getElementById("button-file--header");n.addEventListener("dblclick",(()=>{n.style.display="none";document.getElementById("container-file").style.visibility="visible"}))}function notification(e){const t=document.getElementById("notification-area"),n=(new Date).getTime(),i=document.createElement("div");i.classList.add("notification-area-box"),i.innerText=e,i.id=n,t.appendChild(i),i.setAttribute("created-at",(new Date).getTime())}function hideElement(){var e=document.getElementsByClassName("notification-area-box");for(let t=0;t<e.length;t++)((new Date).getTime()-e[t].getAttribute("created-at"))/1e3>7&&e[t].remove()}copyBobBtn.addEventListener("click",(function(){copyTextToClipboard("nicolasbaar@outlook.fr")})),setInterval((function(){hideElement()}),200),displayWindows(),time(),date(),darkMode(),closeOpenTerminal(),resize(),dragAndDrop(),pressKey(),reduce(),openReduce(),sendEmail();