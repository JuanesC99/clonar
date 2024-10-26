"use client";

import Link from "next/link";
import AppData from "@data/app.json";

const HeaderComing = () => {

  return (
    <>
        {/* top bar */}
        <div className="mil-top-panel">
            <div className="container-fluid">
                <div className="mil-top-panel-content" style={{"flexWrap": "wrap", gap: '15px', height: 'auto', minHeight: '100px', padding : '20px 0'}}>
                    <Link href="/coming-soon" className="mil-logo">
                        <img src={AppData.header.logo.image} alt={AppData.header.logo.alt} style={{"width": "180px"}} />
                    </Link>

                    {/* right buttons */}
                    <Link href="/pre-order" className="mil-button mil-sm">Asegura tu proyecto</Link>
                    {/* right buttons end */}

                </div>

            </div>
        </div>
        {/* top bar end */}
    </>
  );
};
export default HeaderComing;
