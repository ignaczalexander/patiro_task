export default {
  sortByString(array, keyToSort, dir) {
    return array.sort((a, b) => {
      if (!a[keyToSort]) {
        return 1;
      }
      if (!b[keyToSort]) {
        return -1;
      }
      if (dir === 'asc') {
        return a[keyToSort].localeCompare(b[keyToSort]);
      }
      if (dir === 'desc') {
        return b[keyToSort].localeCompare(a[keyToSort]);
      }
    });
  },
  sortByInt(array, keyToSort, dir) {
    return array.sort((a, b) => {
      if (!a[keyToSort]) {
        return 1;
      }
      if (!b[keyToSort]) {
        return -1;
      }
      if (dir === 'asc') {
        return a[keyToSort] - b[keyToSort];
      }
      if (dir === 'desc') {
        return b[keyToSort] - a[keyToSort];
      }
    });
  }
};
