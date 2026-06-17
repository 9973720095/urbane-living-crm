// src/lib/filters/lead.filters.ts

export const buildLeadFilters = (params: URLSearchParams) => {
  const where: any = {};

  const search = params.get('search');
  if (search) {
    where.OR = [
      { customer_name: { contains: search, mode: 'insensitive' } },
      { phone_number: { contains: search } },
      { email: { contains: search, mode: 'insensitive' } }
    ];
  }

  if (params.get('status')) where.stage = params.get('status');
  if (params.get('city')) where.city = params.get('city');
  if (params.get('employeeId')) where.assignedToId = params.get('employeeId');

  return where;
};