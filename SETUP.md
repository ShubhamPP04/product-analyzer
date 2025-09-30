# Quick Setup Guide

## 🚀 Get Started in 3 Steps

### Step 1: Get Your Gemini API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Configure Environment Variables

1. Open the file `.env.local` in the project root
2. Replace `your_api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=AIza...your_key_here
   ```
3. Save the file

### Step 3: Run the Application

The development server is already running! Open your browser and visit:

**http://localhost:3000**

## 📱 How to Use

1. **Enter Age**: Input your age on the first screen
2. **Grant Camera Permission**: Allow camera access when prompted
3. **Capture Label**: Take a photo of a product's ingredients label
4. **View Analysis**: Get comprehensive health insights

## 💡 Tips for Best Results

- ✅ Ensure good lighting when capturing the label
- ✅ Hold the camera steady and focus on the text
- ✅ Make sure the ingredients list is clearly visible
- ✅ Avoid glare or shadows on the label

## 🔧 Troubleshooting

### Camera Not Working?
- Check browser permissions (usually a camera icon in the address bar)
- Try refreshing the page
- Make sure no other app is using the camera

### API Errors?
- Verify your API key is correctly set in `.env.local`
- Check that you copied the entire key without spaces
- Ensure you have an active internet connection

### Text Not Detected?
- Retake the photo with better lighting
- Move closer to the product label
- Ensure the text is in focus

## 🌟 Features to Try

- Test different age groups to see personalized recommendations
- Try various products: snacks, beverages, packaged foods
- Check the health score for products you regularly consume
- Compare pros and cons of different products

## 📞 Need Help?

If you encounter any issues, check the main README.md file for detailed documentation.

---

Enjoy analyzing your products! 💚🇮🇳
