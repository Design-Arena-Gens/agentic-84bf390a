"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ChannelHeatmap.module.css";

type Channel = {
  id: string;
  label: string;
  reach: number;
  velocity: number;
  quality: number;
};

const CHANNELS: Channel[] = [
  { id: "tik-tactical", label: "TikTactical Live", reach: 81, velocity: 92, quality: 68 },
  { id: "meta-rivals", label: "Meta Rivals Lookalike", reach: 76, velocity: 65, quality: 82 },
  { id: "store-editorial", label: "Store Editorial Placement", reach: 54, velocity: 48, quality: 91 },
  { id: "twitch-arena", label: "Twitch Arena Draft", reach: 63, velocity: 74, quality: 79 },
  { id: "discord-drop", label: "Discord Drop Pod", reach: 46, velocity: 58, quality: 84 },
  { id: "sms-burst", label: "SMS Burst Windows", reach: 38, velocity: 83, quality: 61 }
];

const ROLLING_WINDOWS = [
  { label: "24h", multiplier: 0.54 },
  { label: "72h", multiplier: 0.86 },
  { label: "7d", multiplier: 1 }
];

function computeScore(channel: Channel, windowMultiplier: number) {
  return Math.round(
    (channel.reach * 0.42 + channel.velocity * 0.35 + channel.quality * 0.46) * windowMultiplier
  );
}

export function ChannelHeatmap() {
  const [windowIndex, setWindowIndex] = useState(1);
  const [activeChannels, setActiveChannels] = useState(() => new Set(CHANNELS.map((c) => c.id)));

  const multiplier = useMemo(() => ROLLING_WINDOWS[windowIndex]?.multiplier ?? 1, [windowIndex]);

  const sortedChannels = useMemo(() => {
    return [...CHANNELS]
      .map((channel) => ({
        ...channel,
        score: computeScore(channel, multiplier)
      }))
      .sort((a, b) => b.score - a.score);
  }, [multiplier]);

  const aggregateScore = useMemo(() => {
    const selected = sortedChannels.filter((channel) => activeChannels.has(channel.id));
    if (selected.length === 0) return 0;
    const sum = selected.reduce((acc, channel) => acc + channel.score, 0);
    return Math.round(sum / selected.length);
  }, [activeChannels, sortedChannels]);

  useEffect(() => {
    setActiveChannels(new Set(CHANNELS.map((channel) => channel.id)));
  }, []);

  const handleToggle = (id: string) => {
    setActiveChannels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className={`panel ${styles.wrapper}`} aria-labelledby="channel-heatmap-heading">
      <header className={styles.header}>
        <div className="chip">
          <span>Arena Channels</span>
        </div>
        <h2 id="channel-heatmap-heading">Channel Momentum Heatmap</h2>
        <p>
          Activate the channels that accelerate arena targeting momentum. Choose an aggregation window to
          watch velocity spillover.
        </p>
      </header>

      <div className={styles.controls}>
        <div className={styles.window}>
          {ROLLING_WINDOWS.map((window, index) => (
            <button
              type="button"
              key={window.label}
              className={`${styles.windowButton} ${windowIndex === index ? styles.windowActive : ""}`}
              onClick={() => setWindowIndex(index)}
            >
              {window.label}
            </button>
          ))}
        </div>
        <div className={styles.aggregate}>
          <span>Momentum Score</span>
          <strong>{aggregateScore}</strong>
        </div>
      </div>

      <div className={styles.grid}>
        {sortedChannels.map((channel) => {
          const isActive = activeChannels.has(channel.id);
          return (
            <button
              key={channel.id}
              type="button"
              className={`${styles.card} ${isActive ? styles.cardActive : styles.cardInactive}`}
              onClick={() => handleToggle(channel.id)}
            >
              <header>
                <h3>{channel.label}</h3>
                <span>{channel.score}</span>
              </header>
              <dl>
                <div>
                  <dt>Reach</dt>
                  <dd>{channel.reach}</dd>
                </div>
                <div>
                  <dt>Velocity</dt>
                  <dd>{channel.velocity}</dd>
                </div>
                <div>
                  <dt>Quality</dt>
                  <dd>{channel.quality}</dd>
                </div>
              </dl>
              <footer>{isActive ? "Included in blend" : "Muted"}</footer>
            </button>
          );
        })}
      </div>
    </section>
  );
}
