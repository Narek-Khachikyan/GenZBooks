// src/components/TelegramButton.tsx
import React from "react";
import "./TelegramButton.css";

interface TelegramButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const TelegramButton: React.FC<TelegramButtonProps> = ({
  onClick,
  children,
  disabled = false,
}) => {
  return (
    <button className="telegram-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
