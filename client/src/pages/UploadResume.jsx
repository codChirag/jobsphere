import { useState } from "react";
import axios from "axios";

export default function UploadResume() {
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/upload", {
        resumeText,
        userId: "replace_with_valid_user_id",
      });
      setSkills(res.data.skills);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Resume</h2>
      <textarea
        rows="8"
        className="w-full border p-2 rounded"
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      ></textarea>
      <button
        onClick={handleExtract}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Extracting..." : "Extract Skills"}
      </button>

      {skills.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Extracted Skills:</h3>
          <ul className="list-disc ml-6">
            {skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
