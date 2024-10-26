import React from "react";

import AppData from "@data/app.json";

import Timer from "@layouts/timer/Index";
import Image from "next/image";

export const metadata = {
    title: {
        default: "Coming Soon",
    },
    description: AppData.settings.siteDescription,
}

const ComingSoon = () => {
    return (
        <>
            {/* banner */}
            <section className="mil-banner mil-relative">
                <Image
                    src='/img/photo/coming.jpg'
                    className="mil-bg-img mil-scale"
                    data-value-1=".4"
                    data-value-2="1.4"
                    alt="coming soon background"
                    layout="fill" // fill parent block
                    objectFit="cover"
                    objectPosition="center" // Center image
                    quality={75} // image quality (1-100)
                />
                
                <div className="mil-overlay" />

                <div className="container">
                    <div className="mil-background-grid mil-top-space" />

                    <div className="coming__baner mil-banner-content">
                        <div className="row col-xl-6">

                            <div className="mil-center mil-mb-90">
                                <span className="mil-suptitle mil-light mil-upper mil-mb-60"><span className="mil-accent">New</span> Experience</span>
                                <h1 className="mil-upper mil-light mil-mb-60">🖱️ <br /> ¡Alista el clic!</h1>
                                <p className="mil-light-soft">¡Algo increíble está por llegar! Pronto lanzaremos nuestro nuevo sitio web con herramientas que mejorarán nuestra comunicación y soluciones que harán la vida de nuestros futuros clientes aún mejor. ¡Prepárate!</p>
                            </div>

                        </div>
                        <div className="row col-12">

                            <p className="mil-light-soft mil-timer-text mil-mb-30">Estamos preparando para el lanzamiento en:</p>
                            <Timer />

                        </div>
                    </div>
                </div>
            </section>
            {/* banner end */}
        </>
    );
};
export default ComingSoon;
