import React, { useEffect, useRef } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero" ref={heroRef}>
      <div className="hero-content">
        <h1 className="hero-title animate-slide-down">
          Hackathon 2026
        </h1>
        <p className="hero-subtitle animate-slide-up">
          La conferencia tecnológica más importante del año, un encuentro de programadores en el que se busca, a través de su trabajo colaborativo, dar una respuesta a un reto o problema técnico de una organización en tiempo récord. Esta respuesta será una solución en forma de prototipo terminado para un producto, servicio o modelo de negocio innovador.
        </p>
        <div className="hero-cta animate-fade-in">
          <a href="#register" className="btns btns-primary">
            Registrarme
          </a>
          <a href="#info" className="btns btns-secondary">
            Saber más
          </a>
        </div>
      </div>
      <div className="hero-overlay"></div>
    </div>
  );
};

export default HeroSection;