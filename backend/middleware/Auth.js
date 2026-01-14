const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt_super_secret_2024';

// Middleware pour protéger les routes
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Récupérer le token depuis le header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        error: 'Non autorisé - Token manquant' 
      });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Récupérer l'utilisateur
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ 
        error: 'Utilisateur non trouvé' 
      });
    }

    next();
  } catch (error) {
    res.status(401).json({ 
      error: 'Non autorisé - Token invalide',
      message: error.message 
    });
  }
};

// Middleware optionnel pour obtenir l'utilisateur si connecté
exports.optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    }

    next();
  } catch (error) {
    next();
  }
};

// Middleware pour vérifier si admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      error: 'Accès interdit - Admin requis' 
    });
  }
};

// Générer un token JWT
exports.generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d'
  });
};
