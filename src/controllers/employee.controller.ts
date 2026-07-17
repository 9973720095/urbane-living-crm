import { EmployeeService } from "@/services/employee.service";

export class EmployeeController {

  private employeeService =
    new EmployeeService();

  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  async getEmployeeById(id: string) {
    return this.employeeService.getEmployeeById(id);
  }

  async createEmployee(data: any) {
    return this.employeeService.createEmployee(
      data
    );
  }

  async updateEmployee(
    id: string,
    data: any
  ) {
    return this.employeeService.updateEmployee(
      id,
      data
    );
  }

  async deleteEmployee(id: string) {
    return this.employeeService.deleteEmployee(id);
  }

}