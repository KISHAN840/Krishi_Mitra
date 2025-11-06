# KrishiMitra 🌾🚀
**Smart Agriculture Solutions Powered by NASA & AI**

## Project Overview 🌍
KrishiMitra is a cutting-edge web application designed to empower farmers with advanced crop management tools by leveraging real-time NASA data and AI-powered insights.
The app provides accurate crop recommendations based on local precipitation and groundwater levels, while also offering irrigation suggestions and flood alerts to ensure optimal water usage and disaster preparedness.

Built for the **NASA Space Apps Challenge 2025**, this project combines the latest in agricultural technology, open data, and artificial intelligence to help farmers make informed decisions, conserve water, and improve overall productivity and sustainability.

---

## Key Features ✨
- **🌦️ Crop Recommendations:** Uses NASA precipitation and groundwater data to recommend the best crops for a farmer’s location.
- **💧 Irrigation Requirements:** Calculates irrigation needs using NASA POWER API precipitation data.
- **🌊 Flood Alerts:** Integrates Open Meteo river discharge data to provide early flood warnings.
- **📊 Data Visualization:** Visualizes precipitation, soil moisture, and groundwater levels with Recharts for better decision-making.
- **🤖 AI Chatbot:** Powered by Hugging Face Mistral AI to answer agricultural queries instantly.
- **👩‍🌾 Connect with Experts:** Provides a platform to consult with agricultural experts for personalized advice.
- **🌱 Water Conservation Tips:** Offers practical water-saving techniques tailored to farmers.
- **📋 Crop Database:** Includes detailed crop descriptions, water requirements, and filters to help choose the most water-efficient crops.

---

## Technologies Used 🛠️
- **Frontend:** React, Tailwind CSS, Recharts
- **APIs:** NASA POWER API, Open Meteo, OpenWeather
- **AI Integration:** Hugging Face Mistral AI
- **Database:** Firebase (Authentication, Realtime Database)
- **Tools & Others:** Git, GitHub, Node.js, Vite

---
## Project Overview

<img width="2667" height="1613" alt="Screenshot 2025-09-12 175354" src="https://github.com/user-attachments/assets/28d78b8d-bde3-46c4-aab3-9e7d6a7949d7" />


---

## How to Run 🚜
1.  **Clone the repository:**
    ```bash
    git clone  https://github.com/KISHAN840/Krishi_Mitra.git
    cd KrishiMitra
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    * Create a `.env.local` file in the project root.
    * Add your API keys for NASA, Open Meteo, OpenWeather, and Hugging Face as required by the application (check the source code for specific variable names, typically prefixed with `VITE_`).

4.  **Connect Firebase:** 🔥
    * Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (or use an existing one).
    * In your project dashboard, click the Web icon (`</>`) to add a web app.
    * Register your app (give it a nickname like "KrishiMitra Web").
    * After registration, Firebase will provide a `firebaseConfig` object. Copy the keys and values.
    * Add these keys to your `.env.local` file, **prefixing each key name with `VITE_`**. For example:
        ```env
        VITE_FIREBASE_API_KEY=your-api-key-here
        VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain-here
        VITE_FIREBASE_PROJECT_ID=your-project-id-here
        VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket-here
        VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id-here
        VITE_FIREBASE_APP_ID=your-app-id-here
        VITE_FIREBASE_DATABASE_URL=your-realtime-database-url-here # Add this if using Realtime DB
        ```
    * **Important:** Make sure your `.gitignore` file includes `.env.local` to keep your keys private.
    * The application uses `src/firebaseConfig.ts` to initialize Firebase using these environment variables.
    * **Enable Services:** In the Firebase Console, navigate to "Authentication" and enable the "Email/Password" sign-in method. Also, navigate to "Realtime Database" (or Firestore, depending on which you configured) and create a database, starting in **test mode** for initial setup.

5.  **Run the project:**
    ```bash
    npm run dev
    ```

---

## Future Enhancements 🔮
- Integrate more real-time data sources for improved crop prediction accuracy.
- Expand expert consultation with live chat or video support.
- Enhance the AI chatbot to cover a wider range of agricultural queries.
- Add multilingual support for better accessibility to farmers worldwide.

---

## Acknowledgments 🙌
This project was created by **Team Agronauts** for the **NASA Space Apps Challenge 2024**.
Special thanks to:
- **NASA** for open access to climate and environmental data
- **Open Meteo** and **OpenWeather** for weather APIs
- **Hugging Face** for the Mistral AI model integration
- **Firebase** for backend services

---

## Authors ✍️
- **Kishan Maurya**
 GitHub: [@KISHAN840](https://github.com/KISHAN840)
