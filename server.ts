import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", parkName: "South Fork 82 RV Park" });
});

// AI Assistant / Chatbot API Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemInstruction = `You are "Barnaby", the friendly and helpful virtual concierge for South Fork 82 RV Park in Blossom, Texas.
    
    KEY PARK INFORMATION:
    - Business Name: South Fork 82 RV Park
    - Address: 1105 W. Front, Blossom, TX 75416 (Just east of Paris, TX off US-82)
    - Phone: (903) 703-8591
    - Email: fox261@southfork82rvpark.com
    - Target Guests: Travelers, full-time RVers, seasonal workers, and overnight visitors seeking a quiet, clean, hospitable East Texas park.
    
    AMENITIES:
    - Full Hookups at all sites (30/50 Amp electricity, City Water, Sewer)
    - High-Speed Wi-Fi
    - Spacious Pull-Through & Back-In RV Sites
    - Pet-Friendly (Leash required, peaceful grounds)
    - On-Site Laundry Facilities
    - Clean, well-maintained grounds
    - Easy Highway Access off US-82
    - Quiet & peaceful rural atmosphere
    
    PLACEHOLDER RATES (Subject to change, electric metered for monthly stays):
    - Nightly: $45 / night
    - Weekly: $240 / week
    - Monthly: $550 / month (+ metered electric)
    
    LOCAL ATTRACTIONS:
    - Pat Mayse Lake (Fishing, Boating, Swimming ~15 mins north)
    - Trail de Paris & Eiffel Tower Replica in Paris, TX (~10 mins west)
    - Lake Crook & Lamar County Wildlife Management Area
    - Historic Downtown Paris TX (Antiques, Local Dining, Farmers Market)
    - Small-town charm in Blossom, TX
    
    TONE & STYLE:
    - Warm, welcoming, respectful, and helpful with authentic Texas hospitality.
    - Provide clear, concise answers.
    - Offer to help them contact park management at (903) 703-8591 or book through our online inquiry form.`;

    // Construct chat history or simple model call
    const prompt = `System Context: ${systemInstruction}\n\nGuest Query: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Thank you for reaching out to South Fork 82 RV Park! Please call us directly at (903) 703-8591 for immediate assistance.";

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Gemini API error in /api/chat:", error);
    // Fallback response if API key is not configured or temporary error occurs
    res.json({
      reply: "Welcome to South Fork 82 RV Park in Blossom, TX! We offer full hookups (30/50 amp), Wi-Fi, laundry, and peaceful East Texas surroundings. For reservations or direct questions, please call us at (903) 703-8591 or email fox261@southfork82rvpark.com.",
    });
  }
});

// Contact & Reservation Inquiry API Endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, phone, stayType, checkIn, checkOut, rvLength, ampNeed, notes } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const confirmationId = "SF82-" + Math.floor(100000 + Math.random() * 900000);

  console.log("New Reservation / Contact Inquiry Received:", {
    confirmationId,
    name,
    email,
    phone,
    stayType,
    checkIn,
    checkOut,
    rvLength,
    ampNeed,
    notes,
    timestamp: new Date().toISOString(),
  });

  res.json({
    success: true,
    message: "Thank you for contacting South Fork 82 RV Park! Your inquiry has been received.",
    confirmationId,
    contactInfo: {
      phone: "(903) 703-8591",
      email: "fox261@southfork82rvpark.com",
    },
  });
});

// Start Express Server with Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`South Fork 82 RV Park server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
