const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }  
  req.flash('error', 'Usuario no autenticado!!!');
  res.redirect('/users/signInForm');
};

helpers.isAdmin = (req, res, next) => {
  if(req.user.role === 'Admin'){
    return next();
  }
  req.flash('error', 'Usuario no es admin!!!');
  res.redirect('/users/started');
};

helpers.isLab_Staff = (req, res, next) => {
  if(req.user.role === 'Empleado'){
    return next();
  }
  req.flash('error', 'Usuario no es empleado!!!');
  res.redirect('/users/started');
};

helpers.isPhysician = (req, res, next) => {
  if(req.user.role === 'Medico'){
    return next();
  }
  req.flash('error', 'Usuario no es médico!!!');
  res.redirect('/users/started');
};


module.exports = helpers;
