import { useState } from 'react';
import styles from './Login.module.css';
import validateLogin from '../../helpers/validateLogin';
import axios from 'axios';

function Login() {
  const initialState = {
    username: '',
    password: '',
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateLogin(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return alert('Hay errores en el formulario');
    }

    try {
      const response = await axios.post('http://localhost:3000/users/login', form);
      console.log(response.data);
      setMessage('Login exitoso');
    } catch (error) {
      console.error(error);
      setMessage('Error al iniciar sesión');
    }
  };

  return (
    <main className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuario:</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} />
        {errors.username && <p className={styles.error}>{errors.username}</p>}

        <label>Contraseña:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <button type="submit">Iniciar sesión</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}

export default Login;
