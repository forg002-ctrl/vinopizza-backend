import * as uuid from "uuid";
import * as path from "path";
import fs from "fs";

class FileService{
    saveFile(file){
        try{
            const fileName = uuid.v4() + ".jpg";
            const filePath = path.resolve('../API/static', fileName);
            file.mv(filePath);
            return fileName;
        } catch(error){
            console.log(error);
        }
    }

    deleteFile(fileName){
        try{
            const filePath = path.resolve('../API/static', fileName);
            fs.unlink(filePath, function(err){
                if(err){
                    console.log(err);
                }
            });
        } catch(error){
            console.log(error);
        }
    }
}

export default new FileService();