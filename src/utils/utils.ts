export function mode(numbers: number[]) {
  const modes = [],
    count: Record<number, number> = {};

  let i,
    number,
    maxIndex = 0;

  for (i = 0; i < numbers.length; i += 1) {
    number = numbers[i];
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  }

  for (i in count)
    if (count.hasOwnProperty(i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }

  return modes;
}

export function mean(numbers: [number, ...number[]]) {
  return numbers.reduce((a, b) => a + b) / numbers.length;
}
