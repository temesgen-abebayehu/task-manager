import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
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
}
