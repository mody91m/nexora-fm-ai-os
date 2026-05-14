"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [site, setSite] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    fetchIncidents();
  }, []);

  async function fetchIncidents() {
    const { data } = await supabase
      .from("incidents")
      .select("*")
      .order("created_at", { ascending: false });

    setIncidents(data || []);
  }

  async function addIncident(e: any) {
    e.preventDefault();

    await supabase.from("incidents").insert([
      {
        title,
        description,
        site,
        priority,
        status: "Open",
      },
    ]);

    setTitle("");
    setDescription("");
    setSite("");
    setPriority("Medium");

    fetchIncidents();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-bold text-blue-700 mb-2">
        Nexora FM AI OS
      </h1>

      <p className="text-gray-600 mb-8">
        Create and track live FM incidents
      </p>

      <form
        onSubmit={addIncident}
        className="bg-white p-6 rounded-2xl shadow mb-8 grid gap-4"
      >
        <h2 className="text-2xl font-bold">
          Add New Incident
        </h2>

        <input
          className="border p-3 rounded-xl w-full"
          placeholder="Incident Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="border p-3 rounded-xl w-full"
          placeholder="Site / Location"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />

        <select
          className="border p-3 rounded-xl w-full"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <textarea
          className="border p-3 rounded-xl w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-blue-700 text-white p-3 rounded-xl font-bold">
          Submit Incident
        </button>
      </form>

      <div className="grid gap-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="text-3xl font-bold mb-3">
              {incident.title}
            </h2>

            <p>
              <strong>Site:</strong> {incident.site}
            </p>

            <p>
              <strong>Priority:</strong> {incident.priority}
            </p>

            <p>
              <strong>Status:</strong> {incident.status}
            </p>

            <p className="mt-4 text-gray-700">
              {incident.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
