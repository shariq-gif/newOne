import { Client } from "@notionhq/client"
import { NextApiRequest, NextApiResponse } from 'next'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  const { message, from } = req.body

  // Safeguard against missing Notion database ID
  const databaseId = process.env.NOTION_DB_ID
  if (!databaseId) {
    console.error("NOTION_DB_ID is missing in the environment variables")
    return res.status(500).json({ error: "Notion database ID is missing" })
  }

  try {
    // Create a new page in the Notion database using Message and Date only
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        // Message should be passed as a title field
        Message: { title: [{ text: { content: message } }] },
        Date: { date: { start: new Date().toISOString() } },
      },
    })
    console.log("Notion response:", response)

    // Return a success response
    return res.status(200).json({ ok: true })
  } catch (err: unknown) {
    // Type assertion to cast `err` as an `Error`
    const error = err as Error;

    // Log detailed error information
    console.error("Error while creating Notion page:", error);

    // Return a 500 error with more information
    return res.status(500).json({
      error: "Failed to send affection",
      message: error.message || "Unknown error occurred",  // Default message if `message` is not available
    });
  }
}