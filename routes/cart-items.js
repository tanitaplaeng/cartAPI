const express = require('express');
const cartItems = express.Router();

const cart = [
    {id: 0, product: 'Banana', price: 1, quantity: 5},
    {id: 1, product: 'Mushrooms', price: 3, quantity: 2},
    {id: 2, product: 'Strawberry', price: 2,quantity: 2},
    {id: 3, product: 'Hummous', price: 4, quantity: 1},
    {id: 4, product: 'Kombucha', price: 5, quantity: 1},
    {id: 5, product: 'Salmon', price: 6, quantity: 3},
    {id: 6, product: 'Coffee', price: 3, quantity: 1},
    {id: 7, product: 'Cous Cous', price: 4, quantity: 3},
    {id: 8, product: 'Chicken Nuggies', price: 5, quantity: 7},
    {id: 9, product: 'Soup', price: 2, quantity: 3},
    {id: 10, product: 'Cilantro', price: 1, quantity: 8},
    {id: 11, product: 'Cherries', price: 3, quantity: 4},
];

cartItems.get('/', (req, res) => { 
    res.send('You hit the cart API (~￣▽￣)~ Go to /cart-items to view items! (✿ ♥‿♥)');
});

// getting all cart items with query string parameters
cartItems.get('/cart-items', (req, res) => {
    let cartItems = cart;
    if (req.query.maxPrice) {
        cartItems = cartItems.filter(c => c.price >= req.query.maxPrice);
    }
    if (req.query.prefix) { 
        cartItems = cartItems.filter(c => c.product.startsWith(req.query.prefix));
    }
    if (req.query.pageSize) { 
        cartItems = cartItems.slice(0, req.query.pageSize);
    }
    res.send(cartItems);
});

// getting cart item by id and sending 404 when not found
cartItems.get('/cart-items/:id', (req, res) => { 
    const cartItem = cart.find(c => c.id == req.params.id);
    if (cartItem) { 
        res.send(cartItem);
    } else { 
        res.sendStatus(404).send(`Cart item ${req.params.id} not found! ಠ╭╮ಠ`);
    }
});

// adding cart item to array and generate unique ID
cartItems.post('/cart-items', (req, res) => { 
    const lastIndex = cart.length - 1;
    const newID = cart[lastIndex].id + 1;
    const newCartItem = { 
        id: newID, 
        // product: 'Tequila', 
        // price: 8, 
        // quantity: 4 
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    };
    cart.push(newCartItem);
    res.status(201).send(`${req.body.product} added to cart! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ `);
});

// update cart item in array with the given ID
cartItems.put('/cart-items/:id', (req, res) => {
    const cartItem = cart.find(c => c.id == req.params.id);
    const itemIndex = cart.indexOf(cartItem);
    cart[itemIndex] = { 
        id: cartItem.id, 
        product: req.body.product, 
        price: req.body.price, 
        quantity: req.body.quantity 
    };
    res.send(`Updated ${req.body.product}! (▰˘◡˘▰)`);
});

// deleting cart item from array
cartItems.delete('/cart-items/:id', (req, res) => { 
    const cartItem = cart.find(c => c.id == req.params.id);
    const cartIndex = cart.indexOf(cartItem);
    console.log(cartIndex);
    cart.splice(cartIndex, 1);
    res.send(`Deleted ${req.body.product} from cart! (◡︿◡✿)`);
});

module.exports = cartItems;
