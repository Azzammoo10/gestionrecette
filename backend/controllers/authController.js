const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

// Inscription
exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Cet email est déjà utilisé' 
      });
    }

    // Créer le nouvel utilisateur
    const user = await User.create({
      nom,
      prenom,
      email,
      password
    });

    // Générer le token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Compte créé avec succès',
      token,
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(400).json({ 
      error: 'Erreur lors de l\'inscription',
      message: error.message 
    });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier que l'email et le mot de passe sont fournis
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email et mot de passe requis' 
      });
    }

    // Trouver l'utilisateur et inclure le mot de passe
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ 
        error: 'Email ou mot de passe incorrect' 
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Email ou mot de passe incorrect' 
      });
    }

    // Générer le token
    const token = generateToken(user._id);

    res.json({
      message: 'Connexion réussie',
      token,
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la connexion',
      message: error.message 
    });
  }
};

// Obtenir le profil de l'utilisateur connecté
exports.getProfile = async (req, res) => {
  try {
    res.json({
      user: req.user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération du profil',
      message: error.message 
    });
  }
};

// Mettre à jour le profil
exports.updateProfile = async (req, res) => {
  try {
    const { nom, prenom, bio, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (nom) user.nom = nom;
    if (prenom) user.prenom = prenom;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json({
      message: 'Profil mis à jour',
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(400).json({ 
      error: 'Erreur lors de la mise à jour du profil',
      message: error.message 
    });
  }
};

// Changer le mot de passe
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    // Vérifier le mot de passe actuel
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Mot de passe actuel incorrect' 
      });
    }

    // Mettre à jour le mot de passe
    user.password = newPassword;
    await user.save();

    res.json({
      message: 'Mot de passe modifié avec succès'
    });
  } catch (error) {
    res.status(400).json({ 
      error: 'Erreur lors du changement de mot de passe',
      message: error.message 
    });
  }
};
