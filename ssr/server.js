function fn(n, m) {
  const arrs = new Array(n).fill(0).map(() => new Array(m).fill(0));
  let [i, j, stepi, stepj, num] = [0, 0, 0, 1, 1];
  function hasBolck() {
    return !arrs[i] || arrs[i][j] !== 0;
  }

  for (let index = 1; index < n * m; index++) {
    // if(){
    // }else{
    //   arrs[i][j] == index
    // }
  }
}

fn(5, 6);
