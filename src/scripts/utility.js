const MatrixUtility = (() => {
  const getRowCellsCoord = (matrixLength, rowIndex) => {
    const output = [];
    for (let i = 0; i < matrixLength; i++) {
      output.push([i, rowIndex]);
    }
    return output;
  };

  const getColumnCellsCoord = (matrixLength, columnIndex) => {
    const output = [];
    for (let i = 0; i < matrixLength; i++) {
      output.push([columnIndex, i]);
    }
    return output;
  };

  const getDiagonalCellsCoord = (matrixLength) => {
    const output = [];
    for (let i = 0; i < matrixLength; i++) {
      output.push([i, i]);
    }
    return output;
  };

  const getCrossDiagCellsCoord = (matrixLength) => {
    const output = [];
    for (let i = 0; i < matrixLength; i++) {
      output.push([i, matrixLength - 1 - i]);
    }
    return output;
  };

  return {
    getRowCellsCoord,
    getColumnCellsCoord,
    getDiagonalCellsCoord,
    getCrossDiagCellsCoord,
  };
})();

export { MatrixUtility };
