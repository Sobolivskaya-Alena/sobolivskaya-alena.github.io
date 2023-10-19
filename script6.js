function updatePrice() {

  //let sP=document.getElementById('selectP').value;
  let nP=document.getElementById('numberP').value;

  
  let s = document.getElementsByName("prodType");
  let select = s[0];
  let price = 0;                              
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex]*nP;
  }
  
  

  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = (select.value == "3" ? "block" : "none");
  
 
  

  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    if (radio.checked && select.value == "3") {
      let optionPrice = prices.prodOptions[radio.value];
      if (optionPrice !== undefined) {
        price += optionPrice*nP;
      }
    }
    if(select.value !== "3"){
      radio.checked = false;
    }
  });

  
  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = (select.value == "2" ? "block" : "none");

  
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked && select.value == "2") {
      let propPrice = prices.prodProperties[checkbox.name];
      if (propPrice !== undefined) {
        price += propPrice*nP;
      }
    }
    if(select.value !== "2"){
      checkbox.checked = false;
    }
  });


  document.getElementById('priceP').innerHTML=price;

}


function getPrices() {
  return {
    prodTypes: [ 500, 1000, 1500, 2000, 2500],
    prodOptions: {
      option1: 100,
      option2: 200,
      option3: 300,
    },
    prodProperties: {
      prop1: 10,
      prop2: 20,
      prop3: 30,
    }
  };
}

window.addEventListener('DOMContentLoaded', function (event) {

  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = "none";
  

  let s = document.getElementsByName("prodType");
  let select = s[0];

  select.addEventListener("change", function(event) {
    let target = event.target;
    console.log(target.value);
    updatePrice();
  });
  

  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    radio.addEventListener("change", function(event) {
      let r = event.target;
      console.log(r.value);
      updatePrice();
    });
  });

 
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function(event) {
      let c = event.target;
      console.log(c.name);
      console.log(c.value);
      updatePrice();
    });
  });

  document.getElementById('numberP').addEventListener("input", function () {
    updatePrice();
});

document.getElementById('selectP').addEventListener("change", function(){
   document.getElementById('infoP').style.display='block';
});

  updatePrice();
});



