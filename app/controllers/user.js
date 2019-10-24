var mongoose = require('mongoose');




// ---- Create new user ----
exports.register = function(req, res) {

    var userModel = mongoose.model('users');

    userModel.find({
        email: req.body.email
    }).exec(function(err, result) {

        if (err) {
            return;
        }

        if (result && result.length) {
            res.json({
                status: 1,
            });

            return;
        }

        req.body.createdAt = new Date();
        var user = new userModel(req.body);

        // because we set our user.provider to local our models/user.js validation will always be true
        req.assert('first_name', 'You must enter a firstname').notEmpty();
        req.assert('last_name', 'You must enter a lastname').notEmpty();
        req.assert('email', 'You must enter a valid email address').isEmail();
        req.assert('password', 'Password too short').len(8, 20);

        var errors = req.validationErrors();

        if (errors) {
            res.json({
                status: 2,
                errors: errors,
            })
            return
        }

        // Hard coded for now. Will address this with the user permissions system in v0.3.5
        user.roles = ['admin'];
        user.isActivate = false;

        user.save(function(err, result) {
            res.json(result);
        });
    });
};


/**
 *
 */
exports.getLoggedUser = function(req, res) {
    res.json(req.user || null);
};


/**
 *
 */
exports.logout = function(req, res) {
    req.session.user = null;
    res.json({});
};



// ---- Login user ----
exports.login = function(req, res) {
    var userModel = mongoose.model('users');

    userModel.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err || !user) {
            res.json({
                msg: 'User not found',
                status: false
            });
            return;
        }

        if (!user.authenticate(req.body.password)) {
            res.json({
                msg: 'Email or password is invalid.',
                status: false
            });
            return;
        }

        req.session.user = user;

        res.json({
            status: true,
            user: user,
        });
    });
}