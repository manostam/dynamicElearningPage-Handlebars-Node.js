// Mock user database (in-memory, plain-text passwords)
let users = [
    { validUsername: 'testuser', validPassword: '12345', userCart: [] },
    { validUsername: 'admin', validPassword: 'admin123', userCart: [] }
];


// Authenticate a user
function authenticate(username, password) {
    const userMatch = users.find((u) => u.validUsername === username && u.validPassword === password);
    if (userMatch === undefined) {
        return false;
    }
    else {
        return true;
    }

}

function addToCart(usernameF, item) {
    console.log("trying to addToCart");
    let message = null;
    users.forEach(function (user) {
        if (usernameF === user.validUsername) {
            let itemExists = false;
            // checking if item is already in userCart
            user.userCart.forEach(function (theItem) {
                if (theItem.id === item.id) {
                    itemExists = true;
                }
            })
            if (itemExists === true) {
                message = "Item already exists";
                return message;
            }
            else {
                message = "New item added";
                user.userCart.push(item);   // item = {id: req.body.reqId, type: req.body.reqType, title: req.body.reqTitle, cost: req.body.reqCost}
                console.log(user.userCart);
            }
        }
    })
    return message;
}



// Export functions
module.exports = {
    authenticate,
    addToCart
};
