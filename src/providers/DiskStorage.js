const fs = require('fs');
const path = require('path');
const uploadConfig = require('../configs/upload');
const AppError = require('../utils/AppError');

class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )

        return file
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        try {
            await fs.promises.unlink(
                path.resolve(uploadConfig.UPLOADS_FOLDER, file)
            )
            
        } catch  {
            return
        }

        await fs.promises.unlink(filePath)
    }
}

module.exports = new DiskStorage
