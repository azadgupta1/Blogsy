import jwt from 'jsonwebtoken';


export const authenticate = (req, res, next) =>{
    
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Authorization token required!"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();

    }catch(error){
        return res.status(401).json({message: "Invalid or expired token!"});
    }
    
}