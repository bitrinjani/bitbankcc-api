export const nonce: () => string = (function() {
  let prev = 0;
  return function() {
    const n = Date.now();
    if (n <= prev) {
      prev += 1;
      return prev.toString();
    }
    prev = n;
    return prev.toString();
  };
})();