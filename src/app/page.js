import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const response = await fetch("https://api.imgflip.com/get_memes")
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching memes:", error));

  if (!response || !response.data || !response.data.memes) {
    return <div>Error fetching memes</div>;
  }

  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center p-6">
      {/* Header Section */}
      <h1 className="text-5xl text-blue-600 font-bold mb-10">
        <span className="text-pink-600">M</span>eme{" "}
        <span className="text-pink-600">G</span>enerator{" "}
        <span role="img" aria-label="emoji">
          😃
        </span>
      </h1>

      {/* Meme Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {response.data.memes.map((item) => (
          <Link href={`/detail/${item.id}`} key={item.id}>
            <div className="bg-gray-100 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
              <Image
                className="rounded-t-lg"
                src={item.url}
                width={400}
                height={400}
                alt={item.name}
                style={{ objectFit: "cover" }}
              />
              <div className="p-4 text-center">
                <h2 className="text-lg text-gray-800 font-semibold">{item.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="mt-16">
        <p className="text-gray-600 text-sm">Powered by Imgflip API</p>
      </footer>
    </main>
  );
}
