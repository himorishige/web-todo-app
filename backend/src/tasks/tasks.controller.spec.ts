import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  const taskData: Task = {
    id: '4de93414-2332-4834-b94d-c99bbe7de92b',
    title: '牛乳を買ってくる',
    description: '',
    priority: 1,
    isCompleted: false,
    createdAt: new Date('2021-1-1').toISOString(),
    updatedAt: new Date('2021-4-1').toISOString(),
  };
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#findAll', () => {
    it('should return an array of Tasks', async () => {
      const result = [taskData];

      jest.spyOn(service, 'findAll').mockImplementation(() => result as any);

      expect((await controller.findAll()).status).toBe('ok');
      expect((await controller.findAll()).data).toEqual(result);
    });
  });

  describe('#findOne', () => {
    it('should return a Task selected', async () => {
      const result = taskData;
      const id = '4de93414-2332-4834-b94d-c99bbe7de92b';

      jest.spyOn(service, 'findOne').mockImplementation(() => result as any);

      expect((await controller.findOne(id)).status).toBe('ok');
      expect((await controller.findOne(id)).data).toEqual(result);
    });
  });

  describe('#create', () => {
    it('should return a task having an id', async () => {
      const result = taskData;

      const param: CreateTaskDto = {
        title: '牛乳を買ってくる',
        description: '',
        isCompleted: false,
        priority: 1,
      };

      jest.spyOn(service, 'create').mockImplementation(() => result as any);

      expect((await controller.create(param)).status).toBe('ok');
      expect((await controller.create(param)).data.id).toBeDefined();
    });
  });

  describe('#update', () => {
    it('should return a task updated', async () => {
      const result = taskData;
      const id = '4de93414-2332-4834-b94d-c99bbe7de92b';

      const param: CreateTaskDto = {
        title: '卵を買ってくる',
        description: '',
        isCompleted: false,
        priority: 1,
      };

      jest.spyOn(service, 'update').mockImplementation(() => result as any);

      expect((await controller.update(id, param)).status).toBe('ok');
      expect((await controller.update(id, param)).data.id).toBeDefined();
    });
  });

  describe('#delete', () => {
    it('should return a task deleted', async () => {
      const id = '4de93414-2332-4834-b94d-c99bbe7de92b';
      const result = id;

      jest.spyOn(service, 'remove').mockImplementation(() => result as any);

      expect((await controller.remove(id)).status).toBe('ok');
      expect((await controller.remove(id)).data).toBe(id);
    });
  });
});
