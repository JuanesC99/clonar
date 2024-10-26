import BriefQuestions from '@components/BriefQuestions';
import AppData from "@data/app.json";
import PageBanner from '../../_components/PageBanner';

export const metadata = {
  title: {
      default: "Brief",
  },
  description: AppData.settings.siteDescription,
}


export default function BriefPage() {
  return (
    <>
      <PageBanner pageTitle={"Dibuja Tu Proyecto"} breadTitle={"Brief"} bgImage={"/img/photo/brief.jpg"} />
      <BriefQuestions />
    </>
  );
}