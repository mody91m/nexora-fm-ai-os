"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
const [requests, setRequests] = useState<any[]>([]);
const [workOrders, setWorkOrders] = useState<any[]>([]);
const [assets, setAssets] = useState<any[]>([]);
const [sites, setSites] = useState<any[]>([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [site, setSite] = useState("");
const [asset, setAsset] = useState("");
const [assetName, setAssetName] = useState("");
const [assetCode, setAssetCode] = useState("");
const [assetCategory, setAssetCategory] = useState("");
const [assetSite, setAssetSite] = useState("");
const [priority, setPriority] = useState("Medium");
const [searchTerm, setSearchTerm] = useState("");
const [filterType, setFilterType] = useState("All");
const [siteCode, setSiteCode] = useState("");
const [siteName, setSiteName] = useState("");
const [siteCity, setSiteCity] = useState("");
const [siteZone, setSiteZone] = useState("");
const assetTypeSuggestions = [
  "AHU - Air Handling Unit",
  "FCU - Fan Coil Unit",
  "Chiller",
  "Cooling Tower",
  "Pump",
  "Booster Pump",
  "Fire Fighting Pump",
  "Fire Fighting Line",
  "Electrical Panel",
  "MDB - Main Distribution Board",
  "SMDB - Sub Main Distribution Board",
  "Generator",
  "UPS",
  "Transformer",
  "Elevator",
  "Escalator",
  "BMS Controller",
  "CCTV Camera",
  "Access Control System",
  "Fire Alarm Panel",
  "Smoke Detector",
  "Sprinkler System",
  "Drainage Line",
  "Water Tank",
  "Roof Waterproofing",
  "Automatic Door",
  "Roller Shutter Door",
  "X-Ray Machine",
  "Baggage Handling System",
  "Lighting Pole",
  "HVAC System",
  "Plumbing Line"
];
const siteSuggestions = sites.map((site) => site.site_name);


useEffect(() => {
  fetchRequests();
  fetchWorkOrders();
  fetchAssets();
fetchSites();
}, []);
async function addAsset(e: any) {
  e.preventDefault();

  let aiAssetHealth = "Healthy";
  let aiPmRecommendation =
    "Continue standard preventive maintenance schedule.";

  if (
    assetCategory.toLowerCase().includes("fire") ||
    assetCategory.toLowerCase().includes("electrical")
  ) {
    aiAssetHealth = "Critical Asset";

    aiPmRecommendation =
      "Frequent inspection and preventive maintenance recommended due to operational criticality.";
  }

  await supabase.from("assets").insert([
    {
      asset_code: assetCode,
      asset_name: assetName,
      asset_category: assetCategory,
      site: assetSite,

      ai_asset_health: aiAssetHealth,
      ai_pm_recommendation:
        aiPmRecommendation,
    },
  ]);

  async function addSite(e: any) {
  e.preventDefault();

  await supabase.from("sites").insert([
    {
      site_code: siteCode,
      site_name: siteName,
      city: siteCity,
      zone: siteZone,
      status: "Active",
    },
  ]);

  setSiteCode("");
  setSiteName("");
  setSiteCity("");
  setSiteZone("");

  fetchSites();

  alert("Site Added Successfully");
}
  async function fetchSites() {
  const { data } = await supabase
    .from("sites")
    .select("*")
    .order("created_at", { ascending: false });

  setSites(data || []);
}
  fetchAssets();

  setAssetName("");
  setAssetCode("");
  setAssetCategory("");
  setAssetSite("");

  alert("Asset Added Successfully");
}
async function addSite(e: any) {
  e.preventDefault();

  await supabase.from("sites").insert([
    {
      site_code: siteCode,
      site_name: siteName,
      city: siteCity,
      zone: siteZone,
      status: "Active",
    },
  ]);

  setSiteCode("");
  setSiteName("");
  setSiteCity("");
  setSiteZone("");

  fetchSites();

  alert("Site Added Successfully");
}
async function fetchSites() {
  const { data } = await supabase
    .from("sites")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  setSites(data || []);
}
async function fetchAssets() {
  const { data } = await supabase
    .from("assets")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  setAssets(data || []);
}
async function fetchWorkOrders() {
  const { data } = await supabase
    .from("work_orders")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  setWorkOrders(data || []);
}
async function createWorkOrder(request: any) {
  await supabase.from("work_orders").insert([
    {
      request_id: request.id,

      title: request.title,
      description: request.description,
      site: request.site,

      priority: request.priority,
      status: "Open",

      responsible_team:
        request.requires_safety_notification
          ? "Safety / FM Team"
          : "FM Maintenance Team",

      work_order_type:
        request.request_type === "Emergency"
          ? "Emergency"
          : "Reactive",

      ai_summary: request.ai_summary,
      ai_recommended_action:
        request.ai_recommended_action,
    },
  ]);

  fetchWorkOrders();

  alert("Work Order Created Successfully");
}
async function addRequest(e: any) {
  e.preventDefault();

  let classification = "Work Order";
  let riskLevel = "Low";
  let assetCriticality = "Medium";
let aiSummary = "AI classified this request as a normal work order.";
let aiAction = "Proceed with standard FM workflow.";
let slaStatus = "Within SLA";
let escalationLevel = "None";
let aiSlaAnalysis = "Request is currently within SLA.";
let aiEscalationRecommendation = "No escalation required at this stage.";
let repeatedFailureAlert = "No repeated failure pattern detected yet.";
let technicalReport = "";

  const fullText =
    `${title} ${description}`.toLowerCase();

  if (
    fullText.includes("water") ||
    fullText.includes("leak") ||
    fullText.includes("fire") ||
    fullText.includes("electrical")
  ) {
    classification = "Incident";
    slaStatus = "Near Breach";
escalationLevel = "Supervisor";
aiSlaAnalysis = "Incident-type request requires faster response and close SLA monitoring.";
aiEscalationRecommendation = "Escalate to FM Supervisor if no action is taken within the response window.";
repeatedFailureAlert = "Monitor this location and asset for repeated incidents.";
    technicalReport =
  "AI detected operational incident requiring technical investigation and inspection.";
    riskLevel = "High";
aiSummary = "AI detected a potential incident requiring operational attention.";
aiAction = "Create work order, notify supervisor, and review if incident report is required.";
  }

  if (
    lowerTitle.includes("fire") ||
    lowerTitle.includes("smoke") ||
    lowerTitle.includes("explosion") ||
    lowerTitle.includes("flood")
  ) {

    classification = "Emergency";

    riskLevel = "Critical";

    assetCriticality = "Critical";

    slaStatus = "Critical SLA";

    escalationLevel =
      "FM Manager / Emergency Team";

    aiSlaAnalysis =
      "Emergency request requires immediate response and urgent SLA control.";

    aiEscalationRecommendation =
      "Immediate escalation to FM Manager, Safety Team, and Emergency Response Team is recommended.";

    repeatedFailureAlert =
      "Emergency event should be reviewed for possible systemic failure.";

    technicalReport =
      "AI detected emergency operational event requiring immediate technical and safety response.";

    aiSummary =
      "AI classified this request as Emergency.";

    aiAction =
      "Immediate emergency escalation and safety response required.";
  }

  await supabase.from("requests").insert([
    {
      title,
      description,
      site,
      asset,
      priority,
      status: "New",
      request_type: classification,
      ai_classification: classification,
ai_risk_level: riskLevel,
asset_criticality: assetCriticality,
ai_summary: aiSummary,
ai_recommended_action: aiAction,
ai_technical_report: technicalReport,
requires_work_order: true,
requires_incident_report: classification === "Incident",
sla_status: slaStatus,
escalation_level: escalationLevel,
ai_sla_analysis: aiSlaAnalysis,
ai_escalation_recommendation: aiEscalationRecommendation,
repeated_failure_alert: repeatedFailureAlert,
    },
  ]);

  setTitle("");
  setDescription("");
  setSite("");
  setPriority("Medium");

  fetchRequests();
}

  async function fetchRequests() {
    const { data } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    setRequests(data || []);
  }

  return (
    <main className="min-h-screen bg-gray-100 flex">

  <aside className="hidden md:block w-64 bg-blue-900 text-white p-6">

    <h1 className="text-2xl font-bold mb-10">
      Nexora FM AI OS
    </h1>

    <nav className="space-y-3">

      {[
        "Dashboard",
        "Requests",
        "Work Orders",
        "Incidents",
        "Assets",
        "Preventive Maintenance",
        "Safety",
        "Technical Reports",
        "AI Analytics",
        "Reports",
        "Settings",
      ].map((item) => (

        <div
          key={item}
          className="px-4 py-3 rounded-xl hover:bg-blue-700 cursor-pointer"
        >
          {item}
        </div>

      ))}

    </nav>

  </aside>

  <section className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">

  <div>

    <h2 className="text-4xl font-bold text-gray-800">
      Unified Requests Engine
    </h2>

    <p className="text-gray-500 mt-2">
      AI-powered FM operational intelligence platform
    </p>

  </div>

  <div className="bg-white px-5 py-3 rounded-xl shadow">
    Admin User
  </div>

</div>
      <h1 className="text-5xl font-bold text-blue-700">
        Nexora FM AI OS
      </h1>

      <p className="mt-3 text-gray-600">
        Unified Requests Engine
      </p>
<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10 mb-8">

  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow">
    <p className="opacity-80">Total Requests</p>
    <h3 className="text-5xl font-bold mt-3">{requests.length}</h3>
  </div>

  <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white p-6 rounded-2xl shadow">
    <p className="opacity-80">Incidents</p>
    <h3 className="text-5xl font-bold mt-3">
      {requests.filter((r) => r.request_type === "Incident").length}
    </h3>
  </div>

  <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-2xl shadow">
    <p className="opacity-80">Emergencies</p>
    <h3 className="text-5xl font-bold mt-3">
      {requests.filter((r) => r.request_type === "Emergency").length}
    </h3>
  </div>

  <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-2xl shadow">
    <p className="opacity-80">Open Work Orders</p>
    <h3 className="text-5xl font-bold mt-3">{workOrders.length}</h3>
  </div>

</div>
<div className="bg-white rounded-2xl shadow p-6 mb-8 overflow-x-auto">
  <h2 className="text-2xl font-bold mb-5">
    <div className="bg-white rounded-2xl shadow p-6 mb-8">

  <h2 className="text-2xl font-bold mb-5">
    Add Asset
  </h2>

  <div className="bg-white rounded-2xl shadow p-6 mb-8">
  <h2 className="text-2xl font-bold mb-5">
    Add Site
  </h2>

  <form
  onSubmit={addSite}
  className="grid grid-cols-1 md:grid-cols-2 gap-4"
>
    <input
      className="border p-3 rounded-xl"
      placeholder="Site Code"
      value={siteCode}
      onChange={(e) => setSiteCode(e.target.value)}
    />

    <input
      className="border p-3 rounded-xl"
      placeholder="Site Name"
      value={siteName}
      onChange={(e) => setSiteName(e.target.value)}
      required
    />

    <input
      className="border p-3 rounded-xl"
      placeholder="City"
      value={siteCity}
      onChange={(e) => setSiteCity(e.target.value)}
    />

    <input
      className="border p-3 rounded-xl"
      placeholder="Zone"
      value={siteZone}
      onChange={(e) => setSiteZone(e.target.value)}
    />

    <button className="bg-blue-700 text-white p-3 rounded-xl font-bold">
      Add Site
    </button>
  </form>
</div>
  <form
  onSubmit={addAsset}
  className="grid grid-cols-1 md:grid-cols-2 gap-4"
>

  <input
    className="border p-3 rounded-xl"
    placeholder="Asset Code"
    value={assetCode}
    onChange={(e) => setAssetCode(e.target.value)}
    required
  />

  <input
    className="border p-3 rounded-xl"
    placeholder="Asset Name"
    value={assetName}
    onChange={(e) => setAssetName(e.target.value)}
    required
  />

  <input
    className="border p-3 rounded-xl"
    placeholder="Asset Category"
    value={assetCategory}
    onChange={(e) => setAssetCategory(e.target.value)}
    required
  />
  <input
  className="border p-3 rounded-xl"
  placeholder="Site"
  value={assetSite}
  onChange={(e) => setAssetSite(e.target.value)}
  required
/>

  <div className="relative md:col-span-1">

 

  {assetCategory && (
    <div className="absolute z-50 bg-white border rounded-xl mt-1 shadow w-full max-h-48 overflow-y-auto">
      {assetTypeSuggestions
        .filter((item) =>
          item.toLowerCase().includes(assetCategory.toLowerCase())
        )
        .slice(0, 8)
        .map((item) => (
          <div
            key={item}
            onClick={() => setAssetCategory(item)}
            className="p-3 hover:bg-blue-50 cursor-pointer text-sm"
          >
            {item}
          </div>
        ))}
    </div>
  )}

</div>

  <button className="bg-blue-700 text-white p-3 rounded-xl font-bold">
    Add Asset
  </button>

</form>

</div>
    Asset Register
  </h2>

  <table className="w-full text-left">
    <thead>
      <tr className="border-b text-gray-500">
        <th className="pb-3">Asset Code</th>
        <th className="pb-3">Asset Name</th>
        <th className="pb-3">Category</th>
        <th className="pb-3">Site</th>
        <th className="pb-3">Status</th>
        <th className="pb-3">Criticality</th>
        <th className="pb-3">PM Frequency</th>
      </tr>
    </thead>

    <tbody>
      {assets.map((assetItem) => (
        <tr key={assetItem.id} className="border-b">
          <td className="py-4 font-bold text-blue-700">
            {assetItem.asset_code || "N/A"}
          </td>
          <td>{assetItem.asset_name}</td>
          <td>{assetItem.asset_category}</td>
          <td>{assetItem.site}</td>
          <td>{assetItem.status}</td>
          <td>{assetItem.criticality}</td>
          <td>{assetItem.pm_frequency}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<form
  onSubmit={addRequest}
  className="bg-white p-6 rounded-2xl shadow mt-10 grid gap-4"
>
  <h2 className="text-2xl font-bold">
    Create New Request
  </h2>

  <input
    className="border p-3 rounded-xl"
    placeholder="Request Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />

  <div className="relative">
    <input
      className="border p-3 rounded-xl w-full"
      placeholder="Site / Location"
      value={site}
      onChange={(e) => setSite(e.target.value)}
    />

    {site && (
      <div className="absolute z-50 bg-white border rounded-xl mt-1 shadow w-full max-h-48 overflow-y-auto">
        {siteSuggestions
          .filter((item) =>
            item.toLowerCase().includes(site.toLowerCase())
          )
          .slice(0, 8)
          .map((item) => (
            <div
              key={item}
              onClick={() => setSite(item)}
              className="p-3 hover:bg-blue-50 cursor-pointer text-sm"
            >
              {item}
            </div>
          ))}

        {siteSuggestions.filter((item) =>
          item.toLowerCase().includes(site.toLowerCase())
        ).length === 0 && (
          <div className="p-3 text-red-600 text-sm">
            Site not found in database. Please add it from Add Site first.
          </div>
        )}
      </div>
    )}
  </div>

  <input
    className="border p-3 rounded-xl"
    placeholder="Asset / Equipment"
    value={asset}
    onChange={(e) => setAsset(e.target.value)}
  />

  <select
    className="border p-3 rounded-xl"
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
  >
    <option>Low</option>
    <option>Medium</option>
    <option>High</option>
    <option>Critical</option>
  </select>

  <textarea
    className="border p-3 rounded-xl min-h-28"
    placeholder="Describe the request..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <button className="bg-blue-700 text-white p-3 rounded-xl font-bold">
    Submit Request
  </button>

</form>

<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
  <div className="bg-white p-6 rounded-2xl shadow">
    <p className="text-gray-500">Total Requests</p>
    <h3 className="text-4xl font-bold text-blue-700 mt-3">
      {requests.length}
    </h3>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <p className="text-gray-500">Incidents</p>
    <h3 className="text-4xl font-bold text-orange-500 mt-3">
      {requests.filter((r) => r.request_type === "Incident").length}
    </h3>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <p className="text-gray-500">Emergencies</p>
    <h3 className="text-4xl font-bold text-red-600 mt-3">
      {requests.filter((r) => r.request_type === "Emergency").length}
    </h3>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <p className="text-gray-500">SLA Compliance</p>
    <h3 className="text-4xl font-bold text-green-600 mt-3">
      94%
    </h3>
  </div>
</div>

  
      <div className="bg-white rounded-2xl shadow p-6 mb-8 overflow-x-auto">

  <h2 className="text-2xl font-bold mb-5">
    Live Work Orders
  </h2>

  <table className="w-full text-left">

    <thead>
      <tr className="border-b text-gray-500">
        <th className="pb-3">WO Number</th>
        <th className="pb-3">Title</th>
        <th className="pb-3">Site</th>
        <th className="pb-3">Priority</th>
        <th className="pb-3">Status</th>
      </tr>
    </thead>

    <tbody>

      {workOrders.map((wo) => (

        <tr
          key={wo.id}
          className="border-b"
        >

          <td className="py-4 font-bold text-blue-700">
  {wo.wo_number
    ? `WO-${String(wo.wo_number).padStart(4, "0")}`
    : "Generating..."}
</td>
          <td>{wo.title}</td>
          <td>{wo.site}</td>
          <td>{wo.priority}</td>
          <td>

  <span
    className={
      wo.status === "Open"
        ? "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
        : wo.status === "In Progress"
        ? "bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
        : "bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
    }
  >
    {wo.status}
  </span>

</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>
      <div className="mb-6">

  <div className="flex gap-4">
  <input
    className="w-full border p-4 rounded-2xl shadow-sm"
    placeholder="Search requests..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <select
  className="border p-4 rounded-2xl shadow-sm"
  value={filterType}
  onChange={(e) => setFilterType(e.target.value)}
>
  <option>All</option>
  <option>Work Order</option>
  <option>Incident</option>
  <option>Emergency</option>
</select>

</div>

</div>

<div className="grid gap-4 mt-8">
        {requests
  .filter((request) => {

    const search =
      searchTerm.toLowerCase();

    const matchesFilter =
  filterType === "All"
    ? true
    : request.request_type === filterType;
      return matchesFilter && (
      request.title
        ?.toLowerCase()
        .includes(search) ||

      request.site
        ?.toLowerCase()
        .includes(search) ||

      request.request_type
        ?.toLowerCase()
        .includes(search) ||

      request.description
        ?.toLowerCase()
        .includes(search)
    );
  })
  .map((request) => (
          <div
            key={request.id}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="text-2xl font-bold">
              {request.title}
            </h2>

            <p className="mt-3">
              <strong>Site:</strong> {request.site}
            </p>
            <p>
  <strong>Asset:</strong>{" "}
  {request.asset || "Not specified"}
</p>

            <p>
  <strong>Priority:</strong> {request.priority}
</p>

<p>
  <strong>Type:</strong>{" "}
  <span
    className={
      request.request_type === "Emergency"
        ? "bg-red-600 text-white px-3 py-1 rounded-full text-sm"
        : request.request_type === "Incident"
        ? "bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
        : "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
    }
  >
    {request.request_type}
  </span>
</p>

<p>
  <strong>Status:</strong>{" "}
  <span
    className={
      request.status === "Closed"
        ? "bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
        : request.status === "In Review"
        ? "bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
        : request.status === "Approved"
        ? "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
        : "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
    }
  >
    {request.status}
  </span>
</p>

<p>
  <strong>Risk:</strong>{" "}
  <span
    className={
      request.ai_risk_level === "Critical"
        ? "bg-red-600 text-white px-3 py-1 rounded-full text-sm"
        : request.ai_risk_level === "High"
        ? "bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
        : "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
    }
  >
    {request.ai_risk_level}
  </span>
</p>

<p>
  <strong>Asset Criticality:</strong>{" "}

  <span
    className={
      request.asset_criticality === "Critical"
        ? "bg-red-600 text-white px-3 py-1 rounded-full text-sm"
        : request.asset_criticality === "High"
        ? "bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
        : "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
    }
  >
    {request.asset_criticality}
  </span>
</p>
<p>
  <strong>SLA Status:</strong>{" "}

  <span
    className={
      request.sla_status === "Critical SLA"
        ? "bg-red-600 text-white px-3 py-1 rounded-xl text-sm"
        : request.sla_status === "Near Breach"
        ? "bg-orange-100 text-orange-800 px-3 py-1 rounded-xl text-sm"
        : "bg-green-100 text-green-800 px-3 py-1 rounded-xl text-sm"
    }
  >
    {request.sla_status}
  </span>
</p>

<p>
  <strong>Escalation:</strong>{" "}

  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-xl text-sm">
    {request.escalation_level}
  </span>
</p>
  
            

            <p className="mt-4 text-gray-700">
              {request.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

  <div className="bg-blue-50 p-4 rounded-xl">
    <h3 className="font-bold text-blue-800 mb-2">
      AI Summary
    </h3>

    <p>
      {request.ai_summary}
    </p>
  </div>

  <div className="bg-orange-50 p-4 rounded-xl">
    <h3 className="font-bold text-orange-800 mb-2">
      AI Recommended Action
    </h3>

    <p>
      {request.ai_recommended_action}
    </p>
  </div>
  <div className="bg-purple-50 p-4 rounded-xl mt-4">
  <h3 className="font-bold text-purple-800 mb-2">
    AI Technical Report
  </h3>

  <p>
    {request.ai_technical_report ? (
  request.ai_technical_report
) : request.requires_technical_report ? (
  <div className="space-y-2">
    <p>
      <strong>Technical Finding:</strong> {request.title} was reported at {request.site || "the specified location"} and requires technical inspection.
    </p>

    <p>
      <strong>Possible Cause:</strong> Potential equipment failure, infrastructure defect, poor condition, or operational issue.
    </p>

    <p>
      <strong>Immediate Action:</strong> Inspect the affected area, isolate any risk if required, assign the responsible maintenance team, and document evidence.
    </p>

    <p>
      <strong>Recommended Corrective Action:</strong> Complete technical diagnosis, repair the defect, verify functionality, and monitor the location after completion.
    </p>
  </div>
) : (
  "No technical report required"
)}
  </p>
</div>
{request.requires_incident_report && (
  <div className="bg-red-50 p-4 rounded-xl mt-4">

    <h3 className="font-bold text-red-800 mb-2">
      AI Incident Report
    </h3>

    <div className="space-y-2">

      <p>
        <strong>Incident Summary:</strong> {request.title} was reported at {request.site || "the specified location"} and classified as an operational incident.
      </p>

      <p>
        <strong>Potential Impact:</strong> The incident may affect safety, service continuity, asset reliability, or operational performance.
      </p>

      <p>
        <strong>Immediate Action:</strong> Supervisor review is required. The affected area should be inspected and controlled if any risk is present.
      </p>

      <p>
        <strong>Escalation:</strong> Incident report and technical investigation are recommended before closure.
      </p>

    </div>

  </div>
)}

{request.requires_safety_notification && (
  <div className="bg-yellow-50 p-4 rounded-xl mt-4">

    <h3 className="font-bold text-yellow-800 mb-2">
      AI Safety Alert
    </h3>

    <div className="space-y-2">

      <p>
        <strong>Safety Concern:</strong> This request may involve safety exposure and should be reviewed by the safety or FM supervision team.
      </p>

      <p>
        <strong>Required Action:</strong> Check for immediate hazards, isolate the affected area if needed, and document safety observations.
      </p>

    </div>

  </div>
)}

<div className="bg-gray-50 p-4 rounded-xl mt-4">

  <h3 className="font-bold text-gray-800 mb-2">
    AI Operational Insight
  </h3>

  <p>
    This request will be used for future trend analysis, repeated failure detection, SLA risk monitoring, and predictive maintenance recommendations.
  </p>

</div>

<div className="bg-indigo-50 p-4 rounded-xl mt-4">

  <h3 className="font-bold text-indigo-800 mb-2">
    AI SLA Analysis
  </h3>

  <p>
    {request.ai_sla_analysis}
  </p>

</div>

<div className="bg-amber-50 p-4 rounded-xl mt-4">

  <h3 className="font-bold text-amber-800 mb-2">
    AI Escalation Recommendation
  </h3>

  <p>
    {request.ai_escalation_recommendation}
  </p>

</div>

<div className="bg-pink-50 p-4 rounded-xl mt-4">

  <h3 className="font-bold text-pink-800 mb-2">
    Repeated Failure Alert
  </h3>

  <p>
    {request.repeated_failure_alert}
  </p>

</div>
  <div className="flex flex-wrap items-center gap-2 mt-5">
  {request.requires_work_order && (
    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm">
      Work Order Required
    </span>
  )}

  {request.requires_incident_report && (
    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-xl text-sm">
      Incident Report Required
    </span>
  )}

  {request.requires_safety_notification && (
    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-xl text-sm">
      Safety Notification
    </span>
  )}

  {request.requires_technical_report && (
    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-xl text-sm">
      Technical Report Required
    </span>
  )}

  {request.requires_rca && (
    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-xl text-sm">
      RCA Required
    </span>
  )}

  {request.requires_emergency_response && (
    <span className="bg-red-600 text-white px-3 py-1 rounded-xl text-sm">
      Emergency Response
    </span>
  )}
</div>
<button
  onClick={() => createWorkOrder(request)}
  className="mt-5 bg-green-700 text-white px-5 py-3 rounded-xl font-bold hover:bg-green-800"
>
  Create Work Order
</button>

</div>
          </div>
        ))}
      
      </div>
    </section>
    </main>
  );
}