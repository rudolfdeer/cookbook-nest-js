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
const { recipeController } = require('../controllers');
const { middlewares } = require('../../middlewares');

const recipeRouter = express.Router();

recipeRouter.get('/', recipeController.findAll);
recipeRouter.post('/', middlewares.verifyAuthToken, upload.single('image'), recipeController.create);
recipeRouter.delete(
  '/:id',
  middlewares.verifyAuthToken,
  recipeController.deleteById,
);
recipeRouter.get('/:id', recipeController.findById);
recipeRouter.put('/:id', middlewares.verifyAuthToken, recipeController.update);
recipeRouter.post(
  '/:id',
  middlewares.verifyAuthToken,
  recipeController.createComment,
);
recipeRouter.post(
  '/:id/like',
  middlewares.verifyAuthToken,
  recipeController.like,
);
recipeRouter.post(
  '/:id/image',
  middlewares.verifyAuthToken,
  upload.single('image'),
  recipeController.uploadImage,
);

module.exports = {
  recipeRouter,
};
