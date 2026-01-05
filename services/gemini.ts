
import { GoogleGenAI, Type, FunctionDeclaration, GenerateContentParameters } from "@google/genai";

const bookEnquiryDeclaration: FunctionDeclaration = {
  name: 'bookEnquiry',
  parameters: {
    type: Type.OBJECT,
    description: 'Book a consultation or enquiry for a potential client. Call this only when you have the user\'s name, email, and a description of their project.',
    properties: {
      fullName: {
        type: Type.STRING,
        description: 'The full name of the client.'
      },
      email: {
        type: Type.STRING,
        description: 'The contact email address.'
      },
      projectType: {
        type: Type.STRING,
        description: 'The type of service they are interested in (e.g., Social Media, Production, Performance Marketing).'
      },
      details: {
        type: Type.STRING,
        description: 'Specific details about the client\'s needs or goals.'
      }
    },
    required: ['fullName', 'email', 'projectType', 'details'],
  },
};

export const getGeminiResponse = async (userMessage: string, history: any[] = []) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    
    const params: GenerateContentParameters = {
      model: "gemini-3-flash-preview",
      contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
      config: {
        systemInstruction: `You are Upliftr's elite Digital Strategy Assistant. Your primary mission is to provide information about our agency and help users BOOK ENQUIRIES.
        
        UPLIFTR SERVICES:
        - Social Media Management
        - Content Creation (Cinematic Reels & Static Posts)
        - Production Shoots (Commercial & Product)
        - Performance Marketing (Paid Ads & ROI)
        - Influencer Marketing (Social Reach & Engagement)

        BOOKING PROCESS:
        To book an enquiry, you MUST collect:
        1. Full Name
        2. Email Address
        3. Project Type (choose from our services)
        4. Brief details about their vision.

        When you have these 4 items, call the 'bookEnquiry' tool immediately. Be professional, minimalistic, and energetic. Always encourage the user to scale their brand with us.`,
        tools: [{ functionDeclarations: [bookEnquiryDeclaration] }],
        temperature: 0.7,
      },
    };

    const response = await ai.models.generateContent(params);
    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
