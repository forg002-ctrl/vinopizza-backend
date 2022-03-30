import AuthorizationService from "../services/AuthorizationService.js";
import ApiError from "../error/ApiError.js"

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

            const userData = AuthorizationService.registration(username, password);

            res.cookie('refreshToken', (await userData).refreshToken, {maxAge: 10*24*60*60*1000, httpOnly:true});
            res.status(200);
            return res.json(userData);
        } 
        catch (error) {
            next(error);
        } 
    }

    async login(req, res, next){

    }

    async logout(req, res, next){

    }

    async refresh(req, res, next){

    }

    async test(req, res, next){ //endpoint made for test(should work only for authorized users)

    }
}

export default new AuthorizationController();