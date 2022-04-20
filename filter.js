//Kun på kategori siden.
let filterForm = document.querySelector("#filter-form");
let checkBoxes = document.querySelectorAll(".product-checks input");
let priceRange = document.querySelector(".price-range");
let selectedPrice = document.querySelector("#selected-price");

filterForm.addEventListener("submit", function(event){
    event.preventDefault();
});

filterForm.addEventListener("change", function(event){
    selectedPrice.innerHTML = (priceRange.value-1) + " DKK";
    document.querySelectorAll("#dynamic-content a").forEach(function(element){
        element.style.display = "none";
    });
    checkBoxes.forEach(function(element){
        if(element.checked){
            document.querySelectorAll("."+element.id).forEach(function(elm){

                if(elm.dataset.filterPrice < priceRange.value-1)
                elm.style.display = "block";
            })
        }
    })

});