import { EmployeeRepository } from "@/repositories/employee.repository";

export class EmployeeService {

  private employeeRepository =
    new EmployeeRepository();

  async getAllEmployees() {
    return this.employeeRepository.getAll();
  }

  async getEmployeeById(id: string) {
    return this.employeeRepository.getById(id);
  }

  async createEmployee(data: any) {
    return this.employeeRepository.create(data);
  }

  async updateEmployee(
    id: string,
    data: any
  ) {
    return this.employeeRepository.update(
      id,
      data
    );
  }

  async deleteEmployee(id: string) {
    return this.employeeRepository.delete(id);
  }

}