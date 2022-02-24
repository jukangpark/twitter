import React, { useState } from "react";
import { dbService } from "../fbase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("저장될 트윗", nweet);
    await dbService.collection("nweets").add({
      nweet,
      createdAt: Date.now(),
    });

    setNweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="what's on your mind?"
        maxLength={120}
        onChange={onChange}
      />
      <input type="submit" value="Nweet" />
    </form>
  );
};

export default Home;
