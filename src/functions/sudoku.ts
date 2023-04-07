export interface ItemSoduku {
  value: number;
  static: boolean;
  accept: number;
  iserror: boolean;
}

export class Sudoku {
  generateSudoku(cellsToRemove = 10): ItemSoduku[][] {
    const size = 9;
    const sudoku: number[][] = [];
    
    
    for (let i = 0; i < size; i++) {
      sudoku.push(new Array(size).fill(0));
    }
    
    for (let i = 0; i < size; i += 3) {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let j = i; j < i + 3; j++) {
        for (let k = i; k < i + 3; k++) {
          const idx = Math.floor(Math.random() * nums.length);
          const num = nums[idx];
          nums.splice(idx, 1);
          sudoku[j][k] = num;
        }
      }
    }
    
    this.solveSudoku(sudoku);
    
    const resolve: number[][] = sudoku.map((column) => column.map((row) => row));

    for (let i = 0; i < cellsToRemove; i++) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      sudoku[row][col] = 0;
    }

    const netSodoku: ItemSoduku[][] = Array(9).fill([]);
    for (let x = 0; x < sudoku.length; x++) {
      netSodoku[x] = Array(9).fill({});
      for (let y = 0; y < sudoku[x].length; y++) {
        netSodoku[x][y] = {
          value: sudoku[x][y],
          static: sudoku[x][y] === 0,
          accept: resolve[x][y],
          iserror: false,
        };
      }
    }

    return netSodoku;
  }

  solveSudoku(sudoku: number[][]): boolean {
    const size = 9;

    let row = -1;
    let col = -1;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (sudoku[i][j] === 0) {
          row = i;
          col = j;
          break;
        }
      }
      if (row !== -1) {
        break;
      }
    }

    if (row === -1) {
      return true;
    }

    for (let num = 1; num <= size; num++) {
      if (this.isValid(sudoku, row, col, num)) {
        sudoku[row][col] = num;
        if (this.solveSudoku(sudoku)) {
          return true;
        }
        sudoku[row][col] = 0;
      }
    }

    return false;
  }

  isValid(sudoku: number[][], row: number, col: number, num: number): boolean {
    const size = 9;

    for (let i = 0; i < size; i++) {
      if (sudoku[row][i] === num || sudoku[i][col] === num) {
        return false;
      }
    }

    const gridRow = Math.floor(row / 3) * 3;
    const gridCol = Math.floor(col / 3) * 3;
    for (let i = gridRow; i < gridRow + 3; i++) {
      for (let j = gridCol; j < gridCol + 3; j++) {
        if (sudoku[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  }
}
