import taskData from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = [...taskData];
  }

  async getAll() {
    await this.delay();
    return [...this.tasks];
  }

  async getById(id) {
    await this.delay();
    const task = this.tasks.find(t => t.Id === id);
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  }

  async create(taskData) {
    await this.delay();
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.tasks.push(newTask);
    return { ...newTask };
  }

  async update(id, taskData) {
    await this.delay();
    const index = this.tasks.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const updatedTask = {
      ...this.tasks[index],
      ...taskData,
      Id: id,
      updatedAt: new Date().toISOString()
    };
    
    this.tasks[index] = updatedTask;
    return { ...updatedTask };
  }

  async delete(id) {
    await this.delay();
    const index = this.tasks.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    this.tasks.splice(index, 1);
  }

  async getByProject(projectId) {
    await this.delay();
    return this.tasks.filter(task => task.projectId === projectId);
  }

  async getByStatus(status) {
    await this.delay();
    return this.tasks.filter(task => task.status === status);
  }

  delay(ms = Math.random() * 300 + 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const taskService = new TaskService();