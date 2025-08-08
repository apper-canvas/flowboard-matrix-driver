class TaskService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "project_id_c"
            }
          },
          {
            field: {
              Name: "title_c"
            }
          },
          {
            field: {
              Name: "description_c"
            }
          },
          {
            field: {
              Name: "status_c"
            }
          },
          {
            field: {
              Name: "priority_c"
            }
          },
          {
            field: {
              Name: "due_date_c"
            }
          },
          {
            field: {
              Name: "created_at_c"
            }
          },
          {
            field: {
              Name: "completed_at_c"
            }
          },
          {
            field: {
              Name: "position_c"
            }
          },
          {
            field: {
              Name: "label_ids_c"
            }
          },
          {
            field: {
              Name: "updated_at_c"
            }
          }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "ASC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "project_id_c"
            }
          },
          {
            field: {
              Name: "title_c"
            }
          },
          {
            field: {
              Name: "description_c"
            }
          },
          {
            field: {
              Name: "status_c"
            }
          },
          {
            field: {
              Name: "priority_c"
            }
          },
          {
            field: {
              Name: "due_date_c"
            }
          },
          {
            field: {
              Name: "created_at_c"
            }
          },
          {
            field: {
              Name: "completed_at_c"
            }
          },
          {
            field: {
              Name: "position_c"
            }
          },
          {
            field: {
              Name: "label_ids_c"
            }
          },
          {
            field: {
              Name: "updated_at_c"
            }
          }
        ]
      };

      const response = await this.apperClient.getRecordById('task_c', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async create(taskData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Name: taskData.title_c,
            title_c: taskData.title_c,
            description_c: taskData.description_c,
            project_id_c: taskData.project_id_c,
            priority_c: taskData.priority_c,
            due_date_c: taskData.due_date_c,
            status_c: taskData.status_c,
            label_ids_c: taskData.label_ids_c,
            created_at_c: taskData.created_at_c,
            completed_at_c: taskData.completed_at_c,
            position_c: taskData.position_c,
            updated_at_c: taskData.updated_at_c
          }
        ]
      };

      const response = await this.apperClient.createRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create task ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }

        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async update(id, taskData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const updateFields = {
        Id: id
      };

      // Only include fields that are being updated
      if (taskData.title_c !== undefined) updateFields.title_c = taskData.title_c;
      if (taskData.description_c !== undefined) updateFields.description_c = taskData.description_c;
      if (taskData.project_id_c !== undefined) updateFields.project_id_c = taskData.project_id_c;
      if (taskData.priority_c !== undefined) updateFields.priority_c = taskData.priority_c;
      if (taskData.due_date_c !== undefined) updateFields.due_date_c = taskData.due_date_c;
      if (taskData.status_c !== undefined) updateFields.status_c = taskData.status_c;
      if (taskData.label_ids_c !== undefined) updateFields.label_ids_c = taskData.label_ids_c;
      if (taskData.completed_at_c !== undefined) updateFields.completed_at_c = taskData.completed_at_c;
      if (taskData.position_c !== undefined) updateFields.position_c = taskData.position_c;
      if (taskData.updated_at_c !== undefined) updateFields.updated_at_c = taskData.updated_at_c;
      
      const params = {
        records: [updateFields]
      };

      const response = await this.apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update task ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }

        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete task ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }

        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async getByProject(projectId) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "project_id_c"
            }
          },
          {
            field: {
              Name: "title_c"
            }
          },
          {
            field: {
              Name: "description_c"
            }
          },
          {
            field: {
              Name: "status_c"
            }
          },
          {
            field: {
              Name: "priority_c"
            }
          },
          {
            field: {
              Name: "due_date_c"
            }
          },
          {
            field: {
              Name: "created_at_c"
            }
          },
          {
            field: {
              Name: "completed_at_c"
            }
          },
          {
            field: {
              Name: "position_c"
            }
          },
          {
            field: {
              Name: "label_ids_c"
            }
          },
          {
            field: {
              Name: "updated_at_c"
            }
          }
        ],
        where: [
          {
            FieldName: "project_id_c",
            Operator: "EqualTo",
            Values: [projectId],
            Include: true
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by project:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async getByStatus(status) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "project_id_c"
            }
          },
          {
            field: {
              Name: "title_c"
            }
          },
          {
            field: {
              Name: "description_c"
            }
          },
          {
            field: {
              Name: "status_c"
            }
          },
          {
            field: {
              Name: "priority_c"
            }
          },
          {
            field: {
              Name: "due_date_c"
            }
          },
          {
            field: {
              Name: "created_at_c"
            }
          },
          {
            field: {
              Name: "completed_at_c"
            }
          },
          {
            field: {
              Name: "position_c"
            }
          },
          {
            field: {
              Name: "label_ids_c"
            }
          },
          {
            field: {
              Name: "updated_at_c"
            }
          }
        ],
        where: [
          {
            FieldName: "status_c",
            Operator: "EqualTo",
            Values: [status],
            Include: true
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by status:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
}

export const taskService = new TaskService();

export const taskService = new TaskService();