import { GoogleGenAI, Type } from "@google/genai";
import { BiasMetrics } from "./analyzerService";

const createGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is not configured for @google/genai");
  }

  return new GoogleGenAI({ apiKey });
};

export interface ExecutiveReport {
  summary: string;
  biasRisks: string[];
  recommendations: string[];
  businessImpact: string;
  ethicalConcerns: string;
}

export const generateExecutiveReport = async (metrics: BiasMetrics): Promise<ExecutiveReport> => {
  const prompt = `
    As a high-level professional AI Ethics Consultant, analyze the following fairness metrics from an AI model audit and generate a comprehensive executive report.
    
    METRICS DATA:
    - Total Rows Audited: ${metrics.totalRows}
    - Fairness Index (Disparate Impact Ratio): ${metrics.disparateImpactRatio.toFixed(3)}
    - Equal Opportunity Difference: ${metrics.equalOpportunityDifference.toFixed(3)}
    - Approval Rates by Group: ${JSON.stringify(metrics.approvalRateByGroup)}
    - Imbalanced Classes: ${JSON.stringify(metrics.imbalancedClasses)}
    - Data Gaps (Missing Values): ${JSON.stringify(metrics.missingValues)}
    
    Guidelines:
    1. The summary should be concise yet authoritative.
    2. Bias risks should identify specific groups affected.
    3. Recommendations should be actionable correction protocols.
    4. Business impact should discuss legal, reputational, and operational risks.
    5. Ethical concerns should touch upon algorithmic transparency and social equity.
    
    Maintain a tone that is professional, objective, and consultative.
  `;

  try {
    const ai = createGenAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            biasRisks: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            recommendations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            businessImpact: { type: Type.STRING },
            ethicalConcerns: { type: Type.STRING }
          },
          required: ["summary", "biasRisks", "recommendations", "businessImpact", "ethicalConcerns"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No response text from Gemini");
    }

    return JSON.parse(response.text.trim()) as ExecutiveReport;
  } catch (error) {
    console.error("Gemini Report Generation Error:", error);
    throw error;
  }
};
