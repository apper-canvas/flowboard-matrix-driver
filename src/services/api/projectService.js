import projectData from "@/services/mockData/projects.json";

class ProjectService {
  constructor() {
    this.projects = [...projectData];
  }

  async getAll() {
    await this.delay();
    return [...this.projects];
  }

  async getById(id) {
    await this.delay();
    const project = this.projects.find(p => p.Id === id);
    if (!project) {
      throw new Error("Project not found");
    }
    return { ...project };
  }

  async create(projectData) {
    await this.delay();
    const newProject = {
      Id: Math.max(...this.projects.map(p => p.Id), 0) + 1,
      ...projectData,
      taskCount: 0,
      completedCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.projects.push(newProject);
    return { ...newProject };
  }

  async update(id, projectData) {
    await this.delay();
    const index = this.projects.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }
    
    const updatedProject = {
      ...this.projects[index],
      ...projectData,
      Id: id,
      updatedAt: new Date().toISOString()
    };
    
    this.projects[index] = updatedProject;
    return { ...updatedProject };
  }

  async delete(id) {
    await this.delay();
    const index = this.projects.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }
    this.projects.splice(index, 1);
  }

  delay(ms = Math.random() * 300 + 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const projectService = new ProjectService();