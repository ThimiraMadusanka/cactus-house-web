"use client";

import { useEffect } from "react";

export default function ClientSession({ children }: { children: React.ReactNode }) {
  const generateSessionId = (): string => {
    // Check crypto.randomUUID is supported and use it
    if (typeof crypto?.randomUUID === "function") {
      return crypto.randomUUID();
    }

    // Otherwise generate without crypto.randomUUID
    return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  }

  useEffect(() => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem("sessionId", sessionId);
      console.log("New sessionId created:", sessionId);
    } else {
      console.log("Existing sessionId:", sessionId);
    }
  }, []);

  return <>{children}</>;
}
