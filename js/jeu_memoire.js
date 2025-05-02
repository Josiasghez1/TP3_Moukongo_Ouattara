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
<<<<<<< HEAD
function debuterJeuMémoire()
{
    _paramètres.nbPaires = parseInt(document.getElementById("nbPaires").value);
    _paramètres.temps = parseInt(document.getElementById("temps").value);
    _paramètres.difficulté = document.getElementById("diff").value;

     const main = document.querySelector("main");
    main.innerHTML = "";

    const divMinuterie = document.createElement("div");
    const lblMinuterie = document.createElement("label");
    lblMinuterie.textContent = "Temps restant : ";
    const timerElement = document.createElement("span");
    timerElement.id = "timer";
    timerElement.textContent = _paramètres.temps;

    divMinuterie.appendChild(lblMinuterie);
    divMinuterie.appendChild(timerElement);
    main.appendChild(divMinuterie);

    // Ajuster le nombre de paires selon la difficulté
    if (_paramètres.difficulté === "Facile") {
        _paramètres.nbPaires = 6;
    } else if (_paramètres.difficulté === "Difficile") {
        _paramètres.nbPaires = 12;
    }
=======
>>>>>>> 60e7b8c879c86467c56baa2e177f51bd11f6f07a

    // Générer les cartes une seule fois
    tableauDesCartes = genererCartes(_paramètres.nbPaires);

<<<<<<< HEAD
    const sectionCartes = document.createElement("section");
    sectionCartes.id = "zoneJeu";
    sectionCartes.className = "grid-cartes";
    main.appendChild(sectionCartes);

    // Créer les cartes
    for (let i = 0; i < tableauDesCartes.length; i++) {
        const id = tableauDesCartes[i];

        const div = document.createElement("div");
        div.classList.add("carte");

        const imgCarte = document.createElement("img");
        imgCarte.src = "images/hidden.png";
        imgCarte.id = id;
        imgCarte.dataset.image = id.replace("c", ""); // pour vérifier les paires
        imgCarte.classList.add("cacherCarte");
        imgCarte.addEventListener("click", retournerCarte);

        div.appendChild(imgCarte);
        sectionCartes.appendChild(div);
    }

    démarrerMinuterie();
}
    function genererCartes(nbPaires) {
        let cartes = [];
        for (let i = 1; i <= nbPaires; i++) {
            cartes.push(`${i}`);   // Exemple: "1"
            cartes.push(`${i}c`);  // Exemple: "1c"
        }
        // Mélange aléatoire
        cartes.sort(() => Math.random() - 0.5);
        return cartes;
    }
   // alert("Déclanchement de la fonction debuterJeuMémoire()");
    // Todo : faire la logique
    let cartesRetournees = [];

    
function retournerCarte(evt) {
    const img = evt.currentTarget;

    if (img.classList.contains("trouvee") || img.classList.contains("retournee")) return;

    // Afficher la bonne image
    img.src = `cartes/${img.id}.jpg`; // "1.jpg" ou "1c.jpg"
    img.classList.add("retournee");
    cartesRetournees.push(img);

    if (cartesRetournees.length === 2) {
        setTimeout(verifierPaire, 800);
    }
}

function verifierPaire() {
    const [carte1, carte2] = cartesRetournees;

    if (carte1.dataset.image === carte2.dataset.image) {
        carte1.classList.add("trouvee");
        carte2.classList.add("trouvee");
        // ajouter son de réussite ici si tu veux
    } else {
        carte1.src = "images/hidden.png";
        carte2.src = "images/hidden.png";
        carte1.classList.remove("retournee");
        carte2.classList.remove("retournee");
        // ajouter son d’échec ici si tu veux
    }

    cartesRetournees = [];
}

function démarrerMinuterie() {
    const timerElement = document.getElementById("timer");
    tempsRestant = _paramètres.temps;
    timerElement.textContent = tempsRestant;

    timer = setInterval(() => {
        tempsRestant--;
        timerElement.textContent = tempsRestant;
        if (tempsRestant <= 0) {
            clearInterval(timer);
            alert("Temps écoulé !");
        }
    }, 1000);
}



    
    
=======
function debuterJeuMémoire() {
    const main = document.getElementById("main");

    // Créer la zone du jeu
    const sectionJeu = document.createElement("section");
    sectionJeu.id = "zoneJeu";
    sectionJeu.className = "grid-cartes";
    main.appendChild(sectionJeu);

    nbPairesTrouvees = 0;
    nbErreurs = 0;
    carteRetournee = null;
    verrouillage = false;
   

    _parametres.difficulté = document.getElementById("diff").value;

    if (_parametres.difficulté === "Difficile") {
        _parametres.nbPaires = 10;
        
        secondesRestantes = 40;
    } else {
        _parametres.nbPaires = 12;
        secondesRestantes = _parametres.temps; // par exemple 60
    }
    
    


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





>>>>>>> 60e7b8c879c86467c56baa2e177f51bd11f6f07a


/**
 * Terminer le jeu (le bouton Terminer est cliqué). Cet événement est déjà associé au bon bouton de l'interface
 * car il a été créé dans la fonction afficherParametres() dans le fichier js/utils.js
 */
function terminerJeuMémoire() {
    arreterMinuterie();
    afficherFinPartie(false);
}

function init_jeu_memoire() {
<<<<<<< HEAD
 
    // On doiter vider le <main> et on affiche le jeu de mémoire
    // Affichage de son interface HTML (cartes, etc.)
    // Voir la documentation de la fonction pour plus de détails
    // Exemple d'utilisation :
    afficherParametres("main",_paramètres);
   
 
=======

	// On doiter vider le <main> et on affiche le jeu de mémoire
	// Affichage de son interface HTML (cartes, etc.) 
	// Voir la documentation de la fonction pour plus de détails
	// Exemple d'utilisation : 
	// afficherParametres("main",_paramètres);
	// tableauDesCartes = genererCartes(_paramètres.nbPaires * 2);

	// console.log("tableauDesCartes : ", tableauDesCartes);

	const main = document.getElementById("main");
    main.innerHTML = "";
    afficherParametres("main", _parametres);
    tableauDesCartes = genererCartes(_parametres.nbPaires);
    console.log("tableauDesCartes : ", tableauDesCartes);
>>>>>>> 60e7b8c879c86467c56baa2e177f51bd11f6f07a
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