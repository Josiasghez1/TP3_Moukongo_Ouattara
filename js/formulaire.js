'use strict';
 
 
/* DÉBUT variables globales */
// ##########################
 
function validerPrenom() {
    const prenom = document.getElementById("txt-prenom").value.trim();
    const msgErreur = document.getElementById("msg_erreurPrenom");
    msgErreur.textContent = "";
 
    if (prenom === "") {
        msgErreur.textContent = "Champ requis";
        return false;
    }

    if (prenom === document.getElementById("txt-nom").value.trim()) {
        msgErreur.textContent = "Le prénom doit être différent du nom";
        return false;
    }
 
    return true;
}
 
function validerNom() {
    const nom = document.getElementById("txt-nom").value.trim();
    const msgErreur = document.getElementById("msg_erreurNom");
    const prenom = document.getElementById("txt-prenom").value.trim();
    msgErreur.textContent = "";
 
    if (nom === "") {
        msgErreur.textContent = "Champ requis";
        return false;
    }

    if (nom === document.getElementById("txt-prenom").value.trim()) {
        msgErreur.textContent = "Le nom doit être différent du prénom";
        return false;
    }
 
    return true;
}
 
function validerCourriel() {
    const courriel = document.getElementById("email-newsletter").value.trim();
    const msgErreur = document.getElementById("msg_erreurCourriel");
    msgErreur.textContent = "";
 
    const regexCourriel = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
 
    if (courriel === "") {
        msgErreur.textContent = "Champ requis";
        return false;
    } else if (!regexCourriel.test(courriel)) {
        msgErreur.textContent = "Courriel invalide";
        return false;
    }
 
    return true;
}
 
function validerConfirmationCourriel() {
    const courriel = document.getElementById("email-newsletter").value.trim();
    const confirmation = document.getElementById("confirmationCourriel").value.trim();
    const msgErreur = document.getElementById("msg_erreurConfirmationCourriel");
    msgErreur.textContent = "";
 
    if (confirmation === "") {
        msgErreur.textContent = "Champ requis";
        return false;
    } else if (courriel !== confirmation) {
        msgErreur.textContent = "Les courriels ne correspondent pas";
        return false;
    }
 
    return true;
}
 
function validerPseudo() {
    const pseudo = document.getElementById("pseudo").value.trim();
    const msgErreur = document.getElementById("msg_erreurPseudo");
    msgErreur.textContent = "";
 
    const regexPseudo = /^[a-zA-Z]{3,25}$/;
 
    if (pseudo === "") {
        msgErreur.textContent = "Champ requis";
        return false;
    } else if (!regexPseudo.test(pseudo)) {
        msgErreur.textContent = "Le pseudo doit contenir uniquement des lettres (3 à 25 caractères)";
        return false;
    }
 
    return true;
}


/* FIN variables globales */ 
// ##########################

function afficherChoixJeu()
{
	// Vide le <main> et affiche le choix du jeu
	// Il faut prévoir une image, un titre et une description pour chaque jeu
	// Il faut savoir quel jeu a été choisi par l'utilisateur, et ensuite appeler soit fonction init_jeu_memoire() ou init_quiz()
	// Ces fonctions sont le point d'entrée pour le jeu choisi par l'utilisateur et se trouvent respectivement 
	// dans les fichiers js/jeu_memoire.js et js/quiz.js
	// À la fin de cette fonction, on doit vider le <main> et afficher le jeu choisi par l'utilisateur

    const main = document.getElementById("main");
    main.textContent = ""; // Vider le <main> proprement

    // Créer le H2
    const h2 = document.createElement("h2");
    h2.textContent = "Choisis ton jeu";
    main.appendChild(h2);

    // Créer la DIV row
    const divRow = document.createElement("div");
    divRow.classList.add("row", "text-center");

    // ----------- Colonne Jeu de mémoire ------------
    const divColMemoire = document.createElement("div");
    divColMemoire.classList.add("col");

    const h3Memoire = document.createElement("h3");
    h3Memoire.textContent = "Jeu de mémoire";

    const imgMemoire = document.createElement("img");
    imgMemoire.src = "images/jeuMemoire.png";
    imgMemoire.alt = "Jeu de mémoire";
    imgMemoire.style.maxWidth = "100%";
    imgMemoire.style.cursor = "pointer";
    imgMemoire.addEventListener("click", init_jeu_memoire);

    const pMemoire = document.createElement("p");
    pMemoire.textContent = "Teste ta mémoire en retrouvant les paires !";

    // Ajouter les éléments du jeu de mémoire à la colonne
    divColMemoire.appendChild(h3Memoire);
    divColMemoire.appendChild(imgMemoire);
    divColMemoire.appendChild(pMemoire);

    // ----------- Colonne Quiz ------------
    const divColQuiz = document.createElement("div");
    divColQuiz.classList.add("col");

    const h3Quiz = document.createElement("h3");
    h3Quiz.textContent = "Quiz";

    const imgQuiz = document.createElement("img");
    imgQuiz.src = "images/quiz.png";
    imgQuiz.alt = "Quiz";
    imgQuiz.style.maxWidth = "100%";
    imgQuiz.style.cursor = "pointer";
    imgQuiz.addEventListener("click", init_quiz);

    const pQuiz = document.createElement("p");
    pQuiz.textContent = "Réponds aux questions pour tester tes connaissances !";

    // Ajouter les éléments du quiz à la colonne
    divColQuiz.appendChild(h3Quiz);
    divColQuiz.appendChild(imgQuiz);
    divColQuiz.appendChild(pQuiz);

    // ----------- Ajouter les deux colonnes à la rangée ------------
    divRow.appendChild(divColMemoire);
    divRow.appendChild(divColQuiz);

    // ----------- Ajouter toute la rangée dans <main> ------------
    main.appendChild(divRow);
}

	


function validerFormulaire() {
    const validePrenom = validerPrenom();
    const valideNom = validerNom();
    const valideCourriel = validerCourriel();
    const valideConfirmeCourriel = validerConfirmationCourriel();
    const validePseudo = validerPseudo();
 
    if (validePrenom && valideNom && valideCourriel && valideConfirmeCourriel && validePseudo) {
        document.getElementById("session").textContent = "Bienvenue " + document.getElementById("pseudo").value.trim();
        afficherChoixJeu();
    } else {
        console.log("Le formulaire contient des erreurs.");
    }
}

function gererBtnInvite()
{
    // Test direct au quiz
    // init_quiz();
 
    // Test direct au jeu de mémoire
    // init_jeu_memoire();
 
    document.getElementById("session").textContent = "Bienvenue invité";
        afficherChoixJeu();
}
 
 
function init_formulaire() {
 
    document.getElementById("txt-prenom").addEventListener("blur", validerPrenom);
    document.getElementById("txt-nom").addEventListener("blur", validerNom);
    document.getElementById("email-newsletter").addEventListener("blur", validerCourriel);
    document.getElementById("confirmationCourriel").addEventListener("blur", validerConfirmationCourriel);
    document.getElementById("pseudo").addEventListener("blur", validerPseudo);
 
    // Simple bouton pour passer le formulaire et aller au jeu de mémoire directement
    let btnInvite = document.getElementById("btnInvite");
    btnInvite.addEventListener("click", gererBtnInvite, false);
 
    document.getElementById("btnSoumettre").addEventListener("click", validerFormulaire, false);
}
 
   
addEventListener('load', init_formulaire, false);
 