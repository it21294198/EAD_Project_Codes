import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <main>
        <Button variant="primary">Primary</Button>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
