const { body } = require("express-validator");

const signUpValidationRules = () => {
  return [
    body("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("L'email n'est pas au bon format")
      .normalizeEmail({ gmail_remove_dots: true }),
    body("password")
      .isStrongPassword({
        minLength: 10,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
      .withMessage(
        "Le mot de passe doit contenir au moins 10 caractères, dont au moins 1 majuscule, 1 minuscule, et 1 chiffre"
      ),
    body("firstName")
      .not()
      .isEmpty()
      .withMessage("Le prénom est obligatoire")
      .blacklist("<>")
      .escape()
      .trim(),
    body("lastName")
      .not()
      .isEmpty()
      .withMessage("Le nom est obligatoire")
      .blacklist("<>")
      .escape()
      .trim(),
  ];
};

const signInValidationRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Le format de l'email est incorrect")
      .normalizeEmail({ gmail_remove_dots: true }),

    body("password")
      .isLength({ min: 5 })
      .withMessage("Le mot de passe doit contenir au moins 5 caractères"),
  ];
};

module.exports = { signInValidationRules, signUpValidationRules };
