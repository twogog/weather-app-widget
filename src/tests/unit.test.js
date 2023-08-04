// can't require orig functions from an actual program
const { windDirection, devPoint } = require("./mock");

// N: [...makeArr(0, 45), ...makeArr(315, 361)],
//   E: makeArr(45, 135),
//   S: makeArr(135, 225),
//   W: makeArr(225, 315),

test("wind direction", () => {
  expect(windDirection(135)).toBe("S");
  expect(windDirection(224)).toBe("S");
  expect(windDirection(225)).toBe("W");
  expect(windDirection(314)).toBe("W");
  expect(windDirection(315)).toBe("N");
  expect(windDirection(360)).toBe("N");
  expect(windDirection(0)).toBe("N");
  expect(windDirection(45)).toBe("E");
  expect(windDirection(134)).toBe("E");
});

test("dev point", () => {
  // точка росы, функция делает стандартное округление
  // https://vseokna.by/wp-content/themes/vseokna/images/terminy/tochka-rosy-tablica-vychislenij.jpg
  expect(devPoint(20, 40)).toBe(6);
  expect(devPoint(20, 45)).toBe(8);
  expect(devPoint(23, 45)).toBe(10);
  expect(devPoint(25, 60)).toBe(17);
  expect(devPoint(18, 30)).toBe(0);
  expect(devPoint(18, 60)).toBe(10);
  expect(devPoint(25, 30)).toBe(6);
});
