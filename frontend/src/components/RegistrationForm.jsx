import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validación para nombre: solo letras y espacios, mínimo 3 caracteres
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.name)) {
      newErrors.name = 'El nombre solo puede contener letras';
    }

    // Validación para email: requerido, sin espacios en blanco
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (formData.email.includes(' ')) {
      newErrors.email = 'El email no puede contener espacios';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }

    // Validación para mensaje: 
    // - No puede estar vacío o ser solo espacios
    // - Permite espacios al inicio y final
    if (!formData.message) {
      newErrors.message = 'El mensaje es requerido';
    } else if (!formData.message.trim()) {
      newErrors.message = 'El mensaje no puede estar vacío o contener solo espacios';
    }
    // Eliminada la validación de espacios al inicio/final

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Para el campo nombre, filtrar números
    if (name === 'name') {
      // Permite letras, espacios y caracteres especiales del español
      const onlyLetters = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ\s]/g, '');
      setFormData({
        ...formData,
        [name]: onlyLetters
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost/event-landing/backend/api/register.php',
        formData
      );
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrors({ submit: response.data.message });
      }
    } catch (error) {
      setErrors({ submit: 'Error al enviar el formulario' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h3>¡Registro exitoso!</h3>
        <p>Te esperamos en el evento.</p>
      </div>
    );
  }

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre completo</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? 'error' : ''}
        ></textarea>
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      {errors.submit && (
        <div className="submit-error">{errors.submit}</div>
      )}

      <button 
        type="submit" 
        className="btn-submit hover-glow"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Registrarse'}
      </button>
    </form>
  );
};

export default RegistrationForm;