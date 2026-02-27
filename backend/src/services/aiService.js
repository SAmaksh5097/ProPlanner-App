const {GoogleGenerativeAI} = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Calls the Gemini API to generate a structured daily project plan.
 * @param {Object} projectData - Contains title, description, techStack, and deadline
 * @returns {Array} - An array of Day objects containing Tasks
 */
const generateProjectPlan = async (projectData) => {
    try {
        const { title, description, techStack, deadline } = projectData;

        // Calculate roughly how many days we have until the deadline
        const daysUntilDeadline = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
        const plannedDays = daysUntilDeadline > 0 ? daysUntilDeadline : 7; // Default to 7 days if deadline is weird

        // We use gemini-1.5-flash because it is incredibly fast and great at JSON tasks
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            // This is the magic config that forces Gemini to output pure JSON
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        // The System Prompt: Telling Gemini exactly what we want and how to format it
        const prompt = `
            You are an expert technical project manager and senior software engineer. 
            I need you to break down a project into a structured, day-by-day execution plan.

            Project Title: ${title}
            Description: ${description}
            Tech Stack: ${techStack.join(', ')}
            Total Days Available: ${plannedDays}

            Instructions:
            1. Create a logical, sequential daily roadmap for this project.
            2. Break the work down across the total days available.
            3. For each day, provide 2 to 5 actionable, specific tasks.
            4. Assign a realistic time estimate to each task (e.g., "1.5 hrs", "45 mins").
            5. Return the response STRICTLY as a JSON array of objects matching the exact structure below.

            Expected JSON Structure:
            [
              {
                "dayNumber": 1,
                "tasks": [
                  {
                    "title": "Set up GitHub repo and initialize project",
                    "timeEstimate": "1 hr"
                  },
                  {
                    "title": "Configure database connection",
                    "timeEstimate": "45 mins"
                  }
                ]
              }
            ]
        `;

        // Send the prompt to Gemini
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Because we used responseMimeType: "application/json", we can safely parse this directly
        const parsedPlan = JSON.parse(responseText);

        return parsedPlan;

    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error("Failed to generate project plan from AI");
    }
};

module.exports = {
    generateProjectPlan
};