
// Define the ArgumentBlock type for template blocks
export interface ArgumentBlock {
    id: string;
    type: string; // This is more flexible for templates but will be cast to specific types when used
    content: string;
    title: string;
}

export interface ArgumentTemplate {
    id: string;
    title: string;
    description: string;
    isPremium: boolean;
    blocks: ArgumentBlock[];
}

export const argumentTemplates: ArgumentTemplate[] = [
    {
        id: "policy-proposal",
        title: "Policy Proposal",
        description: "A structured template for proposing and defending policy changes",
        isPremium: true,
        blocks: [
            {
                id: "intro",
                type: "introduction",
                content: "Write a brief introduction to the policy issue here, explaining why it matters.",
                title: "Introduction to the Issue"
            },
            {
                id: "background",
                type: "context",
                content: "Provide relevant background information and context about the current situation.",
                title: "Background & Context"
            },
            {
                id: "problem",
                type: "problem",
                content: "Clearly define the problem that needs to be addressed by this policy.",
                title: "Problem Statement"
            },
            {
                id: "solution",
                type: "proposal",
                content: "Present your proposed policy solution with specific details.",
                title: "Policy Solution"
            },
            {
                id: "benefits",
                type: "evidence",
                content: "Outline the key benefits and positive outcomes of implementing this policy.",
                title: "Benefits & Outcomes"
            },
            {
                id: "counter",
                type: "counterargument",
                content: "Address potential objections or criticisms to your policy proposal.",
                title: "Addressing Concerns"
            },
            {
                id: "implementation",
                type: "explanation",
                content: "Explain how the policy would be implemented, including timeline and resources.",
                title: "Implementation Plan"
            },
            {
                id: "conclusion",
                type: "conclusion",
                content: "Summarize your argument and call for action on this policy proposal.",
                title: "Conclusion & Call to Action"
            }
        ]
    },
    {
        id: "academic-research",
        title: "Academic Research Argument",
        description: "Structured for academic papers and research-based arguments",
        isPremium: true,
        blocks: [
            {
                id: "abstract",
                type: "introduction",
                content: "Provide a brief summary of your research question, methods, and findings.",
                title: "Abstract"
            },
            {
                id: "intro",
                type: "context",
                content: "Introduce your research topic and its significance in the broader academic context.",
                title: "Introduction"
            },
            {
                id: "lit-review",
                type: "evidence",
                content: "Summarize relevant existing research and theories that inform your argument.",
                title: "Literature Review"
            },
            {
                id: "methodology",
                type: "explanation",
                content: "Describe your research methods and approach to investigating the question.",
                title: "Methodology"
            },
            {
                id: "findings",
                type: "evidence",
                content: "Present the key findings or results from your research.",
                title: "Findings/Results"
            },
            {
                id: "analysis",
                type: "explanation",
                content: "Analyze the significance and implications of your findings.",
                title: "Analysis"
            },
            {
                id: "limitations",
                type: "counterargument",
                content: "Acknowledge limitations of your research and address potential criticisms.",
                title: "Limitations"
            },
            {
                id: "conclusion",
                type: "conclusion",
                content: "Summarize your argument and discuss implications for future research.",
                title: "Conclusion"
            }
        ]
    },
    {
        id: "persuasive-speech",
        title: "Persuasive Speech",
        description: "Optimized structure for delivering a compelling persuasive speech",
        isPremium: true,
        blocks: [
            {
                id: "hook",
                type: "introduction",
                content: "Start with a powerful hook to grab audience attention (story, statistic, question).",
                title: "Attention-Grabbing Hook"
            },
            {
                id: "thesis",
                type: "claim",
                content: "Clearly state your main argument or position that you want the audience to adopt.",
                title: "Thesis Statement"
            },
            {
                id: "credibility",
                type: "context",
                content: "Establish your credibility and why the audience should listen to you on this topic.",
                title: "Establish Credibility"
            },
            {
                id: "point1",
                type: "evidence",
                content: "Present your first main supporting point with evidence.",
                title: "First Main Point"
            },
            {
                id: "point2",
                type: "evidence",
                content: "Present your second main supporting point with evidence.",
                title: "Second Main Point"
            },
            {
                id: "point3",
                type: "evidence",
                content: "Present your third main supporting point with evidence.",
                title: "Third Main Point"
            },
            {
                id: "objections",
                type: "counterargument",
                content: "Acknowledge and refute potential objections to your argument.",
                title: "Address Objections"
            },
            {
                id: "close",
                type: "conclusion",
                content: "End with a powerful conclusion that reinforces your main message and includes a clear call to action.",
                title: "Conclusion & Call to Action"
            }
        ]
    },
    {
        id: "basic-argument",
        title: "Basic Argument Structure",
        description: "Simple five-part structure for general arguments",
        isPremium: false,
        blocks: [
            {
                id: "intro",
                type: "introduction",
                content: "Introduce your topic and provide some context for your argument.",
                title: "Introduction"
            },
            {
                id: "claim",
                type: "claim",
                content: "State your main claim or thesis clearly and concisely.",
                title: "Main Claim"
            },
            {
                id: "evidence",
                type: "evidence",
                content: "Present evidence and reasoning to support your claim.",
                title: "Supporting Evidence"
            },
            {
                id: "counter",
                type: "counterargument",
                content: "Address potential counterarguments to strengthen your position.",
                title: "Counterarguments"
            },
            {
                id: "conclusion",
                type: "conclusion",
                content: "Summarize your argument and restate your main point.",
                title: "Conclusion"
            }
        ]
    }
];

export const getPremiumTemplates = (): ArgumentTemplate[] => {
    return argumentTemplates.filter(template => template.isPremium);
};

export const getFreeTemplates = (): ArgumentTemplate[] => {
    return argumentTemplates.filter(template => !template.isPremium);
};

export const getAllTemplates = (): ArgumentTemplate[] => {
    return argumentTemplates;
};

export const getTemplateById = (id: string): ArgumentTemplate | undefined => {
    return argumentTemplates.find(template => template.id === id);
};
