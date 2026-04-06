import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: Number(process.env.PORT) || 3000,
    mongoUri: process.env.MONGO_URI || 'mongodb+srv://dbsarag:HMst0415@cluster0.c2lx6xv.mongodb.net/?appName=Cluster0',
    mongoDbName: process.env.MONGO_DB_NAME || 'Aura_Pulse',
    jwtSecret: process.env.JWT_SECRET || '330b5b95a16d27e9532d67828d200fef69b29c00542cca04087f9d3796fccd62',
    jwtExpiration:  process.env.JWT_EXPIRATION || '10h'
}
