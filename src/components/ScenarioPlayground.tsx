"use client";

import { useMemo, useState } from "react";
import styles from "./ScenarioPlayground.module.css";

type ScenarioKey = "launch" | "reengage" | "crosspromo";

const SCENARIOS: Record<
  ScenarioKey,
  {
    title: string;
    description: string;
    metrics: { label: string; value: string; delta: number }[];
    levers: { label: string; impact: number; unlocked: boolean }[];
    recommendations: string[];
  }
> = {
  launch: {
    title: "Soft Launch Arena",
    description:
      "Validate PvP energy density and early conversion lift by pairing high-voltage segments with limited-time mastery ladders.",
    metrics: [
      { label: "Projected D7 ROAS", value: "118%", delta: 0.14 },
      { label: "Match Momentum", value: "87", delta: 0.09 },
      { label: "Retention Uplift", value: "+6.4 pts", delta: 0.064 }
    ],
    levers: [
      { label: "Clan Raid Relay", impact: 0.24, unlocked: true },
      { label: "Adaptive Coaching Flows", impact: 0.17, unlocked: true },
      { label: "Skins Meta Drop", impact: 0.11, unlocked: false }
    ],
    recommendations: [
      "Launch 3-hour arena surge windows to compress Blitz-Core energy into shared matchmaking.",
      "Pair mastery ladders with dynamic lobby signage to surface momentum states in under 2 seconds.",
      "Gate cosmetics behind squad milestones for higher social diffusion velocity."
    ]
  },
  reengage: {
    title: "Lapsed Re-engage Pulse",
    description:
      "Win back midcore optimizers by broadcasting meta shifts and layering comeback accelerators on loss streaks.",
    metrics: [
      { label: "Projected Reactivation", value: "42%", delta: 0.18 },
      { label: "Cost per Winback", value: "$1.44", delta: -0.14 },
      { label: "Session Depth", value: "3.1 matches", delta: 0.22 }
    ],
    levers: [
      { label: "Meta Briefings Push", impact: 0.28, unlocked: true },
      { label: "Re-entry Boost Tokens", impact: 0.2, unlocked: true },
      { label: "Dynamic Rival Nudges", impact: 0.12, unlocked: false }
    ],
    recommendations: [
      "Schedule briefing drops when queue latency dips below 35s to highlight refreshed metas.",
      "Stack comeback accelerators on match losses 2 and 3 to sustain emotional recovery loops.",
      "Deploy highlight reels for past clan wars to reignite rivalry threads."
    ]
  },
  crosspromo: {
    title: "Cross-Promo Arena Bridge",
    description:
      "Convert raid veterans into arena loyalists by sequencing hero mastery, duel showcases, and spectator gifting.",
    metrics: [
      { label: "Arena Adoption", value: "31%", delta: 0.15 },
      { label: "Guild Flight Completion", value: "67%", delta: 0.11 },
      { label: "Spectator Monetization", value: "$0.78 ARPPU", delta: 0.29 }
    ],
    levers: [
      { label: "Hero POV Showcases", impact: 0.26, unlocked: true },
      { label: "Spectator Gift Loop", impact: 0.19, unlocked: true },
      { label: "Arena Draft Token", impact: 0.13, unlocked: true }
    ],
    recommendations: [
      "Auto-provision duel highlight reels straight into raid guild hubs to spark cross-mode curiosity.",
      "Introduce gifting nodes during spectator mode to capture non-combat spend.",
      "Sequence hero mastery quests with arena drafts to accelerate comprehension."
    ]
  }
};

const scenarioEntries = Object.entries(SCENARIOS) as [ScenarioKey, (typeof SCENARIOS)[ScenarioKey]][];

export function ScenarioPlayground() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("launch");

  const data = useMemo(() => SCENARIOS[scenarioKey], [scenarioKey]);

  return (
    <section className={`panel ${styles.wrapper}`} aria-labelledby="scenario-playground-heading">
      <header className={styles.header}>
        <div className="chip">
          <span>Scenario Lab</span>
        </div>
        <h2 id="scenario-playground-heading">Activation Scenario Playground</h2>
        <p>
          Toggle focus scenarios to stress test conversion curves, energy retention, and target overlays
          without leaving the session.
        </p>
      </header>

      <div className={styles.toggleRow}>
        {scenarioEntries.map(([key, scenario]) => (
          <button
            key={key}
            type="button"
            onClick={() => setScenarioKey(key)}
            className={`${styles.toggle} ${scenarioKey === key ? styles.toggleActive : ""}`}
          >
            <span>{scenario.title}</span>
          </button>
        ))}
      </div>

      <div className={styles.body}>
        <article className={styles.summary}>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
          <ul className={styles.metrics}>
            {data.metrics.map((metric) => (
              <li key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <small className={metric.delta >= 0 ? styles.deltaPositive : styles.deltaNegative}>
                  {metric.delta >= 0 ? "▲" : "▼"} {(Math.abs(metric.delta) * 100).toFixed(0)}%
                </small>
              </li>
            ))}
          </ul>
        </article>
        <aside className={styles.leversPanel}>
          <h4>Impact Levers</h4>
          <ul>
            {data.levers.map((lever) => (
              <li key={lever.label} className={lever.unlocked ? styles.leverActive : styles.lever}>
                <div className={styles.leverHeader}>
                  <span>{lever.label}</span>
                  <span className={styles.leverImpact}>{Math.round(lever.impact * 100)}%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={`${styles.progressFill} ${
                      lever.unlocked ? styles.progressUnlocked : styles.progressLocked
                    }`}
                    style={{ width: `${Math.round(lever.impact * 100)}%` }}
                  />
                </div>
                <span className={styles.leverState}>{lever.unlocked ? "Unlocked" : "Pending"}</span>
              </li>
            ))}
          </ul>
        </aside>
        <aside className={styles.recommendations}>
          <h4>Activation Moves</h4>
          <ol>
            {data.recommendations.map((tip, index) => (
              <li key={tip}>
                <span className={styles.tipIndex}>{index + 1}</span>
                <p>{tip}</p>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
