import { expensesService } from '../services/expenses.service.js';
import { createError } from '../utils/create.error.js';

export const expensesController = {};

expensesController.create = async (req, res) => {
  const data = await expensesService.create(req.user.id, req.body);
  res.status(201).json({ success: true, data });
};

expensesController.getAll = async (req, res) => {
  const data = await expensesService.findList(req.user.id);
  const limit = parseInt(req.query.page);
  res.status(200).json({ success: true, data, limit });
};

expensesController.getId = async (req, res) => {
  const currentUserId = req.user.id;
  const { expenseId } = req.params;
  const data = await expensesService.findId(expenseId, currentUserId);
  res.status(200).json({ success: true, data });
};

expensesController.update = async (req, res) => {
  const currentUserId = req.user.id;
  const { expenseId } = req.params;
  const data = await expensesService.update(expenseId, currentUserId, req.body);
  res.status(200).json({ success: true, data });
};
