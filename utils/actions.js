'use server';
import prisma from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const getAllTasks = async () => {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const createTask = async (prevState, formData) => {
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));

  const Task = z.object({
    content: z.string().min(5),
  });

  const content = formData.get('content');
  try {
    Task.parse({ content });
    await prisma.task.create({ data: { content } });
    revalidatePath('/tasks');
    return { message: 'success' };
  } catch (e) {
    return { message: 'error' };
  }
};

export const deleteTask = async (formData) => {
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  const id = formData.get('id');
  await prisma.task.delete({ where: { id } });
  revalidatePath('/tasks');
};

export const getTask = async (id) => {
  return await prisma.task.findUnique({ where: { id } });
};

export const editTask = async (formData) => {
  const id = formData.get('id');
  const content = formData.get('content');
  const completed = formData.get('completed');

  await prisma.task.update({
    where: { id },
    data: { content, completed: completed === 'on' ? true : false },
  });
  redirect('/tasks');
};
