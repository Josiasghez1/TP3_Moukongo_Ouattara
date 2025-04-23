'use strict';

// /* DÉBUT variables globales */
// 

// Variables globale qui contient les données du quiz
// Il s'agit d'un tableau d'objets, chaque objet contient une question, un tableau de réponses et l'indice de la bonne réponse
// Vous remplacer son contenu par votre propre quiz, vos questions et réponses, etc.
// Vous pouvez même modifier entièrement la structure de cette variable si vous le désirez
let donnees = [
    {
        question: "1-Quel animal est connu pour changer de couleur pour se camoufler ? ",
        réponses: [
            "Le caméléon",
            "Le serpent",
            "Le lézard ",
            "La grenouille",
            "Je ne sais pas"
           
        ],
        réponse: 0
       
    },
    {
        question: "2-Comment s’appelle le petit du lion ?",
        réponses: [
            "Lionceau",
            "Tigrelet",
            "Léopardeau ",
            "Je ne sais pas",
            "Louveteau"
        ],
        réponse: 0
    },
    {
        question: "3-Quel oiseau ne peut pas voler mais court très vite ?",
        réponses: [
            "Le perroquet",
            "Le kiwi",
            "L’autruche",
            "Le pélican ",
            "Je ne sais pas"
        ],   
        réponse: 2
    },
    {
        question: " 4- Quel est le plus rapide sur terre ? ",
        réponses: [
            "Le guépard",
            "Le lion",
            "Le cheval",
            "L’antilope ",
            "Je ne sais pas"
            
        ],
        réponse: 0
    },
    {
        question: "5- Quel animal est capable d’imiter la voix humaine ?",
        réponses: [
            "Le chat",
            "Le perroquet ",
            "Le singe ",
            "L’oiseau colibri ",
            "Je ne sais pas"
             
        ],
        réponse: 1
    },
    {
        question: "6- Quel animal est connu pour être un excellent grimpeur et très proche de l’humain ?",
        réponses: [
            "Le tigrel",
            "La tortue",
            "Le singe",
            "Je ne sais pas"
            
        ],
        réponse: 2
    },
    {
        question: " 7- Lequel de ces animaux peut vivre le plus longtemps ?",
        réponses: [
            "Le chat",
            "Le papillon",
            "Le chien",
            "La tortue ",
            "Je ne sais pas"
          
        ],
        réponse: 3
    },
    {
        question: "8- Quel animal est surnommé : le meilleur ami de l’homme ?",
        réponses: [
            "Le chat",
            "Le chien",
            "Le singe",
            "La poule",
            "Je ne sais pas"
            
        ],
        réponse: 1
    },
    {
        question: "9- Quel animal peut parler, voler, et est souvent gardé en cage ?",
        réponses: [
            "Le perroquet",
            "Le chat",
            "La tortue",
            "Le papillon",
            "Je ne sais pas"
            
        ],
        réponse: 0
    },
    {
        question: " 10- Quel animal possède une carapace qui le protège des prédateurs ?",
        réponses: [
            "Les tatous",
            "Le chat",
            "La tortue ",
            "Le papillon",
            "Je ne sais pas"
              
        ],
        réponse: 2
    }
];



//* FIN variables globales */	
// // ##########################


function init_quiz() {

	// On doiter vider le <main> et on affiche le quiz, à partir de votre source de données "donnees", qui est une variable globale
	// Vous remplacer son contenu par le contenu de votre quiz, vos questions et réponses, etc.
	console.log("init_quiz() : initialisation du quiz");
	console.log("donnees : ", donnees);
    alert("Le quiz démarre !");
	

}


// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_quiz() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()