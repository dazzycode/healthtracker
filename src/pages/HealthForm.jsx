import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Added

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

    // Reset form
    setSleep("");
    setSteps("");
    setMood("");
    setWater("");

    // ✅ Redirect to Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto bg-white shadow-2xl p-8 rounded-2xl border border-blue-100"
      >
        <h2 className="md:text-3xl text-xl  font-bold mb-6 text-center text-blue-700">
          Add Daily Health Data
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Sleep Hours
            </label>
            <input
              type="number"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g., 7"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Steps Walked
            </label>
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g., 5000"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">Select Mood</option>
              <option>😊 Happy</option>
              <option>😐 Neutral</option>
              <option>😞 Sad</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Water Intake (liters)
            </label>
            <input
              type="number"
              value={water}
              onChange={(e) => setWater(e.target.value)}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g., 2.5"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-full py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 font-semibold"
          >
            Add Entry
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
