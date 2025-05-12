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
let deuxiemeCarte = null;
let numDeuxiemeCarte = "";
let jeuTermine = false;  // Ajout d'une variable pour gérer la fin du jeu
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
    
        // Ajuster les paramètres du jeu selon la temps
        _parametres.temps = parseInt(document.getElementById("temps").value);
    
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
    arreterMusiqueFond();
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
    if (img.dataset.cacher === "non") return;

    const idCarte = img.id;
    let numCarte = "";
    for (let i = 6; i < idCarte.length; i++) {
        if (!isNaN(idCarte[i])) {
            numCarte += idCarte[i];
        }
    }

    img.src = `cartes/${numCarte}.jpg`;
    img.dataset.cacher = "non";

    if (carteRetournee === null) {
        // Première carte retournée
        carteRetournee = img;
        carteRetournee.dataset.num = numCarte;
    } else {
        // Deuxième carte retournée
        deuxiemeCarte = img;
        numDeuxiemeCarte = numCarte;
        verrouillage = true;
        setTimeout(verifierPaire, 1000);
    }
}


function verifierPaire() {
    if (jeuTermine) return;  // Vérifier si le jeu est déjà terminé

    var num1 = carteRetournee.dataset.num;
    var num2 = numDeuxiemeCarte;
    var estPaire = (num1 === num2 && deuxiemeCarte.id !== carteRetournee.id);

    if (estPaire) {
        carteRetournee = null;
        deuxiemeCarte = null;
        nbPairesTrouvees++;
        jouerSonSucces();

        // _parametres.nbPaires= document.getElementById("nbPaires").value;
        _parametres.nbPaires = parseInt(document.getElementById("nbPaires").value);

        if (nbPairesTrouvees === _parametres.nbPaires && !jeuTermine) {
            jeuTermine = true;  // Marquer le jeu comme terminé
            arreterMinuterie();
            arreterMusiqueFond();
            jouerSonGagne();
            afficherFinPartie(true);
        }
    } else {
        deuxiemeCarte.src = "images/hidden.png";
        deuxiemeCarte.dataset.cacher = "oui";
        carteRetournee.src = "images/hidden.png";
        carteRetournee.dataset.cacher = "oui";

        carteRetournee = null;
        deuxiemeCarte = null;
        nbErreurs++;
        jouerSonErreur();

        if (_parametres.difficulte === "Difficile" && nbErreurs >= 4) {
            arreterMinuterie();
            afficherFinPartie(false);
        }
    }

    verrouillage = false;
}

/* Minuterie et Fin de partie*/ 
// #########################

function lancerMinuterie() {
    const zoneMinuterie = document.getElementById("timer"); 
    zoneMinuterie.textContent = `${secondesRestantes}s`;

    timer = setInterval(mettreAJourMinuterie, 1000);
}

function mettreAJourMinuterie() {
    if (jeuTermine) return;  // Arrêter la minuterie si le jeu est fini

    const zoneMinuterie = document.getElementById("timer");
    secondesRestantes--;
    zoneMinuterie.textContent = `${secondesRestantes}s`;

    if (secondesRestantes <= 0) {
        clearInterval(timer);
        afficherFinPartie(false);
        jeuTermine = true;  // Marquer le jeu comme terminé si le temps est écoulé
    }
}

function arreterMinuterie() {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

function afficherFinPartie(reussi) {
    const zoneJeu = document.getElementById("zoneJeu");
    zoneJeu.innerHTML = "";

    const message = document.createElement("h2");
    message.textContent = reussi ? "Bravo, vous avez gagné !" : "Dommage, vous avez perdu.";

    const img = document.createElement("img");
    img.src = reussi ? "images/valide.png" : "images/invalide.png";
    img.alt = reussi ? "succès" : "échec";
    img.style.maxWidth = "300px";

    zoneJeu.appendChild(message);
    zoneJeu.appendChild(img);

    if (reussi) {
        jouerSonGagne();
    } else {
        jouerSonPerdu();
    }
    
    arreterMusiqueFond();
}

/* Sons et Musique*/ 
// ################

function jouerMusiqueFond() {
    audioFond = new Audio("sons/musique.wav");
    audioFond.loop = true;
    audioFond.play();
}

function arreterMusiqueFond() {
    if (audioFond) {
        audioFond.pause();
        audioFond.currentTime = 0; // Remettre à zéro si nécessaire
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