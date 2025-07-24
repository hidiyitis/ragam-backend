import BaseError from "../../base_classes/base-error.js";
import { PrismaService } from "../../common/services/prisma.service.js";

class UserService {
    err = BaseError;
    constructor() {
        this.prisma = new PrismaService();
    }

    async getUserById(payload) {
        const {uid} = payload;
        try {
            const result = await this.prisma.user.findUnique({ 
                where: {uid: Number(uid)}, 
                include: {
                    portofolios: true
                }
            });
            return result
        } catch (error) {
            console.log('User retrieval failed:', error);
            throw error;
        }
    }

    async createUser(payload) {
        const {uid} = payload;
        try {
            const findUser = await this.prisma.user.findUnique({
                where: {
                    uid
                }
            })
            if (findUser) {
                throw this.err.badRequest('User Already Exist');
            }
            const result = await this.prisma.user.create({
                data: {
                    uid
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