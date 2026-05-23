export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt, portfolio } = req.body;

    const userPrompt = `
${prompt}

Investment data:
${JSON.stringify(portfolio, null, 2)}

Important: This is for personal educational monitoring only. Do not present as guaranteed financial advice.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "You are a careful investment dashboard assistant. Be concise, practical, and risk-aware. Do not guarantee returns."
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        temperature: 0.4
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "OpenAI API error"
      });
    }

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response."
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
