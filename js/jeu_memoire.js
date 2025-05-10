'use strict';
/* DÉBUT variables globales */ 
// ##########################
// Tableaux pour contenir les identifiants des cartes du jeu de mémoire.
// Voir un exemple d'utilisation dans la fonction init_jeu_memoire() au bas de ce fichier
let tableauDesCartes = [];

// Paramètres par défaut du jeu de mémoire. Ce sont les paramètres qui seront affichés à l'utilisateur la première fois
// Voir un exemple d'utilisation dans la fonction init_jeu_memoire() au bas de ce fichier
let _parametres = {
    nbPaires: 12,
    temps: 60,
     age: 30,
    difficulté: "Facile"
};

let nbPairesTrouvees = 0;
let timer = null;
let secondesRestantes = 0;
let carteRetournee = null;
let verrouillage = false;
let nbErreurs = 0;
let audioFond, audioSucces, audioErreur, audioGagne, audioPerdu;
	
/* FIN variables globales */ 
// ##########################
	
/**
 * Débuter le jeu de mémoire (le bouton "Débuter" est cliqué). Cet événement est déjà associé au bon bouton de l'interface
 * car il a été créé dans la fonction afficherParametres() dans le fichier js/utils.js
 */

    // Générer les cartes une seule fois
    //tableauDesCartes = genererCartes(_paramètres.nbPaires);

function debuterJeuMémoire() {
    const main = document.getElementById("main");
    const zon1 = document.getElementById("zoneJeu");
     if(zon1){
        zon1.remove();
     }
    
    

    // Créer la zone du jeu
    const sectionJeu = document.createElement("section");
    sectionJeu.id = "zoneJeu";
    sectionJeu.className = "grid-cartes";
    main.appendChild(sectionJeu);

    nbPairesTrouvees = 0;
    nbErreurs = 0;
    carteRetournee = null;
    verrouillage = false;
   

    // Ajuster les paramètres du jeu selon la difficulté
    _parametres.difficulte = document.getElementById("diff").value;

    if (_parametres.difficulte === "Difficile") {
        _parametres.nbPaires = 10;
        secondesRestantes = 40;

    } else {
        _parametres.nbPaires = 12;
        secondesRestantes = _parametres.temps;
    }
    _parametres.nbPaires= document.getElementById("nbPaires").value;
    

    tableauDesCartes = genererCartes(_parametres.nbPaires);

    for (let i = 0; i < tableauDesCartes.length; i++) {
        const id = tableauDesCartes[i];
        const divCarte = document.createElement("div");
        divCarte.classList.add("carte");
    
        const img = document.createElement("img");
        img.src = "images/hidden.png";
        img.id = id;
        img.dataset.cacher = "oui";
        img.dataset.numcarte = id;
        img.classList.add("cacherCarte");
        img.addEventListener("click", gererClicCarte);
    
        divCarte.appendChild(img);
        sectionJeu.appendChild(divCarte);
    }
    

    lancerMinuterie();
   jouerMusiqueFond();
}







/**
 * Terminer le jeu (le bouton Terminer est cliqué). Cet événement est déjà associé au bon bouton de l'interface
 * car il a été créé dans la fonction afficherParametres() dans le fichier js/utils.js
 */
function terminerJeuMémoire() {
    arreterMinuterie();
    afficherFinPartie(false);
}

function init_jeu_memoire() {

	// On doiter vider le <main> et on affiche le jeu de mémoire
	// Affichage de son interface HTML (cartes, etc.) 
	// Voir la documentation de la fonction pour plus de détails
	// Exemple d'utilisation : 
	// afficherParametres("main",_paramètres);
	// tableauDesCartes = genererCartes(_paramètres.nbPaires * 2);

	// console.log("tableauDesCartes : ", tableauDesCartes);

	const main = document.getElementById("main");
    main.innerHTML = "";
    document.getElementById("titreJeu").textContent = "Jeu mémoire";

    afficherParametres("main", _parametres);
   // tableauDesCartes = genererCartes(_parametres.nbPaires);
    console.log("tableauDesCartes : ", tableauDesCartes);
}
/* Gestion des cartes */ 
// #####################

