import styles from "./page.module.css";
import { ChannelHeatmap } from "@/components/ChannelHeatmap";
import { Hero } from "@/components/Hero";
import { PersonaMatrix } from "@/components/PersonaMatrix";
import { ScenarioPlayground } from "@/components/ScenarioPlayground";
import { SignalLab } from "@/components/SignalLab";
import { VelocityBar } from "@/components/VelocityBar";

export default function Page() {
  return (
    <main className={styles.page}>
      <Hero />
      <VelocityBar />
      <div className={styles.gridStretch}>
        <PersonaMatrix />
        <SignalLab />
      </div>
      <ScenarioPlayground />
      <ChannelHeatmap />
    </main>
  );
}
