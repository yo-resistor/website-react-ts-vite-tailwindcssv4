export interface Author {
    name: string;
    avatarUrl?: string;
    profileUrl?: string;
}
export interface Post {
    slug: string;
    title: string;
    date: string;
    author: Author;
    tags: string[];
    excerpt: string;
    readingTime: string;
    commentsCount: number;
    imageUrl?: string;
    mdxFile: string;
}
export declare const posts: Post[];
export declare const getPostBySlug: (slug: string) => Post | undefined;
export declare const formatDate: (dateString: string) => string;
