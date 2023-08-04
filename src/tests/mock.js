function makeArr(start, end) {
  const arr = [];
  for (let i = start; i < end; i++) {
    arr.push(i);
  }
  return arr;
}

const windDirectionMap = {
  N: [...makeArr(0, 45), ...makeArr(315, 361)],
  E: makeArr(45, 135),
  S: makeArr(135, 225),
  W: makeArr(225, 315),
};

function windDirection(degree) {
  for (let [wind, arrDegrees] of Object.entries(windDirectionMap)) {
    if (arrDegrees.includes(degree)) return wind;
  }
}

function devPoint(temp, humidity) {
  // t - комнатная температура °С, φ - влажность %,
  // а 17,27 и 237,7 - постоянные величины.
  // https://tvin270584.livejournal.com/356733.html
  const A = 17.27;
  const B = 237.7;
  const f = (temp * A) / (B + temp) + Math.log(humidity / 100);
  return Math.round((f * B) / (A - f));
}

module.exports = {
  windDirection,
  devPoint,
};
