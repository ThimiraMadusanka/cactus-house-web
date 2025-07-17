"use client";

import { useEffect } from "react";

export default function ClientSession({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
      console.log("New sessionId created:", sessionId);
    } else {
      console.log("Existing sessionId:", sessionId);
    }
  }, []);

  return <>{children}</>;
}
