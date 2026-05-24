"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { flowSteps, getStepIndex, getPrevStep, getNextStep, getPhaseLabel } from "@/lib/demoData";

type Props = {
  currentSlug: string;
};

export function DemoStepIndicator({ currentSlug }: Props) {
  const idx = getStepIndex(currentSlug);
  const current = flowSteps[idx];
  const prev = getPrevStep(currentSlug);
  const next = getNextStep(currentSlug);

  if (!current) return null;

  return (
    <div className="demo-step-indicator">
      <div className="demo-step-indicator-left">
        <Link href="/" className="demo-back-btn" aria-label="Back to flow">
          <ArrowLeft size={15} />
          <span>Back to Flow</span>
        </Link>
        <div className="demo-step-info">
          <span className="demo-step-phase">{getPhaseLabel(current.phase)}</span>
          <span className="demo-step-current">
            <span className="demo-step-emoji">{current.emoji}</span>
            {current.label}
          </span>
        </div>
      </div>

      <div className="demo-step-indicator-center">
        <div className="demo-progress-bar">
          {flowSteps.map((step, i) => (
            <Link
              key={step.slug}
              href={`/demo/${step.slug}`}
              className={`demo-progress-dot ${i === idx ? "active" : ""} ${i < idx ? "completed" : ""}`}
              title={step.label}
              aria-label={step.label}
            />
          ))}
        </div>
        <span className="demo-step-count">Step {idx + 1} of {flowSteps.length}</span>
      </div>

      <div className="demo-step-indicator-right">
        {prev ? (
          <Link href={`/demo/${prev.slug}`} className="demo-nav-btn" aria-label={`Previous: ${prev.label}`}>
            <ArrowLeft size={15} />
            <span className="demo-nav-label">{prev.label}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/demo/${next.slug}`} className="demo-nav-btn demo-nav-btn-next" aria-label={`Next: ${next.label}`}>
            <span className="demo-nav-label">{next.label}</span>
            <ArrowRight size={15} />
          </Link>
        ) : (
          <Link href="/" className="demo-nav-btn demo-nav-btn-next" aria-label="Back to flow">
            <span className="demo-nav-label">Finish</span>
            <ArrowRight size={15} />
          </Link>
        )}
      </div>
    </div>
  );
}
