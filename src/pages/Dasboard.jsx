import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("healthEntries")) || [];
    setEntries(saved);
  }, []);

  const avgSleep = (
    entries.reduce((a, b) => a + Number(b.sleep), 0) / entries.length || 0
  ).toFixed(1);
  const avgSteps = (
    entries.reduce((a, b) => a + Number(b.steps), 0) / entries.length || 0
  ).toFixed(0);
  const avgWater = (
    entries.reduce((a, b) => a + Number(b.water), 0) / entries.length || 0
  ).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8 px-3  md:px-4"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="md:text-3xl text-xl font-bold mb-8 text-center text-blue-700">
          Health Dashboard
        </h2>

        {entries.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No entries yet. Go to “Add Entry” to log your first record.
          </p>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-5 shadow-lg text-center"
              >
                <h3 className="font-medium text-lg">Avg Sleep</h3>
                <p className="md:text-3xl text-xl font-bold mt-2">{avgSleep} hrs</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-5 shadow-lg text-center"
              >
                <h3 className="font-medium text-lg">Avg Steps</h3>
                <p className="md:text-3xl text-xl font-bold mt-2">{avgSteps}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl p-5 shadow-lg text-center"
              >
                <h3 className="font-medium text-lg">Avg Water</h3>
                <p className="md:text-3xl text-xlfont-bold mt-2">{avgWater} L</p>
              </motion.div>
            </div>

            {/* Table */}
            <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 border border-gray-100 overflow-x-auto">
              <h3 className="md:text-xl text-sm font-semibold mb-3 text-gray-700">
                Recent Entries
              </h3>

              <table className="w-full min-w-[600px] text-sm border-collapse">
                <thead className="bg-blue-100 text-blue-900">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Sleep</th>
                    <th className="p-3">Steps</th>
                    <th className="p-3">Mood</th>
                    <th className="p-3">Water</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e) => (
                    <tr
                      key={e.id}
                      className="border-t hover:bg-blue-50 transition"
                    >
                      <td className="p-3">{e.date}</td>
                      <td className="p-3">{e.sleep} hrs</td>
                      <td className="p-3">{e.steps}</td>
                      <td className="p-3">{e.mood}</td>
                      <td className="p-3">{e.water} L</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                Sleep Trend (Last 7 Entries)
              </h3>

              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={entries.slice(-7)}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sleep" fill="#2563eb" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
