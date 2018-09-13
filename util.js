function binarySearch(value, array, comp) {
  let left = 0, right = array.length;
  while(right > left) {
    let mid = Math.floor((left + right) / 2);
    let result;
    if(comp) {
      result = comp(array[mid], value);
    } else {
      result = array[mid] < value ? -1 : array[mid] > value ? 1 : 0;
    }
    if(result === 0) { return mid; }
    if(result < 0) { left = mid + 1; }
    else { right = mid; }
  }
  return left - 1;
}

module.exports = {
	binarySearch,
};
