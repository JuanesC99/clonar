"use client";

import { Formik } from 'formik';
import * as Yup from 'yup';
import AppData from "@data/app.json";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre debe tener menos de 50 caracteres')
        .required('¡Se requiere el nombre completo!'),
    email: Yup.string()
        .email('Dirección de correo electrónico no válida')
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Formato de correo electrónico no válido'
        )
        .required('¡El correo electrónico es obligatorio!'),
    tel: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Número de teléfono no válido. Incluye el código de país.')
        .required('¡Se requiere el número de teléfono!'),
    budget: Yup.string()
        .matches(/^[0-9]+$/, 'El presupuesto debe contener solo números')
        .test('is-greater-than-250', 'El presupuesto mínimo es de 250€', (value) => {
            const numValue = Number(value);
            return !value || numValue >= 250; // Permitir vacío o validar
        })
        .required('¡El presupuesto es obligatorio!'),
    message: Yup.string()
        .min(10, 'El mensaje debe tener al menos 10 caracteres')
        .required('¡El mensaje es obligatorio!'),
    agree: Yup.boolean().oneOf([true], '¡Debes aceptar los términos y condiciones!'),
});

const ContactForm = ({ subtitleOffset }) => {
    return (
        <Formik
            initialValues={{
                email: '',
                name: '',
                tel: '',
                budget: '',
                message: '',
                agree: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                const form = document.getElementById("contactForm");
                const status = document.getElementById("contactFormStatus");
                const button = document.querySelector('button[type="submit"]');
                const data = new FormData();

                // Append form data
                data.append('name', values.name);
                data.append('email', values.email);
                data.append('tel', values.tel);
                data.append('budget', values.budget);
                data.append('message', values.message);

                // Disable the button to prevent multiple submissions
                button.disabled = true;

                fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    status.classList.add('show'); // Show the status message with transition

                    if (response.ok) {
                        status.innerHTML = "<h5 style='color:green;'>¡Gracias! Tu mensaje se ha enviado correctamente.</h5>";
                        resetForm();
                        button.disabled = true; // Block button after successful submission
                        button.innerText = 'Enviado'; // Change button text to indicate success
                        button.style.opacity = '0.6';
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                console.log(data.errors.map(error => error.message).join(", "));
                            }
                        });
                        status.innerHTML = "<h5 style='color:red;'>¡Ups! Algo salió mal al enviar el formulario. Intenta de nuevo más tarde.</h5>";
                        button.disabled = false; // Re-enable button in case of failure
                    }
                }).catch(error => {
                    status.classList.add('show'); // Show the status message
                    status.innerHTML = "<h5 style='color:red;'>¡Ups! Hubo un problema al enviar el formulario.</h5>";
                    console.error(error);
                    button.disabled = false; // Re-enable button in case of error
                }).finally(() => {
                    setTimeout(() => {
                        // Fade out and hide the status message after 3 seconds
                        status.classList.remove('show');
                        setTimeout(() => {
                            status.style.display = 'none'; // Hide after transition
                        }, 500); // Wait for the transition to finish
                    }, 3000);

                    setSubmitting(false);
                });
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit} id="contactForm" action={AppData.settings.formspreeURL} className={subtitleOffset ? "mil-mt-suptitle-offset mil-mb-90 cform" : "mil-mb-90 cform"}>
                    <div className="row">
                        {/* Name input */}
                        <div className="col-lg-6">
                            <div className="mil-input-frame mil-dark-input mil-up mil-mb-30">
                                <label className="mil-upper"><span>Nombre completo</span><span className="mil-required">*</span></label>
                                <input
                                    type="text"
                                    placeholder="¡Hey! ¿Cómo te llamas?"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                {errors.name && touched.name && (
                                    <div className="error" style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>
                                )}
                            </div>
                        </div>

                        {/* Email input */}
                        <div className="col-lg-6">
                            <div className="mil-input-frame mil-dark-input mil-up mil-mb-30">
                                <label className="mil-upper"><span>Correo electrónico</span><span className="mil-required">*</span></label>
                                <input
                                    type="email"
                                    placeholder="Tu mágico correo electrónico"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                {errors.email && touched.email && (
                                    <div className="error" style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>
                                )}
                            </div>
                        </div>

                        {/* Phone input */}
                        <div className="col-lg-6">
                            <div className="mil-input-frame mil-dark-input mil-up mil-mb-30">
                                <label className="mil-upper"><span>Teléfono</span><span className="mil-required">*</span></label>
                                <input
                                    type="tel"
                                    placeholder="Tu número, ¡no seas tímido! (+34)"
                                    name="tel"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.tel}
                                />
                                {errors.tel && touched.tel && (
                                    <div className="error" style={{ color: 'red', fontSize: '12px' }}>{errors.tel}</div>
                                )}
                            </div>
                        </div>

                        {/* Budget input */}
                        <div className="col-lg-6">
                            <div className="mil-input-frame mil-dark-input mil-up mil-mb-30">
                                <label className="mil-upper"><span>Presupuesto</span><span className="mil-required">*</span></label>
                                <input
                                    type="text"
                                    placeholder="¿Cuál es tu presupuesto(€)?"
                                    name="budget"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.budget}
                                />
                                {errors.budget && touched.budget && (
                                    <div className="error" style={{ color: 'red', fontSize: '12px' }}>{errors.budget}</div>
                                )}
                            </div>
                        </div>

                        {/* Message input */}
                        <div className="col-lg-12">
                            <div className="mil-input-frame mil-dark-input mil-up mil-mb-30">
                                <label className="mil-upper"><span>Mensaje</span><span className="mil-required">*</span></label>
                                <textarea
                                    style={{resize: 'none'}}
                                    placeholder="¡Cuéntanos sobre tu proyecto! ¿Qué tienes en mente y qué detalles son importantes?"
                                    name="message"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.message}
                                />
                                {errors.message && touched.message && (
                                    <div className="error" style={{ color: 'red', fontSize: '12px' }}>{errors.message}</div>
                                )}
                            </div>
                        </div>

                        {/* Checkbox for terms and conditions */}
                        <div className="col-lg-12 mil-mb-30">
                            <div className="mil-checbox-frame mil-dark-input mil-up">
                                <input
                                    className="mil-checkbox"
                                    id="checkbox-1"
                                    type="checkbox"
                                    name="agree"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.agree}
                                />
                                <label htmlFor="checkbox-1" className="mil-text-sm" style={{fontSize: '13px'}}>¡Aceptado! Estoy de acuerdo con los términos de procesamiento de datos.</label>
                            </div>
                            {errors.agree && touched.agree && (
                                <div className="error" style={{ color: 'red', fontSize: '12px', display: 'block' }}>{errors.agree}</div>
                            )}
                        </div>

                        {/* Submit button */}
                        <div className="col-lg-12">
                            <button type="submit" className="mil-button mil-up">
                                {isSubmitting ? 'Enviando...' : 'Enviar ahora'}
                            </button>
                        </div>
                    </div>

                    {/* Form status message */}
                    <div className="form-status" id="contactFormStatus" style={{ display: "none" }} />
                </form>
            )}
        </Formik>
    );
};

export default ContactForm;
