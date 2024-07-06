const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

class JwtMiddleware {
 async verifyToken(req, res, next) {
  try {
    let token = req.headers['authorization'];
    //console.log('token', token);
    if (token !== undefined) {
      const payload = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
          if (error) {
            reject(error);
          } else {
            resolve(decoded);
          }
        });
      });
      // Récupérer l'utilisateur à partir de l'ID décodé
      const user = await User.findOne({ where: { id: payload.id } });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      req.user = user;
      next();
    } else {
      res.status(403).json({ message: 'Accès interdit: token manquant' });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Accès interdit: token invalide' });
  }
};

}

module.exports = new JwtMiddleware();