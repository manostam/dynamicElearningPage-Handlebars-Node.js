

// Get categories template script element as defined in index.html
let categoriesTemplateElement = document.getElementById("categories-list-template");


// compile the (string of the) template -> δημιουργία συνάρτησης παραγωγής περιεχομένου - συνάρτηση υποδείγματος
// η μέθοδος compile επιστρέφει συνάρτηση η οποία λαμβάνει ως παράμετρο ένα αντικείμενο και επιστρέφει δυναμικό περιεχόμενο

let compiledTemplateFunc = Handlebars.compile(categoriesTemplateElement.textContent);


// Add event listener to listen for the custom event1 from fetchCategories.js
window.addEventListener('categoriesDataFetched', function (event1) {
  let categoriesArray = event1.detail; // Get the categories data from the event detail
  //console.log(categoriesArray);

  // Add event listener to listen for the custom event2 from fetchSubcategories.js
  window.addEventListener('subcategoriesDataFetched', function (event2) {
    let subcategoriesArray = event2.detail; // Get the categories data from the event detail
    //console.log(subcategoriesArray);
    
    // categoriesArray has three objects (id,title,img_url), load to it a fourth object -> an array with its own (category's) subcategories 
    categoriesArray[0].subcategories = subcategoriesArray.slice(0, 4);
    categoriesArray[1].subcategories = subcategoriesArray.slice(4, 8);
    categoriesArray[2].subcategories = subcategoriesArray.slice(8, 12);
    categoriesArray[3].subcategories = subcategoriesArray.slice(12, 16);
    console.log(categoriesArray);

    // Pass to theContent the fetched data and whichever else you want to use inside the handblebars template as you designed it at the categories-list-template.js
    let headersOnHTML = ["Α/α","Τίτλος", "Σύνδεσμος", "Υποκατηγορίες"];
    let theContent = compiledTemplateFunc({ categoriesList: categoriesArray, showSomething: false, theHeaders: headersOnHTML });
    // console.log(theContent);

    // Get the HTML element where the content will be displayed and pass to it the data that was received and then modified with the template
    let placeholder = document.querySelector("#categories-display");
    placeholder.innerHTML = theContent;

  })



});









