import React, { useeff } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import { useContext, useEffect, useState } from "react";
import QuoteCard from "../../components/quotecard/QuoteCard";
import "./Home.css";

export default function Home() {
  const { token, setToken } = useContext(AppContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/quotes", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.quotes);
      })
      .catch((err) => console.log);
  }, []);
  return (
    <>
      <div className="homecont">
        {data.map((quotes) => {
          return (
            <QuoteCard
              id={quotes.id}
              downvotesCount={quotes.downvotesCount}
              upvotesCount={quotes.upvotesCount}
              content={quotes.content}
              author={quotes.author}
              givenVote={quotes.givenVote}
            />
          );
        })}
      </div>
    </>
  );
}
