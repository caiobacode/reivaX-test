export const getDataFromActualPage = (data, actualPage) => {
  const finalIndex = actualPage * 20 - 1; 
  // multiplico por 20 para trazer um numero multiplo de 20 
  // (-1 porque arrays contam a partir da posicao 0)

  const firstIndex = finalIndex - 19;
  // para descobrir o primeiro item da pagina, subtraio 19 a partir do item final;

  // implemento o filter para trazer somente 20 items, de acordo com a pagina selecionada
  const filteredData = data.filter((item, itemIndex) => {
    return itemIndex >= firstIndex && itemIndex <= finalIndex;
  });
  return filteredData;
};