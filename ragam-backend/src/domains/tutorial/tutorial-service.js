import BaseError from "../../base_classes/base-error.js";
import { PrismaService } from "../../common/services/prisma.service.js";

class TutorialService {
    err = BaseError;
    constructor() {
        this.prisma = new PrismaService();
    }

    async getListTutorial(payload) {
        const where = {
            isTutorial: true
        };
        try {
            const videos = await this.prisma.video.findMany({
                where
            })

            return videos
        } catch (error) {
            console.error('Tutorial retrieval failed:', error);
            throw error;
        }
    }
}

export default new TutorialService();