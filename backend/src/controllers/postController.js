import prisma from "../config/db.js";


export const createPost = async (req, res) =>{

    const { title, content } = req.body;

    try{
        const create = await prisma.post.create({
            data: {
                title,
                content,
                authorId : req.userId,
            }
        });

        res.status(201).json(create);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Something went wrong!"});
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