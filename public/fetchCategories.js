// URL of the JSON data for the categories
let urlCategories = "https://learning-hub-1whk.onrender.com/categories";
let homepage = "https://learning-hub-1whk.onrender.com/";
let categories = [];

// Use fetch to get the JSON data
fetch(urlCategories)
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
    data.forEach(category => {
      // Assuming that each category has 'img_url' field and you want to prepend homepage to it
      if (category.img_url) {
      category.img_url = homepage + category.img_url;  // Modify the img_url to include the homepage
      }

      //console.log(`ID: ${category.id}, Title: ${category.title}, Image URL: ${category.img_url}`);

      // Push category data to the categories array 
      categories.push({ id: category.id, title: category.title, img_url: category.img_url });
    });
    console.log(categories);
    // Trigger a custom event to notify that data is available, 
    // create an event-dependent value associated with the event (detail) which is then available to the handler using the CustomEvent.detail property. It defaults to null.
    let eventCategFetched = new CustomEvent('categoriesDataFetched', { detail: categories });
    window.dispatchEvent(eventCategFetched); // Dispatch the event to notify categories-hbs.js

  })
  .catch(error => {
    // Handle any errors that occur during the fetch
    console.error('There was a problem with the fetch operation of categories:', error);
  });



