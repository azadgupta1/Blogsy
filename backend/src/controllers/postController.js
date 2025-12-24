import prisma from "../config/db.js";


export const createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        // Validate input - basic check for presence
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required." });
        }

        // Assuming `req.userId` is populated by an authentication middleware
        // If not, this would be a missing feature or bug in the auth flow.
        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId: req.userId,
            }
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error); // More descriptive error logging
        res.status(500).json({ message: "Failed to create post. Please try again later." });
    }
};


export const getAllPosts = async (req, res) => { // Renamed to `getAllPosts` for plural consistency
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
            // Optionally, include author details
            // include: {
            //     author: {
            //         select: {
            //             id: true,
            //             username: true, // or name, email, etc.
            //         },
            //     },
            // },
        });

        res.status(200).json(posts);

    } catch (error) {
        console.error("Error fetching posts:", error); // More descriptive error logging
        res.status(500).json({ message: "Failed to retrieve posts. Please try again later." });
    }
};