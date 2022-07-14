const auth = {
    authCheck: function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

export default auth;