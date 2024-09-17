"use client";

import { useState } from "react";
import LandingPage from "./pages/LandingPage"; // Your landing page component
import ChatPage from "./pages/chat"; // Your chat page component

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Handler for clicking the header in the chat page
  const handleHeaderClick = () => {
    setIsChatOpen(false); // Redirects back to landing page
  };

  return isChatOpen ? (
    <ChatPage onHeaderClick={handleHeaderClick} /> // Pass the handler to ChatPage
  ) : (
    <LandingPage onStartChat={() => setIsChatOpen(true)} />
  );
}
