export default function getDataFromActualPage(data, actualPage) {
  const firstIndex = actualPage * 20 - 20;
  const finalIndex = firstIndex + 19;

  // implemento o filter para trazer somente 20 items, de acordo com a pagina selecionada
  const filteredData = data
    .filter((item, itemIndex) => itemIndex >= firstIndex && itemIndex <= finalIndex);

  return filteredData;
}
