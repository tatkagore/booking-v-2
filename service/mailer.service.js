// mailerService.js
const nodemailer = require('nodemailer');

class MailerService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'votreEmail@gmail.com',
        pass: 'votreMotDePasse', 
      },
    });
  }

  async envoyerEmail(destinataire, sujet, texte, html) {
    const mailOptions = {
      from: 'votreEmail@gmail.com',
      to: destinataire,
      subject: sujet,
      text: texte,
      html: html,
    };

    try {
      let info = await this.transporter.sendMail(mailOptions);
      console.log('Email envoyé: ' + info.response);
      return info.response;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      throw error;
    }
  }
}

module.exports = new MailerService();