const Joi = require('joi');
module.exports = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .message(
      'Password must be between 3 and 30 characters and contain only letters and numbers'
    )
    .required(),
  confirm_password: Joi.string().valid(Joi.ref('password')),
  email: Joi.string().email().required(),
});
