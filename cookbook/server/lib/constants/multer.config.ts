import { diskStorage } from 'multer';

const multerConfig = {
  dest: './lib/uploads'
};

export const multerOptions = {
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
        const uploadPath = multerConfig.dest;
        cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.originalname);
    },
}),
}



