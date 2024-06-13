// emailVerificationService.js

class EmailVerificationService {
    constructor() {
      this.blacklistedDomains = ['yopmail.com', 'mailinator.com'];
    }
  
    isBlacklisted(email) {
      const domain = email.split('@')[1];
      return this.blacklistedDomains.includes(domain);
    }
  
      validateEmail(email) {
          if (this.isBlacklisted(email)) {
              throw new Error('Le domaine de l\'email est blacklisté');
  
  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }
      }
  }
  
  module.exports = new EmailVerificationService();