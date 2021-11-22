var express = require('express');
var router = express.Router();

/* GET recipes listing. */
router.get('/', async function(req, res, next) {
    let db_collection_name = req.app.locals.db_collection;
    let db_recipes = await req.app.locals.db.collection(db_collection_name);

    let projection = {_id: false, name: true};

    res.json( await db_recipes.find().project(projection).toArray() );
    //res.send('respond with a resource');
});

module.exports = router;
