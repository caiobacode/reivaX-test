export const applyFilters = (data, filters) => {
  const { typeFilter } = filters;
  const filterTypes = data.filter((item) => typeFilter.includes(item.type));

  //const filterParam1 = filterTypes.filter...
  return filterTypes
};