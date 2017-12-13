// TODO:
//  - correct status codes

//Get all the locations regarding the filter
module.exports = {
    getall: function(model, req, res) {
        model.find({}, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(200);
                res.json(results);
            }
        });
    },
    
    //following stackoverflow suggestion:
    //https://stackoverflow.com/questions/978061/http-get-with-request-body
    //it should be avoided to put data in a get request, thus we can use a post request where the body is the filter
    //Get all the locations regarding the filter
    query: function(model, req, res) {
        const filter = req.body
        model.find(filter, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {

                res.status(200);
                res.json(results);
            }
        });
    },

    getbyid: function(model, req, res) {
        const id = req.params.id
        model.findOne({_id: id}, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                if(!results) return next(err);
                res.status(200);
                res.json(results);
            }
        });
    },

    post: function(model, req, res) {
        if(!req.is("application/json"))   
            return res.status(400).end();

        var toSave = new model(req.body);
        toSave.save((err, newmodel) => {
            if (err) {
                console.log(err)
                res.status(500).end();            
            } else {
                res.status(200);
                res.json(newmodel);
            }
        });
    },

    //remove a listing
    del: function(model, req, res) {
        const id = req.params.id;
        const pass = req.body.deleteSecret;

        //update the post with the given id 
        model.remove({_id: id, deleteSecret: pass}, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(200);
                res.json(results);
            }
        });
    }
};
