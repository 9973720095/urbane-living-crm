import { EmployeeRepository } from "@/repositories/employee.repository";

export class EmployeeService {
  private employeeRepository = new EmployeeRepository();

  async getAllEmployees() {
    return this.employeeRepository.getAll();
  }
}