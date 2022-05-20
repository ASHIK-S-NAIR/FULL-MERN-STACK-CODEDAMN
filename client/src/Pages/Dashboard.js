import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const DashBoard = () => {
  const navigate = useNavigate();

  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  const populateQuate = async () => {
    const req = await fetch("/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setQuote(data.quote);
      setTempQuote(tempQuote);
    } else {
      alert(data.error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateQuate();
      }
    }
  }, []);

  const updateQuote = async (e) => {
    e.preventDefault();
    const req = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ quote: tempQuote }),
    });

    const data = await req.json();
    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <h1>Your quote: {quote || "NOT QUOTE FOUND"}</h1>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          value={tempQuote}
          placeholder="Quote"
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <input type="submit" value="Update Quote" />
      </form>
    </div>
  );
};

export default DashBoard;
