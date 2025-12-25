import prisma from "../config/db.js";
import bcrypt from 'bcrypt';
import { json } from "express";
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) =>{
    const { email, password } = req.body;


    try{
        const userExist = await prisma.user.findUnique({
            where: {email},
        });

        if(userExist){
            return res.status(400).json({message: "User already exists!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await prisma.user.create({
            data: {
                email,
                password,
            }
        });

        res.status(201).json({message: "User created successfully!"});

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Something went wrong!"});
    }
};


export const loginUser = async (req, res) =>{
    const { email, password } = req.body;


    try{
        const userExist = await prisma.user.findUnique({
            where: {email},
        });

        if(!userExist){
            return res.status(404).json({message: "Invalid Credentials!"});
        }

        const isValidPassword = await bcrypt.compare(password, userExist.password);

        if(!isValidPassword){
            return res.status(404).json({message: "Invalid Credentials!"});
        }

        const token = jwt.sign({userId: userExist.id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.status(200).json({message: "User logged in Successfully", token});

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Something went wrong!"});
    }
};