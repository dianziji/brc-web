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
      locale === "zh" ? "BRC 网站联系表单" : "BRC Website Contact Form";
    const body = [
      locale === "zh" ? `姓名: ${name}` : `Name: ${name}`,
      locale === "zh" ? `邮箱: ${email}` : `Email: ${email}`,
      "",
      locale === "zh" ? "留言:" : "Message:",
      message,
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form className="bg-white/80 p-6" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <input
          className="w-full border-b bg-transparent px-1 py-2 text-sm focus:outline-none"
          placeholder={namePlaceholder}
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          className="w-full border-b bg-transparent px-1 py-2 text-sm focus:outline-none"
          placeholder={emailPlaceholder}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <textarea
          className="min-h-[120px] w-full border-b bg-transparent px-1 py-2 text-sm focus:outline-none"
          placeholder={messagePlaceholder}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
        <button className="w-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
