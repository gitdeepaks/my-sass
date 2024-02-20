import { OpenAI } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Handler for POST requests
export async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 150,
    });

    return res.status(200).json(response.object);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Example of a main handler that delegates to specific method handlers
export default async function mainHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await handlePost(req, res);
      break;
    // case "GET": // Example for additional methods
    //   await handleGet(req, res);
    //   break;
    default:
      res.setHeader("Allow", ["POST"]); // Adjust based on supported methods
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
