class ProjectService {
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
              Name: "color_c"
            }
          },
          {
            field: {
              Name: "created_at_c"
            }
          },
          {
            field: {
              Name: "task_count_c"
            }
          },
          {
            field: {
              Name: "completed_count_c"
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

      const response = await this.apperClient.fetchRecords('project_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching projects:", error?.response?.data?.message);
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
              Name: "color_c"
            }
          },
          {
            field: {
              Name: "created_at_c"
            }
          },
          {
            field: {
              Name: "task_count_c"
            }
          },
          {
            field: {
              Name: "completed_count_c"
            }
          },
          {
            field: {
              Name: "updated_at_c"
            }
          }
        ]
      };

      const response = await this.apperClient.getRecordById('project_c', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching project with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async create(projectData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Name: projectData.Name,
            color_c: projectData.color_c,
            created_at_c: projectData.created_at_c,
            task_count_c: projectData.task_count_c || 0,
            completed_count_c: projectData.completed_count_c || 0,
            updated_at_c: projectData.updated_at_c
          }
        ]
      };

      const response = await this.apperClient.createRecord('project_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create project ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error creating project:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async update(id, projectData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const updateFields = {
        Id: id
      };

      // Only include fields that are being updated
      if (projectData.Name !== undefined) updateFields.Name = projectData.Name;
      if (projectData.color_c !== undefined) updateFields.color_c = projectData.color_c;
      if (projectData.task_count_c !== undefined) updateFields.task_count_c = projectData.task_count_c;
      if (projectData.completed_count_c !== undefined) updateFields.completed_count_c = projectData.completed_count_c;
      if (projectData.updated_at_c !== undefined) updateFields.updated_at_c = projectData.updated_at_c;
      
      const params = {
        records: [updateFields]
      };

      const response = await this.apperClient.updateRecord('project_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update project ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error updating project:", error?.response?.data?.message);
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

      const response = await this.apperClient.deleteRecord('project_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete project ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }

        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting project:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
}

export const projectService = new ProjectService();