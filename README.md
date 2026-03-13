# ETFLens — Premium ETF Research Dashboard

A fully client-side, zero-dependency ETF research dashboard built with plain HTML, CSS, and JavaScript. No build step, no framework, no API key required — just open `index.html` in any modern browser.

---

## Features

- **Instant ETF analysis** — search any supported ticker and get a full breakdown in under a second
- **Comprehensive data panels**
  - Overview stats (AUM, expense ratio, holdings count, yield)
  - Top 10 holdings table
  - Sector allocation donut chart (canvas-rendered)
  - Cost & fund metrics scorecard
  - Multi-period performance bar chart vs benchmark
  - Risk profile cards (rated Low / Medium / High)
  - Portfolio use-case cards
  - Bottom-line verdict (strengths, weaknesses, neutral notes)
- **Quick-pick chip bar** — 13 default tickers, one click to load
- **📂 Load Watchlist** — load a `.txt` file of tickers to replace the chip bar with your own list
- **Dark financial theme** — glass-morphism header, responsive grid, animated cards
- **Fully offline** — all data is bundled; no network requests needed

---

## Supported ETFs (built-in database)

| Ticker | Name | Category |
|--------|------|----------|
| **SPY** | SPDR S&P 500 ETF Trust | Large-Cap Blend |
| **QQQ** | Invesco QQQ Trust | Large-Cap Growth / Tech |
| **VOO** | Vanguard S&P 500 ETF | Large-Cap Blend |
| **VTI** | Vanguard Total Stock Market ETF | Total US Market |
| **IVV** | iShares Core S&P 500 ETF | Large-Cap Blend |
| **SCHD** | Schwab US Dividend Equity ETF | Dividend / Quality |
| **ARKK** | ARK Innovation ETF | Thematic / Disruptive |
| **GLD** | SPDR Gold Shares | Commodity — Gold |
| **BND** | Vanguard Total Bond Market ETF | US Taxable Bond |
| **AGG** | iShares Core US Aggregate Bond ETF | US Taxable Bond |
| **BNDW** | Vanguard Total World Bond ETF | Global Bond |
| **VXUS** | Vanguard Total International Stock ETF | International Equity |
| **IEFA** | iShares Core MSCI EAFE ETF | Developed Intl Equity |

---

## Getting Started

### Option A — Open directly (simplest)
```
Double-click index.html
```
No server, no install. Works in Chrome, Firefox, Edge, and Safari.

### Option B — Serve locally (recommended for development)
```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# VS Code
Use the "Live Server" extension and click "Go Live"
```
Then open `http://localhost:8080` in your browser.

---

## Using the Watchlist File Loader

1. Create a plain text file (e.g. `watchlist.txt`) with your tickers
2. Click **📂 Load Watchlist** in the chip bar
3. Select your file — chips are replaced with your tickers instantly

### File format
```
# My portfolio watchlist
SPY
QQQ
BND

# Bond allocation
AGG, BNDW

VXUS  IEFA
```

**Rules:**
- One ticker per line, or comma / space / semicolon separated — any mix works
- Lines starting with `#` are treated as comments and ignored
- Tickers must be 1–10 letters (A–Z only)
- Unrecognised tickers appear as red chips with a tooltip; recognised ones are white and clickable
- A summary banner shows how many tickers were found vs recognised
- Click **✕ Reset** to restore the 13 default chips at any time

---

## Project Structure

```
etf__analyzer/
├── index.html      # App shell — header, search bar, dashboard sections
├── styles.css      # Dark theme, CSS variables, responsive grid
├── script.js       # All logic — ETF database, rendering, charts, events
└── README.md       # This file
```

### `script.js` sections

| Section | Lines (approx) | Purpose |
|---------|---------------|---------|
| 1 | 1 – 1680 | `ETF_DATABASE` — all ETF data objects |
| 2 | ~1681 | `fetchETFData()` — async data resolver (swap for real API) |
| 3 | ~1690 | Canvas chart helpers — `drawDonut()`, `drawPerfBars()` |
| 4 | ~1750 | Render functions — one per dashboard section |
| 5 | ~1870 | UI state — `showLoader()`, `showDashboard()`, `showNotFound()` |
| 6 | ~1895 | `handleSearch()` — main orchestrator |
| 7 | ~1920 | `DOMContentLoaded` event listeners + watchlist file loader |

---

## Adding a New ETF

1. Open `script.js` and locate `const ETF_DATABASE = {`
2. Add a new entry following the existing schema (copy any existing ETF block as a template):
```js
TICKER: {
  ticker: 'TICKER',
  name: 'Full ETF Name',
  issuer: 'Issuer Name',
  category: 'Category',
  price: 123.45,
  change: '+0.50%',
  changePositive: true,
  aumBn: 50,           // AUM in billions
  inceptionYear: 2010,
  description: `...`,
  overview: [ ... ],
  holdings: { ... },
  sectors: [ ... ],
  costs: [ ... ],
  performance: { ... },
  risks: [ ... ],
  useCases: [ ... ],
  bottomLine: [ ... ],
},
```
3. Optionally add the ticker as a chip in `index.html`

---

## Connecting a Real API

The `fetchETFData()` function in `script.js` is the integration point:

```js
async function fetchETFData(ticker) {
  // Currently: reads from local ETF_DATABASE with a simulated delay
  // Replace with a real fetch call, e.g.:
  //
  // const res = await fetch(`https://your-api.com/etf/${ticker}`);
  // if (!res.ok) return null;
  // return await res.json();

  return new Promise(resolve => {
    setTimeout(() => resolve(ETF_DATABASE[ticker] || null), 700);
  });
}
```

Any response object that matches the `ETF_DATABASE` schema will render correctly without any other code changes.

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Safari 14+ | ✅ Full |
| IE 11 | ❌ Not supported |

Requires: ES2020 (optional chaining, nullish coalescing, async/await), Canvas API, FileReader API.

---

## License

MIT — free to use, modify, and distribute.
