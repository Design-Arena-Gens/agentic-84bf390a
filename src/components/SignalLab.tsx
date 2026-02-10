"use client";

import { useMemo, useState } from "react";
import styles from "./SignalLab.module.css";

type SignalKey = "engagement" | "economy" | "social" | "skill";

type SignalConfig = {
  label: string;
  description: string;
  weight: number;
  variant: "pulse" | "burst" | "steady";
};

const SIGNALS: Record<SignalKey, SignalConfig> = {
  engagement: {
    label: "Session Velocity",
    weight: 0.32,
    description: "Tracks match cadence, streak stability, and queue fatigue across target cohorts.",
    variant: "pulse"
  },
  economy: {
    label: "Arena Economy",
    weight: 0.26,
    description: "Measures spend depth, cosmetic churn, and gift conversion by segment mix.",
    variant: "steady"
  },
  social: {
    label: "Squad Signals",
    weight: 0.22,
    description: "Captures clan rally points, social shares, and rivalry density in daily loops.",
    variant: "burst"
  },
  skill: {
    label: "Skill Gradient",
    weight: 0.2,
    description: "Evaluates tooling friction, mastery onboarding, and loss recovery moments.",
    variant: "pulse"
  }
};

const variantCopy: Record<SignalConfig["variant"], string> = {
  pulse: "Stabilize peaks while preserving pace for Blitz Core consistency.",
  burst: "Channel into timed drops to amplify virality and hype spikes.",
  steady: "Dial in gradually with economic safeguards to prevent inflation."
};

export function SignalLab() {
  const [weights, setWeights] = useState<Record<SignalKey, number>>({
    engagement: 0.32,
    economy: 0.26,
    social: 0.22,
    skill: 0.2
  });

  const totalWeight = useMemo(
    () => Object.values(weights).reduce((acc, value) => acc + value, 0),
    [weights]
  );

  const pressureIndex = useMemo(() => {
    const balance = Math.abs(totalWeight - 1);
    const burst = weights.social + weights.engagement * 0.6;
    const economyGuard = weights.economy * 0.4 + weights.skill * 0.3;
    return Math.min(100, Math.round((burst * 120 + economyGuard * 70 - balance * 90) * 10));
  }, [totalWeight, weights]);

  const coveragePlane = useMemo(() => {
    const energy = weights.engagement * 0.55 + weights.social * 0.4 + weights.skill * 0.25;
    const monetization = weights.economy * 0.7 + weights.social * 0.2 + weights.engagement * 0.15;
    const retention = weights.skill * 0.5 + weights.engagement * 0.4 + weights.economy * 0.3;
    return {
      energy: Math.round(energy * 180),
      monetization: Math.round(monetization * 190),
      retention: Math.round(retention * 210)
    };
  }, [weights]);

  const handleWeightChange = (key: SignalKey, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value / 100 }));
  };

  return (
    <section className={`panel ${styles.wrapper}`} aria-labelledby="signal-lab-heading">
      <header className={styles.header}>
        <div className="chip">
          <span>Signal Mixer</span>
        </div>
        <h2 id="signal-lab-heading">Intent Signal Lab</h2>
        <p>
          Rebalance signal weights to synthesize launch pressure. Watch how persona coverage shifts across
          energy, monetization, and retention surfaces.
        </p>
      </header>

      <div className={styles.content}>
        <div className={styles.controls}>
          {Object.entries(SIGNALS).map(([key, signal]) => {
            const typedKey = key as SignalKey;
            const weight = Math.round(weights[typedKey] * 100);
            return (
              <div key={signal.label} className={styles.control}>
                <div className={styles.controlHeader}>
                  <span>{signal.label}</span>
                  <span className={styles.weight}>{weight}%</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={45}
                  value={weight}
                  onChange={(event) => handleWeightChange(typedKey, Number(event.target.value))}
                />
                <p>{signal.description}</p>
                <div className={styles.variant}>
                  <span>{signal.variant.toUpperCase()}</span>
                  <p>{variantCopy[signal.variant]}</p>
                </div>
              </div>
            );
          })}
        </div>

        <aside className={styles.readout}>
          <div className={styles.readoutHeader}>
            <h3>Coverage Summary</h3>
            <span>Total weight {Math.round(totalWeight * 100)}%</span>
          </div>
          <ul className={styles.readoutStats}>
            <li>
              <span>Pressure Index</span>
              <strong>{pressureIndex}</strong>
              <small>Ideal band: 720-820</small>
            </li>
            <li>
              <span>Energy Coverage</span>
              <strong>{coveragePlane.energy}</strong>
              <small>driven by Blitz Core overlap</small>
            </li>
            <li>
              <span>Monetization Coverage</span>
              <strong>{coveragePlane.monetization}</strong>
              <small>economy safeguards engaged</small>
            </li>
            <li>
              <span>Retention Coverage</span>
              <strong>{coveragePlane.retention}</strong>
              <small>skill ramp buffering churn risk</small>
            </li>
          </ul>
          <footer className={styles.readoutFooter}>
            <p>
              Apply when pressure index lands between 760-820. Above 850, stage a controlled drop to prevent
              queue inflation for Express Rivals.
            </p>
          </footer>
        </aside>
      </div>
    </section>
  );
}
