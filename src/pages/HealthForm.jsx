import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTint, FaWalking, FaBed, FaSmile } from "react-icons/fa";

export default function HealthForm() {
  const navigate = useNavigate();

  const [sleep, setSleep] = useState("");
  const [steps, setSteps] = useState("");
  const [mood, setMood] = useState("");
  const [water, setWater] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("healthEntries")) || [];
    setEntries(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      sleep,
      steps,
      mood,
      water,
    };

    const updated = [...entries, newEntry];
    setEntries(updated);
    localStorage.setItem("healthEntries", JSON.stringify(updated));

    setSleep("");
    setSteps("");
    setMood("");
    setWater("");

    navigate("/dashboard"); // Redirect
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 px-5 py-14 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/50 border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-3xl"
      >
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="md:text-4xl text-2xl font-bold text-blue-700 tracking-tight">
            Daily Wellness Log
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Track your wellness and monitor your health progress daily.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="font-medium text-gray-700 flex items-center gap-2 mb-2">
              <FaBed className="text-blue-600" /> Sleep Hours
            </label>
            <input
              type="number"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              required
              placeholder="E.g., 7.5"
              className="w-full p-4 border rounded-2xl bg-white/70 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 flex items-center gap-2 mb-2">
              <FaWalking className="text-green-600" /> Steps Walked
            </label>
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              required
              placeholder="E.g., 6000"
              className="w-full p-4 border rounded-2xl bg-white/70 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 flex items-center gap-2 mb-2">
              <FaSmile className="text-yellow-500" /> Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
              className="w-full p-4 border rounded-2xl bg-white/70 focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select your mood</option>
              <option>😊 Happy</option>
              <option>😐 Neutral</option>
              <option>😞 Sad</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700 flex items-center gap-2 mb-2">
              <FaTint className="text-cyan-600" /> Water Intake (L)
            </label>
            <input
              type="number"
              value={water}
              onChange={(e) => setWater(e.target.value)}
              required
              placeholder="E.g., 2.0"
              className="w-full p-4 border rounded-2xl bg-white/70 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="md:col-span-2 bg-blue-700 text-white w-full py-4 rounded-2xl font-semibold shadow-lg hover:bg-blue-800 transition"
          >
            Save Entry
          </motion.button>
        </form>

        {/* Direct Dashboard Link */}
        <p className="text-center mt-6 text-gray-600">
          Just want to view your progress?{" "}
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-700 font-semibold hover:underline"
          >
            Go to Dashboard →
          </button>
        </p>
      </motion.div>
    </div>
  );
}
