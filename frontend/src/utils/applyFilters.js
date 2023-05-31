export const applyFilters = (data, filters) => {
  const { typeFilter, param1Filter, param2Filter } = filters;

  // filtra por "type"
  const filterTypes = data.filter((item) => typeFilter.includes(item.type));

  // filtro do tipo range para o campo "param1"
  const filterParam1 = filterTypes.filter(({ param1 }) => {
    const { greaterThanNumber, lessThanNumber } = param1Filter;

    if (lessThanNumber === null && greaterThanNumber === null) {
      return true;
    }
    if (lessThanNumber === null) {
      return param1 > greaterThanNumber;
    }
    if (greaterThanNumber === null) {
      return param1 < lessThanNumber;
    }

    return param1 > greaterThanNumber && param1 < lessThanNumber;
  })

  // filtro do tipo range para o campo "param2"
  const filterParam2 = filterParam1.filter(({ param2 }) => {
    const { greaterThanNumber, lessThanNumber } = param2Filter;
    if (lessThanNumber === null && greaterThanNumber === null) {
      return true;
    }

    if (lessThanNumber === null) {
      return param2 > greaterThanNumber;
    }

    if (greaterThanNumber === null) {
      return param2 < lessThanNumber;
    }

    return param2 > greaterThanNumber && param2 < lessThanNumber;
  })

  return filterParam2
};