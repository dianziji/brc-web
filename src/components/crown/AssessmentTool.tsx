"use client";

import { useMemo, useState } from "react";
import {
  assessmentQuestions,
  bandForScore,
} from "@/content/crown/assessment";
import { crownPageCopy } from "@/content/crown/copy";
import { type Locale, pickLocalizedValue } from "@/lib/i18n";

type AssessmentToolProps = {
  locale: Locale;
};

type Answer = "yes" | "no";

export default function AssessmentTool({ locale }: AssessmentToolProps) {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});

  const answeredCount = Object.keys(answers).length;
  const total = assessmentQuestions.length;
  const complete = answeredCount === total;
  const yesCount = useMemo(
    () => Object.values(answers).filter((value) => value === "yes").length,
    [answers]
  );
  const band = complete ? bandForScore(yesCount) : null;

  const setAnswer = (id: number, value: Answer) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const reset = () => setAnswers({});

  return (
    <div className="space-y-6">
      <p className="text-body-token text-body-color-token">
        {pickLocalizedValue(locale, crownPageCopy.assessmentIntro)}
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-token">
        <span>
          {pickLocalizedValue(locale, crownPageCopy.assessmentProgress)}: {answeredCount} / {total}
        </span>
        <span>
          {pickLocalizedValue(locale, crownPageCopy.assessmentScore)}: {yesCount}
        </span>
      </div>

      <ol className="space-y-3">
        {assessmentQuestions.map((item) => {
          const current = answers[item.id];
          return (
            <li key={item.id} className="card-base bg-surface-b p-4">
              <div className="flex gap-3">
                <span className="text-sm font-semibold text-[var(--accent-strong)]">{item.id}.</span>
                <div className="min-w-0 flex-1">
                  <p className="text-body-token text-heading-token">
                    {pickLocalizedValue(locale, item.question)}
                  </p>
                  <p className="mt-1 text-xs text-muted-token">
                    （{pickLocalizedValue(locale, item.reference)}）
                  </p>
                  <div className="mt-3 flex gap-2">
                    {(["yes", "no"] as const).map((value) => {
                      const active = current === value;
                      const label =
                        value === "yes"
                          ? pickLocalizedValue(locale, crownPageCopy.answerYes)
                          : pickLocalizedValue(locale, crownPageCopy.answerNo);
                      return (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setAnswer(item.id, value)}
                          className={`focus-ring-token min-h-[36px] rounded-full border px-5 py-1.5 text-sm font-semibold transition-colors ${
                            active
                              ? "border-[var(--accent-strong)] bg-[var(--accent-strong)] text-white"
                              : "border-token bg-surface-a text-body-color-token hover:bg-accent-weak"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="card-base bg-stats-token p-5 text-heading-token md:p-6">
        <h3 className="text-h3-token font-semibold">
          {pickLocalizedValue(locale, crownPageCopy.assessmentResultTitle)}
        </h3>
        {band ? (
          <div className="mt-3 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-display-token font-semibold">{yesCount}</span>
              <span className="text-lg font-semibold text-[var(--accent-strong)]">
                {pickLocalizedValue(locale, band.label)}
              </span>
            </div>
            <p className="text-body-token text-dk-title-token">
              {pickLocalizedValue(locale, band.description)}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-body-token text-dk-title-token">
            {pickLocalizedValue(locale, crownPageCopy.assessmentIncomplete)}
          </p>
        )}
        <button
          type="button"
          onClick={reset}
          disabled={answeredCount === 0}
          className="btn-base btn-secondary focus-ring-token mt-4 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pickLocalizedValue(locale, crownPageCopy.assessmentReset)}
        </button>
      </div>
    </div>
  );
}
