const { GoogleGenAI } = require("@google/genai");

// Initialize the new SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateProjectPlan = async (projectData) => {
    try {
        const { title, description, tech_stack, deadline } = projectData;

        // Calculate days
        const daysUntilDeadline = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
        const plannedDays = daysUntilDeadline > 0 ? daysUntilDeadline : 7;

        // Use the model string that worked in your test
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
                You are a senior project manager. 
                Project: ${title}
                Description: ${description}
                Tech: ${tech_stack}
                Duration: ${plannedDays} days

                Create a daily roadmap. Return ONLY a JSON array with this structure:
                [
                  {
                    "dayNumber": 1,
                    "tasks": [
                      { "title": "Task name", "timeEstimate": "1hr", "completed": false }
                    ]
                  }
                ]
            `,
        });

        // The new SDK returns response.text (as a string)
        // We parse it to turn it into an object for MongoDB
        return JSON.parse(response.text);

    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error("Failed to generate project plan");
    }
};

module.exports = { generateProjectPlan };