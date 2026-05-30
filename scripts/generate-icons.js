/**
 * AK Identity — Icon generator
 * Generates logo192.png, logo512.png and favicon.png
 * Uses ONLY Node.js built-ins (zlib). No external deps.
 *
 * Run: node scripts/generate-icons.js
 */

const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

// ─── CRC32 ────────────────────────────────────────────────────────────────────
const crcTable = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c
  }
  return t
})()

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++)
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

// ─── PNG encoder ─────────────────────────────────────────────────────────────
function pngChunk(type, data) {
  const buf = Buffer.alloc(data.length + 12)
  buf.writeUInt32BE(data.length, 0)
  Buffer.from(type, 'ascii').copy(buf, 4)
  if (data.length) data.copy(buf, 8)
  buf.writeUInt32BE(crc32(buf.slice(4, 8 + data.length)), 8 + data.length)
  return buf
}

function encodePNG(w, h, pixels) {
  // Filter-0 (None) row-by-row
  const raw = Buffer.alloc(h * (1 + w * 4))
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0
    pixels.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4)
  }
  const compressed = zlib.deflateSync(raw, { level: 9 })

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0)
  ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8; ihdr[9] = 6 // 8-bit RGBA

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
}

// ─── Canvas ───────────────────────────────────────────────────────────────────
class Canvas {
  constructor(w, h) {
    this.w = w
    this.h = h
    this.buf = Buffer.alloc(w * h * 4, 0)
  }

  _set(x, y, r, g, b, a) {
    x = Math.round(x); y = Math.round(y)
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return
    const i = (y * this.w + x) * 4
    const fa = a / 255
    const ba = this.buf[i + 3] / 255
    const oa = fa + ba * (1 - fa)
    if (oa === 0) return
    this.buf[i]     = Math.round((r * fa + this.buf[i]     * ba * (1 - fa)) / oa)
    this.buf[i + 1] = Math.round((g * fa + this.buf[i + 1] * ba * (1 - fa)) / oa)
    this.buf[i + 2] = Math.round((b * fa + this.buf[i + 2] * ba * (1 - fa)) / oa)
    this.buf[i + 3] = Math.round(oa * 255)
  }

  fill(r, g, b, a = 255) {
    for (let i = 0; i < this.w * this.h; i++) {
      this.buf[i * 4]     = r
      this.buf[i * 4 + 1] = g
      this.buf[i * 4 + 2] = b
      this.buf[i * 4 + 3] = a
    }
  }

