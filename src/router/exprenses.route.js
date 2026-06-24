import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  expensesSchema,
  updateExpensesSchema,
} from '../schemas/expenses.schema.js';
import { expensesController } from '../controller/expenses.controller.js';
import { intIdSchema } from '../schemas/common.schema.js';

export const expensesRouter = Router();

expensesRouter.use(authenticate);

expensesRouter.get('/', authenticate, expensesController.getAll);

expensesRouter.post(
  '/',
  validate({ body: expensesSchema }),
  expensesController.create,
);

expensesRouter.get(
  '/:expenseId',
  authenticate,
  validate({ params: intIdSchema }),
  expensesController.getId,
);

expensesRouter.put(
  '/:expenseId',
  authenticate,
  validate({ body: updateExpensesSchema, params: intIdSchema }),
  expensesController.update,
);
