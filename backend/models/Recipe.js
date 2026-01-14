const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    minlength: [3, 'Le titre doit contenir au moins 3 caractères']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    minlength: [10, 'La description doit contenir au moins 10 caractères']
  },
  ingredients: [{
    nom: {
      type: String,
      required: true
    },
    quantite: {
      type: String,
      required: true
    }
  }],
  instructions: [{
    type: String,
    required: true
  }],
  tempsPreparation: {
    type: Number,
    required: [true, 'Le temps de préparation est requis'],
    min: [1, 'Le temps de préparation doit être au moins 1 minute']
  },
  tempsCuisson: {
    type: Number,
    default: 0,
    min: 0
  },
  nombrePersonnes: {
    type: Number,
    required: [true, 'Le nombre de personnes est requis'],
    min: [1, 'Le nombre de personnes doit être au moins 1']
  },
  categorie: {
    type: String,
    enum: ['Entrée', 'Plat principal', 'Dessert', 'Boisson', 'Autre'],
    default: 'Autre'
  },
  difficulte: {
    type: String,
    enum: ['Facile', 'Moyen', 'Difficile'],
    default: 'Moyen'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  auteurNom: {
    type: String,
    default: 'Anonyme'
  }
}, {
  timestamps: true
});

// Index pour la recherche
recipeSchema.index({ titre: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);