  // Filled circle
  circle(cx, cy, rad, r, g, b, a = 255) {
    const r2 = rad * rad
    const x0 = Math.floor(cx - rad), x1 = Math.ceil(cx + rad)
    const y0 = Math.floor(cy - rad), y1 = Math.ceil(cy + rad)
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const dx = x - cx, dy = y - cy
        // Anti-alias at edge
        const dist2 = dx * dx + dy * dy
        if (dist2 <= r2) this._set(x, y, r, g, b, a)
        else if (dist2 <= (rad + 1) * (rad + 1)) {
          const edge = rad + 1 - Math.sqrt(dist2)
          this._set(x, y, r, g, b, Math.round(a * edge))
        }
      }
    }
  }

  // Rounded rect (filled)
  roundRect(x, y, w, h, rad, r, g, b, a = 255) {
    const cx = x + w / 2, cy = y + h / 2
    const hw = w / 2, hh = h / 2
    for (let py = Math.floor(y); py <= Math.ceil(y + h); py++) {
      for (let px = Math.floor(x); px <= Math.ceil(x + w); px++) {
        const dx = Math.max(0, Math.abs(px - cx) - (hw - rad))
        const dy = Math.max(0, Math.abs(py - cy) - (hh - rad))
        const dist2 = dx * dx + dy * dy
        if (dist2 <= rad * rad) this._set(px, py, r, g, b, a)
        else if (dist2 <= (rad + 1) * (rad + 1)) {
          const edge = rad + 1 - Math.sqrt(dist2)
          this._set(px, py, r, g, b, Math.round(a * edge))
        }
      }
    }
  }

  // Thick line with round caps (stroke-linecap: round)
  line(x0, y0, x1, y1, r, g, b, sw) {
    const hw = sw / 2
    const dx = x1 - x0, dy = y1 - y0
    const len = Math.sqrt(dx * dx + dy * dy)
    if (len < 0.001) { this.circle(x0, y0, hw, r, g, b); return }
    const nx = -dy / len, ny = dx / len // perpendicular normal

    // Scan-fill the quad
    const pts = [
      [x0 + nx * hw, y0 + ny * hw],
      [x0 - nx * hw, y0 - ny * hw],
      [x1 - nx * hw, y1 - ny * hw],
      [x1 + nx * hw, y1 + ny * hw],
    ]
    const minY = Math.floor(Math.min(...pts.map(p => p[1])))
    const maxY = Math.ceil(Math.max(...pts.map(p => p[1])))

    for (let scanY = minY; scanY <= maxY; scanY++) {
      const xs = []
      for (let i = 0; i < 4; i++) {
        const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % 4]
        if ((ay <= scanY && by > scanY) || (by <= scanY && ay > scanY)) {
          xs.push(ax + ((scanY - ay) / (by - ay)) * (bx - ax))
        }
      }
      xs.sort((a, b) => a - b)
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const sx = Math.floor(xs[k]), ex = Math.ceil(xs[k + 1])
        for (let px = sx; px <= ex; px++) this._set(px, scanY, r, g, b, 255)
      }
    }
    // Round caps
    this.circle(x0, y0, hw, r, g, b)
    this.circle(x1, y1, hw, r, g, b)
  }

  toPNG() { return encodePNG(this.w, this.h, this.buf) }
}

// ─── AK mark renderer ─────────────────────────────────────────────────────────
//  SVG viewBox 0 0 116 124 — paths:
//  A left diag  : M16 108 L58 16   (white)
//  Shared spine : M58 16 L58 108   (white)
//  A crossbar   : M33.5 70 L58 70  (white)
//  K upper arm  : M58 62 L100 16   (cyan  #06B6D4)
//  K lower leg  : M58 62 L100 108  (white)

function drawAKMark(canvas, size) {
  const VBW = 116, VBH = 124
  const drawArea = size * 0.62
  const scale = Math.min(drawArea / VBW, drawArea / VBH)

  const ox = (size - VBW * scale) / 2
  const oy = (size - VBH * scale) / 2

  const tx = (x) => x * scale + ox
  const ty = (y) => y * scale + oy
  const sw = 10.5 * scale

  const W = [255, 255, 255]   // white
  const C = [6, 182, 212]     // cyan #06B6D4

  canvas.line(tx(16),   ty(108), tx(58),  ty(16),  ...W, sw) // A left diag
  canvas.line(tx(58),   ty(16),  tx(58),  ty(108), ...W, sw) // spine
  canvas.line(tx(33.5), ty(70),  tx(58),  ty(70),  ...W, sw) // crossbar
  canvas.line(tx(58),   ty(62),  tx(100), ty(16),  ...C, sw) // K upper arm (cyan)
  canvas.line(tx(58),   ty(62),  tx(100), ty(108), ...W, sw) // K lower leg
}

function generateIcon(size) {
  const canvas = new Canvas(size, size)
  const rad = size * 0.19
  // Dark background #0E1116
  canvas.roundRect(0, 0, size, size, rad, 14, 17, 22, 255)
  drawAKMark(canvas, size)
  return canvas.toPNG()
}

// ─── Write files ──────────────────────────────────────────────────────────────
const publicDir = path.join(__dirname, '..', 'public')

const sizes = [
  { name: 'logo192.png', size: 192 },
  { name: 'logo512.png', size: 512 },
  { name: 'favicon.png', size: 32  },
]

sizes.forEach(({ name, size }) => {
  const buf = generateIcon(size)
  fs.writeFileSync(path.join(publicDir, name), buf)
  console.log(`✓ ${name}  (${size}×${size}, ${buf.length} bytes)`)
})

console.log('\nDone — AK identity icons generated.')
