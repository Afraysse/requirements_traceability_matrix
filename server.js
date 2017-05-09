
/* SERVER FILE */

var path = require('path');
var express = require('express');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

// allows Webpack to intercept requests and serve our packaged /js/app.js file
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(stormpath.init(app, {
    web: {
        produces: ['application/json']
    }
}));

app.post('/me', bodyParser.json(), stormpath.loginRequired, function (req, res) {
    function writeError(message) {
        res.status(400);
        res.json({ message: message, status: 400 });
        res.end();
    }

    function saveAccount () {
        req.user.givenName = req.body.givenName;
        req.user.surname = req.body.surname;
        req.user.email = req.body.email;

        req.user.save(function (err) {
            if (err) {
                return writeError(err.userMessage || err.message);
            }
            res.end();
        });
    }

    if (req.body.password) {
        var application = req.app.get('stormpathApplication');

        application.authenticateAccount({
            username: req.user.username,
            password: req.body.existingPassword
        }, function (err) {
            return writeError('That password is incorrect.');
        }

        )
    }
})

app.get('/css/bootstrap.min.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/css/bootstrap.min.css'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.on('stormpath.ready', function() {
    app.listen(3000, 'localhost', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('Listening at http://localhost:3000');
    });
});