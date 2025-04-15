
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

export interface Article {
    id: number;
    title: string;
    description: string;
    type: string;
    duration: string;
    icon: LucideIcon;
    content: string;
    keywords?: string[]; // Added for SEO
    publishedDate?: string; // Added for SEO
}

interface ArticleCardProps {
    article: Article;
    onSelect: (id: number) => void;
}

export const ArticleCard = ({ article, onSelect }: ArticleCardProps) => {
    return (
        <article
            className="group relative bg-card rounded-lg shadow-md overflow-hidden border border-border hover:border-primary/40 transition-colors"
            itemScope
            itemType="https://schema.org/Article"
        >
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <article.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-muted-foreground">
            <meta itemProp="articleSection" content={article.type} />
                        {article.type.charAt(0).toUpperCase() + article.type.slice(1)} • {article.duration}
                        {article.publishedDate && (
                            <time
                                dateTime={article.publishedDate}
                                itemProp="datePublished"
                                className="sr-only"
                            >
                                {article.publishedDate}
                            </time>
                        )}
          </span>
                </div>
                <h3
                    className="text-xl font-bold mb-2 group-hover:text-primary transition-colors"
                    itemProp="headline"
                >
                    {article.title}
                </h3>
                <p
                    className="text-muted-foreground mb-4"
                    itemProp="description"
                >
                    {article.description}
                </p>
                <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => onSelect(article.id)}
                >
                    Read Article <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Button>
            </div>
        </article>
    );
};
