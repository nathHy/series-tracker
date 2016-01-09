module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', { title: 'index' });
    });

    // load any UI routers.
    
    // app.use('/login' , require('./ui/login'));
}