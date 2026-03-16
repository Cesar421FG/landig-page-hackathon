import React from 'react';
import './InfoSection.css';

const InfoSection = () => {
  const features = [
    {
      icon: 'bi bi-mic',
      title: 'Habla con expertos',
      description: 'Expertos de las mejores empresas tecnológicas del mundo'
    },
    {
      icon: 'bi bi-laptop',
      title: 'Desarrollo de habilidades prácticas',
      description: 'Aplica conocimientos teóricos a problemas reales, trabajando bajo presión y con plazos ajustados.'
    },
    {
      icon: 'bi bi-people',
      title: 'Trabajo en equipo',
      description: 'Colaboración con personas de diversas disciplinas (desarrolladores, diseñadores, expertos en negocios)'
    },
    {
      icon: 'bi bi-rocket-takeoff',
      title: 'Aprendizaje acelerado',
      description: 'El entorno intensivo y colaborativo fomenta el aprendizaje rápido de nuevas tecnologías'
    }
  ];

  return (
    <div className="info-section">
      <h2 className="section-title">¿Por qué asistir?</h2>
      <div className="info-grid">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="info-card hover-scale"
          >
            <div className="info-icon">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;