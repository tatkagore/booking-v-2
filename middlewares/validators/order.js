const { body } = require("express-validator");

const postValidationRules = () => {
  return [
    body("pickup_time")
      .not()
      .isEmpty()
      .withMessage("Le champ de la date ne peut pas être vide")
      .isISO8601()
      .toDate()
      .withMessage("La date n'est pas au bon format"),
    body("status").isString().withMessage("La note n'est pas une string"),
  ];
};

const putValidationRules = () => {
  return [
    body("pickup_time")
      .not()
      .isEmpty()
      .withMessage("Le champ de la date ne peut pas être vide")
      .isISO8601()
      .toDate()
      .withMessage("La date n'est pas au bon format"),
    body("status").isString().withMessage("La note n'est pas une string"),
  ];
};

module.exports = { postValidationRules, putValidationRules };
