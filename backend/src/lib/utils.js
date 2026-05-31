import jwt from "jsonwebtoken";

export const generateToken=(userId,res)=>{
    // generate jwt token here
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie("jwt",token,{
        httpOnly:true,
        // secure cookies only in production
        secure: process.env.NODE_ENV === "production",
        // allow cross-site cookie in production via 'none' (requires https),
        // use 'lax' in development so the cookie is sent from the Vite dev server.
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge:7*24*60*60*1000 // 7 days
    });
    return token;
}