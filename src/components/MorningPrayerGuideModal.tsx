"use client";

import { useEffect, useState } from "react";

type MorningPrayerGuide = {
  title: string;
  subtitle: string;
  zoomLinkLabel: string;
  scheduleTitle: string;
  schedule: string[];
  stepsTitle: string;
  steps: string[];
  notesTitle: string;
  notes: string[];
  shareTitle: string;
  shareBody: string;
  shareLinkLabel: string;
  closeLabel: string;
};

type MorningPrayerGuideModalProps = {
  guide: MorningPrayerGuide;
  triggerLabel: string;
  zoomHref: string;
  shareHref: string;
};

export default function MorningPrayerGuideModal({
  guide,
  triggerLabel,
  zoomHref,
  shareHref,
}: MorningPrayerGuideModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="block text-left text-sm font-medium text-zinc-900 underline underline-offset-2"
        onClick={() => setIsOpen(true)}
      >
        {triggerLabel}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            aria-label={guide.closeLabel}
            onClick={() => setIsOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="morning-prayer-guide-title"
            className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 md:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 id="morning-prayer-guide-title" className="text-xl font-semibold text-zinc-900">
                  {guide.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-600">{guide.subtitle}</p>
              </div>
              <button
                type="button"
                className="rounded-md border border-zinc-300 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-50"
                onClick={() => setIsOpen(false)}
              >
                {guide.closeLabel}
              </button>
            </div>

            <div className="space-y-5 text-sm text-zinc-700">
              <div className="rounded-lg bg-zinc-100 p-3">
                <a
                  className="font-semibold text-zinc-900 underline underline-offset-2"
                  href={zoomHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {guide.zoomLinkLabel}
                </a>
                <p className="mt-1 break-all text-xs text-zinc-500">{zoomHref}</p>
              </div>

              <section>
                <p className="font-semibold text-zinc-900">{guide.scheduleTitle}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {guide.schedule.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <p className="font-semibold text-zinc-900">{guide.stepsTitle}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {guide.steps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <p className="font-semibold text-zinc-900">{guide.notesTitle}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {guide.notes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="rounded-lg border border-zinc-200 p-3">
                <p className="font-semibold text-zinc-900">{guide.shareTitle}</p>
                <p className="mt-1 text-zinc-600">{guide.shareBody}</p>
                <a
                  className="mt-2 inline-flex text-sm font-medium text-zinc-900 underline underline-offset-2"
                  href={shareHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {guide.shareLinkLabel}
                </a>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
