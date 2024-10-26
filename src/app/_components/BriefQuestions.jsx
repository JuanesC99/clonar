'use client';

import React, { useState, useEffect, useCallback } from 'react';
import briefData from '@data/brief/data.json';
import AppData from '@data/app.json';
import '@styles/css/animations.css';

const BriefForm = () => {
  const questionsData = briefData.questions;
  const [step, setStep] = useState(0); // Track the current step in the form
  const [formData, setFormData] = useState({}); // Store form responses
  const [isAnimating, setIsAnimating] = useState(false); // Handle animations between steps
  const [animationDirection, setAnimationDirection] = useState('forward'); // Track direction of animation
  const [nextStep, setNextStep] = useState(null); // State to hold the next step before rendering it
  const [submitStatus, setSubmitStatus] = useState(null); // Track form submission status: null, 'success', or 'error'

  // Handle the animation timeout, reset animation state after 500ms
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setStep(nextStep); // Update the current step after animation
        setIsAnimating(false); // Reset animation state
      }, 500); // Match this with the animation duration

      return () => clearTimeout(timer); // Cleanup the timeout when unmounted or state changes
    }
  }, [isAnimating, nextStep]);

  // Handle changes to form inputs (checkbox and radio types)
  const handleInputChange = useCallback((e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => {
      if (name === 'features') {
        const updatedFeatures = prevData.features || [];
        return {
          ...prevData,
          features: checked
            ? [...updatedFeatures, value]
            : updatedFeatures.filter(item => item !== value)
        };
      } else {
        return {
          ...prevData,
          [name]: value
        };
      }
    });
  }, []);

  // Move to the next question or submit the form if at the last step
  const nextQuestion = useCallback(() => {
    if (step < questionsData.length - 1) {
      setAnimationDirection('forward');
      setIsAnimating(true);
      setNextStep(step + 1); // Set next step but don't update current step yet
    } else {
      submitForm(); // Submit the form if on the last step
    }
  }, [step]);

  // Go back to the previous question
  const prevQuestion = useCallback(() => {
    if (step > 0) {
      setAnimationDirection('backward');
      setIsAnimating(true);
      setNextStep(step - 1); // Set next step for backward navigation
    }
  }, [step]);

  // Submit the form data to the server
  const submitForm = useCallback(() => {
    setAnimationDirection('forward');
    setIsAnimating(true);

    fetch(AppData.settings.formspreeURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => setSubmitStatus(response.ok ? 'success' : 'error')) // Set status based on response
      .catch(() => setSubmitStatus('error')); // Handle any error during the request
  }, [formData]);

  // Check if the user has selected an option to enable the "Next" button
  const isOptionSelected = useCallback(() => {
    const currentQuestion = questionsData[step];
    if (currentQuestion.key === 'features') {
      return formData.features && formData.features.length > 0;
    }
    return formData[currentQuestion.key] !== undefined;
  }, [formData, step]);

  // Render the appropriate options based on the current question
  const renderOptions = useCallback(() => {
    const currentQuestion = questionsData[step];

    if (currentQuestion.key === 'features') { // Checkbox input for multiple selections
      return (
        <ul className="checkbox-options" style={{ marginBottom: '30px', listStyle: 'none', gap: '10px' }}>
          {currentQuestion.options.map((option, index) => (
            <li key={index}>
              <label className={`checkbox-label ${formData[currentQuestion.key]?.includes(option) ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  name={currentQuestion.key}
                  value={option}
                  checked={formData[currentQuestion.key]?.includes(option) || false}
                  onChange={handleInputChange}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      );
    } else if (currentQuestion.options[0]?.image) {
      return (
        <div className="option-images" style={{ marginBottom: '30px' }}>
          {currentQuestion.options.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="radio"
                name={currentQuestion.key}
                value={option.value}
                checked={formData[currentQuestion.key] === option.value}
                onChange={handleInputChange}
                style={{ display: 'none' }}
              />
              <img
                src={option.image}
                alt={option.label}
                className={`option-image ${formData[currentQuestion.key] === option.value ? 'selected' : ''}`}
                onClick={() => handleInputChange({ target: { name: currentQuestion.key, value: option.value } })}
              />
              <p>{option.label}</p>
            </label>
          ))}
        </div>
      );
    } else { // Standard radio buttons for single selection
      return (
        <ul className="radio-options" style={{ marginBottom: '30px', listStyle: 'none', gap: '10px' }}>
          {currentQuestion.options.map((option, index) => (
            <li key={index}>
              <label className={`radio-label ${formData[currentQuestion.key] === option ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={currentQuestion.key}
                  value={option}
                  checked={formData[currentQuestion.key] === option}
                  onChange={handleInputChange}
                  required
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      );
    }
  }, [formData, step, handleInputChange]);

  return (
    <div className={`brief-container ${isAnimating ? (animationDirection === 'forward' ? 'slide-out' : 'slide-in-reverse') : (animationDirection === 'forward' ? 'slide-in' : 'slide-out-reverse')}`}>
      {submitStatus ? (
        <div className="submitted-message">
          <h2 className="submitted-title">{briefData[submitStatus][0]}</h2>
          <p className="status-message">{briefData[submitStatus][1]}</p>
        </div>
      ) : (
        <>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${(step / (questionsData.length - 1)) * 100}%` }}
            ></div>
          </div>

          <h2 className="brief-title">{briefData.title}</h2>
          <hr />
          <p className="questionText">{questionsData[step].question}</p>

          {renderOptions()}

          <div className="button-container">
            <button
              onClick={prevQuestion}
              className="back-button"
              disabled={step === 0}
            >
              Volver
            </button>
            <button
              onClick={nextQuestion}
              className="next-button"
              disabled={!isOptionSelected()}
            >
              {step < questionsData.length - 1 ? 'Continuar' : 'Enviar'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BriefForm;
