module.exports = function(app) {
    app.get('/api', function(req, res) {
		res.send("TODO:List apis available");
    });


    // Load all the APIs
    console.log("API LOADING ....")
    
    app.use('/api/genre'  , require('./api/genre'));
    app.use('/api/list'   , require('./api/list'));
    app.use('/api/series' , require('./api/series'));
    app.use('/api/user'   , require('./api/user'));
    
    console.log("API LOADED  ....")
}