export const getDataFromActualPage = (data, actualPage) => {
  const firstIndex = actualPage * 20 - 20; 
  // multiplico por 20 para trazer um numero multiplo de 20 
  // (-20 para selecionar o primeiro item da pagina)

  const finalIndex = firstIndex + 19;
  // para descobrir o ultimo item da pagina, somo 19 a partir do primeiro item;

  // implemento o filter para trazer somente 20 items, de acordo com a pagina selecionada
  const filteredData = data.filter((item, itemIndex) => {
    return itemIndex >= firstIndex && itemIndex <= finalIndex
  });
  return filteredData;
};