import { useEffect, useCallback } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  // Add other user properties as needed
}

interface TelegramMainButton {
  isVisible: boolean;
  setText: (text: string) => void;
  show: () => void;
  hide: () => void;
  onClick: (callback: () => void) => void;
}

interface TelegramWebApp {
  close: () => void;
  ready: () => void;
  MainButton: TelegramMainButton;
  initDataUnsafe?: {
    query_id: string;
    user: TelegramUser;
    // Add other properties if needed
  };
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export function useTelegram() {
  const tg = window.Telegram?.WebApp;

  const onClose = useCallback(() => {
    tg?.close();
  }, [tg]);

  const onToggleButton = useCallback(
    (text: string, callback: () => void) => {
      if (tg) {
        if (!tg.MainButton.isVisible) {
          tg.MainButton.setText(text);
          tg.MainButton.show();
          tg.MainButton.onClick(callback);
        } else {
          tg.MainButton.hide();
        }
      }
    },
    [tg]
  );

  useEffect(() => {
    // Сообщаем Telegram, что приложение готово
    tg?.ready();
  }, [tg]);

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initDataUnsafe?.query_id,
    onClose,
    onToggleButton,
  };
}
