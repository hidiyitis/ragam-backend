import BaseError from "../../base_classes/base-error.js";
import { PrismaService } from "../../common/services/prisma.service.js";
import StorageService from "../../common/services/gcp.service.js";

class UserService {
    err = BaseError;
    storageService =  StorageService
    constructor() {
        this.prisma = new PrismaService();
    }

    async getListPortofolio(payload) {
        const {uid} = payload;
        try {
            const result = await this.prisma.portofolio.findMany({ 
                where: {uid}, 
            });
            return result
        } catch (error) {
            console.log('User retrieval failed:', error);
            throw error;
        }
    }

    async createPortofolio(payload) {
        const {uid, file} = payload;
        try {
            const uploadImage = await this.storageService.uploadImage(file.buffer, file.originalname, 'portofolios/');
            const result = await this.prisma.portofolio.create({
                data:{
                    uid,
                    url: uploadImage.publicUrl
                }
            })
            return result
        } catch (error) {
            console.log('User create failed:', error);
            throw error;
        }
    }
}

export default new UserService();