"use client";

export default function WelcomeBanner() {
  return (
    <div
      className="rounded-2xl bg-cover bg-center px-10 py-20 shadow-lg"
      style={{
        backgroundImage: "url('/campus.jpeg')",
      }}
    >
      <div className="rounded-2xl bg-white/10 p-10 text-center backdrop-blur-sm">
        <h1 className="text-6xl font-bold text-black">
          Welcome
        </h1>

        <p className="mt-4 text-2xl text-black">
          Welcome to Workforce Activity Management Platform
        </p>
      </div>
    </div>
  );
}