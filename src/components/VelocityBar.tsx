import styles from "./VelocityBar.module.css";

const METRICS = [
  {
    label: "Arena Energy Density",
    value: "782",
    descriptor: "Optimal band 760-820",
    trend: "+18"
  },
  {
    label: "Queue Health",
    value: "92%",
    descriptor: "Latency 38s • drop-off -12%",
    trend: "+9%"
  },
  {
    label: "Conversion Pulse",
    value: "1.82x",
    descriptor: "vs control cohort baseline",
    trend: "+0.21x"
  },
  {
    label: "Signal Sync",
    value: "87%",
    descriptor: "Mix stability under 72h window",
    trend: "+6%"
  }
];

export function VelocityBar() {
  return (
    <section className={styles.wrapper} aria-label="Arena momentum metrics">
      {METRICS.map((metric) => (
        <article key={metric.label} className={styles.card}>
          <header>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </header>
          <p>{metric.descriptor}</p>
          <footer>{metric.trend}</footer>
        </article>
      ))}
    </section>
  );
}
