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

expensesRouter.get('/', expensesController.getAll);

expensesRouter.post(
  '/',
  validate({ body: expensesSchema }),
  expensesController.create,
);

expensesRouter.get(
  '/:expenseId',
  validate({ params: intIdSchema }),
  expensesController.getId,
);

expensesRouter.put(
  '/:expenseId',
  validate({ body: updateExpensesSchema, params: intIdSchema }),
  expensesController.update,
);

expensesRouter.delete(
  '/:expenseId',
  validate({ params: intIdSchema }),
  expensesController.delete,
);
