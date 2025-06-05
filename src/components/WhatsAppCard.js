import React from "react";
import "./WhatsAppCard.css";

export default function WhatsAppCard({ title, children }) {
  return (
    <div className="wa-card-container">
      <div className="wa-card">
        <h2 className="wa-card-title">{title}</h2>
        <div className="wa-card-content">{children}</div>
      </div>
    </div>
  );
}
