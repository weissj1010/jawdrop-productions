export default function Schleys() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-white text-3xl md:text-5xl font-bold mb-8 text-center">
        The Schleys
      </h1>
      <div className="w-full max-w-4xl aspect-video">
        <iframe
          src="https://www.youtube.com/embed/lUzh6cDNiVc"
          title="The Schleys"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
}
