import UserModel from "../models/UserModel.js";
import TokenService from "./TokenService.js";
import bcrypt from "bcrypt";
import UserDto from "../dto/userDto.js";
import ApiError from "../exceptions/ApiError.js";
import TokenModel from "../models/TokenModel.js";

class AuthorizationService {
    async registration(username, password) {
        const candidate = await UserModel.findOne({ username });

        if (candidate) {
            throw ApiError.badRequest(`There is already registred a user with such 'username' - ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({ username, password: hashedPassword });

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto.id });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(username, password) {
        const user = await UserModel.findOne({ username });

        if (!user) {
            throw ApiError.badRequest(`There isn't the user with such 'username' - ${username}`);
        }

        const passwordEquals = await bcrypt.compare(password, user.password);

        if (!passwordEquals) {
            throw ApiError.badRequest("Uncorrect password");
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDB) {
            throw ApiError.unauthorizedUser();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new AuthorizationService();