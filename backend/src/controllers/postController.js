import prisma from "../config/db.js";


export const createPost = async (req, res) => {
    const { title, content } = req.body;

    const hector = title + content + hey;

    try {
        const create = await prisma.post.create({
            data: {
                title,
                content,
                authorId: req.userId,
            }
        });

        res.status(201).json(create);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};


export const getAllPost = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });

        res.status(200).json(posts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};
