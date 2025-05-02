'use strict';
/* DÉBUT variables globales */
// ##########################
// Tableaux pour contenir les identifiants des cartes du jeu de mémoire.
// Voir un exemple d'utilisation dans la fonction init_jeu_memoire() au bas de ce fichier
let tableauDesCartes = [];
 
// Paramètres par défaut du jeu de mémoire. Ce sont les paramètres qui seront affichés à l'utilisateur la première fois
// Voir un exemple d'utilisation dans la fonction init_jeu_memoire() au bas de ce fichier
let _paramètres = {
    nbPaires: 12,
    temps: 60,
    age: 30,
    difficulté: "Facile"
};
   
/* FIN variables globales */
// ##########################
   
/**
 * Débuter le jeu de mémoire (le bouton "Débuter" est cliqué). Cet événement est déjà associé au bon bouton de l'interface
 * car il a été créé dans la fonction afficherParametres() dans le fichier js/utils.js
 */
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

    // Générer les cartes une seule fois
    tableauDesCartes = genererCartes(_paramètres.nbPaires);

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



    
    

 
/**
 * Terminer le jeu (le bouton Terminer est cliqué). Cet événement est déjà associé au bon bouton de l'interface
 * car il a été créé dans la fonction afficherParametres() dans le fichier js/utils.js
 */
function terminerJeuMémoire()
{
    alert("Déclanchement de la fonction terminerJeuMémoire()");
    // Todo : faire la logique
}
 
 
function init_jeu_memoire() {
 
    // On doiter vider le <main> et on affiche le jeu de mémoire
    // Affichage de son interface HTML (cartes, etc.)
    // Voir la documentation de la fonction pour plus de détails
    // Exemple d'utilisation :
    afficherParametres("main",_paramètres);
   
 
}
 
// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_jeu_memoire() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()
 