import React from "react";

import AppData from "@data/app.json";

import { getSortedPoliciesData } from "@library/policies";

import PageBanner from "@components/PageBanner";
import FeaturesTwoSection from "@components/sections/FeaturesTwo";
import AboutFourSection from "@components/sections/AboutFour";
import CallToActionSection from "@components/sections/CallToAction";

import Link from "next/link";

export const metadata = {
  title: {
    default: "Policy",
  },
  description: AppData.settings.siteDescription,
}

async function Policies() {
  const policies = await getAllPolicies();

  return (
    <>
      <PageBanner pageTitle={"Our Policies"} breadTitle={"Policies"} bgImage={"/img/photo/12.jpg"} />

      {/* policies */}
      <section>
        <div className="container mil-p-120-90">
          <div className="mil-background-grid mil-softened" />

          <div className="row justify-content-center">
            <div className="col-lg-8">

              <div className="mil-center mil-mb-120">
                <span className="mil-suptitle mil-upper mil-up mil-mb-30">Modern concept</span>
                <p className="mil-text-lg mil-up">At SM, we focus on using cutting-edge technologies and agile practices to deliver customized solutions that accelerate our clients' growth. From designing intuitive interfaces to integrating complex systems, we are constantly evolving to provide products that make a difference.</p>
              </div>

            </div>
          </div>

          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-upper mil-up mil-mb-30">On This We Work</span>
            <h2 className="mil-upper mil-up">Exclusive Policies</h2>
          </div>

          <div className="row">
            {policies.map((item, key) => (
              <div className="col-lg-4 mil-up" key={`policy-item-${key}`}>

                <Link href={`/policies/${item.id}`} className="mil-service-card mil-mb-30">
                  <div className="mil-card-number">{key < 10 ? "0" + (key + 1) + "." : (key + 1) + "."}</div>
                  <div className="mil-center">
                    <div className="mil-icon mil-icon-lg mil-mb-30">
                      <img src={item.icon} alt={item.title} />
                    </div>
                    <h4 className="mil-upper mil-mb-20">{item.title}</h4>
                    <div className="mil-divider-sm mil-mb-20" />
                    <p className="mil-service-text">{item.short}</p>
                    <div className="mil-go-buton mil-icon mil-icon-lg mil-icon-accent-bg">
                      <img src="/img/icons/1.svg" alt="icon" />
                    </div>
                  </div>
                </Link>

              </div>
            ))}
          </div>
        </div>
      </section>
      {/* policies end */}

      {/* <VisionSection /> */}

      <FeaturesTwoSection />
      <AboutFourSection />
      <CallToActionSection />
    </>
  );
};
export default Policies;

async function getAllPolicies() {
  const allPolicies = getSortedPoliciesData();
  return allPolicies;
}