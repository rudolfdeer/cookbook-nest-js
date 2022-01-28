export {};

const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req: Express.Request, file: File, cb: Function) {
    cb(null, 'public/images');
  },
  filename(req: Express.Request, file:Express.Multer.File, cb: Function) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
const { cookbookController } = require('../controllers');
const { middlewares } = require('../../middlewares');

const cookbookRouter = express.Router();

cookbookRouter.get('/', cookbookController.findAll);
cookbookRouter.post(
  '/',
  middlewares.verifyAuthToken,
  upload.single('image'),
  cookbookController.create,
);
cookbookRouter.delete(
  '/:id',
  middlewares.verifyAuthToken,
  cookbookController.deleteById,
);
cookbookRouter.get('/:id', cookbookController.findById);
cookbookRouter.put(
  '/:id',
  middlewares.verifyAuthToken,
  cookbookController.update,
);
cookbookRouter.post(
  '/:id',
  middlewares.verifyAuthToken,
  cookbookController.createComment,
);
cookbookRouter.post(
  '/:id/like',
  middlewares.verifyAuthToken,
  cookbookController.like,
);
cookbookRouter.post(
  '/:id/image',
  middlewares.verifyAuthToken,
  upload.single('image'),
  cookbookController.uploadImage,
);

module.exports = {
  cookbookRouter,
};
