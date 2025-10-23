import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <h1 className="text-xl font-bold">💼 JobSphere</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload Resume</Link>
        <Link to="/recommendations">Recommendations</Link>
      </div>
    </nav>
  );
}
