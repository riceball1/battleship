import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Board from "@/components/Board";
import Accordion from "@/components/Accordion";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Battleship</title>
        <meta
          name="description"
          content="A simple nextjs app to play the game battleship"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Battleship</h1>
        <Board />
        <button className={styles.resetButton}>Reset</button>

        <div>
          <Accordion title="How to Play">
            <ul>
              <li>Click on the cell</li>
              <li>A cell will turn grey if you MISSED</li>
              <li>A cell will turn yellow if you HIT a destroyer ship</li>
              <li>A cell will return red if you HIT a battleship</li>
              <li>
                If all ships are sunk, the game will end and you will be
                declared a WINNER
              </li>
              <li>
                If a ship is entirely sunk, you will get SUNK back as a result
              </li>
            </ul>
          </Accordion>
        </div>
      </main>
    </>
  );
}
