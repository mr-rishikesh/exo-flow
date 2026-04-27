exports.requireAuth = (req, res, next) => {
  if (!req.session || !req.session.adminId) {
    return res.redirect('/admin/login');
  }
  next();
};

exports.requireGuest = (req, res, next) => {
  if (req.session && req.session.adminId) {
    return res.redirect('/admin/leads');
  }
  next();
};
