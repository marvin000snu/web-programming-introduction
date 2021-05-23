export const createSimplePeopleList = (peopleData) => {
  const first = peopleData[0];
  const firstValue = first["name"];
  const length = peopleData.length;
  const simpleList = `${firstValue}의원 외 ${length}인`;
  return simpleList;
};
