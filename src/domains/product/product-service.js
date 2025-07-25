import BaseError from "../../base_classes/base-error.js";
import { PrismaService } from "../../common/services/prisma.service.js";

class ProductService {
    err = BaseError;
    constructor() {
        this.prisma = new PrismaService();
    }

    async getListProduct(payload) {
        const { search, limit = 10, page = 1 } = payload;
        const where = {};
        const skip = (page - 1) * limit;

        try {
            if (search) {
                where.OR = [
                    { title: { contains: search.toString() } }
                ];
            }

            const [products, total] = await Promise.all([
                this.prisma.product.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { 
                        created_at: 'desc' 
                    },
                    include: {
                        photos: true
                    }
                }),
                this.prisma.product.count({ where })
            ]);

            return {
                data: products,
                pagination: {
                    total,
                    page,
                    size: limit,
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            console.error('Product retrieval failed:', error);
            throw error;
        }
    }

    async getProductById(payload) {
        const {id} = payload;
        try {
            const result = await this.prisma.product.findUnique({ where: {id: Number(id)}, include:{
                photos: {
                    take: 1
                },
                kriyas: {
                    select: {
                        title: true
                    }
                }
            }});
            return result
        } catch (error) {
            console.log('Product retrieval failed:', error);
            throw error;
        }
    }
}

export default new ProductService();