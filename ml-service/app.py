from flask import Flask, request, jsonify
import nltk, re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

nltk.download('stopwords')
stopwords = nltk.corpus.stopwords.words('english')

# Example job dataset (you’ll later fetch from DB)
jobs = [
    {"title": "Frontend Developer", "skills": ["React", "HTML", "CSS", "JavaScript"]},
    {"title": "Backend Developer", "skills": ["Node.js", "Express", "MongoDB"]},
    {"title": "Data Analyst", "skills": ["Python", "SQL", "Pandas", "Excel"]}
]

@app.route('/extract', methods=['POST'])
def extract_skills():
    resume_text = request.json.get('text', '')
    # Simple keyword matching (you can use NLP later)
    skills = [word for word in ["Python", "React", "SQL", "Node.js", "JavaScript", "HTML", "CSS", "Pandas"] if word.lower() in resume_text.lower()]
    return jsonify({"skills": skills})

@app.route('/recommend', methods=['POST'])
def recommend_jobs():
    user_skills = request.json.get('skills', [])
    job_scores = []
    for job in jobs:
        common = len(set(job["skills"]).intersection(set(user_skills)))
        score = common / len(job["skills"])
        job_scores.append({"title": job["title"], "score": score})
    sorted_jobs = sorted(job_scores, key=lambda x: x["score"], reverse=True)
    return jsonify(sorted_jobs)

if __name__ == '__main__':
    app.run(port=5001)
