"use client";

import { FormEvent, useState } from "react";
import type { Locale } from "@/lib/i18n";

type HomeContactFormProps = {
  locale: Locale;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
};

const CONTACT_EMAIL = "info@bethelrc.org";

export default function HomeContactForm({
  locale,
  namePlaceholder,
  emailPlaceholder,
  messagePlaceholder,
  submitLabel,
}: HomeContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject =
      locale === "zh" ? "BRC 網站聯繫表單" : "BRC Website Contact Form";
    const body = [
      locale === "zh" ? `姓名: ${name}` : `Name: ${name}`,
      locale === "zh" ? `郵箱: ${email}` : `Email: ${email}`,
      "",
      locale === "zh" ? "留言:" : "Message:",
      message,
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form className="card-base p-6" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <input
          className="form-field-line"
          placeholder={namePlaceholder}
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          className="form-field-line"
          placeholder={emailPlaceholder}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <textarea
          className="form-field-line min-h-[120px]"
          placeholder={messagePlaceholder}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
        <button className="btn-base btn-primary focus-ring-token w-full" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
