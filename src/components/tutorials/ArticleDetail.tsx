
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Article } from "./ArticleCard";

interface ArticleDetailProps {
    article: Article;
    onBack: () => void;
}

export const ArticleDetail = ({ article, onBack }: ArticleDetailProps) => {
    return (
        <div className="bg-card rounded-lg shadow-md border border-border overflow-hidden">
            <div className="p-6 md:p-8">
                <Button
                    variant="ghost"
                    size="sm"
                    className="mb-6"
                    onClick={onBack}
                >
                    <ChevronLeft className="mr-1 h-4 w-4" /> Back to articles
                </Button>

                <div
                    className="prose prose-gray max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </div>
    );
};
