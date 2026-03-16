
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv
import os
import tempfile

# Load environment variables
load_dotenv()

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.get("/")
def home():
    return {"message": "AI Meeting Assistant API running"}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    filename = file.filename.lower()

    audio_types = (".mp3", ".wav", ".m4a", ".webm", ".ogg")
    text_types = (".txt",)

    transcript = ""

    try:

        # ---------------- AUDIO FILE ----------------
        if filename.endswith(audio_types):

            with tempfile.NamedTemporaryFile(delete=False, suffix=filename) as temp_file:
                contents = await file.read()
                temp_file.write(contents)
                temp_file_path = temp_file.name

            with open(temp_file_path, "rb") as audio_file:
                audio_bytes = audio_file.read()

            transcription = client.audio.transcriptions.create(
                file=(file.filename, audio_bytes),
                model="whisper-large-v3"
            )

            transcript = transcription.text

            os.remove(temp_file_path)

        # ---------------- TEXT FILE ----------------
        elif filename.endswith(text_types):

            contents = await file.read()
            transcript = contents.decode("utf-8")

        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        print("Transcript:", transcript)

        # ---------------- ANALYSIS ----------------
        prompt = f"""
You are an AI meeting assistant.

Return results in this format:

TITLE
Short meeting title.

SUMMARY
Short paragraph.

KEY POINTS
Bullet list.

ACTION ITEMS
Bullet list.

Transcript:
{transcript}
"""

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
        )

        analysis = completion.choices[0].message.content

        return {
            "transcript": transcript,
            "analysis": analysis
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

