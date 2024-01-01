import { registerAs } from "@nestjs/config";

export default registerAs('database', () => {
    return {
        DATABASE_URL : process.env.DATABASE_URL
    }
})