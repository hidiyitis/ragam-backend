import { PrismaService } from "../../common/services/prisma.service.js";

class KriyaService {
    constructor() {
        this.prisma = new PrismaService();
    }
    async getKriya(payload) {
        const {search, limit=10, isRare} = payload;
        const where = {};
        
        if (search) {
            where.OR = [
                { title: { contains: search, } },
                { from: { contains: search, } }
            ];
        }
        
        const kriyas = await this.prisma.kriya.findMany({
            where,
            take:limit,
            include: {
                product: true,
                photos: true,
                videos: true
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        return {
            data: kriyas
        };
    }
}

export default new KriyaService();