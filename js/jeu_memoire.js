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
    const main = document.querySelector("main");
    main.innerHTML = "";
    if (_paramètres.difficulté === "Facile") {
        _paramètres.nbPaires = 6;
    } else if (_paramètres.difficulté === "Difficile") {
        _paramètres.nbPaires = 12;
    }


    const sectionCartes = document.createElement("section");
    sectionCartes.id = "zoneJeu";
    sectionCartes.className= "grid-cartes";
   main.appendChild(sectionCartes);


    tableauDesCartes = genererCartes(_paramètres.nbPaires );

  /*  tableauDesCartes.forEach((id, index) => {
        let carte = document.createElement("img");
        carte.src = "cartes/cachee.png";
        carte.dataset.idCarte = id;
        carte.dataset.index = index;
        carte.classList.add("carte");
        carte.addEventListener("click", retournerCarte);
        sectionCartes.appendChild(carte);
    });
*/
   for(let i=0;i<tableauDesCartes.length;i++)
    {
        const id= tableauDesCartes[i];
     const div = document.createElement("div");
     div.classList.add("carte");
     

     let imgCarte = document.createElement("img");
     imgCarte.src ="images/hidden.png";
     imgCarte.id = id;
     imgCarte.dataset.cacher = "oui";
     //imgCarte.dataset.numCarte =id.replace("carte-","").replace("c","");;
     imgCarte.dataset.image = id; 
     imgCarte.classList.add("cacherCarte");
     imgCarte.addEventListener("click",retournerCarte);

     /*for (let i; i<=nbPaires;i++){
        imgCarte.push(`carte-${i}.jpg`);  
        imgCarte.push(`carte-${i}c.jpg`);
     } */
        div.appendChild(imgCarte);
        sectionCartes.appendChild(div);
        
    } 
 
    démarrerMinuterie();
}
 function genererCartes(nbCartes) {
    let nbPaires = nbCartes / 2;
    let cartes = [];

    for (let i = 0; i < nbPaires; i++) {
        cartes.push(i);
        cartes.push(i); 
    }

    // Mélanger les cartes
    for (let i = cartes.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cartes[i], cartes[j]] = [cartes[j], cartes[i]];
    }

    return cartes;
}

   // alert("Déclanchement de la fonction debuterJeuMémoire()");
    // Todo : faire la logique
    let cartesRetournees = [];

    function retournerCarte(evt) {
        const img = evt.currentTarget;
        if (img.classList.contains("trouvee") || img.classList.contains("retournee")) return;
    
        img.src = `cartes/${img.dataset.image}`;
        cartesRetournees.push(img);
        img.classList.add("retournee"); 
    
        if (cartesRetournees.length === 2) {
            setTimeout(verifierPaire, 800);
        }
    }
    function verifierPaire() {
        const [carte1, carte2] = cartesRetournees;
    
        if (carte1.dataset.idCarte === carte2.dataset.idCarte) {
            carte1.classList.add("trouvee");
            carte2.classList.add("trouvee");
            // son de réussite
        } else {
            carte1.src = "images/hidden.png";
            carte2.src = "images/hidden.png";
            carte1.classList.remove("retournee");
            carte2.classList.remove("retournee");
            // son d’échec
        }
    
        cartesRetournees = [];
    }
    let timer;
    let tempsRestant = _paramètres.temps;

    function démarrerMinuterie() 
    {
    timer = setInterval(() => {
        tempsRestant--;
        document.querySelector("#tempsRestant").textContent = tempsRestant + " sec";

        if (tempsRestant <= 0) {
            clearInterval(timer);
            alert("Temps écoulé !");
            terminerJeuMémoire();
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
    tableauDesCartes = genererCartes(_paramètres.nbPaires * 2);
 
    console.log("tableauDesCartes : ", tableauDesCartes);
 
 
}
 
// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_jeu_memoire() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()
 