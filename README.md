# 🇮🇳 Product Health Analyzer

A Next.js web application that helps Indian consumers analyze product ingredients for health insights tailored to their age. Using AI-powered analysis with Google's Gemini 2.0 Flash Lite model.

## Features

- 👤 **Age-based Analysis**: Get personalized health insights based on your age
- 📸 **Camera Integration**: Capture product labels directly from your device
- 🔍 **OCR Text Extraction**: Automatically extract text from product labels using Tesseract.js
- 🤖 **AI-Powered Analysis**: Comprehensive ingredient analysis using Gemini 2.0 Flash Lite
- 💚 **Health Scoring**: Get a health score (0-100) for products
- ✅ **Pros & Cons**: Clear breakdown of positive aspects and concerns
- 🎯 **Recommendations**: Actionable health recommendations
- 🇮🇳 **India-Focused**: Tailored for Indian dietary concerns and lifestyle
- 🎨 **Beautiful UI**: Green and white theme with responsive design

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- A Gemini API key from Google AI Studio

### Installation

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Add your Gemini API Key**:
   
   Open the `.env.local` file and replace `your_api_key_here` with your actual Gemini API key:
   
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   Get your API key from: https://aistudio.google.com/app/apikey

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   
   Navigate to http://localhost:3000

## How to Use

1. **Enter Your Age**: Start by entering your age to get personalized analysis
2. **Capture Product Label**: Use your device camera to take a photo of the product ingredients label
3. **Get Analysis**: The AI will extract text and provide comprehensive health insights including:
   - Overall health assessment
   - Health score (0-100)
   - Age appropriateness
   - List of detected ingredients
   - Pros (positive aspects)
   - Cons (concerns and warnings)
   - Personalized recommendations

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini 2.0 Flash Lite
- **OCR**: Tesseract.js
- **Camera**: react-webcam
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API endpoint for analysis
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
└── components/
    ├── ProductAnalyzer.tsx       # Main component (state management)
    ├── AgeInput.tsx              # Age input step
    ├── CameraCapture.tsx         # Camera capture step
    └── AnalysisResult.tsx        # Results display
```

## Important Notes

⚠️ **Disclaimer**: This application is for informational purposes only. The analysis provided should not replace professional medical or nutritional advice. Always consult healthcare professionals for medical decisions.

🔒 **Privacy**: Your age and captured images are processed in real-time and are not stored on any server.

📱 **Camera Permissions**: The app requires camera access to function. Please grant camera permissions when prompted.

## Troubleshooting

- **Camera not working**: Ensure you've granted camera permissions in your browser
- **Analysis fails**: Check that your Gemini API key is correctly set in `.env.local`
- **Text extraction issues**: Ensure good lighting and clear visibility of the ingredients label

## License

MIT License - Feel free to use this project for personal or commercial purposes.

---

Made with 💚 for India
