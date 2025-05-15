'use strict';
 
 
/* DÉBUT variables globales */
// ##########################
// Récupération des champs du formulaire

const txtPrenom = document.getElementById("txt-prenom");
const txtNom = document.getElementById("txt-nom");
const emailNewsletter = document.getElementById("email-newsletter");
const confirmationCourriel = document.getElementById("confirmationCourriel");
const pseudo = document.getElementById("pseudo");

// Récupération des messages d'erreur à afficher
const msgErreurPrenom = document.getElementById("msg_erreurPrenom");
const msgErreurNom = document.getElementById("msg_erreurNom");
const msgErreurCourriel = document.getElementById("msg_erreurCourriel");
const msgErreurConfirmationCourriel = document.getElementById("msg_erreurConfirmationCourriel");
const msgErreurPseudo = document.getElementById("msg_erreurPseudo");

/* FIN variables globales */ 
// ##########################

function validerPrenom() {
    const prenom = txtPrenom.value.trim();
    msgErreurPrenom.textContent = "";
// Vérifie que le champ n'est pas vide

    if (prenom === "") {
        msgErreurPrenom.textContent = "Champ requis";
        return false;
    }
 // Vérifie que le prénom est différent du nom 
    if (prenom === txtNom.value.trim()) {
        msgErreurPrenom.textContent = "Le prénom doit être différent du nom";
        return false;
    }

    return true;
}

function validerNom() {
    const nom = txtNom.value.trim();
    const prenom = txtPrenom.value.trim();
    msgErreurNom.textContent = "";

    if (nom === "") {
        msgErreurNom.textContent = "Champ requis";
        return false;
    }

    if (nom === prenom) {
        msgErreurNom.textContent = "Le nom doit être différent du prénom";
        return false;
    }

    return true;
}

function validerCourriel() {
    const courriel = emailNewsletter.value.trim();
    msgErreurCourriel.textContent = "";

    // Expression régulière simple pour vérifier le format d'un email
    const regexCourriel = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

    if (courriel === "") {
        msgErreurCourriel.textContent = "Champ requis";
        return false;
    } else if (!regexCourriel.test(courriel)) {
        msgErreurCourriel.textContent = "Courriel invalide";
        return false;
    }

    return true;
}

function validerConfirmationCourriel() {
    const courriel = emailNewsletter.value.trim();
    const confirmation = confirmationCourriel.value.trim();
    msgErreurConfirmationCourriel.textContent = "";

    if (confirmation === "") {
        msgErreurConfirmationCourriel.textContent = "Champ requis";
        return false;
    } else if (courriel !== confirmation) {
        msgErreurConfirmationCourriel.textContent = "Les courriels ne correspondent pas";
        return false;
    }

    return true;
}

function validerPseudo() {
    const valPseudo = pseudo.value.trim();
    msgErreurPseudo.textContent = "";
// Vérifie que le pseudo contient seulement des lettres (entre 3 et 25 caractères)
    const regexPseudo = /^[a-zA-Z]{3,25}$/;

    if (valPseudo === "") {
        msgErreurPseudo.textContent = "Champ requis";
        return false;
    } else if (!regexPseudo.test(valPseudo)) {
        msgErreurPseudo.textContent = "Le pseudo doit contenir uniquement des lettres (3 à 25 caractères)";
        return false;
    }

    return true;
}

function afficherChoixJeu()
{
	// Vide le <main> et affiche le choix du jeu
	// Il faut prévoir une image, un titre et une description pour chaque jeu
	// Il faut savoir quel jeu a été choisi par l'utilisateur, et ensuite appeler soit fonction init_jeu_memoire() ou init_quiz()
	// Ces fonctions sont le point d'entrée pour le jeu choisi par l'utilisateur et se trouvent respectivement 
	// dans les fichiers js/jeu_memoire.js et js/quiz.js
	// À la fin de cette fonction, on doit vider le <main> et afficher le jeu choisi par l'utilisateur

    const main = document.getElementById("main");
    main.textContent = ""; // Vide le <main> avant d'ajouter les nouveaux éléments

    // const nav = document.createElement("nav");
    // nav.textContent = "Formulaire";
    // nav.style.background = "#F9D778";
    // nav.style.color = "#F7EED6";
    // main.appendChild(nav);

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
 