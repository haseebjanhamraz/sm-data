// isAuthenticated middleware
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // If the user is authenticated, allow access to the next middleware or route handler
      return next();
    } else {
      // If the user is not authenticated, redirect to the login page or send an unauthorized response
      res.redirect('/login'); // Replace '/login' with your login route
      // Or you can send an unauthorized status code and message
      // res.status(401).send('Unauthorized');
    }
  }
  
  module.exports = isAuthenticated;  