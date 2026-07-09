/* ============================================
   Shared pixel-art sprite generator.
   Renders tiny grid strings into crisp SVG data-URIs.
   ============================================ */

function pixelSprite(grid, palette, pixelSize = 6){
  const rows = grid.length;
  const cols = grid[0].length;
  let rects = '';
  for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      const ch = grid[y][x];
      if(ch === '.') continue;
      const color = palette[ch];
      rects += `<rect x="${x*pixelSize}" y="${y*pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${color}"/>`;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" viewBox="0 0 ${cols*pixelSize} ${rows*pixelSize}">${rects}</svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

const SPRITES = {
  rocket: {
    grid: [
      '..111..',
      '.11211.',
      '.12221.',
      '.12221.',
      '.11211.',
      '1111111',
      '1333331',
      '1113111',
      '..131..',
      '.14441.',
      '..444..',
      '...4...'
    ],
    palette: { '1':'#c9d6ff', '2':'#0a0b1e', '3':'#4ce0d2', '4':'#ffd166' }
  },
  ufo: {
    grid: [
      '....111....',
      '...15551...',
      '11111111111',
      '16161616161',
      '.11111111..',
      '...11111...'
    ],
    goodPalette: { '1':'#4ce0d2', '5':'#0a0b1e', '6':'#e9e6f7' },
    badPalette:  { '1':'#ff5470', '5':'#0a0b1e', '6':'#ffd166' },
    neutralPalette: { '1':'#9c93c2', '5':'#0a0b1e', '6':'#e9e6f7' }
  }
};

// Auto-inject sprites into any matching elements found on the page.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.spriteRocket').forEach(el => {
    el.src = pixelSprite(SPRITES.rocket.grid, SPRITES.rocket.palette, 5);
  });
  document.querySelectorAll('.spriteUfoGood').forEach(el => {
    el.src = pixelSprite(SPRITES.ufo.grid, SPRITES.ufo.goodPalette, 4);
  });
  document.querySelectorAll('.spriteUfoBad').forEach(el => {
    el.src = pixelSprite(SPRITES.ufo.grid, SPRITES.ufo.badPalette, 4);
  });
});
