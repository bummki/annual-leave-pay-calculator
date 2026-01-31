"use client";

import { useEffect } from "react";

interface AdSenseProps {
    className?: string;
}

export default function AdSenseBanner({ className }: AdSenseProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    return (
        <div className={`adsense-container my-8 w-full overflow-hidden text-center ${className || ""}`}>
            {/* Label for clarity */}
            <span className="text-[10px] text-slate-300 uppercase tracking-widest block mb-2">ADVERTISEMENT</span>

            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-2695727848475573"
                data-ad-slot="7932374339"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
}
