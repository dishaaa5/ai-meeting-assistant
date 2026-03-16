# AI Meeting Assistant

AI Meeting Assistant is a web application that converts meeting audio into structured insights using AI.

It allows users to upload meeting recordings and automatically generates:

* Meeting summaries
* Key discussion points
* Action items
* Organized notes

The goal is to make meetings more productive and eliminate manual note-taking.

---

## Features

* Upload meeting audio files
* Automatic transcription processing
* AI-generated meeting summaries
* Key points extraction
* Action items detection
* Clean dashboard interface

---

## Tech Stack

Frontend:

* Next.js
* Tailwind CSS
* shadcn/ui

Backend:

* FastAPI
* Python

AI:

* Groq API
* LLM-based summarization

Deployment:

* Vercel (Frontend)
* Render (Backend)

---

## Project Structure

ai-meeting-assistant/

frontend/

* Next.js frontend
* UI components
* dashboard interface

backend/

* FastAPI server
* AI processing logic
* API endpoints

---

## Installation

### 1. Clone Repository

git clone https://github.com/dishaaa5/ai-meeting-assistant.git

cd ai-meeting-assistant

---

### 2. Backend Setup

cd backend

Create virtual environment

python -m venv venv

Activate environment

Windows:
venv\Scripts\activate

Install dependencies

pip install -r requirements.txt

Run backend

uvicorn main:app --reload

---

### 3. Frontend Setup

cd frontend

Install dependencies

npm install

Run frontend

npm run dev

---

## Usage

1. Open the frontend application
2. Upload a meeting audio file
3. The backend processes the file
4. AI generates a meeting summary
5. Results are displayed on the dashboard

---

## Future Improvements

* Real-time meeting transcription
* Speaker identification
* Meeting search
* Team collaboration
* Calendar integration
* Subscription plans

---

## License

This project is open source and available under the MIT License.
