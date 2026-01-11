// controllers/chatController.js
import Book from "../models/BookModel.js";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const GROQ_MODEL = process.env.GROQ_MODEL || null;

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ reply: "Please send a text message in the request body.", action: null });
    }

    const raw = message.trim();
    const user = raw.toLowerCase();

    // simple intent detectors
    const isGreeting = /\b(hi|hello|hey|hey there)\b/.test(user);
    const isHelp = /\b(help|what can you do|how do i use)\b/.test(user);
    const isNavigate = /\b(open|go to|navigate to|take me to|show me)\b/i.test(user) && /\b(page|section|history|science|fantasy|biography|books?)\b/i.test(user);
    const wantsAvailability = /\b(available|in stock|have|do you have|any)\b/i.test(user) && /\b(book|books)\b/i.test(user);

    // detect category (for nav or availability or recommendations)
    const categories = ["history", "fiction", "romance", "thriller", "science", "technology", "kids", "comics", "fantasy", "biography"];
    const foundCategory = categories.find((c) => user.includes(c));

    // detect price
    const priceMatch = user.match(/under\s*(?:₹|\s)?\s*([\d,]+)/i);
    let priceLimit = null;
    if (priceMatch) priceLimit = parseInt(priceMatch[1].replace(/,/g, ""), 10);

    // 1) GREETING
    if (isGreeting) {
      return res.json({ reply: "Hey! I'm BookBot 🤖. Ask me to recommend books, check availability, or say 'open History page'.", action: null });
    }

    // 2) HELP
    if (isHelp) {
      return res.json({
        reply:
          "I can: recommend books (e.g. 'recommend thriller books under 300'), check availability (e.g. 'are history books available?'), or open pages (e.g. 'open History page').",
        action: null,
      });
    }

    // 3) NAVIGATION
    if (isNavigate && foundCategory) {
      // map category to frontend route (adjust as your routes)
      const routeMap = {
        history: "/books?category=history",
        fiction: "/books?category=fiction",
        romance: "/books?category=romance",
        thriller: "/books?category=thriller",
        science: "/books?category=science",
        technology: "/books?category=technology",
        kids: "/books?category=kids",
        comics: "/books?category=comics",
        fantasy: "/books?category=fantasy",
        biography: "/books?category=biography",
      };
      const target = routeMap[foundCategory] || "/books";
      return res.json({ reply: `Opening ${foundCategory} page...`, action: { type: "navigate", target } });
    }

    // 4) AVAILABILITY CHECK (query DB)
    if (wantsAvailability) {
      // prepare query
      const q = {};
      if (foundCategory) q.category = new RegExp(foundCategory, "i");
      if (priceLimit !== null) q.price = { $lte: priceLimit };

      const count = await Book.countDocuments(q);
      if (count === 0) {
        return res.json({
          reply: `Sorry — I couldn't find any ${foundCategory ? foundCategory + " " : ""}books${priceLimit ? " under ₹" + priceLimit : ""}.`,
          action: null,
        });
      }
      // return top 3 sample titles
      const books = await Book.find(q).limit(3).lean();
      const bookList = books.map((b, i) => `${i + 1}. ${b.title} (${b.author}) - ₹${b.price ?? "N/A"}`).join("\n");
      return res.json({
        reply: `Yes — we have ${count} ${foundCategory ? foundCategory + " " : ""}book(s). Here are a few:\n${bookList}`,
        action: null,
      });
    }

    // 5) RECOMMEND (existing logic)
    if (user.includes("recommend") || user.includes("suggest")) {
      const q = {};
      if (foundCategory) q.category = new RegExp(foundCategory, "i");
      if (priceLimit !== null) q.price = { $lte: priceLimit };

      const books = await Book.find(q).limit(5).lean();
      if (!books || books.length === 0) {
        return res.json({
          reply: `Sorry, I couldn’t find any books${foundCategory ? " in " + foundCategory : ""}${priceLimit ? " under ₹" + priceLimit : ""}.`,
          action: null,
        });
      }
      const bookList = books.map((b, i) => `${i + 1}. ${b.title} (${b.author}) - ₹${b.price ?? "N/A"}`).join("\n");
      return res.json({ reply: `Here are some ${foundCategory ? foundCategory + " " : ""}books${priceLimit ? " under ₹" + priceLimit : ""}:\n${bookList}`, action: null });
    }

    // 6) FALLBACK: use Groq for conversational reply (if configured)
    if (process.env.GROQ_API_KEY) {
      const model = GROQ_MODEL || "llama3-8b-8192";
      const prompt = `You are BookBot, a friendly assistant for BookVerse. User: "${raw}". Keep the reply short (1-2 sentences).`;
      try {
        const response = await groq.chat.completions.create({
          model,
          messages: [{ role: "system", content: "You are BookBot, concise and helpful." }, { role: "user", content: prompt }],
          temperature: 0.2,
          max_tokens: 200,
        });
        const reply = response?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a reply right now.";
        return res.json({ reply, action: null });
      } catch (aiErr) {
        console.error("Groq API error:", aiErr);
        return res.json({ reply: "I'm having trouble generating a response at the moment. Try asking for book recommendations or say 'help'.", action: null });
      }
    }

    // FINAL fallback if no Groq configured
    return res.json({ reply: "I'm still learning. Ask for recommendations or say 'help' to see examples.", action: null });
  } catch (err) {
    console.error("Chat controller error:", err);
    return res.status(500).json({ reply: "⚠️ Something went wrong on the server.", action: null });
  }
};
