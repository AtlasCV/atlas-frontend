export default <T>(a: T[]): T[] => {
  const aCopy = [...a];
  var j, x, i;
  for (i = aCopy.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = aCopy[i];
    aCopy[i] = aCopy[j];
    aCopy[j] = x;
  }
  return aCopy;
};
