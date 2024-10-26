
import React from "react";
// import dynamic from "next/dynamic";

import { notFound } from 'next/navigation';

import { getAllPoliciesIds, getPolicyData } from "@library/policies";

import PageBanner from "@components/PageBanner";
import ContactSection from "@components/sections/Contact";

// const FullImageSlider = dynamic( () => import("@components/sliders/FullImage"), { ssr: false } );

import Link from "next/link";

export async function generateMetadata({ params }) {
    const postData = await getSinglePolicyData(params);

    return {
        title: postData.title + " | Policy",
    }
}

async function PolicyDetail( { params } ) {
  const postData = await getSinglePolicyData(params);

  return (
    <>
      <PageBanner pageTitle={postData.title} breadTitle={postData.bread} bgImage={"/img/photo/policy.jpg"} text={postData.short} />

      {/* policies */}
      <section>
        <div className="container mil-p-120-60">
            <div className="mil-background-grid mil-softened"></div>
            <div className="row justify-content-between">
                <div className="col-lg-8">
                    {postData.description != undefined &&
                    <>
                        {postData.description.map((item, key) => (
                        <React.Fragment key={`service-description-${key}`}>
                            {item.layout == 1 &&
                            <>
                                <h2 className="mil-upper mil-up mil-mb-60">{item.title}</h2>
                                <div className="mil-text mil-up mil-mb-60" dangerouslySetInnerHTML={{__html: item.content}} />
                            </>
                            }
                            {/* {item.layout == 2 &&
                            <>
                                <h2 className="mil-upper mil-up mil-mb-60">{item.title}</h2>
                                <div className="row justify-content-between">
                                    <div className="col-lg-6">
                                        <div className="mil-text mil-up mil-mb-30" dangerouslySetInnerHTML={{__html: item.content}} />
                                    </div>
                                    <div className="col-lg-5">
                                        <ul className="mil-icon-list mil-mb-60">
                                            {item.list.map((list_item, list_key) => (
                                            <li className="mil-up" key={`service-description-${key}-list-${list_key}`}><img src="/img/icons/11.svg" alt="icon" />{list_item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </>
                            } */}
                            {item.divider == true &&
                            <div className="mil-divider-lg mil-up mil-mb-60" />
                            }
                        </React.Fragment>
                        ))}
                    </>
                    }
                </div>
            </div>
        </div>
      </section>

      {/* <section>
        <div className="container mil-p-120-60">
            <div className="mil-background-grid mil-softened" />

            <div className="row justify-content-between">
                <div className="col-lg-7">
                    {postData.faq != undefined &&
                    <>
                        <span className="mil-suptitle mil-upper mil-dark mil-up mil-mb-30">{postData.faq.subtitle}</span>
                        <h2 className="mil-upper mil-up mil-mb-60">{postData.faq.title}</h2>

                        <div className="mil-mb-60">
                            {postData.faq.items.map((item, key) => (
                            <div className="mil-accordion-group mil-dark mil-up" key={`faq-item-${key}`}>
                                <div className="mil-accordion-menu">

                                    <div className="mil-symbol mil-dark mil-thin mil-h3">
                                        <div className="mil-plus">+</div>
                                        <div className="mil-minus">-</div>
                                    </div>

                                    <h6 className="mil-upper">{item.label}</h6>

                                </div>
                                <div className="mil-accordion-content">
                                    <div className="mil-dark-soft" dangerouslySetInnerHTML={{__html: item.content}} />
                                </div>
                            </div>
                            ))}
                        </div>

                        <Link href={postData.faq.button.link} className="mil-button mil-up mil-mb-60">{postData.faq.button.label}</Link>
                    </>
                    }
                </div>
            </div>
        </div>
    </section> */}
    {/* policies end */}
      
    <ContactSection />
      
    </>
  );
};
export default PolicyDetail;

export async function generateStaticParams() {
    const paths = getAllPoliciesIds()

    return paths
}

async function getSinglePolicyData(params) {
    const postData = await getPolicyData(params.id)

    if ( !postData ) {
        notFound()
    } else {
        return postData
    }
}