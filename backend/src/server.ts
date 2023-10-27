import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from './routes'; // Isto importará as rotas e a configuração do Swagger

const app = express();
app.use(express.json());
app.use(cors());

const port = 3333;

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
);

app.use((err: Error, req: Request, res: Response, next: NextFunction ) => {
    if(err instanceof Error) {
        // Se for uma instância do tipo erro
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});

app.listen(port, () => console.log(`Servidor online na porta ${port}!`));
