import React from "react";

import AppData from "@data/app.json";

import PageBanner from "@components/PageBanner";
import ContactForm from "@components/ContactForm";

import Link from "next/link";
import PageBannerTwo from "../../_components/PageBannerTwo";

export const metadata = {
    title: {
        default: "Contact",
    },
    description: AppData.settings.siteDescription,
}

const PreOrder = () => {
    return (
        <>
            <PageBannerTwo title={"Sería un placer charlar"} subTitle={"Contacto"} bgImage={"/img/photo/pre-order.jpg"} />

            {/* contact */}
            <section className="mil-relative">
                <div className="container mil-p-120-30">
                    <div className="mil-background-grid mil-softened"></div>
                    <div className="row justify-content-between">
                        <div className="col-lg-4">

                            <div className="mil-mb-90">
                                <h2 className="mil-upper mil-up mil-mb-30">Cuéntanos tus ideas.</h2>
                                <p className="mil-up mil-mb-30">¿Tienes preguntas? ¡Nos encantaría conocerte mejor! Completa el formulario a continuación para asegurar tu proyecto y déjanos saber tus ideas. Estamos listos para ayudarte a convertir tu visión en realidad. ¡Esperamos con entusiasmo la oportunidad de hablar pronto!</p>
                                <div className="mil-divider-lg mil-up mil-mb-30"></div>
                                <p className="mil-up mil-mb-30">¿Quieres unirte a nuestra divertida pandilla? ¡Ven, será divertido!</p>
                                <div className="mil-up">
                                    <Link href="https://wa.me/34642068860?text=¡Hola!%20Estoy%20muy%20interesado%20en%20unirme%20a%20vuestro%20equipo.%20Tengo%20muchas%20ganas%20de%20contribuir%20y%20aprender%20juntos!" className="mil-link mil-upper">Únete <span className="mil-arrow"><img src="/img/icons/1.svg" alt="arrow" /></span></Link>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-7">

                            <ContactForm />

                        </div>
                    </div>
                </div>
            </section>
            {/* contact end */}
        </>
    );
};
export default PreOrder;
