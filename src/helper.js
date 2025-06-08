function val() {
  return Math.floor(Math.random() * 9); // generates number from 0 to 8
}

function randomCards(n, side) {
  const arr = [];
  while (arr.length < n) {
    const number = val();
    if (!arr.find(obj => obj.value === number)) {
      arr.push({
        value: number,
        side: side,
        isFlipped: false,
        isTempFlipped : false,
      });
    }
  }
  return arr;
}

export { randomCards };
