// src/App.tsx (обновленный)
import { useEffect, useState } from "react";
import "./App.css";
import { useTelegram } from "./hooks/useTelegram";
import { DataForm } from "./components/DataForm";
import { TelegramButton } from "./components/TelegramButton";

function App() {
  const { tg, user, onToggleButton } = useTelegram();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      const newBgColor = tg?.themeParams.bg_color ?? "#ffffff";
      document.body.style.backgroundColor = newBgColor;
      setIsDarkTheme(tg?.themeParams.text_color === "#ffffff");
    };
    // Устанавливаем цвет фона в соответствии с темой Telegram
    if (tg?.themeParams?.bg_color) {
      document.body.style.backgroundColor = tg.themeParams.bg_color;
      setIsDarkTheme(tg.themeParams.text_color === "#ffffff");
    }

    // Подписываемся на изменение темы
    tg?.onEvent("themeChanged", () => {
      document.body.style.backgroundColor =
        tg.themeParams.bg_color ?? "#ffffff";
      setIsDarkTheme(tg.themeParams.text_color === "#ffffff");
    });

    // Настраиваем MainButton
    onToggleButton("Отправить форму", () => {
      setShowForm(true);
    });

    return () => {
      // Отписываемся от события при размонтировании
      tg?.offEvent("themeChanged", handleThemeChange);
    };
  }, [tg, onToggleButton]);

  return (
    <div className={`App ${isDarkTheme ? "dark" : "light"}`}>
      <header className="App-header">
        <h1>Telegram Mini App</h1>
        {user && (
          <div className="user-info">
            <p>Привет, {user.first_name}!</p>
            {user.username && <p>@{user.username}</p>}
          </div>
        )}
      </header>
      <main>
        {!showForm ? (
          <>
            <p>Это ваше первое Telegram Mini App!</p>
            <TelegramButton onClick={() => setShowForm(true)}>
              Показать форму
            </TelegramButton>
          </>
        ) : (
          <>
            <TelegramButton onClick={() => setShowForm(false)}>
              Назад
            </TelegramButton>
            <DataForm />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
