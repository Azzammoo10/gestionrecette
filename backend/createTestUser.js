const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Vérifier si l'utilisateur test existe déjà
    const existingUser = await User.findOne({ email: 'test@recettes.com' });
    
    if (existingUser) {
      console.log('ℹ️  L\'utilisateur test existe déjà');
      console.log('\n📧 Email: test@recettes.com');
      console.log('🔑 Mot de passe: 123456\n');
    } else {
      // Créer un utilisateur de test
      const testUser = await User.create({
        nom: 'Test',
        prenom: 'Utilisateur',
        email: 'test@recettes.com',
        password: '123456'
      });

      console.log('✅ Utilisateur de test créé avec succès!');
      console.log('\n📧 Email: test@recettes.com');
      console.log('🔑 Mot de passe: 123456\n');
    }

    await mongoose.connection.close();
    console.log('👋 Déconnexion de MongoDB');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

createTestUser();
