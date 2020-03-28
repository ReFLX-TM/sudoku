module.exports = function solveSudoku(matrix) {
  var emptySpot = nextEmtySpot(matrix);
  var r = emptySpot[0];
  var c = emptySpot[1];

  if (!isValidSudoku(matrix)) return matrix;

  if (r === -1) {
    return matrix;
  };

  var possArr = possiblities(r, c, matrix);

  for (var k = 0; k < possArr.length && nextEmtySpot(matrix)[0] !== -1; k++) {
      matrix[r][c] = possArr[k];
      solveSudoku(matrix);
  }
 
  if (nextEmtySpot(matrix)[0] !== -1) matrix[r][c] = 0;

  return matrix;
}

function nextEmtySpot(matrix) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (matrix[i][j] === 0) return [i, j];
        }
    }
    return [-1, -1];
}

function possiblities(r, c, matrix) {
    var possArr = [];
    var row = [];
    var col = [];
    var quad = [];
    var k = 0;
    var l = 0;
    if (r <= 2) k = 0; else if (r <= 5) k = 3; else k = 6;
    if (c <= 2) l = 0; else if (c <= 5) l = 3; else l = 6;

    for (var i = 0; i < 9; i++) {
        row.push(matrix[i][c]);
    }
    for (var j = 0; j < 9; j++) {
        col.push(matrix[r][j]);
    }
    for (var i = k; i < k + 3; i++) {
        for (var j = l; j < l + 3; j++) {
            quad.push(matrix[i][j]);
        }
    }

    for (var n = 1; n < 10; n++) {
        if (row.indexOf(n) === -1 && col.indexOf(n) === -1 && quad.indexOf(n) === -1) {
            possArr.push(n);
        }
    }
    return possArr;
}
function checkQuadrant(r, c, matrix) {
    var qudarantArr = [];
    for (var i = r; i < r + 3; i++) {
        for (var j = c; j < c + 3; j++) {
            if (qudarantArr.indexOf(matrix[i][j]) === -1 || matrix[i][j] === 0) {
                qudarantArr.push(matrix[i][j]);
            } else {
                return false;
            }
        }
    }
    return true;
}
function isValidSudoku(matrix) {
    if (!checkQuadrant(0, 0, matrix)) return false;
    if (!checkQuadrant(0, 3, matrix)) return false;
    if (!checkQuadrant(0, 6, matrix)) return false;

    if (!checkQuadrant(3, 0, matrix)) return false;
    if (!checkQuadrant(3, 3, matrix)) return false;
    if (!checkQuadrant(3, 6, matrix)) return false;

    if (!checkQuadrant(6, 0, matrix)) return false;
    if (!checkQuadrant(6, 3, matrix)) return false;
    if (!checkQuadrant(6, 6, matrix)) return false;

    for (var i = 0; i < matrix.length; i++) {
        var rowNumbers = [];
        for (var j = 0; j < matrix.length; j++) {
            if (rowNumbers.indexOf(matrix[i][j]) === -1 || matrix[i][j] === 0) {
                rowNumbers.push(matrix[i][j]);
            } else {
                return false;
            }
        }
    }

    for (var i = 0; i < matrix.length; i++) {
        var colNumbers = [];
        for (var j = 0; j < matrix.length; j++) {
            if (colNumbers.indexOf(matrix[j][i]) === -1 || matrix[j][i] === 0) {
                colNumbers.push(matrix[j][i]);
            } else {
                return false;
            }
        }
    }
    return true;
}
