import { useState } from "react";
import axios from "axios";

export default function Recommendations() {
  const [skills, setSkills] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleRecommend = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/recommend-test", {
        skills: skills.split(",").map((s) => s.trim()),
      });
      setRecommendations(res.data);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Get Job Recommendations</h2>
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Enter skills separated by commas (e.g. Python, React)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <button
        onClick={handleRecommend}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Get Recommendations
      </button>

      {recommendations.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Recommended Jobs:</h3>
          <ul className="list-disc ml-6">
            {recommendations.map((job, i) => (
              <li key={i}>
                {job.title} — Score: {(job.score * 100).toFixed(0)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
