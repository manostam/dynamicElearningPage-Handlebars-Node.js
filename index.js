const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid'); // console.log(uuidv4());
const userDAO = require('./userDAO');   // Import the DAO module

// Middleware to parse form data (Content-Type: application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));
// Middleware to parse JSON data (application/json)
app.use(express.json());
// Serve static files (index.html) - accessing http://localhost:5500 will automatically load the index.html file - Default File Resolution: If the requested path (/) does not explicitly specify a file (like /index.html or /style.css), the express.static() middleware looks for a file named index.html in the specified directory (public) and serves it automatically.
app.use(express.static('public'));
// determining that I want the index.html file to be loaded (okay it is already the default option but this is how you define thats the one you want to be accessed when the browser makes a request to / (the root path))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// connected user info
let connectedUsername = null;
let connectedSession = null;
let connectedCart = [];


// LOGIN SERVICE - Handle form submission via POST
app.post('/login', (req, res) => {
    let reqUsername = req.body.reqUsername;
    let reqPassword = req.body.reqPassword;
    // console.log(reqUsername);
    // console.log(reqPassword);
    // Validate the username and password
    let authenticated = userDAO.authenticate(reqUsername, reqPassword);

    if (authenticated) {
        connectedUsername = reqUsername;
        connectedSession = uuidv4();
        res.status(200).json({ success: true, message: 'Login Successful', sessionId: connectedSession });
    } else {
        res.status(401).json({ success: false, message: 'Login failed, please try again' });
    }
});

// CART ITEM SERVICE via PUT
app.put('/cartItemAdd', (req, res) => {
    try {
        let reqUsername = req.body.reqSessionUsername;
        let reqSessionId = req.body.reqSessionId;

        // check if the user trying to add things to the cart is the one logged in previously and at the current session
        if ((reqUsername === connectedUsername) && (reqSessionId === connectedSession)) {
            let item = { id: req.body.reqId, type: req.body.reqType, title: req.body.reqTitle, cost: req.body.reqCost };
            let checkMessage = userDAO.addToCart(reqUsername, item);
            res.status(200).json({ success: true, message: checkMessage });
        }
        else {
            res.status(401).json({ success: false, message: "Unauthorized access, try refreshing the page and connecting with your credentials" });
        }
    }
    catch {
        console.error('Error in cartItemAdd:', error);
        res.status(500).json({ success: false, message: "An internal error occurred while adding the item to the cart" });
    }


});

// Start the server on port 5500
app.listen(5500, () => {
    console.log('Server is running on http://localhost:5500');
});

