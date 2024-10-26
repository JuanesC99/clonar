"use client"

import { useEffect, useState } from "react";

const PreloaderModule = ({children}) => {
    const [loading, setLoading] = useState(true); // State to manage loading

    useEffect(() => {
        // Simulate data loading or logic being performed
        const handleLoad = () => {
            setLoading(false); // Set loading to false when loading is complete
        };

        // Simulating a delay to see the preloader
        const timer = setTimeout(handleLoad, 2150); // 2.5 seconds of loading

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [children]);

    return (
        <>
            { loading ? 
            <div className={`mil-preloader `}>
                <svg style={{width: '130px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#FF7F50" stroke="#FF7F50" strokeWidth="15" width="30" height="30" x="25" y="50"><animate attributeName="y" calcMode="spline" dur="2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></rect><rect fill="#FF7F50" stroke="#FF7F50" strokeWidth="15" width="30" height="30" x="85" y="50"><animate attributeName="y" calcMode="spline" dur="2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></rect><rect fill="#FF7F50" stroke="#FF7F50" strokeWidth="15" width="30" height="30" x="145" y="50"><animate attributeName="y" calcMode="spline" dur="2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></rect></svg>
            </div> : children}
        </>
    );
};
export default PreloaderModule;