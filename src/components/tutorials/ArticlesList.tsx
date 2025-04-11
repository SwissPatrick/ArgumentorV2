
import { ArticleCard, Article } from "./ArticleCard";

interface ArticlesListProps {
    articles: Article[];
    onSelectArticle: (id: number) => void;
}

export const ArticlesList = ({ articles, onSelectArticle }: ArticlesListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={onSelectArticle}
                />
            ))}
        </div>
    );
};
