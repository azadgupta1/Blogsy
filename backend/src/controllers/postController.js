import prisma from "../config/db.js";

/**
 * Creates a new post.
 * Requires title and content in the request body, and an authenticated user (req.userId).
 */
export const createPost = async (req, res) => {
    const { title, content } = req.body;

    // Basic input validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: "Title is required and must be a non-empty string." });
    }
    if (!content || typeof content !== 'string' || content.trim() === '') {
        return res.status(400).json({ message: "Content is required and must be a non-empty string." });
    }

    // Ensure `req.userId` is present, indicating authentication middleware has run
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized: User ID not found. Please log in." });
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                title: title.trim(), // Trim whitespace from title
                content: content.trim(), // Trim whitespace from content
                authorId: req.userId,
            },
            // Optionally include author details in the response
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        // Add other author fields if needed, e.g., email
                    },
                },
            },
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error); // More descriptive error logging
        res.status(500).json({ message: "Failed to create post. Please try again later." });
    }
};

/**
 * Retrieves all posts, ordered by creation date descending.
 * Includes author details for each post.
 */
export const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
            // Include author details for each post
            include: {
                author: {
                    select: {
                        id: true,
                        username: true, // Select username or other relevant author info
                        // email: true, // uncomment if email is also desired
                    },
                },
            },
        });

        res.status(200).json(posts);

    } catch (error) {
        console.error("Error fetching posts:", error); // More descriptive error logging
        res.status(500).json({ message: "Failed to retrieve posts. Please try again later." });
    }
};