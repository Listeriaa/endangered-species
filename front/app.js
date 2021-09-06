
const app = {
    
    ApiURl: "http://localhost:8000/api/v1/",
   
    //method to get all endangered french species and create card element for each species
    getFrenchSpecies: function(){

        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        
        
        request = fetch(app.ApiURl + "list", config);
            
        console.log(request);
        request.then(function(response) {
        
            if(response.status === 200){
                return response.json();

            } else {
                console.log(response);
                alert('il y a un problème');
            }
        })
        .then(function(json){
            
            app.addNumber(json.count);

            json.result.forEach(element => {
                if(element.category == "CR" || element.category == "EN" || element.category == "VU" || element.category == "EX"){
                    
                   app.createCard(element.scientific_name, element.category, element.taxonid);
                }
                
            });
            
        });
        
    },
    //method to get the french common name of the specie, or english if french doesn't exist
    getCommonName: function(specieName){
        
        return new Promise((resolve, reject) => {
            let config = {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache'
            };
            
            
            request = fetch(app.ApiURl + specieName +"/common", config);
            request.then(function(response) {
               
                    if(response.status === 200){
                        return response.json();
        
                    } else {
                        alert('il y a un problème');
                    }
                })
                .then(function(json){
                    
                    if (json.result.length > 0){
                        
                        json.result.forEach(element => {
                            
                            if(element.language == "fre"){
                               
                                resolve(element.taxonname);
                            } else if(element.language == "eng") {
                                let englishName = element.taxonname + " (GB)";
                                resolve(englishName);
                            } else {
                                resolve("non renseigné");
                            }
                        });
                    
                    } else {
                        resolve("non renseigné");
                    }
                    
                });
          });
 

    },

    //method to get the kind of threat endangering the specie, the API returns an english response
    // to get it in French, the method translateThreat is called
    getThreat: function(specieName){
        return new Promise ((resolve, reject) => {
            let config = {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache'
            };
            
            
            request = fetch(app.ApiURl + specieName +"/threat", config);
            request.then(function(response) {
                
                    if(response.status === 200){
                        return response.json();
        
                    } else {
                        alert('il y a un problème');
                    }
                })
                .then(function(json){
                    
                    
                   resolve(app.translateThreat(json.result));
                    
                });
        });
       

    },
    createCard: function(name, category, id){
        const newCardElement  = document.getElementById('empty-card')
                                            .content
                                            .cloneNode(true)
                                            .querySelector('.col');
        
        let cardTitle = newCardElement.querySelector(".card-title");
        let badge = newCardElement.querySelector(".badge");
        let button = newCardElement.querySelector(".btn");
        let collapse = newCardElement.querySelector(".collapse");
        let link = newCardElement.querySelector("a");
        let message = "";
        let badgeClass="";
        let badgeColorText = null;

        //attribution of message and color of the badge
        switch (category) {
            case "CR":
                message = "en danger critique d'extinction";
                badgeClass = "bg-danger";
                break;
            case "EN":
                message = "en danger";
                badgeClass = "bg-orange";
                badgeColorText = "text-dark";


                break;
            case "VU":
                message = "vulnérable";
                badgeClass = "bg-warning";
                badgeColorText = "text-dark";


                break;
            case "EX":
                message = "éteint";
                badgeClass = "bg-dark";
                break;
            
            default:
                break;
        }
        
        cardTitle.textContent = name;
        badge.textContent = message;

        badge.classList.add( badgeClass, badgeColorText);

        //lier les deux elements du collapse entre eux
        button.dataset.bsTarget =  "#spec" + id;
        button.setAttribute("aria-controls", "spec" + id);
        collapse.id = "spec" + id;

        //href for the iucn search page
        link.href = "https://www.iucnredlist.org/fr/search?query="+ name +"&searchType=species";
       
        app.insertCardElement(newCardElement);

        //hiding loading
        let loadingPage = document.querySelector(".loading-page");
        loadingPage.style.display = "none";
        loadingPage.classList.remove("d-flex");
        
        //listener for the "en savoir plus" button
        button.addEventListener("click", app.showInformation);
    },

    insertCardElement: function(cardElement){
        let container = document.querySelector(".row");
        container.append(cardElement);
    },

    //add the number of entries from API to title
    addNumber: function(number){
        const span = document.querySelector(".species-number");
        span.textContent = number;
    },

    //method to show more informations : french or english common name and threats in french language
    showInformation: function(evt){
        const currentButton = evt.currentTarget;
        let body = currentButton.closest(".card-body");

        let collapseAlreadyOpen = app.checkIfAlreadyOpen(body.querySelector(".test"));

        //it 's never been open
        if (collapseAlreadyOpen === false){
            let title = body.querySelector(".card-title").textContent;
            let divInfo = body.querySelector(".card-info");
            let loading = body.querySelector(".loading");
            let threatDiv = body.querySelector(".threat");
            let commonName = app.getCommonName(title);
            let threat = app.getThreat(title);
            
            commonName.then((value) => {
                
                loading.textContent = "● Nom commun de l'espèce : " + value ;
                divInfo.append(loading);
            });
            threat.then((value)=> {
                threatDiv.textContent = "● Principales menaces : " + value ;
                divInfo.append(threatDiv);
    
            })
        }
        
        
         
    },
    
    //method to check open state of the "en savoir plus"
    checkIfAlreadyOpen: function(element){

        if(element.dataset.open === "false") {
            element.dataset.open = "true";
            return false;
        } else{
            return true;
        }
    },

    //method to sum and translate the threats coming from the API in English
    translateThreat: function(array) {
        //empty array to be returned with threat messages
        let codeArray = [];

        //
        array.forEach(element => {
           let code =  element.code.split(".");

           if (code[0] == "1" || code[0] == "2" || code[0] == "3" || code[0] == "4" || code[0] == "7" ){

            //i get a message matching with the first number of the code gotten from API
               let frenchThreat = " Modification de l'écosystème induite par l'homme";

               //if message is not already in array to be returned
               if (!codeArray.includes(frenchThreat)){ 

                codeArray.push(frenchThreat);  

                } 
            } else if (code[0] == "5" || code[0] == "6") {

               let frenchThreat = " Exploitation, harcèlement ou mortalité directe d'espèces indigènes";
               if (!codeArray.includes(frenchThreat)){ 

                codeArray.push(frenchThreat);  
            }
           } else if (code[0] == "10" || code[0] == "11") {

                let frenchThreat = " Changements climatiques ou causes naturelles (volcanisme, tremblements de terre...)";
                if (!codeArray.includes(frenchThreat)){ 

                    codeArray.push(frenchThreat); 
                }

            } else if (code[0] == "8") {

                let frenchThreat = " Compétition / prédation par des éspèces envahissantes";
                if (!codeArray.includes(frenchThreat)){ 

                    codeArray.push(frenchThreat); 
                }
            } else if (code[0] == "9"){
                let frenchThreat = " Pollution";
                if (!codeArray.includes(frenchThreat)){ 

                    codeArray.push(frenchThreat); 
                }
            } else {
                codeArray.push(" Autres causes");
            }
        });
        return codeArray;
    }

}

document.addEventListener("DOMContentLoaded", app.getFrenchSpecies);
