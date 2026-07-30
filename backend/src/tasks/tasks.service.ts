import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status, dueDate } = createTaskDto;

    return this.prisma.task.create({
      data: {
        title,
        description,
        status: status || TaskStatus.TO_DO,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
  }

  async findAll(status?: TaskStatus): Promise<Task[]> {
    const where = status ? { status } : {};

    return this.prisma.task.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // Check if task exists
    await this.findOne(id);

    const { title, description, status, dueDate } = updateTaskDto;

    return this.prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
      },
    });
  }
}
