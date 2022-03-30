import Token from "../models/TokenModel.js";
import jwt from "jsonwebtoken";

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'10d'});
        return{
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const user = await Token.findOne({user:userId});

        if(user){
            user.refreshToken = refreshToken;
            return user.save();
        }

        const token = await Token.create({user:userId, refreshToken})
        return token;
    }
}

export default new TokenService();