const { body } = require("express-validator");

const signUpValidationRules = () => {
  return [
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
    body("email")
      .isEmail()
      .withMessage("Le format de l'email est incorrect")
      .normalizeEmail({ gmail_remove_dots: true }),
    body("phoneNumber")
      .isString()
      .not()
      .isEmpty()
      .withMessage("Le numero de telephone est obligatoire"),
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
