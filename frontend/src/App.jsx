import React, { useState, useEffect, useRef } from 'react'; // IMPORTANTE: añade useRef
import Swal from 'sweetalert2'; 
import './styles/App.css';
import RegistrationForm from './components/RegistrationForm';
import Gallery from './components/Gallery';
import CountdownTimer from './components/CountdownTimer';
import HeroSection from './components/HeroSection';
import InfoSection from './components/InfoSection';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [showForm, setShowForm] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showExpiredAlert, setShowExpiredAlert] = useState(false);
  
  // REFERENCIA para controlar que solo se ejecute una vez
  const timerCompletedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScrollClose = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScrollClose);
    return () => window.removeEventListener('scroll', handleScrollClose);
  }, [menuOpen]);

  const handleTimerComplete = () => {
    // SOLO ejecutar si no se ha completado antes
    if (!timerCompletedRef.current) {
      timerCompletedRef.current = true; // Marcar como completado
      
      setShowForm(false);
      
      Swal.fire({
        title: '¡Tiempo Expirado!',
        html: `
          <div style="text-align: center;">
            <i class="bi bi-clock-history" style="font-size: 3rem; color: #dc3545; margin-bottom: 1rem; display: block;"></i>
            <p style="font-size: 1.1rem;">El período de registro para este evento ha finalizado.</p>
          </div>
        `,
        icon: 'warning',
        iconColor: '#dc3545',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#667eea',
        background: '#fff',
        backdrop: 'rgba(0,0,0,0.5)',
        timer: 5000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-button'
        }
      });
    }
  };

  useEffect(() => {
    if (showExpiredAlert) {
      Swal.fire({
        title: '¡Registro Cerrado!',
        html: `
          <div style="text-align: center;">
            <i class="bi bi-calendar-x" style="font-size: 3rem; color: #667eea; margin-bottom: 1rem; display: block;"></i>
            <p style="font-size: 1.1rem;">Lo sentimos, el tiempo de registro ha expirado.</p>
            <p style="color: #666;">¡Espéralos el próximo año!</p>
          </div>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#667eea',
        background: '#fff'
      });
      setShowExpiredAlert(false);
    }
  }, [showExpiredAlert]);

  return (
    <div className="App">
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <h1 className="logos">Hackathon 2026</h1>
          
          <button 
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={handleLinkClick}>Inicio</a></li>
            <li><a href="#info" onClick={handleLinkClick}>Información</a></li>
            <li><a href="#gallery" onClick={handleLinkClick}>Galería</a></li>
            <li><a href="#register" onClick={handleLinkClick}>Registro</a></li>
          </ul>
        </div>
      </nav>

      <section id="home">
        <HeroSection />
      </section>

      <section id="info">
        <InfoSection />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="register" className="register-section">
        <div className="container">
          <h2 className="section-title">Regístrate Ahora</h2>
          <CountdownTimer onComplete={handleTimerComplete} />
          {showForm ? (
            <RegistrationForm />
          ) : (
            <div className="form-expired">
              <h3>
                <i className="bi bi-clock-history me-2"></i> &nbsp;
                El tiempo de registro ha expirado
              </h3>
              <p>El período de registro para este evento ha finalizado.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 Hackathon. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;