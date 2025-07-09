const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      return res.status(404).json({ message: "Missing username or password" });
    } else if (doesExist(username)) {
      return res.status(404).json({ message: "user already exists." });
    } else {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered.  Login." });
    }
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    try {
        res.status(200).send(JSON.stringify({books}, null, 4));
    } catch(error) {
        res.status(500).send (error);
    }
});
  
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
    });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const filterdata = Object.values(books).filter(e => e.author.toLowerCase() === author.toLowerCase());
  res.status(200).send(filteredata)

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const filteredata = Object.values(books).filter(e => e.title.toLowerCase() === title.toLowerCase());
    res.status(200).send(filteredata)
});
  

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.status(200).send(books[isbn].reviews)
});
  
  

module.exports.general = public_users;
