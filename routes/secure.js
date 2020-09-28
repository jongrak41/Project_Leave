
module.exports = function(app, passport) {
 app.get('/', function(req, res){
    if(!req.isAuthenticated()){
      res.render('index.ejs');
    }
    else{
       res.redirect('/menu')
    }
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });

 app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/menu',
  failureRedirect: '/login',
  failureFlash: true
 }),
  function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  });

//  app.get('/signup', function(req, res){
//   res.render('signup.ejs', {message: req.flash('signupMessage')});
//  });

//  app.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/profile',
//   failureRedirect: '/signup',
//   failureFlash: true n
//  }));

 app.get('/menu', isLoggedIn, function(req, res){
  if(req.user.permission == 'Admin'){
        res.render('menu_admin',{
           user:req.user
        })
     }
  else{
        res.render('menu_user', {
           user:req.user
       })
      }
 });
       
 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
 })
};

function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();
 res.redirect('/');
}
