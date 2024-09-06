import React, { useState, useEffect } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "react-loading-skeleton/dist/skeleton.css";
import ImageLoader from "./components/ImageLoader";
import { Motion, spring } from "react-motion";
import { Card } from "./components/Card";
import useSaveWithInterval from "./hooks/useSaveWithInterval";
import useFetch from "./hooks/useFetch";
import { saveDurationText } from "./utils/saveText";
import { CardType } from "./interfaces";

const App: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [changesMade, setChangesMade] = useState(false);
  const [currTime, setCurrTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  const { data: fetchedCards, loading: fetchingLoading } =
    useFetch("/api/cards");

  // Save cards to the API every 5 seconds if changes are made
  const { loading: savingLoading, lastSaved } = useSaveWithInterval(
    "/api/cards",
    cards,
    5000,
    changesMade,
    () => {
      setChangesMade(false);
    }
  );

  // Fetch cards from the mock API
  useEffect(() => {
    if (fetchedCards.length > 0) {
      setCards(fetchedCards);
    }
  }, [fetchedCards]);

  const moveCard = (fromIndex: number, toIndex: number) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    if (toIndex !== fromIndex) {
      setChangesMade(true);
      setCards(updatedCards);
    } else {
      setChangesMade(false);
    }
  };

  const closeOverlay = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOverlayImage(null);
  };

  useEffect(() => {
    window.addEventListener("keydown", closeOverlay);
    return () => window.removeEventListener("keydown", closeOverlay);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        {fetchingLoading && <div>Loading cards...</div>}
        <div className={`overlay ${savingLoading ? "show" : ""}`}>
          {savingLoading && <div className="spinner"></div>}
        </div>
        <div style={{display: 'flex'}}>
          <span className="info-msg">
            Time since last save:{" "}
            {saveDurationText(Math.floor((currTime - lastSaved) / 1000))}
          </span>
          <span className={`${changesMade ? "success" : "error"}-msg info-msg`}>
            {changesMade ? "Changes made" : "No changes to save"}
          </span>
        </div>
        <div className="grid">
          {cards.map((item, index) => (
            <Motion
              key={index}
              style={{
                y: spring(item.position * 80, { stiffness: 500, damping: 32 }),
              }}>
              {(interpolatedStyle) => (
                <Card
                  key={item.type}
                  item={item}
                  index={index}
                  moveCard={moveCard}
                  onClick={() => setOverlayImage(item.src)}
                  style={
                    {
                      transform: `translate3d(0, ${interpolatedStyle.y}px, ${interpolatedStyle.x}px)`,
                    } as React.CSSProperties
                  }
                />
              )}
            </Motion>
          ))}
        </div>
        {overlayImage && (
          <div className="overlay" onClick={() => setOverlayImage(null)}>
            <ImageLoader
              src={overlayImage}
              alt={overlayImage}
              className="overlay-image"
              circle={false}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default App;
