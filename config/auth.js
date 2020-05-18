module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Prašome prisijungti norint atlikti funkciją.');
    res.redirect('/users/login');
  }
}
