"use client";
import { useState } from "react";
import Image from "next/image";

export default function Detail(response) {
  const [text, setText] = useState(null);
  const [text1, setText1] = useState(null);
  const [gen, setgen] = useState(null);

  console.log("detail", response);
  if (!response) {
    return <div>No meme found.</div>;
  }

  const generateMeme = async () => {
    if (!response || !text || !text1) {
      console.error("Meme ID and text fields are required");
      return;
    }

    const username = "Arfa-Shoukat";
    const password = "Arfa$123";

    const url = `https://api.imgflip.com/caption_image?template_id=${response.response[0].id}&username=${username}&password=${password}&text0=${text}&text1=${text1}`;

    try {
      const res = await fetch(url, { method: "POST" });

      if (!res.ok) {
        throw new Error("Failed to generate meme");
      }

      const data = await res.json();
      setgen(data);
    } catch (error) {
      console.error("Error generating meme:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      {!gen ? (
        <>
          <Image
            className="rounded-lg shadow-lg"
            src={response.response[0].url}
            alt="Meme"
            width={300}
            height={300}
          />
          <div className="mt-6 space-y-4 w-full max-w-sm">
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Input 1"
              onChange={(e) => setText(e.target.value)}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Input 2"
              onChange={(e) => setText1(e.target.value)}
            />
          </div>
          <button
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
            onClick={generateMeme}
          >
            Generate
          </button>
        </>
      ) : (
        <Image
          className="rounded-lg shadow-lg mt-6"
          src={gen.data.url}
          alt="Generated Meme"
          width={500}
          height={500}
        />
      )}
    </div>
  );
}
