import { PrismaService } from "../../common/services/prisma.service.js";
import err from "../../base_classes/base-error.js";
class KriyaService {
    error = err;
    constructor() {
        this.prisma = new PrismaService();
    }

   async getKriya(payload) {
        const { search, limit = 10, isRare, page = 1 } = payload;
        const where = {};
        const safeLimit = Math.min(limit, 100);
        const skip = (page - 1) * safeLimit;

        try {
            if (isRare) {
                where.isUnderated = true;
            }

            if (search) {
                where.OR = [
                    { title: { contains: search, mode: 'insensitive' } },
                    { from: { contains: search, mode: 'insensitive' } }
                ];
            }

            const [kriyas, total] = await Promise.all([
                this.prisma.kriya.findMany({
                    where,
                    skip,
                    take: safeLimit,
                    include: {
                        product: true,
                        photos: true,
                        videos: true
                    },
                    orderBy: { created_at: 'desc' }
                }),
                this.prisma.kriya.count({ where })
            ]);

            return {
                data: kriyas,
                pagination: {
                    total,
                    page,
                    size: safeLimit,
                    totalPages: Math.ceil(total / safeLimit)
                }
            };

        } catch (error) {
            console.log('Kriya retrieval failed:', error);
            throw error;
        }
    }

    async getKriyaById(payload) {
        const {id} = payload;
        try {
            const result = await this.prisma.kriya.findUnique({ where: {id: Number(id)},include:{
                videos:{
                    where: {
                        isTutorial: false
                    }
                },
                photos: true,
            }});
            return result
        } catch (error) {
            console.log('Kriya retrieval failed:', error);
            throw error;
        }
    }

    async getKriyaByName(payload) {
        const {title} = payload;
        console.log(title);
        
        try {
            const result = await this.prisma.kriya.findFirst({ where: {title: title}, include:{
                videos:{
                    where: {
                        isTutorial: false
                    }
                },
                photos: true,
            }});
            return result
        } catch (error) {
            console.log('Kriya retrieval failed:', error);
            throw error;
        }
    }
}

export default new KriyaService();