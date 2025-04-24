"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const LoginModal = dynamic(() => import("@/components/LoginModal"), { ssr: false });
const SignupModal = dynamic(() => import("@/components/SignupModal"), { ssr: false });

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { ref: featureRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 relative flex flex-col items-center pt-4 px-4">
      <header className="w-full max-w-7xl flex items-center justify-between px-6 md:px-12 py-3 rounded-xl bg-white/70 backdrop-blur shadow-md z-10">
        <div className="flex items-center gap-3 text-2xl font-extrabold text-gray-800">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
          ElevateCMS 
        </div>
        <nav className="hidden md:flex gap-6 text-sm text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600 transition">Home</a>
          <a href="#" className="hover:text-blue-600 transition">Features</a>
          <a href="#" className="hover:text-blue-600 transition">Pricing</a>
          <a href="#" className="hover:text-blue-600 transition">Docs</a>
        </nav>
        <div className="flex gap-2">
          <button
            onClick={() => setShowLogin(true)}
            className="text-sm border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-1.5 rounded-md transition"
          >
            Sign in
          </button>
          <button
            onClick={() => setShowSignup(true)}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition"
          >
            Get Started
          </button>
        </div>
      </header>

      <section
        className={`mt-12 max-w-4xl px-4 z-10 text-center transition-all duration-1000 ease-out transform ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div
          className={`transition-all duration-700 delay-100 ease-out transform ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 drop-shadow-md mb-6 animate-pulse">
            Supercharge your ideas with GenAI. <br /> Build stunning blogs effortlessly.
          </h1>
        </div>
        <div
          className={`transition-all duration-700 delay-300 ease-out transform ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-lg text-gray-700 mb-10">
            ElevateCMS now comes with built-in <span className="text-blue-600 font-semibold">GenAI-powered templates</span> that help you create rich, SEO-ready content in seconds.
          </p>
        </div>
        <div
          className={`transition-all duration-700 delay-500 ease-out transform ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setShowSignup(true)}
              className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition"
            >
              Start for Free
            </button>
            <button
              className="border border-gray-300 hover:border-gray-400 text-gray-800 px-6 py-3 rounded-full font-medium text-lg transition bg-white/80 backdrop-blur"
            >
              Talk to Founders
            </button>
          </div>
        </div>
        <div
          className={`transition-all duration-700 delay-[700ms] ease-out transform ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-sm text-gray-400 mt-4">
            No credit card needed — just your creativity.
          </p>
        </div>
      </section>

      <section
        ref={featureRef}
        className={`w-full max-w-6xl px-4 md:px-8 mt-20 transition-all duration-1000 ease-out transform ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Explore How It Works</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
          <img
            src="/illustrations/illustration.png"
            alt="CMS Illustration"
            className="rounded-lg shadow-lg w-full"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is ElevateCMS?</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              ElevateCMS is a powerful platform that enables creators, developers, and businesses to build stunning
              content-driven websites. With an intuitive interface and rich features, publishing has never been easier.
            </p>
            <ul className="mt-4 text-gray-700 list-disc list-inside space-y-2">
              <li>Simple and clean editor</li>
              <li>Fast content delivery</li>
              <li>Real-time publishing</li>
              <li>Fully customizable</li>
            </ul>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <img src="/illustrations/editor.png" alt="Editor UI" className="rounded-xl shadow-lg hover:scale-105 transition mx-auto" />
            <h4 className="mt-4 text-xl font-semibold text-gray-800">Editor UI</h4>
            <p className="text-gray-600 mt-2">Intuitive and distraction-free writing experience to focus on content creation.</p>
          </div>
          <div>
            <img src="/illustrations/publish-final.png" alt="Publishing Flow" className="rounded-xl shadow-lg hover:scale-105 transition mx-auto" />
            <h4 className="mt-4 text-xl font-semibold text-gray-800">Publishing Flow</h4>
            <p className="text-gray-600 mt-2">Streamlined and quick publishing process with built-in preview and scheduling.</p>
          </div>
          <div>
            <img src="/illustrations/customize.png" alt="Customization Options" className="rounded-xl shadow-lg hover:scale-105 transition mx-auto" />
            <h4 className="mt-4 text-xl font-semibold text-gray-800">Customization</h4>
            <p className="text-gray-600 mt-2">Easily adapt your CMS to fit your brand and functional needs with flexible options.</p>
          </div>
        </div>
      </section>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}

      <footer className="w-full mt-24 py-10 bg-white border-t border-gray-200 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} ElevateCMS. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4 text-gray-600">
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
      </footer>
    </main>
  );
}
