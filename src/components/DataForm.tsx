// src/components/DataForm.tsx
import React, { useState } from "react";
import { useTelegram } from "../hooks/useTelegram";
import { TelegramButton } from "./TelegramButton";

export const DataForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { tg } = useTelegram();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Отправляем данные обратно в Telegram бот
    const data = JSON.stringify(formData);
    tg?.sendData(data);

    // Альтернативно, можно использовать WebApp.openTelegramLink для перехода к боту
    // const botUsername = 'your_bot_username';
    // const text = `Имя: ${formData.name}\nEmail: ${formData.email}\nСообщение: ${formData.message}`;
    // const encodedText = encodeURIComponent(text);
    // tg?.openTelegramLink(`https://t.me/${botUsername}?start=${encodedText}`);
  };

  return (
    <form className="data-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Имя</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Сообщение</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <TelegramButton onClick={() => {}} disabled={false}>
        Отправить
      </TelegramButton>
    </form>
  );
};
