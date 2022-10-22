// console.log("Hello Order");

var btn = document.getElementById("contact");
var formPage = document.getElementById("order");
var formPage1 = document.getElementById("h2-hide");

var count = 0;

if(count == 0){
    formPage.style.opacity = 0;
    console.log("Hello Order");
    count++;
}

btn.addEventListener("click", ()=>{
    if(count != 0 && count % 2 != 0){
        formPage.style.opacity = "1";
        formPage1.style.opacity = "1";
        console.log("Hello Order");
        count++;
    }

    else{
        formPage.style.opacity = "0";
        formPage1.style.opacity = "0";
        console.log("Hello Order");
        count++;
    }
});
