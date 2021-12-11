function toPath(coords) {
    return 'M' + coords.map(c => `${c[0]},${c[1]}`).join('L') + 'Z';
}

function rectanglePath(left, top, width, height, n) {
    let coordinates = [];
    
    // Initialize dx and dy. Initialize x and y.
    let dx = 0, dy = 0;
    let x = left, y = top;
    let quarterN = n / 4;
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        dx = width / quarterN;
        dy = 0;
      }
      else if (i === 1) {
        dx = 0;
        dy = height / quarterN;
      }
      else if (i === 2) {
        dx = -1 * width / quarterN;
        dy = 0;
      }
      else {
        dx = 0;
        dy = -1 * height / quarterN;
      }
      for (let j = 0; j < quarterN; j++) {
        coordinates.push([x, y]);
        x += dx;
        y += dy;
      }
    }
    
    return coordinates;
}

function circlePath(cx, cy, r, n) {
    let coordinates = [];
    let i0 = -3/8 * n;
    let i1 = 5/8 * n;
    for (let i = i0; i < i1; i++) {
        let radians = i/n * 2*Math.PI;
        let rx = cx + r * Math.cos(radians);
        let ry = cy + r * Math.sin(radians);
        coordinates.push([rx, ry]);
    }
    return coordinates;
}

export  { 
    toPath, 
    circlePath, 
    rectanglePath
}