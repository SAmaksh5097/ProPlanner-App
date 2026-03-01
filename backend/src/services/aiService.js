const { GoogleGenAI } = require("@google/genai");

// Initialize the new SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateProjectPlan = async (projectData) => {
    try {
        const { title, description, tech_stack, deadline } = projectData;

        // Calculate days
        const daysUntilDeadline = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
        const plannedDays = daysUntilDeadline > 0 ? daysUntilDeadline : 7;

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
                You are an expert technical project manager/planner for a tech firm.
                Your task is to break down a project into a structured, realistic, day-wise execution plan.
                Keep the skill level from beginner to intermediate.
                User must be able to follow the plan without needing to search for additional resources.
                User must learn how production development works in real life.
                Ensure correct sequencing (backend before integration, schema before API, etc). 
                Project: ${title}
                Description: ${description}
                Tech: ${tech_stack}
                Duration: ${plannedDays} days

                Create a daily roadmap. Each task MUST have 3-5 detailed implementation subTasks.
                Return ONLY a JSON array with this structure:
                [
                  {
                    "dayNumber": 1,
                    "tasks": [
                      { 
                        "title": "Task name", 
                        "timeEstimate": "1hr", 
                        "completed": false,
                        "subTasks": [
                          { "title": "Detailed step 1", "completed": false },
                          { "title": "Detailed step 2", "completed": false }
                        ]
                      }
                    ]
                  }
                ]
            `,
        });

        let text = response.text;
        if (text.includes('```')) {
            text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
        }
        return JSON.parse(text);

    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error("Failed to generate project plan");
    }
};

const rescheduleProjectPlan = async (projectData) => {
    try {
        const { title, description, tech_stack, deadline, completedTasks } = projectData;

        const daysUntilDeadline = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
        const plannedDays = daysUntilDeadline > 0 ? daysUntilDeadline : 7;

        const completedSection = completedTasks && completedTasks.length > 0
            ? `Already completed tasks (mark these as completed: true and place on Day 1): ${completedTasks.join(', ')}`
            : 'No tasks completed yet.';

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
                You are a senior project manager rescheduling an existing project.
                Project: ${title}
                Description: ${description}
                Tech: ${tech_stack}
                Duration: ${plannedDays} days starting from today

                ${completedSection}

                Create a NEW daily roadmap considering what's already done.
                Completed tasks should appear on Day 1 with completed: true.
                Remaining and new tasks should be distributed across all ${plannedDays} days.
                Each task MUST have 3-5 detailed implementation subTasks.

                Return ONLY a JSON array with this structure:
                [
                  {
                    "dayNumber": 1,
                    "tasks": [
                      { 
                        "title": "Task name", 
                        "timeEstimate": "1hr", 
                        "completed": false,
                        "subTasks": [
                          { "title": "Detailed step 1", "completed": false },
                          { "title": "Detailed step 2", "completed": false }
                        ]
                      }
                    ]
                  }
                ]
            `,
        });

        let text = response.text;
        if (text.includes('```')) {
            text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
        }
        return JSON.parse(text);

    } catch (error) {
        console.error("AI Reschedule Error:", error);
        throw new Error("Failed to reschedule project plan");
    }
};

module.exports = { generateProjectPlan, rescheduleProjectPlan };