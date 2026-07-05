import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import LoadingScreen from "../components/viewer/LoadingScreen";
import ReadyScreen from "../components/viewer/ReadyScreen";
import GiftBox from "../components/viewer/GiftBox";
import PhotoReveal from "../components/viewer/PhotoReveal";
import EnvelopeReveal from "../components/viewer/EnvelopReveal";
import LetterReveal from "../components/viewer/LetterReveal";
import FinalScreen from "../components/viewer/FinalScreen";

type Gift = {
  _id: string;
  title: string;
  receiver: string;
  letter: string;
  photos: string[];
  music: string;
};

export default function Viewer() {
  const { id } = useParams();

  const [gift, setGift] = useState<Gift | null>(null);
  const [screen, setScreen] = useState<
    "loading" | "ready" | "gift" | "photos" | "envelope" | "letter" | "final"
  >("loading");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedMusic = useRef(false);

  useEffect(() => {
    const loadGift = async () => {
      try {
        const res = await axios.get(
          `https://giftverse-backend2.onrender.com/gift/${id}`
        );

        const data: Gift = {
          ...res.data,
          photos: res.data.photos.map(
            (p: string) => `https://giftverse-backend2.onrender.com${p}`
          ),
          music: res.data.music
            ? `https://giftverse-backend2.onrender.com${res.data.music}`
            : "",
        };

        setGift(data);

        // create audio once
        if (data.music) {
          const audio = new Audio(data.music);
          audio.loop = true;
          audio.preload = "auto";
          audioRef.current = audio;
        }

        setTimeout(() => {
          setScreen("ready");
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    };

    loadGift();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [id]);

  // SIMPLE MOBILE SAFE PLAY
  const playMusic = () => {
    if (!audioRef.current) return;
    if (hasStartedMusic.current) return;

    audioRef.current
      .play()
      .then(() => {
        hasStartedMusic.current = true;
      })
      .catch((err) => {
        console.log("Audio blocked:", err);
      });
  };

  if (!gift) return <LoadingScreen />;

  return (
    <>
      {screen === "loading" && <LoadingScreen />}

      {screen === "ready" && (
        <ReadyScreen onYes={() => setScreen("gift")} />
      )}

      {screen === "gift" && (
        <GiftBox
          onPlayMusic={playMusic}
          onFinished={() => setScreen("photos")}
        />
      )}

      {screen === "photos" && (
        <PhotoReveal
          photos={gift.photos}
          onFinished={() => setScreen("envelope")}
        />
      )}

      {screen === "envelope" && (
        <EnvelopeReveal
          onFinished={() => setScreen("letter")}
        />
      )}

      {screen === "letter" && (
        <LetterReveal
          title={gift.title}
          receiver={gift.receiver}
          letter={gift.letter}
          music={gift.music}
          onFinished={() => setScreen("final")}
        />
      )}

      {screen === "final" && <FinalScreen />}
    </>
  );
}