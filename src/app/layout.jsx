import '@styles/scss/style.scss';
import "./globals.css";

import "@styles/css/plugins/bootstrap-grid.css";
import "@styles/css/plugins/swiper.min.css";
import "@styles/css/plugins/magnific-popup.css";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

import ScrollbarProgress from "@layouts/scrollbar-progress/Index";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';

import AppData from "@data/app.json";
import PreloaderModule from './_layouts/preloader/Index';

export const metadata = {
  title: {
    default: AppData.settings.siteName,
    template: "%s <> " + AppData.settings.siteName,
  },
  description: AppData.settings.siteDescription,
  keywords: AppData.settings.siteKeywords
}

const Layouts = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <PreloaderModule>
          <div className="mil-wrapper" >
            {children}
            <ScrollbarProgress />
            <SpeedInsights />
            <Analytics />
          </div>
        </PreloaderModule> 
      </body>
    </html>
  );
};
export default Layouts;
