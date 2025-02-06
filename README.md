Readme

--- Short description: 
Given the Web API of a learning hub mock site (https://learning-hub-1whk.onrender.com/), this program is about dynamically setting up an e-learning website, by creating the client side using the Handlebars, Fetch and DOM API, HTML forms and a corresponding server side using Node.js and the express framework. 

--- Basic project file organization: 
index.js
userDAO.js
public folder -> 	index.html, categories-hbs.js, fetchCategories.js, fetchSubcategories.js (about the appearance of index.html)
		category.html (with incorporated JS scripts)
		subcategory.html (with incorporated JS scripts)
		style.css

--- Test users (kept at userDAO.js, 2 draft users)
{ validUsername: 'testuser', validPassword: '12345' }, 
{ validUsername: 'admin', validPassword: 'admin123' }

--- How to run
- run index.js on terminal (at the location of index.js) as "node index.js" (creates server on port 5500)
- open browser at localhost:5500 (index.js serves us the index.html of the client side). Navigate to category.html and subcategory.html via the images and titles hyperlinks.






