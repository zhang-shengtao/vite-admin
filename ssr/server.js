function fn(n, m) {
  const arrs = new Array(n).fill(0).map(() => new Array(m).fill(0));
  let [i, j, stepi, stepj, num] = [0, 0, 0, 1, 1];
  function hasBolck() {
    return !arrs[i] || arrs[i][j] !== 0;
  }
  while (1) {
    arrs[i][j] = num++;
    i += stepi;
    j += stepj;
    if (hasBolck()) {
      i -= stepi;
      j -= stepj;
      if (stepi === 0) {
        stepi = stepj;
        stepj = 0;
      } else {
        stepj -= stepi;
        stepi = 0;
      }
      i += stepi;
      j += stepj;
      if (hasBolck()) break;
    }
  }
  console.log(arrs);
}

fn(5, 6);
