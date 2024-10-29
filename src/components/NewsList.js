// src/components/NewsList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Tabs from "./Tabs"; // Import the Tabs component

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("sports");
  const [categories] = useState([
    "all-news",
    "sports",
    "business",
    "entertainment",
    "politics",
    "fashion",
  ]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showOffline, setShowOffline] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    // Fetch bookmarks from local storage on component mount
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    // Event listeners for online/offline status
    const handleOnline = () => {
      setIsOffline(false);
      setStatusMessage("You are online now! You can access the latest news.");
    };

    const handleOffline = () => {
      setIsOffline(true);
      setStatusMessage("You are offline. Viewing saved news content.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    // Fetch news based on the selected category or offline mode
    if (!showBookmarks && !showOffline) {
      if (category === "all-news") {
        fetchAllNews();
      } else {
        fetchNews(category);
      }
    } else if (showOffline) {
      fetchOfflineNews();
    }
  }, [category, showBookmarks, showOffline]);

  const fetchAllNews = async () => {
    try {
      const categoriesToFetch = ["sports", "business", "entertainment", "politics", "fashion"];
      const allNews = [];

      await Promise.all(
        categoriesToFetch.map(async (cat) => {
          const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=9a45d8a7572c4bbeb1cd2e1bd99ae90c`
          );
          allNews.push(...response.data.articles);
        })
      );

      setNews(allNews);
      localStorage.setItem("news-all-news", JSON.stringify(allNews));
    } catch (error) {
      console.error("Error fetching all news:", error);
    }
  };

  const fetchNews = async (category) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=9a45d8a7572c4bbeb1cd2e1bd99ae90c`
      );
      setNews(response.data.articles);
      localStorage.setItem(`news-${category}`, JSON.stringify(response.data.articles));
    } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
    }
  };

  const fetchOfflineNews = () => {
    const offlineArticles = categories.reduce((acc, cat) => {
      const cachedNews = localStorage.getItem(`news-${cat}`);
      if (cachedNews) {
        acc = acc.concat(JSON.parse(cachedNews));
      }
      return acc;
    }, []);
    setNews(offlineArticles);
  };

  const handleShare = (article) => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.description,
          url: article.url,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported in your browser.");
    }
  };

  const handleBookmark = (article) => {
    const updatedBookmarks = [...bookmarks];
    const isBookmarked = bookmarks.find((item) => item.url === article.url);

    if (isBookmarked) {
      const filteredBookmarks = updatedBookmarks.filter((item) => item.url !== article.url);
      setBookmarks(filteredBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));
    } else {
      updatedBookmarks.push(article);
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    }
  };

  const isBookmarked = (url) => bookmarks.some((bookmark) => bookmark.url === url);

  return (
    <div className="news-links">
      {/* Include Tabs component */}
      <Tabs />

      <h2>NEWS ARTICLES</h2>
     

      {/* Status message for online/offline status */}
      {statusMessage && (
        <div className={`status-message ${isOffline ? "offline" : "online"}`}>
          {statusMessage}
        </div>
      )}

      <div className="category-filters">
        <button onClick={() => { setShowBookmarks(false); setShowOffline(false); }} className={!showBookmarks && !showOffline ? "active" : ""}>
          News
        </button>
        <button onClick={() => { setShowBookmarks(true); setShowOffline(false); }} className={showBookmarks ? "active" : ""}>
          Bookmarks
        </button>
        <button onClick={() => { setShowOffline(true); setShowBookmarks(false); }} className={showOffline ? "active" : ""}>
          Offline
        </button>
        {!showBookmarks && !showOffline &&
          categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
      </div>

      <ul>
        {(showBookmarks ? bookmarks : news).length > 0 ? (
          (showBookmarks ? bookmarks : news).map((article) => (
            <li key={article.url} className="news-item">
              <img src={article.urlToImage} alt={article.title} className="news-image" />
              <div className="news-content">
                <h3>{article.title}</h3>
                <p>
                  <strong>Author:</strong> {article.author || "Unknown"}
                </p>
                <p>
                  <strong>Content:</strong> {article.description}
                </p>
                <div className="button-group">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <button className="btn-read">Read More</button>
                  </a>
                  <button className="btn-share" onClick={() => handleShare(article)}>
                    Share
                  </button>
                  <button className="btn-bookmark" onClick={() => handleBookmark(article)}>
                    {isBookmarked(article.url) ? "Unbookmark" : "Bookmark"}
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>{showBookmarks ? "No bookmarks available" : showOffline ? "No offline articles available" : "No news available"}</p>
        )}
      </ul>
    </div>
  );
};

export default NewsList;