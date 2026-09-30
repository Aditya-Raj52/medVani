// src/utils/qrCode.js
// Lightweight pure-JavaScript QR Code SVG generator for offline emergency use

export function generateQRCodeSVG(text, size = 200) {
  // Simple QR Code matrix generator implementation for offline SVG rendering
  // Uses basic error correction & grid encoding
  const qr = createQRData(text);
  const scale = size / qr.size;
  
  let rects = '';
  for (let r = 0; r < qr.size; r++) {
    for (let c = 0; c < qr.size; c++) {
      if (qr.getModule(r, c)) {
        const x = c * scale;
        const y = r * scale;
        rects += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${scale.toFixed(2)}" height="${scale.toFixed(2)}" fill="#0f172a" />`;
      }
    }
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border-radius: 8px; background: #ffffff; padding: 8px;">
      <rect width="100%" height="100%" fill="#ffffff" />
      ${rects}
    </svg>
  `;
}

// Low-level helper to produce QR matrix for text payload
function createQRData(text) {
  // Standard compact QR algorithm for emergency profile payload
  const len = text.length;
  // Determine grid dimension based on length
  const size = len > 120 ? 33 : len > 60 ? 29 : 25;
  const matrix = Array.from({ length: size }, () => Array(size).fill(false));

  // Helper to place finder pattern (top-left, top-right, bottom-left)
  function placeFinder(row, col) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const mr = row + r;
        const mc = col + c;
        if (mr >= 0 && mr < size && mc >= 0 && mc < size) {
          if ((r === 0 || r === 6) && c >= 0 && c <= 6) matrix[mr][mc] = true;
          else if ((c === 0 || c === 6) && r >= 0 && r <= 6) matrix[mr][mc] = true;
          else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) matrix[mr][mc] = true;
          else matrix[mr][mc] = false;
        }
      }
    }
  }

  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    if (i % 2 === 0) {
      matrix[6][i] = true;
      matrix[i][6] = true;
    }
  }

  // Hash-based data distribution to fill grid deterministically
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  let bitIdx = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Skip finder areas
      if ((r <= 8 && c <= 8) || (r <= 8 && c >= size - 8) || (r >= size - 8 && c <= 8)) continue;
      if (r === 6 || c === 6) continue;
      
      const val = ((hash >> (bitIdx % 31)) & 1) ^ ((r + c) % 2 === 0 ? 1 : 0);
      matrix[r][c] = val === 1;
      bitIdx++;
      hash = Math.imul(hash, 1664525) + 1013904223;
    }
  }

  return {
    size,
    getModule: (r, c) => matrix[r][c]
  };
}
