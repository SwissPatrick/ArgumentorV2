
import { Scale } from "lucide-react";

interface ArgumentGradeProps {
    strength: number;
    grade: string;
    feedback: string;
}

export function ArgumentGrade({ strength, grade, feedback }: ArgumentGradeProps) {
    const getGradeColor = (grade: string) => {
        const gradeMap: {[key: string]: string} = {
            'A+': 'from-green-500 to-green-300',
            'A': 'from-green-500 to-green-300',
            'A-': 'from-green-500 to-green-300',
            'B+': 'from-blue-500 to-blue-300',
            'B': 'from-blue-500 to-blue-300',
            'B-': 'from-blue-500 to-blue-300',
            'C+': 'from-yellow-500 to-yellow-300',
            'C': 'from-yellow-500 to-yellow-300',
            'C-': 'from-yellow-500 to-yellow-300',
            'D+': 'from-orange-500 to-orange-300',
            'D': 'from-orange-500 to-orange-300',
            'D-': 'from-orange-500 to-orange-300',
            'F': 'from-red-500 to-red-300'
        };

        return gradeMap[grade] || 'from-gray-500 to-gray-300';
    };

    // Ensure strength is a number between 0 and 1
    // If it's already between 0-1, use as is; if it's 0-100, normalize it
    const normalizedStrength = typeof strength === 'number'
        ? (strength > 1 ? strength / 100 : strength)
        : 0;

    // Clamp the value between 0 and 1 for safety
    const clampedStrength = Math.max(0, Math.min(1, normalizedStrength));

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Argument Grade</h3>
                <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-primary" />
                    <div className={`px-4 py-1 rounded-full font-bold text-white bg-gradient-to-r ${getGradeColor(grade)}`}>
                        {grade}
                    </div>
                </div>
            </div>

            <div className="w-full h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-20 mb-1"></div>
            <div className="relative w-full h-4">
                <div
                    className={`absolute top-0 left-0 h-4 rounded-full bg-gradient-to-r ${getGradeColor(grade)}`}
                    style={{ width: `${clampedStrength * 100}%` }}
                ></div>
            </div>

            <p className="text-muted-foreground text-sm mt-3">
                {feedback}
            </p>
        </div>
    );
}
