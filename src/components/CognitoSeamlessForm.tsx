"use client";

import { useEffect, useRef } from "react";

type CognitoSeamlessFormProps = {
  dataKey: string;
  form: string;
};

export default function CognitoSeamlessForm({ dataKey, form }: CognitoSeamlessFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://www.cognitoforms.com/f/seamless.js";
    script.dataset.key = dataKey;
    script.dataset.form = form;
    script.async = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [dataKey, form]);

  return (
    <div className="min-h-[640px]" ref={containerRef}>
      <p className="text-body-token text-body-color-token">Loading form...</p>
    </div>
  );
}
