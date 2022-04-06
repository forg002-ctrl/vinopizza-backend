import AuthorizationService from "../services/AuthorizationService.js";
import ApiError from "../exceptions/ApiError.js"
import TokenModel from "../models/TokenModel.js";
import TokenService from "../services/TokenService.js";

class AuthorizationController {
    async registration(req, res, next){
        try {
            const { username, password } = req.body;

            if(!username){
                next(ApiError.badRequest("You haven't filled the field 'username'"));
                return;
            }

            if(!password){
                next(ApiError.badRequest("You haven't filled the field 'password'"));
                return;
            }
            
            const userData = AuthorizationService.registration(username, password)

            res.cookie('refreshToken', (await userData).refreshToken, {maxAge: 10*24*60*60*1000, httpOnly:true});
            res.status(200);

            return res.json(await(userData));
        } 
        catch (error) {
            next(error);
        } 
    }

    async login(req, res, next){
        try{
            const {username, password} = req.body;
            
            if(!username){
                next(ApiError.badRequest("You haven't filled the field 'username'"));
                return;
            }

            if(!password){
                next(ApiError.badRequest("You haven't filled the field 'password'"));
                return;
            }

            const userData = await AuthorizationService.login(username, password);
            res.cookie('refreshToken', (await userData).refreshToken, {maxAge: 10*24*60*60*1000, httpOnly:true});
            res.status(200);

            return res.json(await(userData));
        }catch(error){
            next(error);
        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;

            if(!refreshToken){
                next(ApiError.badRequest("You haven't sent the refreshToken"));
                return;
            }

            const token = await AuthorizationService.logout(refreshToken);

            res.clearCookie('refreshToken');            
            res.status(200);
            return res.json(token);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next){
        const {refreshToken} = req.cookies;
        
        if(!refreshToken){
            next(ApiError.unauthorizedUser());
            return;
        }

        const userData = await AuthorizationService.refresh(refreshToken)
        res.cookie('refreshToken', (await userData).refreshToken, {maxAge: 10*24*60*60*1000, httpOnly:true});
        res.status(200);

        return res.json(await(userData));
    }

    async test(req, res, next){ //endpoint made for test(should work only for authorized users)
        const users = await AuthorizationService.test();
        return res.json(users);
    }
}

export default new AuthorizationController();