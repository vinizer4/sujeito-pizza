import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DatailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/listByCategoryController';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RevoveOrderController } from './controllers/order/RevoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig  from './config/multer';

const router = Router();

// Configurações do Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend API',
            version: '1.0.0',
            description: 'API documentation for the Backend',
        },
        servers: [
            {
                url: 'http://localhost:3333',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [__filename],
};

const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(specs));

const upload = multer(uploadConfig.upload("./tmp"));

//--Rotas USER --
/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 created_ad:
 *                   type: string
 *                 updated_ad:
 *                   type: string
 */
router.post('/users', new CreateUserController().handle)

/**
 * @swagger
 * /session:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Autentica um usuário e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Erro de autenticação
 */
router.post('/session', new AuthUserController().handle)


/**
 * @swagger
 * /me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Recupera detalhes do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 created_ad:
 *                   type: string
 *                 updated_ad:
 *                   type: string
 */
router.get('/me', isAuthenticated, new DatailUserController().handle)


// -- ROTAS CATEGORY
// -- ROTAS CATEGORY --

/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Cria uma nova categoria
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 */
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Lista todas as categorias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 */
router.get('/category', isAuthenticated, new ListCategoryController().handle)


//-- ROTAS PRODUCT
/**
 * @swagger
 * /product:
 *   post:
 *     tags:
 *       - Products
 *     summary: Cria um novo produto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category_id:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *                 banner:
 *                   type: string
 *                 category_id:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 */
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

/**
 * @swagger
 * /category/product:
 *   get:
 *     tags:
 *       - Products
 *     summary: Lista todos os produtos de uma determinada categoria
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: category_id
 *         in: query
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   banner:
 *                     type: string
 *                   category_id:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 */
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

//-- ROTAS ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle )

router.delete('/order', isAuthenticated, new RevoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/orders',isAuthenticated, new ListOrdersController().handle)

router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export { router };
