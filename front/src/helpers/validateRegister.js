export const validateRegister = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = 'El nombre es requerido';
  } else if (formData.name.length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = 'El email es requerido';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'El email no es válido';
  }

  if (!formData.birthdate) {
    errors.birthdate = 'La fecha de nacimiento es requerida';
  } else {
    const birthDate = new Date(formData.birthdate);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      errors.birthdate = 'Debes tener al menos 18 años para registrarte';
    }
  }

  if (!formData.nDni) {
    errors.nDni = 'El DNI es requerido';
  }

  if (!formData.username) {
    errors.username = 'El usuario es requerido';
  }

  if (!formData.password) {
    errors.password = 'La contraseña es requerida';
  } else if (formData.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return errors;
};

export default validateRegister;
