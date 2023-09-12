const { body, validationResult } = require('express-validator');

const validateDateFields = (fieldNames) => {
  return fieldNames.map((fieldName) => [
    body(fieldName)
      .optional({ nullable: true })
      .isISO8601()
      .toDate(),
  ]);
};

const validateMultipleDateFields = (fieldNames) => {
  return [
    ...validateDateFields(fieldNames),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array(), message: 'Validation error' });
      }
      next();
    },
  ];
};

module.exports = { validateMultipleDateFields };
