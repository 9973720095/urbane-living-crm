export const applyLeadFilters = (filters: any) => {
  const where: any = {};

  if (filters.status) where.stage = filters.status;
  if (filters.employeeId) where.assignedToId = filters.employeeId;
  if (filters.search) {
    where.OR = [
      { customer_name: { contains: filters.search } },
      { phone_number: { contains: filters.search } },
    ];
  }
  
  return where;
};