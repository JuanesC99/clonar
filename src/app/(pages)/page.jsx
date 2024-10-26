import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";

import { getSortedPostsData } from "@library/posts";

import FeaturesSection from "@components/sections/Features";
// import PricingSection from "@components/sections/Pricing";
import CalculatorSection from "@components/sections/Calculator";
import SkillsSection from "@components/sections/Skills";
import LatestPostsSection from "@components/sections/LatestPosts";
import AboutSection from "../_components/sections/About";

const HeroTwoSlider = dynamic( () => import("@components/sliders/HeroTwo"), { ssr: false } );
const TestimonialSlider = dynamic( () => import("@components/sliders/Testimonial"), { ssr: false } );
// const RecentProjectsSlider = dynamic( () => import("@components/sliders/RecentProjects"), { ssr: false } );

export const metadata = {
  title: {
		default: "Home",
	},
  description: AppData.settings.siteDescription,
}

async function Home() {
  const posts = await getAllPosts();

  return (
    <>
      <HeroTwoSlider />
      <FeaturesSection />
      <AboutSection />

      {/* <PricingSection /> */}
      <CalculatorSection />
      <SkillsSection />
      <TestimonialSlider showPartners={1} />
      {/* <RecentProjectsSlider /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <LatestPostsSection posts={posts} paddingTop />
      </Suspense>
    </>
  );
};
export default Home;

async function getAllPosts() {
  const allPosts = getSortedPostsData();
  return allPosts;
}