import { prisma } from '../db/prisma.js';
import { createError } from '../utils/create.error.js';

export const expensesService = {};

expensesService.create = (userId, input) => {
  return prisma.expense.create({
    data: {
      userId,
      ...input,
    },
  });
};

expensesService.findList = (userId) =>
  prisma.expense.findMany({
    where: { userId },
    orderBy: {
      updateAt: 'desc',
    },
  });

expensesService.findId = async (expenseId, userId) => {
  const data = await prisma.expense.findUnique({
    where: { id: expenseId },
  });
  if (!data.id) {
    console.log(data.id);
    throw createError(
      404,
      `Expense record with expenseId ${expenseId} not found`,
    );
  }
  if (userId !== data.userId) {
    throw createError(403, 'You do not have permission to access this record');
  }
  return data;
};
expensesService.update = async (expenseId, userId, input) => {
  const data = await prisma.expense.findUnique({
    where: { id: expenseId },
  });
  if (!data.id) {
    throw createError(
      404,
      `Expense record with expenseId ${expenseId} not found`,
    );
  }
  if (userId !== data.userId) {
    throw createError(403, 'You do not have permission to access this record');
  }
  return prisma.expense.update({
    where: { id: expenseId },
    data: { ...input },
  });
};

expensesService.delete = async (expenseId, userId) => {
  const data = await prisma.expense.findUnique({
    where: { id: expenseId },
  });
  if (!data.id) {
    throw createError(
      404,
      `Expense record with expenseId ${expenseId} not found`,
    );
  }
  if (userId !== data.userId) {
    throw createError(403, 'You do not have permission to access this record');
  }
  return prisma.expense.delete({
    where: { id: expenseId },
  });
};
