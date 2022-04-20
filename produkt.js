let urlString = window.location.href;
let urlObject = new URL (urlString);
let sku = urlObject.searchParams.get("id");

///Fejlmeddelelse hvis der ikke er sat et id
//i URLen
if (sku == null){
    alert("Produktet ikke fundet");
}
//Eksisterende HTML elementer på siden, 
//som vi vil lave i javascript ved at hente fra db.js 
let productHeading = document.querySelector("#product-heading");
let productImage = document.querySelector(".product-img");
let productDesc = document.querySelector(".product-desc");
let productPrice = document.querySelector(".product-price");
let productSize = document.querySelector(".product-size");
let productColor = document.querySelector(".product-color");
let productSku = document.querySelector(".product-sku");
let productPriceHidden = document.querySelector(".product-price-hidden");


//Vi looper igennem vores array
//Og hvis der er et match på ID'et (sku) så kalder vi en funktion
//der hedder generateProduct og vi passer det passende objekt til funktionen
data.forEach(function(element){
    if(sku == element.sku){
        generateProduct(element);
    }
});


//Her bliver genereret alt indhold og attributter der
//skal være på de eksisterende HTML elemeneter
function generateProduct(element){
    productSku.value = element.sku;
/*-------------------------------- Element brand --------------------------------*/ 
    //henter vores (element.brand) fra db.js og kalder den "productHeadingContent"
    let productHeadingContent = document.createTextNode(element.brand);
    //kobler vores (element.brand) til vores allerede eksisterende
    //html elementer
    productHeading.appendChild(productHeadingContent);


    //Her henter vi vores img til vores produktside fra db.js
    productImage.setAttribute("src", element.image);

/*-------------------------------- Element desc --------------------------------*/ 
    //henter vores (element.desc) til vores text "productDescContent"
    let productDescContent = document.createTextNode(element.desc);
    //kobler vores (element.desc) til vores allerede eksisterende
    //html elementer
    productDesc.appendChild(productDescContent);
/*-------------------------------- Element price --------------------------------*/ 
    
    //henter vores (element.price) fra db.js og kalder den "productPriceContent"
    let productPriceContent = document.createTextNode("Pris: " + element.price + " DKK");
    //kobler vores (element.price) til vores allerede eksisterende
    //html elementer
    productPrice.appendChild(productPriceContent);
    //Henter vores (element.price) fra db.js og skriver det ind ved "productPriceHidden.value"
    productPriceHidden.value = element.price;
/*--------------------------------   --------------------------------*/
    //kører loops for alle vores sizes for at finde de str.(elm)
    //der passer til de regler vi laver.
    element.sizes.forEach(function (elm){
        //Her laver vi vores element "option", og laver den om til optTag.

        let optTag = document.createElement("option");

        //vi tager alle vores "sizes - elm" fra db.js
        optTag.value = elm;
        optTag.innerHTML = elm;
        productSize.appendChild(optTag);
    });

    element.colors.forEach(function(elm){
        //Her laver vi vores element "option", og laver den om til optTag.
        let optTag = document.createElement("option");
        //vi tager alle vores "colors - elm" fra db.js
        optTag.value = elm;
        optTag.innerHTML = elm;
        productColor.appendChild(optTag);
    })

}