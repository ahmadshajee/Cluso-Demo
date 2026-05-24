"use client";

import { Info } from "lucide-react";

export type CalloutItem = {
  /** Short label for the callout */
  title: string;
  /** Longer description */
  text: string;
  /** Arrow direction — which way the arrow points FROM the callout */
  arrow?: "down" | "up" | "left" | "right" | "none";
};

type Props = {
  items: CalloutItem[];
};

/**
 * DemoCallout — renders a styled annotation bar that explains
 * what the user is seeing on this demo page.
 * Each callout has a title, description, and an optional CSS arrow
 * pointing toward the relevant UI section below/above.
 */
export function DemoCallout({ items }: Props) {
  if (!items.length) return null;

  return (
    <div className="demo-callout-bar">
      <div className="demo-callout-bar-header">
        <Info size={15} />
        <span>What you&apos;re seeing on this page</span>
      </div>
      <div className="demo-callout-items">
        {items.map((item, i) => (
          <div
            key={i}
            className={`demo-callout-item ${item.arrow && item.arrow !== "none" ? `demo-callout-arrow-${item.arrow}` : ""}`}
          >
            <strong className="demo-callout-title">{item.title}</strong>
            <span className="demo-callout-text">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
