
import React, { useState, useEffect } from 'react';

interface BlogCardProps {
  _id: string;
  date: string;
  title: string;
  tag: string;
  description: string;
  imageUrl?: string;
  details: string;
}

const BlogCard: React.FC<Omit<BlogCardProps, '_id'>> = ({ date, title, tag, description, imageUrl, details }) => (
    <div className="glass-card rounded-3xl p-5 flex flex-col h-full hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1">
        {imageUrl && (
            <div className="w-full h-40 rounded-2xl overflow-hidden mb-4">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>
        )}
        <p className="text-sm text-gray-400 mb-2">{new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        <h4 className="text-2xl font-bold mb-3 flex-grow">{title}</h4>
        <div className="mb-4">
            <span className="text-xs font-medium bg-white/10 text-teal-300 py-1 px-3 rounded-full">{tag}</span>
        </div>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        <a href="#" className="text-sm text-teal-300 hover:text-teal-200 transition-colors">{details}</a>
    </div>
);

const FilterButton: React.FC<{label: string; active?: boolean}> = ({ label, active }) => (
    <button className={`flex-shrink-0 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${active ? 'bg-teal-400/20 text-teal-300 ring-1 ring-teal-400' : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'}`}>
        {label}
    </button>
);

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/blog/posts`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch blog posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="space-y-16 md:space-y-24">
            {/* Hero Section */}
            <section className="text-center">
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                    Le Blog de Grahaye Climat+
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                   Analyses, reportages et solutions pour l'avenir de notre climat.
                </p>
            </section>

            {/* Filters */}
            <section className="flex flex-wrap justify-center gap-2 md:gap-4">
                <FilterButton label="Tous" active />
                <FilterButton label="Éducation" />
                <FilterButton label="Impact" />
                <FilterButton label="Solutions" />
                <FilterButton label="Science" />
            </section>

            {/* Blog Grid */}
            <section>
                {loading ? (
                    <div className="text-center text-gray-400">Chargement des articles...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <BlogCard key={post._id} {...post} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default BlogPage;