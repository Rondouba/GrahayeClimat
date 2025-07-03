import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface BlogCardProps {
    date: string;
    title: string;
    tag: string;
    description: string;
    imageUrl?: string;
    details: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ date, title, tag, description, imageUrl, details }) => (
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

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/blog/posts`);
                const data = await response.json();
                setPosts(data.slice(0, 3)); // Show only 3 posts on homepage
            } catch (error) {
                console.error("Failed to fetch blog posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <section>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Blog</h2>
                {/* <a href="#" className="flex items-center gap-2 text-teal-300 hover:text-white transition-colors">
                    <span>Voir tout</span>
                    <ArrowRightIcon className="w-4 h-4" />
                </a> */}

                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent("goToBlog"));
                    }}
                    className="flex items-center gap-2 text-teal-300 hover:text-white transition-colors"
                >
                    <span>Voir tout</span>
                    <ArrowRightIcon className="w-4 h-4" />
                </a>


            </div>
            {loading ? (
                <div className="text-center text-gray-400">Chargement du blog...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <BlogCard key={index} {...post} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Blog;