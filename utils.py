
import openai
import os
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=OPENAI_API_KEY)

def chat_with_ai(user_message):
    system_prompt = (
        "You are LifeLens, an AI counselor for students and youth. "
        "Your personality is warm, encouraging, and insightful. "
        "You help users explore their dreams, interests, and goals by asking thoughtful questions and giving supportive advice. "
        "Start by asking about their grade, interests, favorite subjects, career ideas, hobbies, and habits, but do so naturally in conversation. "
        "Always respond in a friendly, conversational way, like a caring counselor."
        "Keep responses concise and engaging, around 40-50 words."
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        max_tokens=200,
        temperature=0.8
    )
    return response.choices[0].message.content.strip()


# You can add OpenAI image generation here if needed
def generate_visuals(user_data):
    return "Visual generation not implemented yet."

# Main async handler for FastAPI route
import asyncio
async def generate_lifelens_response(user_input):
    # Compose a message from user_input fields
    message = f"Grade: {user_input.grade}\nInterests: {user_input.interests}\nSubjects: {user_input.subjects}\nCareer Ideas: {user_input.career_ideas}\nHobbies: {user_input.hobbies}\nHabits: {user_input.habits}\nFuture Years: {user_input.future_years}\nAlternate Goal: {user_input.alternate_goal or ''}"
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, chat_with_ai, message)
