import styles from "../app/page.module.css";

export function Hero() {
  return (
    <section className={styles.header}>
      <div className={styles.heroAccent}>
        <span>Test Mobile Arena Targeting</span>
      </div>
      <h1 className={styles.headline}>
        Run arena targeting scenarios, stress test signal mixes, and deploy with conviction.
      </h1>
      <p className={styles.subtitle}>
        Arena Targeting Lab is a focused command center for mobile arena strategists. Model personas, tune
        signal weightings, and align activation channels in a single workspace ready for launch reviews.
      </p>
      <div className={styles.ctaRow}>
        <button type="button" className={styles.ctaPrimary}>
          Generate Launch Blueprint
        </button>
        <button type="button" className={styles.ctaSecondary}>
          Import Existing Arena Data
        </button>
      </div>
    </section>
  );
}
