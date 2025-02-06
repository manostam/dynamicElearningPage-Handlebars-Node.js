// URL of the JSON data for the subcategories
let urlSubcategories = "https://learning-hub-1whk.onrender.com/subcategories";
let subcategories = [];

// Use fetch to get the JSON data
fetch(urlSubcategories)
  .then(response => {
    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the response as JSON - 
    return response.json();
  })
  .then(data => {

    // Handle the data (the JSON) here - an array here
    // console.log(data);

    // parsing the data
    data.forEach(subcategory => {
      
      //console.log(`ID: ${subcategory.id}, Category ID: ${subcategory.category_id}, Title: ${subcategory.title}`);

      // Push subcategory data to the subcategories array 
      subcategories.push({ id: subcategory.id, categoryId: subcategory.category_id, title: subcategory.title });
    });

    // Trigger a custom event to notify that data is available, 
    // create an event-dependent value associated with the event (detail) which is then available to the handler using the CustomEvent.detail property. It defaults to null.
    let eventSubcategFetched = new CustomEvent('subcategoriesDataFetched', { detail: subcategories });
    window.dispatchEvent(eventSubcategFetched); // Dispatch the event to notify subcategories-hbs.js

  })
  .catch(error => {
    // Handle any errors that occur during the fetch
    console.error('There was a problem with the fetch operation of subcategories:', error);
  });



