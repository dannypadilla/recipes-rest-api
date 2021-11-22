var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let db_collection_name = req.app.locals.db_collection;
    let users = await req.app.locals.db.collection(db_collection_name);
    res.json( await users.find().toArray() );
    //res.send('respond with a resource');
});

module.exports = router;
