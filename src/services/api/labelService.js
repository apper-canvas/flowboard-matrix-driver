import labelData from '@/services/mockData/labels.json';

class LabelService {
  constructor() {
    this.labels = [...labelData];
  }

  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.labels];
  }

  async getById(id) {
    await this.delay();
    if (typeof id !== 'number') {
      throw new Error('ID must be a number');
    }
    const label = this.labels.find(l => l.Id === id);
    return label ? { ...label } : null;
  }

  async create(labelData) {
    await this.delay();
    const newLabel = {
      Id: Math.max(...this.labels.map(l => l.Id), 0) + 1,
      ...labelData,
      createdAt: new Date().toISOString()
    };
    this.labels.push(newLabel);
    return { ...newLabel };
  }

  async update(id, labelData) {
    await this.delay();
    const index = this.labels.findIndex(l => l.Id === id);
    if (index === -1) {
      throw new Error("Label not found");
    }
    
    const updatedLabel = {
      ...this.labels[index],
      ...labelData,
      Id: id
    };
    
    this.labels[index] = updatedLabel;
    return { ...updatedLabel };
  }

  async delete(id) {
    await this.delay();
    const index = this.labels.findIndex(l => l.Id === id);
    if (index === -1) {
      throw new Error("Label not found");
    }
    
    const deletedLabel = this.labels.splice(index, 1)[0];
    return { ...deletedLabel };
  }
}

const labelService = new LabelService();
export default labelService;