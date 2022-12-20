import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { RiExternalLinkLine } from "react-icons/ri";


export async function getStaticProps() {
  const baseUrl = process.env.BASE_URL_API;
  const res = await fetch(`${baseUrl}/links/`);
  const links = await res.json();
  return {
      props: {
          links
      }
  };
}

export default function Home({ links }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Butterfy</title>
        <meta name="description" content="Generated by butterfy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Butterfy</h1>
        <div className="button">
          <Link href="/signin">
            <button>Login</button>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div>
          Butterfy is a collection of insightful content, sourced and curated by the people.<br></br>
          <Link href="/about">Read more</Link>
        </div>

        <div className="break"><hr/></div>

        <div id="results">{links.total} results</div>

        <div className={styles.grid}>
        {
          links.links.map( ({title, link, username, image}, i) => {
            const url = (new URL(link));
            const domain = url.hostname.replace('www.','');

            //PAR OR IMPAR
            if ((i % 2) == 0) {
              return (
                <div className={styles.card}>
                  <div className={styles.cardText}>
                    <h2>{title}</h2>
                    <p>Submitted by @{username}</p>
                    <p>
                      <a target="_blank" href={link} rel="noopener noreferrer">
                        {domain}<RiExternalLinkLine />
                      </a>
                    </p>
                  </div>
                  <div className={styles.cardImage}>
                    <img src='https://i.picsum.photos/id/599/200/200.jpg?hmac=2WLKs3sxIsaEQ-6WZaa6YMxgl6ZC4cNnid0aqupm2is'></img>
                  </div>
                </div>
              )
            } else {
              return (
                <div className={styles.card}>
                  <div className={styles.cardText}>
                    <h2>{title}</h2>
                    <p>Submitted by @{username}</p>
                    <p>
                      <a target="_blank" href={link} rel="noopener noreferrer">
                        {domain}<RiExternalLinkLine />
                      </a>
                    </p>
                  </div>
                </div>
              )
            }
          })
        }
        </div>
      </main>

    </div>
  );
}
