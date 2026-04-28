# truthlayer-ai
AI fairness platform to detect unfair automated decisions

## Built With
- Gemini API
- Firebase
- React
- Tailwind CSS

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   `npm run dev`

## About

This repository contains a React + Vite app for fairness auditing and analysis.

## Notes

- The app uses `@google/genai` and requires a valid Gemini API key for runtime model calls.
- The local build now avoids browser startup failure when `GEMINI_API_KEY` is missing.
