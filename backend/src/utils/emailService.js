const nodemailer = require('nodemailer');

// Configuration du transporteur email
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Envoyer email de contact
const sendContactEmail = async (contact) => {
  const subjectMap = {
    depannage: 'Dépannage',
    devis: 'Demande de Devis',
    support: 'Support Technique',
    autre: 'Autre'
  };

  const mailOptions = {
    from: `"ChabakaPro" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `Nouveau message de contact - ${subjectMap[contact.subject]}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0066CC; color: white; padding: 20px; text-align: center; }
          .content { background: #f5f5f5; padding: 20px; margin: 20px 0; }
          .field { margin: 15px 0; }
          .label { font-weight: bold; color: #0066CC; }
          .value { margin-top: 5px; }
          .footer { text-align: center; color: #666; font-size: 12px; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nouveau Message de Contact</h1>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Nom:</div>
              <div class="value">${contact.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${contact.email}">${contact.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Téléphone:</div>
              <div class="value"><a href="tel:${contact.phone}">${contact.phone}</a></div>
            </div>
            
            ${contact.company ? `
            <div class="field">
              <div class="label">Entreprise:</div>
              <div class="value">${contact.company}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Sujet:</div>
              <div class="value">${subjectMap[contact.subject]}</div>
            </div>
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${contact.message}</div>
            </div>
            
            <div class="field">
              <div class="label">Date:</div>
              <div class="value">${new Date(contact.createdAt).toLocaleString('fr-MA')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>ChabakaPro - Services IT Casablanca</p>
            <p>Ce message a été envoyé automatiquement depuis le formulaire de contact du site web.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  // Email de confirmation au client
  const clientMailOptions = {
    from: `"ChabakaPro" <${process.env.EMAIL_USER}>`,
    to: contact.email,
    subject: 'Confirmation de réception - ChabakaPro',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0066CC; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .cta { text-align: center; margin: 30px 0; }
          .button { background: #00AA55; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Message bien reçu !</h1>
          </div>
          
          <div class="content">
            <p>Bonjour ${contact.name},</p>
            
            <p>Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les <strong>24 heures</strong>.</p>
            
            <p>En attendant, n'hésitez pas à nous appeler directement :</p>
            <p><strong>📱 ${process.env.REACT_APP_PHONE_NUMBER || '+212 6XX XXX XXX'}</strong></p>
            
            <div class="cta">
              <a href="https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}" class="button">💬 WhatsApp</a>
            </div>
            
            <p>Cordialement,<br>L'équipe ChabakaPro</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
  await transporter.sendMail(clientMailOptions);
};

// Envoyer email de devis
const sendDevisEmail = async (devis) => {
  const urgenceMap = {
    normale: 'Normale',
    urgente: 'Urgente ⚠️',
    tres_urgente: 'Très Urgente 🔴'
  };

  const mailOptions = {
    from: `"ChabakaPro" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `Nouvelle demande de devis ${urgenceMap[devis.urgence]} - ${devis.service}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #00AA55; color: white; padding: 20px; text-align: center; }
          .content { background: #f5f5f5; padding: 20px; margin: 20px 0; }
          .field { margin: 15px 0; }
          .label { font-weight: bold; color: #00AA55; }
          .value { margin-top: 5px; }
          .urgent { background: #ffebee; border-left: 4px solid #f44336; padding: 10px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💼 Nouvelle Demande de Devis</h1>
          </div>
          
          ${devis.urgence !== 'normale' ? `
          <div class="urgent">
            <strong>⚠️ URGENCE:</strong> ${urgenceMap[devis.urgence]}
          </div>
          ` : ''}
          
          <div class="content">
            <div class="field">
              <div class="label">Type de Client:</div>
              <div class="value">${devis.clientType === 'particulier' ? 'Particulier' : 'Entreprise'}</div>
            </div>
            
            <div class="field">
              <div class="label">Nom:</div>
              <div class="value">${devis.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${devis.email}">${devis.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Téléphone:</div>
              <div class="value"><a href="tel:${devis.phone}">${devis.phone}</a></div>
            </div>
            
            ${devis.company ? `
            <div class="field">
              <div class="label">Entreprise:</div>
              <div class="value">${devis.company}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Service:</div>
              <div class="value">${devis.service.replace(/_/g, ' ')}</div>
            </div>
            
            ${devis.budgetEstime ? `
            <div class="field">
              <div class="label">Budget Estimé:</div>
              <div class="value">${devis.budgetEstime} MAD</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Description du Projet:</div>
              <div class="value">${devis.description}</div>
            </div>
            
            <div class="field">
              <div class="label">Date de Demande:</div>
              <div class="value">${new Date(devis.createdAt).toLocaleString('fr-MA')}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };

  // Email de confirmation au client
  const clientMailOptions = {
    from: `"ChabakaPro" <${process.env.EMAIL_USER}>`,
    to: devis.email,
    subject: 'Demande de devis reçue - ChabakaPro',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #00AA55; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Devis en Préparation</h1>
          </div>
          
          <div class="content">
            <p>Bonjour ${devis.name},</p>
            
            <p>Nous avons bien reçu votre demande de devis pour <strong>${devis.service.replace(/_/g, ' ')}</strong>.</p>
            
            <p>Notre équipe va étudier votre projet et vous envoyer un devis détaillé dans les <strong>24 heures</strong>.</p>
            
            <p>Si vous avez des questions en attendant, n'hésitez pas à nous contacter :</p>
            <ul>
              <li>📱 Téléphone : ${process.env.REACT_APP_PHONE_NUMBER || '+212 6XX XXX XXX'}</li>
              <li>📧 Email : ${process.env.EMAIL_USER}</li>
              <li>💬 WhatsApp : <a href="https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}">Cliquez ici</a></li>
            </ul>
            
            <p>Cordialement,<br>L'équipe ChabakaPro</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
  await transporter.sendMail(clientMailOptions);
};

module.exports = {
  sendContactEmail,
  sendDevisEmail
};
