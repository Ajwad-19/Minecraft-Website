// Procedural pixel-art scenes for the gallery, drawn on a 96×60 grid.
// Each scene returns { sky: [top, bottom], rects: [x, y, w, h, fill, opacity?][], glows: [cx, cy, r, color, opacity][] }.

const rnd = (n) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

function stars(R, count, seed, maxY) {
  for (let i = 0; i < count; i++) {
    R.push([Math.floor(rnd(seed + i) * 96), Math.floor(rnd(seed + i + 50) * maxY), 1, 1, '#FFFFFF', 0.3 + rnd(seed + i + 90) * 0.6]);
  }
}

function hills(R, seed, base, amp, color, step = 4) {
  for (let x = 0; x < 96; x += step) {
    const h = Math.round(base + Math.sin(x * 0.09 + seed) * amp + Math.sin(x * 0.23 + seed * 2) * (amp / 3));
    R.push([x, 60 - h, step, h, color]);
  }
}

function crenels(R, x, y, w, color) {
  for (let i = 0; i < w; i += 4) R.push([x + i, y, 2, 2, color]);
}

function ground(R, y, grass = '#2E8B3C', dirt = '#3B2716', seed = 3) {
  R.push([0, y, 96, 60 - y, dirt], [0, y, 96, 2, grass]);
  for (let i = 0; i < 40; i++) {
    R.push([Math.floor(rnd(seed + i) * 96), y + 3 + Math.floor(rnd(seed + i + 7) * (57 - y)), 1, 1, '#22170C']);
  }
  for (let x = 0; x < 96; x += 3) if (rnd(seed + x) > 0.5) R.push([x, y + 2, 1, 1, grass]);
}

function tree(R, x, gy) {
  R.push([x + 2, gy - 8, 2, 8, '#5A3A20'], [x, gy - 14, 6, 6, '#2E8B3C'], [x + 1, gy - 16, 4, 2, '#3FA82E'], [x + 1, gy - 13, 2, 2, '#3FA82E'], [x + 4, gy - 11, 2, 2, '#1F6B2A']);
}

function player(R, x, y, shirt, flip = false) {
  R.push([x, y, 3, 3, '#C68E5A'], [x, y, 3, 1, '#3B2716'], [x, y + 3, 3, 4, shirt], [x, y + 7, 3, 3, '#2A3A6A']);
  const d = flip ? -1 : 1;
  const hx = flip ? x - 1 : x + 3;
  R.push([hx, y + 4, 1, 1, '#C68E5A'], [hx + d, y + 3, 1, 1, '#7FF5F5'], [hx + 2 * d, y + 2, 1, 1, '#7FF5F5'], [hx + 3 * d, y + 1, 1, 1, '#E8FFFF']);
}

function firework(R, cx, cy, radius, colors, seed) {
  for (let a = 0; a < 12; a++) {
    const ang = (a / 12) * Math.PI * 2 + seed;
    for (let d = 2; d <= radius; d += 2) {
      R.push([Math.round(cx + Math.cos(ang) * d), Math.round(cy + Math.sin(ang) * d), 1, 1, colors[(a + d) % colors.length], 1 - d / (radius + 4)]);
    }
  }
  R.push([cx, cy, 1, 1, '#FFFFFF']);
}

