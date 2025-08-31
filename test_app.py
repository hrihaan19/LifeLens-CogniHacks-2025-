from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_lifelens_api():
    payload = {
        "grade": "11",
        "interests": "tennis, coding, philosophy",
        "subjects": "CS, English",
        "career_ideas": "startup founder, AI researcher",
        "hobbies": "tennis, chess",
        "habits": "procrastinates a lot",
        "future_years": 10,
        "alternate_goal": "pre-med"
    }
    response = client.post("/api/lifelens", json=payload)
    assert response.status_code == 200
    assert "day-in-the-life" in response.json()["result"] or "You wake up" in response.json()["result"]
