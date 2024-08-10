import { HttpStatus, Injectable } from "@nestjs/common";
import { Task, TaskStatus } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { UpdateTaskDto } from "./dto/task.dto";
import { HttpException } from "@nestjs/common";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  getAllTasks() {
    return this.taskRepository.find();
  }
  createTask(title: string, description: string) {
    const task: Task = {
      id: v4(),
      title: title,
      description: description,
      status: TaskStatus.PENDING,
    };
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  async deleteTask(id: string) {
    const taskFound = await this.taskRepository.delete(id);
    if (!taskFound) {
      return new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return taskFound;
  }

  async getTasksById(id: string) {
    const taskFound = await this.taskRepository.findOne({
      where: { id },
    });
    if (!taskFound) {
      return new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return taskFound;
  }

  async updateTask(id: string, updatedFields: UpdateTaskDto) {
    const taskFound = await this.taskRepository.update(id, updatedFields);
    if (!taskFound) {
      return new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return taskFound;
  }
}
