import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [activeImage, setActiveImage] = useState(null);

  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87', title: 'Aprendizaje acelerado' },
    { id: 2, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678', title: 'Desarrollo de habilidades prácticas' },
    { id: 3, src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0', title: 'Habla con expertos' },
    { id: 4, src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94', title: 'Trabajo en equipo' },
  ];

  return (
    <div className="gallery-section">
      <h2 className="section-title">Galería del Evento</h2>
      
      <div className="video-container">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/wJXHAcV5mSE"
          title="Lo que debes saber del HACKATON - ¿Qué es? ¿Por qué debería participar?"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="gallery-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="gallery-item hover-zoom"
            onClick={() => setActiveImage(image)}
          >
            <img src={image.src} alt={image.title} />
            <div className="gallery-overlay">
              <span>{image.title}</span>
            </div>
          </div>
        ))}
      </div>

      {activeImage && (
        <div className="modal" onClick={() => setActiveImage(null)}>
          <div className="modal-content">
            <img src={activeImage.src} alt={activeImage.title} />
            <button className="modal-close" onClick={() => setActiveImage(null)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;