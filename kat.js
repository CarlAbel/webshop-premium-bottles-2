//De fire første linjer bruges til at hive varibler af url
let urlString = window.location.href;
let urlObject = new URL (urlString);
let type = urlObject.searchParams.get("type");
let cat = urlObject.searchParams.get("cat");
let dynamicHeading = document.querySelector("#dynamic-heading");

dynamicHeading.innerHTML = cat;

//Hvis ingen parametre er sat
if (type == null || cat == null){
    alert("Vælg venligst en kategori i menuen");
}
//Mit DOM element til output
let dynamicContent = document.querySelector("#dynamic-content");

//Vi tager ALLE produkter og looper igennem 
//(element peger på det enkelte produkt)
data.forEach(function(element){

    //Vi checker om produktets kategori er lig med cat fra 
    //URL'en. Eftersom "type" er et array må vi bruge
    //includes() for at "checke" om typen er i produkt arrayet   
    if (element.cat == cat && element.type.includes(type)){
        //Hvis det er sandt sendes elementet (produktet) til
        //en ekstern funktion der hedder generateElement
        generateElement(element);
    }
});

// vi laver "html" ud fra vores elementer og classes i css,
// og henter dem fra vores "db.js"
function generateElement (element){

    //aTag henter vores ahref. i html
    let aTag = document.createElement("a");
    aTag.setAttribute("class", "grid-item" + element.cb); 

    //Henter fra db.js og linker href.
    aTag.setAttribute("href", "produkt.html?id="+element.sku);

    //pris & str. (eller andre properties)
    aTag.dataset.filterPrice = element.price;
    element.sizes.forEach(function(elm){
        
        aTag.classList.add(elm);
    });
    
    
    //imgTag genererer vores img. i html
    let imgTag = document.createElement("img");
    //Henter fra db.js
    imgTag.setAttribute("src", element.image);
    //Classes for vores css i html
    imgTag.setAttribute("class", "grid-img")

    //h3Tag generer vores headers. i html
    let h3Tag = document.createElement("h3");
    //Henter fra db.js
    let h3Content = document.createTextNode(element.brand);
    //kobler vores content fra db.js til vores h3Tag
    h3Tag.appendChild(h3Content);
    //Classes for vores css i html
    h3Tag.setAttribute("class", "grid-heading")

    //ptag generer vores paragr. i html
    let pTag = document.createElement("p");
    //Henter fra db.js
    let pContent = document.createTextNode(element.price + " DKK");
    //kobler vores content fra db.js til vores pTag
    pTag.appendChild(pContent);
    //Classes for vores css i html
    pTag.setAttribute("class", "grid-price");
    //kobler alle vores tags på vores aTag 
    aTag.appendChild(imgTag);
    aTag.appendChild(h3Tag);
    aTag.appendChild(pTag);

    //kobler vores aTag med ALLE tags på vores dynamic content.
    dynamicContent.appendChild(aTag);
}