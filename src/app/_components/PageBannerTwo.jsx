"use client";

import { useEffect } from "react";
import { ScrollAnimation } from "@common/scrollAnims";
import Image from "next/image";

const PageBannerTwo = ({ subTitle, title, bgImage }) => {
  useEffect(() => {
    ScrollAnimation();
  }, []);

  return (
    <>
      {/* banner */}
      <section className="mil-banner mil-banner-sm">
        <Image
          src={bgImage}
          className="mil-bg-img mil-scale"
          data-value-1=".4"
          data-value-2="1.4"
          alt="image"
          layout="fill" // Ocupa todo el contenedor
          objectFit="cover" // Mantiene el aspecto de la imagen
          objectPosition="center" // Centra la imagen
          loading="lazy" // Lazy loading
          quality={75} // Ajusta la calidad de la imagen (1-100)
        />

        <div className="mil-overlay" />

        <div className="container banner-container">
          <div className="mil-background-grid mil-top-space"></div>
          <div className="mil-banner-content">
            <div className="mil-mb-40">
              <span className="mil-suptitle mil-upper mil-light mil-up mil-mb-30" dangerouslySetInnerHTML={{ __html: subTitle }} />
              <h1 className="mil-light mil-upper mil-up mil-mb-30" dangerouslySetInnerHTML={{ __html: title }} />
            </div>
          </div>
        </div>
      </section>
      {/* banner end */}
    </>
  );
};
export default PageBannerTwo;
