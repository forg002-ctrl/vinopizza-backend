import User from "../models/UserModel.js";
import TokenService from "./TokenService.js";
import bcrypt from "bcrypt";
import UserDto from "../dto/userDto.js";
import ApiError from "../error/ApiError.js";

class AuthorizationService{
    async registration(username, password){
        const candidate = await User.findOne({username});

        if(candidate){
            throw ApiError.badRequest(`There is already registred a user with such username - ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, 3); 
        const user = await User.create({username, password: hashedPassword});

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto.id});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return{
            ...tokens,
            user: userDto
        }
    }
}

export default new AuthorizationService();