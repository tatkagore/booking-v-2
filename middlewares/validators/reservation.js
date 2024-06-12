const { body } = require("express-validator");

const postValidationRules = () => {
  return [
    body("date")
      .not()
      .isEmpty()
      .withMessage("Le champ de la date ne peut pas être vide")
      .isISO8601()
      .toDate()
      .withMessage("La date n'est pas au bon format"),
    body("note").isString().withMessage("La note n'est pas une string"),
    body("numberOfGuests")
      .not()
      .isEmpty()  
      .withMessage("Le nombre d’invités est requis")
      .isInt({ min: 1, max: 10 })
      .withMessage("Le nombre d’invités doit être entre 1 et 10"),
  ];
};

const putValidationRules = () => {
  return [
    body("date")
      .not()
      .isEmpty()
      .withMessage("Le champ de la date ne peut pas être vide")
      .isISO8601()
      .toDate()
      .withMessage("La date n'est pas au bon format"),
    body("note").isString().withMessage("La note n'est pas une string"),
    body("numberOfGuests")
      .not()
      .isEmpty()
      .withMessage("Le nombre d’invités est requis")
      .isInt({ min: 1, max: 10 })
      .withMessage("Le nombre d’invités doit être entre 1 et 10"),
  ];
};

module.exports = { postValidationRules, putValidationRules };
