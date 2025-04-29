'use strict';

// /* DÉBUT variables globales */
// 

// Variables globale qui contient les données du quiz
// Il s'agit d'un tableau d'objets, chaque objet contient une question, un tableau de réponses et l'indice de la bonne réponse
// Vous remplacer son contenu par votre propre quiz, vos questions et réponses, etc.
// Vous pouvez même modifier entièrement la structure de cette variable si vous le désirez
let donnees = [
    {
        question: "Quel animal est connu pour changer de couleur pour se camoufler ? ",
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
        question: "Comment s’appelle le petit du lion ?",
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
        question: "Quel oiseau ne peut pas voler mais court très vite ?",
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
        question: " Quel est l'aminal le plus rapide sur terre ? ",
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
        question: "Quel animal est capable d’imiter la voix humaine ?",
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
        question: "Quel animal est connu pour être un excellent grimpeur et très proche de l’humain ?",
        réponses: [
            "Le tigrel",
            "La tortue",
            "Le singe",
            "Je ne sais pas"
            
        ],
        réponse: 2
    },
    {
        question: "Lequel de ces animaux peut vivre le plus longtemps ?",
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
        question: "Quel animal est surnommé : le meilleur ami de l’homme ?",
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
        question: "Quel animal peut parler, voler, et est souvent gardé en cage ?",
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
        question: "Quel animal possède une carapace qui le protège des prédateurs ?",
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

 let score =0;
 let indexQuestion = 0;
 

//* FIN variables globales */	
// // ##########################

function afficherQuestion(){
    let main= document.getElementById("main");
    main.textContent ="";
    if (indexQuestion>=donnees.length){
        afficherResultat();
        return;
    }

    let q = donnees[indexQuestion];
    let titre = document.createElement("h2");
   titre.textContent = `Question ${indexQuestion + 1}/${donnees.length}`;
   titre.style.marginBottom = "20 px";
   titre.style.fontWeight="bold";
   main.appendChild(titre);

   let p = document.createElement("p");
   p.textContent = q.question;
   p.style.marginBottom ="20px";
   main.appendChild (p);
   let ol = document.createElement("ol");
 
   for (let i = 0; i<q.réponses.length;i++){
    let li = document.createElement("li");
    li.textContent =q.réponses[i];
    ol.appendChild(li);

   };
   main.appendChild(ol);
   let label = document.createElement("label");
   label.textContent = "Réponse: ";
   label.setAttribute ("for","champReponse");
   main.appendChild(label);

   let input = document.createElement("input");
   input.type = "text";
   input.style.width="50px";
   input.style.margin ="10px";
   input.id ="champReponse";
   main.appendChild (input);

 
   
  let br = document.createElement("br");
  main.appendChild(br);
  
   let bouton = document.createElement("button");
   bouton.textContent ="suivant";
   bouton.style.background ="#E48E36";
   bouton.style.color ="#F7EED6";
   bouton.style.marginTop ="10px";
   bouton.style.marginBottom ="50px";
   bouton.addEventListener("click",verifierReponse);
   main.appendChild(bouton);
   
}
function verifierReponse(){
   
    let champ = document.getElementById("champReponse");
    let reponseUtilisateur = parseInt(champ.value) ;
    if(champ.value=== "")
        {
            indexQuestion++;
            afficherQuestion();
            return;
        }
    if( isNaN(reponseUtilisateur) || reponseUtilisateur<1 || reponseUtilisateur>donnees[indexQuestion].réponses.length)
        {
            alert("Veuillez entrer une réponse valide !!!");
            return;
        }
    
     let bonneReponse = donnees[indexQuestion].réponse;
         
    if (reponseUtilisateur-1 ===bonneReponse){
        console.log("Bonne réponse !");
        score++;
    }
    else{
        console.log("Mauvaise réponse !");
    }
    
     indexQuestion++ ;
     afficherQuestion();
}





function afficherResultat(){
    let main= document.getElementById("main");
    main.textContent = "";
    let resultat = document.createElement("h2");
    resultat.textContent = `Quiz terminé ! Ton score : ${score} / ${donnees.length}`;
    main.appendChild(resultat);
    let message = document.createElement("p");
    if (score >= donnees.length / 2){
        message.textcontent = "Félications 🎉 Tu as réussi le quiz !";}
    else {
        message.textContent ="Dommage Tu pourras réessayer.";
    }
    main.appendChild(message);
    
}
//afficherQuestion();
//afficherResultat();


function init_quiz() {

	// On doiter vider le <main> et on affiche le quiz, à partir de votre source de données "donnees", qui est une variable globale
    let main= document.getElementById("main");
    
    main.textContent ="";
	// Vous remplacer son contenu par le contenu de votre quiz, vos questions et réponses, etc.
	//console.log("init_quiz() : initialisation du quiz");
	//console.log("donnees : ", donnees);
    // alert("Le quiz démarre !");
    afficherQuestion();
    
	

}


// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_quiz() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()