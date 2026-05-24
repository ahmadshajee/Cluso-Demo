import Link from "next/link";
import Image from "next/image";
import { flowSteps } from "@/lib/demoData";

export default function FlowPage() {
  const orderSteps = flowSteps.filter((s) => s.phase === "order");
  const reviewSteps = flowSteps.filter((s) => s.phase === "review");
  const reportSteps = flowSteps.filter((s) => s.phase === "report");

  return (
    <div className="flow-page">
      <div className="flow-container">
        <div className="flow-header">
          <div className="flow-logo">
            <Image
              src="/images/cluso-infolink-logo.png"
              alt="Cluso Infolink"
              width={240}
              height={48}
              priority
            />
          </div>
          <h1 className="flow-title">Background Verification Process</h1>
          <p className="flow-subtitle">
            Click any step to see a live demo of that screen
          </p>
        </div>

        {/* ── Order & Submission ── */}
        <div className="section-label">Order &amp; Submission</div>
        <div className="flow-row">
          {orderSteps.map((step, i) => (
            <StepWithArrow key={step.slug} step={step} showArrow={i < orderSteps.length - 1} />
          ))}
        </div>

        {/* ── Review & Verification ── */}
        <div className="section-label">Review &amp; Verification</div>
        <div className="flow-row">
          {reviewSteps.map((step, i) => (
            <StepWithArrow key={step.slug} step={step} showArrow={i < reviewSteps.length - 1} />
          ))}
        </div>

        {/* ── Report & Decision ── */}
        <div className="section-label">Report &amp; Decision</div>
        <div className="flow-row">
          {reportSteps.map((step, i) => (
            <StepWithArrow key={step.slug} step={step} showArrow={i < reportSteps.length - 1} />
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <div className="flow-instruction">
            <span className="flow-instruction-icon">👆</span>
            Click any step above to explore the demo
          </div>
        </div>

        <div className="flow-footer">
          <p>Powered by <strong>Cluso Infolink</strong></p>
        </div>
      </div>
    </div>
  );
}

function StepWithArrow({ step, showArrow }: { step: typeof flowSteps[number]; showArrow: boolean }) {
  return (
    <>
      <Link href={`/demo/${step.slug}`} className="step" aria-label={`View demo: ${step.label}`}>
        <div className={`icon-circle ${step.circleClass} ${step.animationClass}`}>
          {step.emoji}
        </div>
        <div className="step-label">{step.label}</div>
      </Link>
      {showArrow && <div className="arrow">➜</div>}
    </>
  );
}
