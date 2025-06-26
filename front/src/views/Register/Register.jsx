import { useState, useEffect } from 'react';
import styles from './Register.module.css';
import validateRegister from '../../helpers/validateRegister';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Register() {
  const navigate = useNavigate();

  const initialState = {
    name: '',
    email: '',
    birthdate: '',
    nDni: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    const validationErrors = validateRegister(form);
    setErrors(validationErrors);
     if (Object.keys(validationErrors).length > 0) {
       return alert("Hay errores en el formulario");
    }

    const response = await axios.post("http://localhost:3000/users/register", form);

    console.log(response.data);
    alert("Registro exitoso");
    navigate("/login");

    setForm(initialState);
  } catch (error) {
    console.error("Error al registrar:", error);
    alert("Error al registrar");
  }
};

  useEffect(() => {
    const errors = validateRegister(form);
    setErrors(errors);
  }, [form]);

  return (
    <div className={styles.pageWrapper}>
    <main className={styles.registerContainer}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <label>Fecha de nacimiento:</label>
        <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} />
        {errors.birthdate && <p className={styles.error}>{errors.birthdate}</p>}

        <label>DNI:</label>
        <input type="text" name="nDni" value={form.nDni} onChange={handleChange} />
        {errors.nDni && <p className={styles.error}>{errors.nDni}</p>}

        <label>Usuario:</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} />
        {errors.username && <p className={styles.error}>{errors.username}</p>}

        <label>Contraseña:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}

        <button type="submit">Registrarse</button>
      </form>
    </main>
    </div>
  );
}

export default Register;

