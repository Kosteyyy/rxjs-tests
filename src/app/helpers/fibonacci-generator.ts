export function* fibonacci() {
  let first = 1,
    second = 1;
  for (;;) {
    let sum = second + first;
    yield sum;
    first = second;
    second = sum;
  }
}
