
exports.logoutUser = (req, res) => {
  if(req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  };
};