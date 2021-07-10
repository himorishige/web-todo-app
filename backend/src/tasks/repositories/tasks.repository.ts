import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { v4 as uuid } from 'uuid';

let dynamoDB: AWS.DynamoDB.DocumentClient;
if (process.env.IS_OFFLINE === 'true') {
  dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: process.env.DYNAMODB_ENDPOINT,
  });
} else {
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}

export class TasksRepository {
  async create(createTaskDto: CreateTaskDto) {
    const task: Task = {
      id: uuid(),
      ...createTaskDto,
      priority: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await dynamoDB
        .put({
          TableName: process.env.TASKS_TABLE_NAME,
          Item: task,
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return task;
  }

  async findAll() {
    let tasks: Task[];
    try {
      const result = await dynamoDB
        .scan({
          TableName: process.env.TASKS_TABLE_NAME,
        })
        .promise();
      tasks = result.Items as Task[];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!tasks) {
      throw new NotFoundException(`No tasks found.`);
    }

    return tasks;
  }

  async findOne(id: string) {
    let task: Task;
    try {
      const result = await dynamoDB
        .get({
          TableName: process.env.TASKS_TABLE_NAME,
          Key: { id },
        })
        .promise();
      task = result.Item as Task;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!task) {
      throw new NotFoundException(`The task with ID "${id} not found.`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    let updateExpression = 'set ';
    const expressionAttributeValues = {} as any;
    const expressionAttributeNames = {} as any;
    for (const [key, value] of Object.entries(updateTaskDto)) {
      if (!(key === 'id')) {
        updateExpression += `#${key} = :${key}, `;
        expressionAttributeValues[`:${key}`] = value;
        expressionAttributeNames[`#${key}`] = `${key}`;
      }
    }
    updateExpression += `#updatedAt = :updatedAt, `;
    expressionAttributeValues[`:updatedAt`] = new Date(
      Date.now(),
    ).toISOString();
    expressionAttributeNames[`#updatedAt`] = 'updatedAt';
    updateExpression = updateExpression.slice(0, -2);

    let task: Task;
    try {
      const result = await dynamoDB
        .update({
          TableName: process.env.TASKS_TABLE_NAME,
          Key: { id },
          UpdateExpression: updateExpression,
          ExpressionAttributeValues: expressionAttributeValues,
          ExpressionAttributeNames: expressionAttributeNames,
          ReturnValues: 'ALL_NEW',
        })
        .promise();
      task = result.$response.data as Task;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return task;
  }

  async remove(id: string) {
    let task: Task;
    try {
      const result = await dynamoDB
        .delete({
          TableName: process.env.TASKS_TABLE_NAME,
          Key: { id },
        })
        .promise();
      task = result.$response.data as Task;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!task) {
      throw new NotFoundException(`The task with ID "${id} not found.`);
    }

    // return `The task with ID "${id}" was removed.`;
    return task;
  }
}