function gererClicCarte(evt) {
    if (verrouillage) return;

    const img = evt.target;

    // Si déjà visible, on ne fait rien
    if (img.dataset.cacher === "non") return;

    // Extraire l'id de la carte
    const idCarte = img.id; // ex: carte-3c ou carte-3

    // Récupérer uniquement les chiffres après "carte-" et ignorer "c" s'il est présent
    let numCarte = "";
    for (let i = 6; i < idCarte.length; i++) {
        if (!isNaN(idCarte[i])) {
            numCarte += idCarte[i]; // ajouter uniquement les chiffres
        }
    }

    // Afficher l'image de la carte
    img.src = `cartes/${numCarte}.jpg`;
    img.dataset.cacher = "non";

    // Comparaison avec la 1ère carte retournée
    if (!carteRetournee) {
        carteRetournee = img;
        carteRetournee.dataset.num = numCarte; // on garde son numéro simple
    } else {
        verrouillage = true;

        setTimeout(() => {
            const num1 = carteRetournee.dataset.num;
            const num2 = numCarte;

            if (num1 === num2 && img.id !== carteRetournee.id) {
                // C’est une paire
                carteRetournee = null;
                nbPairesTrouvees++;
                jouerSonSucces();

                if (nbPairesTrouvees === _parametres.nbPaires) {
                    arreterMinuterie();
                    afficherFinPartie(true);
                }
            } else {
                // Pas une paire
                img.src = "images/hidden.png";
                img.dataset.cacher = "oui";

                carteRetournee.src = "images/hidden.png";
                carteRetournee.dataset.cacher = "oui";

                carteRetournee = null;
                nbErreurs++;
                jouerSonErreur();

                if (_parametres.difficulte === "Difficile" && nbErreurs >= 4) {
                    arreterMinuterie();
                    afficherFinPartie(false);
                }
            }

            verrouillage = false;
        }, 1000);
    }
}


/* Minuterie et Fin de partie*/ 
// #########################

function lancerMinuterie() {
    const zoneMinuterie = document.getElementById("timer"); 
    zoneMinuterie.textContent = `${secondesRestantes}s`;
    
    timer = setInterval(() => {
        secondesRestantes--;
        zoneMinuterie.textContent = `${secondesRestantes}s`;
        if (secondesRestantes <= 0)
         {
            clearInterval(timer);
            afficherFinPartie(false);
        }
    }, 1000);
}



function arreterMinuterie() {
    if (timer) clearInterval(timer);
    arreterMusiqueFond();
}

function afficherFinPartie(reussi) {

    const zoneJeu = document.getElementById("zoneJeu");
    zoneJeu.innerHTML = "";

    const message = document.createElement("h2");

   if (reussi)
    {
        message.textContent = "Bravo, vous avez gagné !";
    }
    else 
    {
        message.textContent = "Dommage, vous avez perdu.";
    }


    const img = document.createElement("img");

    if (reussi) {
        img.src = "images/valide.png";
        img.alt = "succès";
    } 
    else {
        img.src = "images/invalide.png";
        img.alt = "échec";
    }
    img.style.maxWidth = "300px";

    zoneJeu.appendChild(message);
    zoneJeu.appendChild(img);

    if (reussi) {
        jouerSonGagne(); // Joue un son de victoire
        arreterMusiqueFond();
    } 
    else {
        jouerSonPerdu(); // Joue un son d'échec
        arreterMusiqueFond();
    }
    
}

/* Sons et Musique*/ 
// ################

function jouerMusiqueFond() {
    audioFond = new Audio("sons/musique.wav");
    audioFond.loop = true;
    audioFond.play();
}

function arreterMusiqueFond() {
    if (audioFond) 
    {
        audioFond.pause();
        audioFond.currentTime = 0;
    }
}

function jouerSonSucces() {
    audioSucces = new Audio("sons/succes.mp3");
    audioSucces.play();
}

function jouerSonErreur() {
    audioErreur = new Audio("sons/erreur.mp3");
    audioErreur.play();
}

function jouerSonGagne() {
    audioGagne = new Audio("sons/gagne.wav");
    audioGagne.play();
}

function jouerSonPerdu() {
    audioPerdu = new Audio("sons/perdu.wav");
    audioPerdu.play();
}

// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_jeu_memoire() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()