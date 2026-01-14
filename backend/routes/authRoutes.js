const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Validation pour l'inscription
const registerValidation = [
  body('nom').trim().notEmpty().withMessage('Le nom est requis'),
  body('prenom').trim().notEmpty().withMessage('Le prénom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
];

// Validation pour la connexion
const loginValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Mot de passe requis')
];

// Routes publiques
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

// Routes protégées
router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, authController.updateProfile);
router.put('/change-password', protect, authController.changePassword);

module.exports = router;
