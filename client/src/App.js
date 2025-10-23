import React, { useState } from "react";
import axios from "axios";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState([]);
  const [jobs, setJobs] = useState([]);

  const handleExtract = async () => {
    const res = await axios.post("http://localhost:5000/api/upload", { resumeText, userId: "user123" });
    setSkills(res.data.skills);
  };

  const handleRecommend = async () => {
    const res = await axios.get("http://localhost:5000/api/recommend/user123");
    setJobs(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧠 JobSphere – AI Job Recommendation</h1>
      <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows="6" cols="60" placeholder="Paste your resume text here..." />
      <br />
      <button onClick={handleExtract}>Extract Skills</button>
      <button onClick={handleRecommend}>Recommend Jobs</button>

      <h3>Extracted Skills:</h3>
      <ul>{skills.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h3>Recommended Jobs:</h3>
      <ul>{jobs.map((j, i) => <li key={i}>{j.title} ({(j.score * 100).toFixed(0)}%)</li>)}</ul>
    </div>
  );
}

export default App;
