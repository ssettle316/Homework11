// TODO; importing the store
//building out routes
// and using these routes to call your store methonds
var router = require("express").Router();
const Store = require("../db/store");


router.get("/notes", function(request, response) {
    Store
    .getNotes().then(answer=> response.json(answer))
    .catch(err => response.status(500).json(err)); 
})

// .put

// .post
router.post("/notes", function(request, response) {
    Store
    .addNotes(request.body).then(answer=> response.json(answer))
    .catch(err => response.status(500).json(err)); 
})
// .delete
router.delete("/notes/:id", function(request, response) {
    Store
    .removeNotes(request.params.id).then(()=> response.json({ok:true}))
    .catch(err => response.status(500).json(err)); 
})

module.exports = router;