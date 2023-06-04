


const buttons = document.querySelectorAll(".btn-primary");
var action="";
var baseprice=0;

var model="";
var id;
const url = 'http://localhost:3333/main';


fetch(url)
.then(response => response.json())
.then(data => {
  
  for(i=0;i<9;i++)
  {
    if(data[i].availability===true)
    {

      
      var butt = document.querySelector('#button' + i);
  
      butt.addEventListener("click", function() {

    
        var action=(event.target.getAttribute('data-action'));
        
        switch(action){
  
          case "action1" : model="Dodege Challenger";
                           id=1;
                           baseprice=180;
                           
      
                           break;
      
          case "action2" :model="Beetle";
                           id=2;
                          baseprice=150;
      
                           break;
          case "action3" : model="Audi R8";
                           id=3;
                           baseprice=190;
                           break;
                        
          case "action4" : model="Ferrari F8 Tributo";
                           id=4;                   
                           baseprice=250;
                           break;
                           
           case "action5" : model="Lamborghini Aventador";
                            id=5;
                            baseprice=225;
                            break;
                            
           case "action6" : model="Toyota Supra";
                            id=6;
                            baseprice=200;
                            break;
                            
            case "action7" : model="Mustang";
                             id=7;
                             baseprice=200;
                             break;

             case "action8":model="Jeep Wrangler"
                            id=8;
                            baseprice=185;
                            break;
             case "action9":model="Chevrolet Camaro"
                            id=9;
                            baseprice=210;
                            break;
                            
                            

                             

      }
      
      const data = {
        key1: model,
        key2: id,
        key3: baseprice
      };
      
  
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          // Redirect to the specified URL
         window.location.href = '/checkout.html';
        } else {
          // Handle the response error
          throw new Error('Server responded with an error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
  
    
  
    });
  






      
    }
  else{


    var butt = document.querySelector('#button' + i);
    butt.disabled = true;
    butt.classList.remove("btn-primary");
    butt.classList.add("btn-secondary");
    butt.innerText = "Unavailable";
  }


  }
})
.catch(error => {
  console.error('Error fetching data:', error);
});
    





 
  


