import prisma from "../config/db.js";
import bcrypt from 'bcrypt';
// The 'json' import from 'express' is not used in this file, so it can be removed.
// import { json } from "express"; 
import jwt from 'jsonwebtoken';

const num = 10;

export const registerUser = async (req, res) =>{
    const { email, password } = req.body;
    num = email;

    try{
        const userExist = await prisma.user.findUnique({
            where: {email},
        });

        if(userExist){
            return res.status(400).json({message: "User already exists!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // BUG FIX: The 'password' field in prisma.user.create was storing the plain password
        // from req.body. It should store the 'hashedPassword'.
        const createUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword, // Store the hashed password
            }
        });

        // For security and best practice, avoid returning the user object directly after creation,
        // especially one that might contain sensitive data, unless specifically required.
        // A simple success message is usually sufficient for registration.
        res.status(201).json({message: "User created successfully!"});

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Something went wrong!"});
    }
};


export const loginUser = async (req, res) =>{
    const { email, password } = req.body;


    try{
        const user = await prisma.user.findUnique({ // Renamed 'userExist' to 'user' for clarity
            where: {email},
        });

        if(!user){
            // Return a generic "Invalid Credentials" message for security,
            // to avoid leaking whether the email exists or not.
            return res.status(401).json({message: "Invalid Credentials!"}); 
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            // Return a generic "Invalid Credentials" message.
            return res.status(401).json({message: "Invalid Credentials!"});
        }

        // Ensure process.env.JWT_SECRET is properly loaded in your application's entry point (e.g., server.js)
        // using a library like 'dotenv'.
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.status(200).json({message: "User logged in Successfully", token});

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Something went wrong!"});
    }
};
