export const applyFilters = (data, filters) => {
  const { typeFilter, param1Filter } = filters;
  const filterTypes = data.filter((item) => typeFilter.includes(item.type));

  const filterParam1 = filterTypes.filter((item) => {
    const { greaterThanNumber, lessThanNumber } = param1Filter;
    if (lessThanNumber === null && greaterThanNumber === null) {
      return item;
    }

    if (lessThanNumber === null) {
      return item.param1 > greaterThanNumber;
    }

    if (greaterThanNumber === null) {
      return item.param1 > lessThanNumber;
    }

    return item.param1 > greaterThanNumber && item.param1 < lessThanNumber;
  })

  return filterParam1
};