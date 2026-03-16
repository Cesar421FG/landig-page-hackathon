import React, { useState, useEffect, useRef } from 'react'; // Añade useRef
import './CountdownTimer.css';

const CountdownTimer = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    minutes: 1, // 1 minuto para prueba
    seconds: 10 // 10 segundos para prueba
  });

  const completedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        // Si ya llegó a cero, no hacer nada
        if (prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }

        // Calcular nuevo tiempo
        let newMinutes = prevTime.minutes;
        let newSeconds = prevTime.seconds - 1;

        if (newSeconds < 0) {
          newMinutes -= 1;
          newSeconds = 59;
        }
        if (newMinutes === 0 && newSeconds === 0) {
          clearInterval(timer);
          
          // Ejecutar onComplete SOLO si no se ha ejecutado antes
          if (!completedRef.current) {
            completedRef.current = true; // Marcar como ejecutado
            onComplete();
          }
        }

        return {
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    // Limpiar intervalo al desmontar
    return () => {
      clearInterval(timer);
    };
  }, [onComplete]); // Solo depende de onComplete

  return (
    <div className="countdown-timer">
      <div className="timer-display pulse">
        <span className="minutes">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="separator">:</span>
        <span className="seconds">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
      <p className="timer-text">Tiempo restante para registrarte</p>
    </div>
  );
};

export default CountdownTimer;