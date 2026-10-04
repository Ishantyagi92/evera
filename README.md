# AetherPDF // Antigravity Reference Agent

AetherPDF is a state-of-the-art, premium AI agent capable of holding intelligent, context-aware conversations based on your uploaded PDF documents. Powered by the **Google Antigravity SDK** and Gemini 3.5 models, it utilizes a 100% lossless multimodal context pipeline (meaning no lossy text chunking or retrieval pipelines).

## Key Features

- **Premium Glassmorphic UI**: Beautiful dark/light mode toggle with dynamic ambient glows and modern HSL colors.
- **Lossless RAG**: Ingests entire PDF reference documents directly, including layouts, images, and tables.
- **SSE Streaming**: Real-time response streaming for both the AI agent's reasoning process (thoughts) and the final answer.
- **Reference Persistence**: Seamlessly saves and resumes conversation history between sessions.
- **Document Manager**: Toggle documents to customize reference lists for your chats.

## Getting Started

### 1. Configure the API Key

1. Get a Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/api-keys).
2. Create a `.env` file from the provided `.env.example` template:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and set your key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### 2. Run the Application

Start the FastAPI backend server using the virtual environment's Python interpreter:

```bash
/Users/ishansmacbook/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 app.py
```

*The server will start on [http://127.0.0.1:8000](http://127.0.0.1:8000).*

### 3. Open the Dashboard

Open your web browser and navigate to:
```
http://localhost:8000
```

1. Upload one or more PDF documents in the sidebar.
2. Check the box to select active documents.
3. Click the **+** (New Conversation) button in the sidebar to name and create a new chat session.
4. Type your question in the chat input area!
