import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Board from '@/components/Board';
import Accordion from '@/components/Accordion';

const inter = Inter({ subsets: ['latin'] });

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

        <div>
          <Accordion title="How to Play">
            <p>
              This version of Battleship will be for a single player. You have 20 turns to sink all 3 ships. There are 2 Destroyers with a length of 2 cells and 1 battleship with a length of 4 cells. Each time you hit correctly you will gain a life. Otherwise once you hit 0 lives left, you will automatically lose. If you do sink all the ships, you will be declared a winner. 
            </p>
            <ul>
              <li>Click on the cell</li>
              <li>
                A cell will turn{' '}
                <span style={{ color: 'gray', fontWeight: 'bold' }}>gray</span>{' '}
                if you MISSED
              </li>
              <li>
                A cell will turn{' '}
                <span style={{ color: 'yellow', fontWeight: 'bold' }}>
                  yellow
                </span>{' '}
                if you HIT a destroyer ship
              </li>
              <li>
                A cell will return{' '}
                <span style={{ color: 'red', fontWeight: 'bold' }}>red</span> if
                you <b>HIT</b> a battleship
              </li>
              <li>
                If all ships are sunk, the game will end and you will be
                declared a <b>WINNER</b>
              </li>
              <li>
                If a ship is entirely sunk, you will get <b>SUNK</b> back as a
                result
              </li>
            </ul>
          </Accordion>
        </div>
      </main>
    </>
  );
}
