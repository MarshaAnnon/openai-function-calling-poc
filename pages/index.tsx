import Head from "next/head";
import React, { useState } from "react";
import styles from "./index.module.css";


export default function Home() {
  const [songItem, setSongItem] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: songItem }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setSongItem(songItem);
      console.log("todo item is: ", songItem)
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Function Calling Test</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Enter the name of a song</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="todo"
            placeholder="Enter a song"
            value={songItem}
            onChange={(e) => setSongItem(e.target.value)}
          />
          <input type="submit" value="Song Lyrics" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}