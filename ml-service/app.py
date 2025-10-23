from flask import Flask, request, jsonify, send_from_directory, current_app
import nltk, os

app = Flask(__name__)

# Download NLTK stopwords if not already downloaded
nltk.download('stopwords')
stopwords = nltk.corpus.stopwords.words('english')

# Example job data
jobs = [
    {"title": "Frontend Developer", "skills": ["React", "HTML", "CSS", "JavaScript"]},
    {"title": "Backend Developer", "skills": ["Node.js", "Express", "MongoDB"]},
    {"title": "Data Analyst", "skills": ["Python", "SQL", "Pandas", "Excel"]}
]

# Home route
@app.route('/')
def index():
    return "✅ JobSphere ML Service is running! Use /extract or /recommend.", 200

# Favicon route (prevents 404)
@app.route('/favicon.ico')
def favicon():
    return '', 204

# Health check route
@app.route('/health')
def health():
    return jsonify({"status": "ok"}), 200

# Extract skills route
@app.route('/extract', methods=['POST'])
def extract_skills():
    resume_text = request.json.get('text', '')
    skills = [word for word in ["Python", "React", "SQL", "Node.js", "JavaScript", "HTML", "CSS", "Pandas"]
              if word.lower() in resume_text.lower()]
    return jsonify({"skills": skills})

# Recommend jobs route
@app.route('/recommend', methods=['POST'])
def recommend_jobs():
    user_skills = request.json.get('skills', [])
    job_scores = []
    for job in jobs:
        common = len(set(job["skills"]).intersection(set(user_skills)))
        score = common / len(job["skills"]) if job["skills"] else 0
        job_scores.append({"title": job["title"], "score": score})
    sorted_jobs = sorted(job_scores, key=lambda x: x["score"], reverse=True)
    return jsonify(sorted_jobs)

if __name__ == '__main__':
    app.run(port=5001)
