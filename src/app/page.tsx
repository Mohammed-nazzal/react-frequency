import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/LaunchScreen.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>

        <div className={styles.pagecard}>
          <Link href="/analyzer">Real Time Frequency Analyzer</Link>
        </div>
        <div className={styles.pagecard}>
          <Link href="/rangeanalyzer">Range Analyzer</Link>
        </div>
      </div>
    </main>
  );
}
