"use client";

import { useMemo, useState } from "react";
import styles from "./PersonaMatrix.module.css";

type Persona = {
  id: string;
  label: string;
  energy: number;
  spendRating: number;
  tacticFit: number;
  topSignals: string[];
  friction: string;
  sampleNarrative: string;
};

const PERSONAS: Persona[] = [
  {
    id: "blitz-core",
    label: "Blitz Core",
    energy: 88,
    spendRating: 72,
    tacticFit: 94,
    topSignals: ["Session streak > 4", "PvP win ratio > 58%", "Custom skins owned ≥ 3"],
    friction: "Needs fresh PvP loops every 72h or churn probability spikes 24%.",
    sampleNarrative:
      "Squad-first players who treat every arena drop as a tournament run. They binge during clan events."
  },
  {
    id: "midcore-optimizers",
    label: "Midcore Optimizers",
    energy: 73,
    spendRating: 64,
    tacticFit: 81,
    topSignals: ["Build lab engagements", "Loadout swaps mid-match", "Social squad chat > 6 msg/day"],
    friction: "Slow content drops push them toward competitors with deeper build labs.",
    sampleNarrative:
      "Systems thinkers who experiment with meta builds nightly. They convert fastest with mastery ladders."
  },
  {
    id: "express-rivals",
    label: "Express Rivals",
    energy: 61,
    spendRating: 51,
    tacticFit: 69,
    topSignals: ["90-day ARPDAU uplift on narrative beats", "Quick-match queues", "Frequent hero swaps"],
    friction: "Queue friction > 68s kills motivation. They need instant rivalries and push alerts.",
    sampleNarrative:
      "Commuter warriors running matches between real-world stops. Micro-commitments drive their spend."
  },
  {
    id: "arena-prospectors",
    label: "Arena Prospectors",
    energy: 48,
    spendRating: 44,
    tacticFit: 57,
    topSignals: ["Feature discovery taps", "Tutorial completion rate", "Cosmetic wishlist events"],
    friction: "Lose clarity in the first 2 sessions. Without mastery scaffolding they bounce.",
    sampleNarrative:
      "New entrants testing tactical arenas after raid fatigue. They respond to coaching moments."
  }
];

const energyDescriptions = [
  "High-octane, session-anchored competitors. Prioritize clan-based hooks.",
  "Calculated midcore planners responsive to mastery ladders.",
  "Rhythmic drop-in rivals who orbit daily mobility moments.",
  "Early funnel explorers that need guided frictionless onboarding."
];

const BUBBLE_SCALE = 28;

export function PersonaMatrix() {
  const [activeId, setActiveId] = useState<string>(PERSONAS[0]?.id ?? "");

  const activePersona = useMemo(
    () => PERSONAS.find((persona) => persona.id === activeId) ?? PERSONAS[0],
    [activeId]
  );

  return (
    <section className="panel" aria-labelledby="persona-matrix-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className="chip">
            <span>Persona Fit</span>
          </div>
          <h2 id="persona-matrix-heading">Mobile Arena Persona Matrix</h2>
          <p>
            Segment strength plotted by arena energy vs monetization depth. Tap a bubble to surface the
            brief and activation levers.
          </p>
        </header>
        <div className={styles.matrix}>
          <div className={styles.axisLabelX}>Spend Depth →</div>
          <div className={styles.axisLabelY}>↑ Arena Energy</div>
          <div className={styles.grid}>
            {PERSONAS.map((persona, index) => {
              const bubbleSize = Math.max(38, persona.tacticFit / 100 * BUBBLE_SCALE + 42);
              const positionStyles = {
                top: `${100 - persona.energy}%`,
                left: `${persona.spendRating}%`,
                width: `${bubbleSize}px`,
                height: `${bubbleSize}px`
              };

              return (
                <button
                  type="button"
                  key={persona.id}
                  className={`${styles.bubble} ${
                    persona.id === activePersona.id ? styles.bubbleActive : ""
                  }`}
                  style={positionStyles}
                  onClick={() => setActiveId(persona.id)}
                  aria-pressed={persona.id === activePersona.id}
                >
                  <span>{persona.label}</span>
                  <span className={styles.bubbleIndex}>{index + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
        <aside className={styles.sidePanel}>
          <h3>{activePersona.label}</h3>
          <ul className={styles.metrics}>
            <li>
              <span>Energy Index</span>
              <strong>{activePersona.energy}</strong>
            </li>
            <li>
              <span>Spend Rating</span>
              <strong>{activePersona.spendRating}</strong>
            </li>
            <li>
              <span>Tactic Fit</span>
              <strong>{activePersona.tacticFit}</strong>
            </li>
          </ul>
          <div className={styles.narrative}>
            <p>{activePersona.sampleNarrative}</p>
          </div>
          <div className={styles.friction}>
            <span>Friction Alert</span>
            <p>{activePersona.friction}</p>
          </div>
          <div className={styles.signals}>
            <span>Top Signals</span>
            <ul>
              {activePersona.topSignals.map((signal) => (
                <li key={`${activePersona.id}-${signal}`}>{signal}</li>
              ))}
            </ul>
          </div>
          <div className={styles.energyNote}>
            <span>Energy Guidance</span>
            <p>{energyDescriptions[PERSONAS.indexOf(activePersona)]}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
