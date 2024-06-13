// bcryptService.js
const bcrypt = require('bcrypt');

class BcryptService {
  constructor() {
    this.saltRounds = 10; // Définir le nombre de tours de sel pour le hachage
  }

  async hashPassword(password) {
    try {
      const hash = await bcrypt.hash(password, this.saltRounds);
      return hash;
    } catch (error) {
      console.error('Erreur lors du hachage du mot de passe:', error);
      throw error;
    }
  }

  async comparePassword(password, hash) {
    try {
      const match = await bcrypt.compare(password, hash);
      return match;
    } catch (error) {
      console.error('Erreur lors de la comparaison du mot de passe:', error);
      throw error;
    }
  }
}

module.exports = new BcryptService();