export const SCENES = {
  castle() {
    const R = [];
    stars(R, 30, 1, 30);
    R.push([76, 6, 8, 8, '#EDEBD7'], [78, 8, 2, 2, '#CFCBB0'], [81, 11, 2, 1, '#CFCBB0']);
    hills(R, 1, 18, 5, '#0F2236');
    const stone = '#6D747A';
    const dark = '#555B61';
    const light = '#80878D';
    R.push([4, 34, 88, 14, dark]);
    crenels(R, 4, 32, 88, dark);
    R.push([22, 14, 12, 34, stone], [62, 14, 12, 34, stone]);
    crenels(R, 22, 12, 12, stone);
    crenels(R, 62, 12, 12, stone);
    R.push([36, 22, 24, 26, light]);
    crenels(R, 36, 20, 24, light);
    for (let y = 25; y < 48; y += 4) R.push([36, y, 24, 0.5, stone, 0.8], [22, y - 2, 12, 0.5, dark, 0.6], [62, y - 2, 12, 0.5, dark, 0.6]);
    const Y = '#FFD54F';
    R.push([26, 20, 2, 3, Y], [30, 28, 2, 3, Y], [66, 20, 2, 3, Y], [68, 30, 2, 3, Y], [40, 27, 2, 3, Y], [46, 25, 4, 4, Y], [54, 27, 2, 3, Y]);
    R.push([44, 38, 8, 10, '#1A1410'], [45, 37, 6, 1, '#1A1410'], [46, 38, 0.6, 10, '#3A3A3A'], [48, 38, 0.6, 10, '#3A3A3A'], [50, 38, 0.6, 10, '#3A3A3A']);
    R.push([27, 3, 1, 9, '#3A2A1A'], [28, 3, 5, 3, '#55FF55'], [67, 3, 1, 9, '#3A2A1A'], [68, 3, 5, 3, '#29B6F6']);
    ground(R, 48, '#2E8B3C', '#3B2716', 4);
    R.push([44, 48, 8, 12, '#6B5A40'], [41, 40, 1, 3, '#5A3A20'], [41, 39, 1, 1, '#FFB300'], [54, 40, 1, 3, '#5A3A20'], [54, 39, 1, 1, '#FFB300']);
    return { sky: ['#0B1530', '#1B2F55'], rects: R, glows: [[41.5, 39, 5, '#FFB300', 0.3], [54.5, 39, 5, '#FFB300', 0.3], [80, 10, 12, '#EDEBD7', 0.12]] };
  },

  base() {
    const R = [];
    R.push([10, 8, 8, 8, '#FFE082']);
    R.push([28, 8, 14, 3, '#FFFFFF', 0.75], [32, 6, 8, 2, '#FFFFFF', 0.75], [62, 12, 16, 3, '#FFFFFF', 0.6], [66, 10, 6, 2, '#FFFFFF', 0.6]);
    hills(R, 4, 22, 4, '#1F6B2A');
    ground(R, 46, '#3FA82E', '#6B4728', 9);
    tree(R, 14, 46);
    tree(R, 24, 46);
    tree(R, 86, 46);
    // house
    R.push([36, 30, 22, 16, '#9C6B3C']);
    for (let y = 32; y < 46; y += 3) R.push([36, y, 22, 0.6, '#7A5230']);
    R.push([36, 30, 2, 16, '#5A3A20'], [56, 30, 2, 16, '#5A3A20']);
    [[34, 28, 26], [36, 26, 22], [38, 24, 18], [40, 22, 14], [42, 20, 10], [44, 18, 6]].forEach(([x, y, w], i) =>
      R.push([x, y, w, 2, i % 2 ? '#6B4728' : '#5A3A20']),
    );
    R.push([45, 38, 4, 8, '#5A3A20'], [48, 42, 1, 1, '#FFD54F'], [39, 34, 4, 4, '#7FDBFF'], [51, 34, 4, 4, '#7FDBFF'], [40, 35, 1, 1, '#E8FFFF'], [52, 35, 1, 1, '#E8FFFF']);
    R.push([59, 26, 2, 6, '#80878D'], [59, 22, 2, 2, '#AAB2B8', 0.5]);
    // farm
    R.push([64, 44, 20, 2, '#5A3A20'], [64, 45, 20, 1, '#29B6F6']);
    for (let x = 64; x < 84; x += 2) R.push([x, 41, 1, 3, x % 4 ? '#C9B83A' : '#8DB33A']);
    for (let x = 62; x < 86; x += 4) R.push([x, 40, 1, 6, '#7A5230']);
    R.push([62, 41, 24, 0.6, '#7A5230']);
    return { sky: ['#0E3358', '#4A90C0'], rects: R, glows: [[14, 12, 14, '#FFE082', 0.25]] };
  },

  arena() {
    const R = [];
    stars(R, 14, 20, 18);
    const tiers = ['#3A3F45', '#4A4F55', '#5A5F66'];
    tiers.forEach((c, t) => {
      R.push([0, 20 + t * 4, 96, 4, c]);
      for (let x = 1; x < 96; x += 2) {
        if (rnd(x + t * 100) > 0.35) {
          R.push([x, 21 + t * 4, 1, 2, ['#C62828', '#1565C0', '#55FF55', '#FFD54F', '#F5F5F5'][Math.floor(rnd(x * 3 + t) * 5)]]);
        }
      }
    });
    R.push([0, 32, 96, 8, '#6D747A']);
    crenels(R, 0, 30, 96, '#6D747A');
    R.push([10, 32, 4, 9, '#C62828'], [11, 41, 2, 1, '#C62828'], [82, 32, 4, 9, '#1565C0'], [83, 41, 2, 1, '#1565C0'], [46, 32, 4, 7, '#2E8B3C']);
    R.push([0, 40, 96, 20, '#B89F6A']);
    for (let i = 0; i < 60; i++) R.push([Math.floor(rnd(i + 300) * 96), 41 + Math.floor(rnd(i + 400) * 19), 1, 1, '#A68C58']);
    R.push([38, 48, 20, 6, '#FF6D00'], [36, 49, 24, 4, '#FF6D00'], [40, 49, 6, 2, '#FFAB00'], [50, 51, 5, 1, '#FFD54F'], [44, 52, 3, 1, '#FFD54F']);
    player(R, 26, 36, '#C62828');
    player(R, 67, 36, '#1565C0', true);
    return { sky: ['#1A0A16', '#4A1A2A'], rects: R, glows: [[48, 51, 16, '#FF6D00', 0.35]] };
  },

  mines() {
    const R = [];
    const shades = ['#2B2F33', '#33383D', '#26292D', '#3A3F44'];
    for (let by = 0; by < 15; by++) {
      for (let bx = 0; bx < 24; bx++) {
        const cx = bx * 4 + 2;
        const cy = by * 4 + 2;
        const inside = ((cx - 48) / 34) ** 2 + ((cy - 32) / 17) ** 2 < 1;
        if (inside) continue;
        const n = bx * 31 + by * 17;
        R.push([bx * 4, by * 4, 4, 4, shades[Math.floor(rnd(n) * shades.length)]]);
        if (rnd(n + 5) > 0.9) R.push([bx * 4 + 1, by * 4 + 1, 1, 1, '#4DE8E8'], [bx * 4 + 2, by * 4 + 2, 1, 1, '#7FF5F5']);
        else if (rnd(n + 9) > 0.93) R.push([bx * 4 + 1, by * 4 + 2, 2, 1, '#FFD54F']);
      }
    }
    R.push([16, 46, 64, 4, '#3A2E22']);
    for (let x = 18; x < 78; x += 4) R.push([x, 46, 2, 2, '#6D5A40']);
    R.push([16, 45, 64, 0.8, '#AAB2B8'], [16, 47.5, 64, 0.8, '#AAB2B8']);
    R.push([40, 39, 12, 6, '#5A5F66'], [41, 40, 10, 2, '#3A3F45'], [42, 38, 3, 2, '#4DE8E8'], [46, 37, 3, 3, '#7FF5F5'], [42, 45, 2, 2, '#1A1A1A'], [48, 45, 2, 2, '#1A1A1A']);
    R.push([21, 26, 1, 4, '#5A3A20'], [21, 25, 1, 1, '#FFB300'], [74, 26, 1, 4, '#5A3A20'], [74, 25, 1, 1, '#FFB300']);
    R.push([76, 52, 20, 8, '#FF6D00'], [80, 53, 6, 2, '#FFAB00'], [88, 55, 4, 1, '#FFD54F']);
    return {
      sky: ['#0A0D10', '#121619'],
      rects: R,
      glows: [[21.5, 25, 10, '#FFB300', 0.22], [74.5, 25, 10, '#FFB300', 0.22], [86, 56, 14, '#FF6D00', 0.3], [46, 38, 8, '#4DE8E8', 0.18]],
    };
  },

  portal() {
    const R = [];
    for (let i = 0; i < 24; i++) R.push([Math.floor(rnd(i + 700) * 96), Math.floor(rnd(i + 800) * 48), 1, 1, '#B388FF', 0.5]);
    R.push([0, 50, 96, 10, '#5A1A1A']);
    for (let i = 0; i < 50; i++) R.push([Math.floor(rnd(i + 900) * 96), 50 + Math.floor(rnd(i + 950) * 10), 1, 1, rnd(i) > 0.5 ? '#7A2424' : '#3E1010']);
    for (let x = 36; x < 60; x += 4) {
      R.push([x, 10, 4, 4, '#1B1030'], [x, 46, 4, 4, '#1B1030']);
    }
    for (let y = 10; y < 50; y += 4) R.push([36, y, 4, 4, '#1B1030'], [56, y, 4, 4, '#1B1030']);
    for (let i = 0; i < 20; i++) R.push([36 + Math.floor(rnd(i + 1000) * 24), 10 + Math.floor(rnd(i + 1100) * 40), 1, 1, '#3A2560']);
    R.push([40, 14, 16, 32, '#6A1FD0']);
    for (let i = 0; i < 70; i++) {
      R.push([40 + Math.floor(rnd(i + 1200) * 15), 14 + Math.floor(rnd(i + 1300) * 31), 1 + Math.floor(rnd(i + 1400) * 2), 1, ['#9C4DFF', '#B388FF', '#4A148C'][i % 3]]);
    }
    [[14, 22], [76, 22]].forEach(([x, y]) => {
      R.push([x, y, 6, 28, '#D9D4C7']);
      for (let yy = y + 4; yy < 50; yy += 4) R.push([x, yy, 6, 0.6, '#B5AE9E']);
      R.push([x - 1, y - 2, 8, 2, '#E8E4D8'], [x + 2, y - 5, 2, 3, '#FFD54F']);
    });
    return { sky: ['#12061F', '#2A0E3A'], rects: R, glows: [[48, 30, 22, '#9C4DFF', 0.35], [17, 18, 5, '#FFD54F', 0.3], [79, 18, 5, '#FFD54F', 0.3]] };
  },

  event() {
    const R = [];
    stars(R, 24, 40, 30);
    firework(R, 20, 14, 9, ['#55FF55', '#B6FFB6', '#2E8B3C'], 0.2);
    firework(R, 50, 10, 11, ['#29B6F6', '#7FDBFF', '#F5F5F5'], 0.5);
    firework(R, 78, 16, 8, ['#55FF55', '#29B6F6'], 0.1);
    firework(R, 64, 5, 5, ['#FFD54F', '#FFF6C9'], 0.3);
    for (let y = 26; y < 40; y += 3) R.push([20, y, 1, 1, '#55FF55', 0.4], [50, y - 4, 1, 1, '#29B6F6', 0.4]);
    R.push([28, 40, 40, 4, '#5A3A20'], [28, 44, 40, 4, '#3B2716'], [34, 28, 28, 10, '#10161A'], [35, 29, 26, 8, '#0A1014']);
    R.push([37, 31, 10, 2, '#55FF55'], [37, 34, 18, 1, '#29B6F6'], [49, 31, 8, 2, '#F5F5F5']);
    R.push([30, 38, 2, 2, '#55FF55'], [64, 38, 2, 2, '#29B6F6'], [47, 36, 3, 4, '#C68E5A']);
    ground(R, 54, '#2E8B3C', '#2A1C10', 12);
    const shirts = ['#C62828', '#1565C0', '#2E8B3C', '#FFD54F', '#7B2FF7', '#F5F5F5', '#FF6D00'];
    for (let x = 1; x < 96; x += 3) {
      const y = 49 + Math.floor(rnd(x + 50) * 2);
      R.push([x, y, 2, 2, rnd(x) > 0.3 ? '#C68E5A' : '#8D5524'], [x, y + 2, 2, 4, shirts[Math.floor(rnd(x + 9) * shirts.length)]]);
    }
    return { sky: ['#05070F', '#0E1A33'], rects: R, glows: [[50, 10, 16, '#29B6F6', 0.25], [20, 14, 12, '#55FF55', 0.2], [48, 33, 14, '#55FF55', 0.12]] };
  },

  skyline() {
    const R = [];
    stars(R, 18, 60, 20);
    R.push([0, 28, 96, 14, '#29B6F6', 0.12]);
    const buildings = [
      [2, 8, 26, '#D9D4C7'], [11, 6, 34, '#3FB8AF'], [18, 10, 20, '#8B5A2B'], [29, 7, 40, '#E0E0E0'],
      [37, 9, 28, '#2E8B3C'], [47, 12, 44, '#1F6F8B'], [60, 8, 30, '#D9D4C7'], [69, 10, 24, '#5A3A20'],
      [80, 6, 36, '#3FB8AF'], [87, 9, 22, '#E0E0E0'],
    ];
    buildings.forEach(([x, w, h, c], b) => {
      const top = 52 - h;
      R.push([x, top, w, h, c], [x, top, w, 1, '#FFFFFF', 0.15]);
      for (let wy = top + 3; wy < 50; wy += 3) {
        for (let wx = x + 1; wx < x + w - 1; wx += 2) {
          R.push([wx, wy, 1, 1, rnd(wx * 7 + wy * 13 + b) > 0.55 ? '#FFD54F' : '#0A1014', rnd(wx + wy) > 0.55 ? 1 : 0.5]);
        }
      }
    });
    R.push([52, 2, 2, 6, '#AAB2B8'], [52.5, 0, 1, 2, '#7FDBFF']);
    R.push([0, 52, 96, 8, '#0D3B66']);
    for (let i = 0; i < 30; i++) R.push([Math.floor(rnd(i + 2000) * 96), 53 + Math.floor(rnd(i + 2100) * 7), 3, 0.6, rnd(i) > 0.5 ? '#FFD54F' : '#7FDBFF', 0.5]);
    return { sky: ['#0B1D33', '#1E5A7A'], rects: R, glows: [[53, 2, 8, '#7FDBFF', 0.4]] };
  },
};
