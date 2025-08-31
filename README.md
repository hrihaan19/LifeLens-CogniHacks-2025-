# LifeLens Backend (FastAPI)

This is the backend API for LifeLens, an AI-powered future planner for students and youth.

## Features
- Receives user input (grade, interests, subjects, career ideas, hobbies, habits, future years, alternate goal)
- Calls OpenAI API with a system prompt to generate a vivid, actionable "day-in-the-life" story and roadmap
- Returns the AI-generated narrative and suggestions

## Setup
1. Create a `.env` file in this directory with:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
2. Install dependencies:
   ```sh
   /Users/hrihaanbhutani/lifelens2/.venv/bin/pip install fastapi uvicorn openai python-dotenv
   ```
3. Run the server:
   ```sh
   /Users/hrihaanbhutani/lifelens2/.venv/bin/uvicorn app:app --reload
   ```

## API Endpoint
- `POST /api/lifelens`
  - JSON body: `{ grade, interests, subjects, career_ideas, hobbies, habits, future_years, alternate_goal (optional) }`
  - Returns: `{ result: <AI narrative> }`

## Test
Run the test with:
```sh
/Users/hrihaanbhutani/lifelens2/.venv/bin/python -m pytest test_app.py
```

---

For the frontend, connect to this API endpoint to send user data and display the AI's response.
