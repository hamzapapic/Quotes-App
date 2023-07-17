import React, { useState } from "react";
import "./QuoteCard.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderNone,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";

export default function QuoteCard({
  content,
  author,
  upvotesCount,
  downvotesCount,
  id,
  givenVote,
}) {
  const { token, setToken } = useContext(AppContext);

  library.add(faCaretDown, faCaretUp);
  // async function UpVote(id) {
  //   var x = true;
  //   if ((x = true)) {
  //     axios.post(`https://localhost:8000/quotes/:${id}/upvote`);
  //     x = false;
  //   } else {
  //     axios.delete(`https://localhost:8000/quotes/:${id}/upvote`);
  //   }
  // }
  // async function DownVote(id) {
  //   var x = true;
  //   if ((x = true)) {
  //     axios.post(`https://localhost:8000/quotes/:${id}/downvote`);
  //     x = false;
  //   } else {
  //     axios.delete(`https://localhost:8000/quotes/:${id}/downvote`);
  //   }
  // }
  console.log(givenVote + " pocetak");
  var [active, setActive] = useState(false);
  var [activedown, setActivedown] = useState(false);
  const upClick = () => {
    console.log(active + " active");
    if (active) {
      console.log(givenVote);
      axios.delete(`http://localhost:8000/quotes/${id}/upvote`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActive(false);
      console.log(givenVote);
    } else {
      console.log(givenVote);
      if (givenVote != "none") {
        axios.delete(`http://localhost:8000/quotes/${id}/${givenVote}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivedown(false);
      }
      axios.post(
        `http://localhost:8000/quotes/${id}/upvote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setActive(!active);
    }
  };
  const downClick = () => {
    if (activedown) {
      axios.delete(`http://localhost:8000/quotes/${id}/downvote`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivedown(false);
    } else {
      if (givenVote != "none") {
        axios.delete(`http://localhost:8000/quotes/${id}/${givenVote}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActive(false);
      }
      axios.post(
        `http://localhost:8000/quotes/${id}/downvote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setActivedown(!activedown);
    }
  };
  return (
    <>
      <div className="QuoteCard">
        <div className="rating">
          <FontAwesomeIcon
            icon="fa-solid fa-caret-up"
            onClick={upClick}
            style={{ color: active ? "green" : "gray" }}
          />
          <h5 className="rating ratingpercent">
            {Math.round((upvotesCount / (upvotesCount + downvotesCount)) * 100)}
            %
          </h5>
          <h4 className="updown">
            {upvotesCount} / {downvotesCount}
          </h4>
          <FontAwesomeIcon
            icon="fa-solid fa-caret-down"
            onClick={downClick}
            style={{
              color: activedown ? "red" : "grey",
            }}
          />
        </div>
        <div className="quote">
          <h3 className="content">{content}</h3>
          <h5 className="author">~ {author}</h5>
        </div>
      </div>
    </>
  );
}
