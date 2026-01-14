const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Redis
const { redisClient } = require('./config/redis');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gestion-recettes';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch((err) => console.error('❌ Erreur de connexion MongoDB:', err));

// Routes
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API Gestion de Recettes' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Erreur serveur',
    message: err.message 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
