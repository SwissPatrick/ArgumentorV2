
import { BookOpen, FileText, MessageCircle, Search, Shield } from "lucide-react";
import { ReactNode } from "react";

export const getBlockTypeDescription = (type: string): string => {
    switch(type) {
        case "premise":
            return "A basic statement or assumption that supports your main point.";
        case "conclusion":
            return "The position you're arguing for, derived from your premises.";
        case "evidence":
            return "Facts, data, or examples that support your premises.";
        case "objection":
            return "A counterargument or potential weakness in your reasoning.";
        case "rebuttal":
            return "Your response to objections, defending your original argument.";
        default:
            return "A component of your argument structure.";
    }
};

export const getSuggestionTypeIcon = (type: string): ReactNode => {
    switch(type) {
        case "premise":
            return <BookOpen className="h-4 w-4 text-blue-500 mr-2" />;
        case "conclusion":
            return <MessageCircle className="h-4 w-4 text-green-500 mr-2" />;
        case "evidence":
            return <Search className="h-4 w-4 text-purple-500 mr-2" />;
        case "objection":
            return <Shield className="h-4 w-4 rotate-180 text-amber-500 mr-2" />;
        case "rebuttal":
            return <Shield className="h-4 w-4 text-pink-500 mr-2" />;
        default:
            return <FileText className="h-4 w-4 text-gray-500 mr-2" />;
    }
};

export const getPlaceholderText = (type: string): string => {
    switch(type) {
        case "premise":
            return "E.g., 'Generate a premise about the impact of technology on privacy'";
        case "conclusion":
            return "E.g., 'Create a conclusion that follows from my existing premises'";
        case "evidence":
            return "E.g., 'Find statistical evidence about climate change from peer-reviewed sources'";
        case "objection":
            return "E.g., 'What counterarguments might be raised against my main point?'";
        case "rebuttal":
            return "E.g., 'How to respond to the objection that correlation doesn't imply causation'";
        default:
            return "Enter specific details to guide the AI suggestion";
    }
};

// Add this line to alias getBlockTypeDescription as getSuggestionTypeDescription for backward compatibility
export const getSuggestionTypeDescription = getBlockTypeDescription;
