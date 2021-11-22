var express = require('express');
var router = express.Router();


/**
 * 1. List all recipes
 */
router.get('/', async function(req, res, next) {
    let db_collection_name = req.app.locals.db_collection;
    let db_recipes = await req.app.locals.db.collection(db_collection_name);

    let projection = {_id: false, name: true};

    res.json( await db_recipes.find().project(projection).toArray() );
    //res.send('respond with a resource');
});


/**
 * 2. Search recipe names using MongoDB's text search.
 */
router.post("/", async function(req, res, next) {

    let recipe = req.body.recipe;  // input

    let db_collection_name = req.app.locals.db_collection;
    let db_recipes = await req.app.locals.db.collection(db_collection_name);

    let query = await db_recipes.find({
        $text: { $search: `\"${recipe}\"` }
    }).toArray();

    await query.forEach(doc => console.log(doc) );

    res.json(query);

});


/**
 * 3. Search recipes that use certain ingredients (for example "beef" and "potato").
 */
router.post("/ingredients", async function(req, res, next) {

    let ingredients = req.body.ingredients;  // input

    let db_collection_name = req.app.locals.db_collection;
    let db_recipes = await req.app.locals.db.collection(db_collection_name);
    let projection = {_id: false, name: true, ingredients: true};

    let ingredients_formatted = [];  // will hold ingredients

    // prepare list with ingredients from POST
    for (let i = 0; i < ingredients.length; i++) {
        ingredients_formatted.push( {"ingredients.name": ingredients[i]} );
    }

    let query = await db_recipes.find({
        $and: ingredients_formatted
    }).project(projection).toArray();

    await query.forEach(doc => console.log(doc) );

    res.json(query);

});

module.exports = router;
