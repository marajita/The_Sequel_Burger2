// Dependencies
var express = require("express");

// Import the model to use its db functions for burger.js
var db = require("..models/");
//var dbBurger = require("./models/index.js");

// Create the router for the app, and export the router at the end of your file.
var router = express.Router();

module.exports = function(app) {
  router.get("/api/burgers", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  // POST route for saving a new todo
  app.post("/api/burgers", function(req, res) {
    // create takes an argument of an object describing the item we want to insert
    // into our table. In this case we just we pass in an object with a text and
    // complete property
    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(result) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(result);
    });
  });

  app.delete("/api/burgers/:id", function(req, res) {
    // Destroy takes in one argument: a "where object describing the todos we want to destroy
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/burgers", function(req, res) {
    // Update takes in two arguments, an object describing the properties we want to update,
    // and another "where" object describing the todos we want to update
    db.Burger.update(
      {
        burger_name: req.body.burger_name,
        devoured: req.body.devoured
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(result) {
      res.json(result);
    });
  });
};

module.exports = router;
