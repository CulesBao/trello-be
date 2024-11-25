import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: "dvvbuutyb",
    api_key: "342579686427472",
    api_secret: "lRUSLIaA6nGKSHqmj73pHtVvRTg"
})

export default cloudinary;