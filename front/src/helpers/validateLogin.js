const validateLogin = (formData) => {
  const errors = {};

  if (!formData.username) {
    errors.username = 'El nombre de usuario es requerido';
  }

  if (!formData.password) {
    errors.password = 'La contraseña es requerida';
  } else if (formData.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  return errors;
};

export default validateLogin;
