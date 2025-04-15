
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArticlesList } from "@/components/tutorials/ArticlesList";
import { ArticleDetail } from "@/components/tutorials/ArticleDetail";
import { ContactCTA } from "@/components/tutorials/ContactCTA";
import { PageHeader } from "@/components/tutorials/PageHeader";
import { articlesData } from "@/components/tutorials/articlesData";
import { Helmet } from "react-helmet-async";

const Tutorials = () => {
    const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

    const handleSelectArticle = (id: number) => {
        setSelectedArticle(id);
        // Scroll to top when selecting an article
        window.scrollTo(0, 0);
    };

    const handleBackToArticles = () => {
        setSelectedArticle(null);
    };

    const renderContent = () => {
        if (selectedArticle === null) {
            return (
                <>
                    <Helmet>
                        <title>Argumentor Articles - Learn About Argument Building</title>
                        <meta name="description" content="Browse our collection of articles and tutorials about building strong arguments, avoiding logical fallacies, and improving your critical thinking skills." />
                    </Helmet>
                    <ArticlesList
                        articles={articlesData}
                        onSelectArticle={handleSelectArticle}
                    />
                    <ContactCTA />
                </>
            );
        } else {
            const article = articlesData.find(t => t.id === selectedArticle);

            if (!article) return null;

            return (
                <>
                    <Helmet>
                        <title>{`${article.title} - Argumentor Articles`}</title>
                        <meta name="description" content={article.description} />
                        <meta property="og:title" content={`${article.title} - Argumentor Articles`} />
                        <meta property="og:description" content={article.description} />
                        <meta name="twitter:title" content={`${article.title} - Argumentor Articles`} />
                        <meta name="twitter:description" content={article.description} />
                    </Helmet>
                    <ArticleDetail
                        article={article}
                        onBack={handleBackToArticles}
                    />
                </>
            );
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <PageHeader />

                <section className="py-16">
                    <div className="container px-4">
                        {renderContent()}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Tutorials;
