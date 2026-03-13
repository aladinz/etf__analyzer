/* ═══════════════════════════════════════════════════════════════
   ETFLens – script.js
   Modular JavaScript. Replace `ETF_DATABASE` fetch with a real
   API call in `fetchETFData()` to go live.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────────────────────────
   1.  SAMPLE DATA  (swap fetchETFData() to hit a real API)
────────────────────────────────────────────────────────────────── */
const ETF_DATABASE = {

  SPY: {
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    issuer: 'State Street Global Advisors',
    category: 'Large-Cap Blend',
    price: 521.47,
    change: '+0.82%',
    changePositive: true,
    aumBn: 530,
    inceptionYear: 1993,
    description: `SPY is the oldest and most widely traded US equity ETF, tracking the S&P 500 Index — 
      a market-cap-weighted benchmark of 500 large-cap US companies. It offers broad, liquid 
      exposure to the US equity market and is widely used by both institutional and retail investors 
      as a core holding or trading vehicle. Its sheer liquidity makes it the benchmark of benchmarks.`,
    overview: [
      { label: 'AUM', value: '$530B', accent: 'accent-blue', sub: 'Largest ETF by AUM' },
      { label: 'Expense Ratio', value: '0.0945%', accent: 'accent-teal', sub: 'Class avg 0.03–0.09%' },
      { label: 'Holdings', value: '503', accent: 'accent-purple', sub: 'S&P 500 constituents' },
      { label: 'Avg Daily Vol', value: '$22B', accent: 'accent-amber', sub: 'Extremely liquid' },
    ],
    holdings: {
      concentration: { top10pct: '34.2%', top25pct: '48.6%', totalPositions: 503 },
      style: 'Large-cap blend with growth tilt due to mega-cap tech weight.',
      items: [
        { ticker: 'MSFT',  name: 'Microsoft Corp',        weight: 6.89 },
        { ticker: 'NVDA',  name: 'NVIDIA Corp',           weight: 6.31 },
        { ticker: 'AAPL',  name: 'Apple Inc',             weight: 6.10 },
        { ticker: 'AMZN',  name: 'Amazon.com Inc',        weight: 3.81 },
        { ticker: 'META',  name: 'Meta Platforms',        weight: 2.72 },
        { ticker: 'GOOGL', name: 'Alphabet Class A',      weight: 2.11 },
        { ticker: 'GOOG',  name: 'Alphabet Class C',      weight: 1.80 },
        { ticker: 'BRK.B', name: 'Berkshire Hathaway B',  weight: 1.71 },
        { ticker: 'LLY',   name: 'Eli Lilly & Co',        weight: 1.58 },
        { ticker: 'AVGO',  name: 'Broadcom Inc',          weight: 1.52 },
      ],
    },
    sectors: [
      { name: 'Information Technology', pct: 31.5, color: '#3b82f6' },
      { name: 'Financials',             pct: 13.2, color: '#8b5cf6' },
      { name: 'Health Care',            pct: 11.8, color: '#14b8a6' },
      { name: 'Consumer Discretionary', pct:  9.9, color: '#f59e0b' },
      { name: 'Communication Services', pct:  8.7, color: '#6366f1' },
      { name: 'Industrials',            pct:  8.1, color: '#22c55e' },
      { name: 'Consumer Staples',       pct:  5.8, color: '#f43f5e' },
      { name: 'Energy',                 pct:  3.9, color: '#fb923c' },
      { name: 'Utilities',              pct:  2.4, color: '#a78bfa' },
      { name: 'Real Estate',            pct:  2.3, color: '#34d399' },
      { name: 'Materials',              pct:  2.4, color: '#fbbf24' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.0945%', sub: 'Slightly above IVV/VOO peers', accent: '#3b82f6', rating: 'avg', ratingLabel: 'Average' },
      { icon: '🏦', label: 'AUM',           value: '$530B',   sub: 'Most liquid ETF globally',    accent: '#14b8a6', rating: 'low', ratingLabel: 'Best-in-class' },
      { icon: '📊', label: 'Annual Turnover', value: '~3%',   sub: 'Very low, index-based',       accent: '#8b5cf6', rating: 'low', ratingLabel: 'Low' },
      { icon: '📈', label: 'Tracking Error', value: '~0.03%', sub: 'Extremely tight to S&P 500',  accent: '#f59e0b', rating: 'low', ratingLabel: 'Minimal' },
      { icon: '📅', label: 'Inception',      value: '1993',   sub: 'Longest track record',        accent: '#6366f1', rating: null },
      { icon: '💧', label: 'Bid-Ask Spread', value: '~$0.01', sub: 'Near zero cost to trade',     accent: '#22c55e', rating: 'low', ratingLabel: 'Near-zero' },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   2.1, bmk:   2.1 },
        { period: '3 Months',   etf:   4.8, bmk:   4.8 },
        { period: '1 Year',     etf:  24.2, bmk:  24.2 },
        { period: '3 Year',     etf:  10.6, bmk:  10.6 },
        { period: '5 Year',     etf:  15.8, bmk:  15.8 },
        { period: '10 Year',    etf:  13.1, bmk:  13.1 },
        { period: 'Since 1993', etf:  10.7, bmk:  10.6 },
      ],
      benchmark: 'S&P 500 Index',
      notes: [
        'Tracks S&P 500 virtually perfectly; any gap is expense ratio drag (~0.09%).',
        'The 2022 drawdown reached –19.4%; the COVID-19 2020 drawdown hit –33.9% before rapid recovery.',
        'Returns are heavily influenced by the mega-cap tech cohort (MSFT, NVDA, AAPL > 19% combined).',
        'Peer alternatives IVV (0.03%) and VOO (0.03%) offer the same exposure at lower cost.',
      ],
    },
    risks: [
      { icon: '🏗️', title: 'Concentration Risk',    level: 'med',  color: '#f59e0b', body: 'Top 10 holdings account for ~34% of the portfolio. Strong mega-cap tech performance has driven returns, creating latent concentration risk if valuations compress.' },
      { icon: '📉', title: 'Market/Equity Risk',     level: 'high', color: '#f43f5e', body: 'Full market beta (β ≈ 1.0). In bear markets, SPY will fall in line with the broad US market. No downside protection is built in.' },
      { icon: '💱', title: 'No Currency Hedge',      level: 'low',  color: '#22c55e', body: 'USD-denominated. For non-US investors, currency fluctuations add return volatility on top of equity risk.' },
      { icon: '⚡', title: 'Valuation Risk',         level: 'med',  color: '#f59e0b', body: 'At current multiples the S&P 500 trades above long-run averages (P/E ~22x). A multiple compression event would weigh heavily on SPY.' },
      { icon: '🌐', title: 'US-Only Exposure',       level: 'low',  color: '#22c55e', body: 'Geographic concentration in the US means no direct exposure to international developed or emerging market growth engines.' },
    ],
    useCases: [
      { icon: '🏛️', title: 'Core Equity Holding',    body: 'Ideal as a foundational equity allocation for long-term investors seeking broad US market exposure with minimal cost and maximum liquidity.' },
      { icon: '⚡', title: 'Tactical Trading Vehicle', body: 'Institutional and active traders use SPY for intraday exposure or hedging given its massive daily volume and ultra-tight spreads.' },
      { icon: '📐', title: 'Benchmark Replication',  body: 'Portfolio managers use SPY to replicate the S&P 500 benchmark when deploying cash or when transitioning portfolios between strategies.' },
      { icon: '🎓', title: 'Passive Long-Term Investors', body: 'Buy-and-hold investors benefit from compounding at near-benchmark returns with negligible tracking error and tax-efficient structure.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'Unmatched liquidity and decades-long track record make SPY the gold-standard broad US equity ETF.' },
      { type: 'strength', text: 'Near-zero tracking error ensures investors receive true S&P 500 exposure.' },
      { type: 'weakness', text: 'Expense ratio of 0.0945% is slightly higher than IVV (0.03%) and VOO (0.03%) — meaningful over decades for long-term buy-and-hold investors.' },
      { type: 'weakness', text: 'Growing mega-cap tech concentration (>30% in IT) means SPY behaves more like a tech-heavy fund than in previous decades.' },
      { type: 'neutral',  text: 'Best suited as a core portfolio holding; its simplicity and efficiency are its primary virtues rather than any differentiated return thesis.' },
      { type: 'neutral',  text: 'For pure passive accumulation consider IVV or VOO for cost savings; SPY remains preferred for active/institutional traders.' },
    ],
  },

  QQQ: {
    ticker: 'QQQ',
    name: 'Invesco QQQ Trust',
    issuer: 'Invesco',
    category: 'Large-Cap Growth / Technology',
    price: 468.92,
    change: '+1.14%',
    changePositive: true,
    aumBn: 260,
    inceptionYear: 1999,
    description: `QQQ tracks the Nasdaq-100 Index — the 100 largest non-financial companies listed on the 
      Nasdaq exchange, dominated by US technology, communication, and consumer discretionary mega-caps. 
      It is a high-growth, high-concentration product that has delivered exceptional long-run returns 
      but with materially higher volatility and drawdowns than broad market ETFs.`,
    overview: [
      { label: 'AUM', value: '$260B', accent: 'accent-blue', sub: '2nd largest US equity ETF' },
      { label: 'Expense Ratio', value: '0.20%', accent: 'accent-rose', sub: 'Higher than SPY/VOO peers' },
      { label: 'Holdings', value: '101', accent: 'accent-purple', sub: 'Nasdaq-100 constituents' },
      { label: 'Avg Daily Vol', value: '$12B', accent: 'accent-amber', sub: 'Highly liquid' },
    ],
    holdings: {
      concentration: { top10pct: '52.1%', top25pct: '68.4%', totalPositions: 101 },
      style: 'Concentrated large-cap growth. Heavy mega-cap technology and AI exposure.',
      items: [
        { ticker: 'MSFT',  name: 'Microsoft Corp',        weight: 8.71 },
        { ticker: 'NVDA',  name: 'NVIDIA Corp',           weight: 8.40 },
        { ticker: 'AAPL',  name: 'Apple Inc',             weight: 7.89 },
        { ticker: 'AMZN',  name: 'Amazon.com Inc',        weight: 5.18 },
        { ticker: 'META',  name: 'Meta Platforms',        weight: 4.92 },
        { ticker: 'GOOGL', name: 'Alphabet Class A',      weight: 4.61 },
        { ticker: 'GOOG',  name: 'Alphabet Class C',      weight: 2.84 },
        { ticker: 'TSLA',  name: 'Tesla Inc',             weight: 3.22 },
        { ticker: 'AVGO',  name: 'Broadcom Inc',          weight: 3.11 },
        { ticker: 'COST',  name: 'Costco Wholesale',      weight: 2.60 },
      ],
    },
    sectors: [
      { name: 'Information Technology', pct: 49.7, color: '#3b82f6' },
      { name: 'Communication Services', pct: 16.4, color: '#8b5cf6' },
      { name: 'Consumer Discretionary', pct: 14.2, color: '#f59e0b' },
      { name: 'Health Care',            pct:  6.2, color: '#14b8a6' },
      { name: 'Industrials',            pct:  5.1, color: '#22c55e' },
      { name: 'Consumer Staples',       pct:  4.8, color: '#f43f5e' },
      { name: 'Utilities',              pct:  2.1, color: '#a78bfa' },
      { name: 'Basic Materials',        pct:  1.5, color: '#fbbf24' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.20%',  sub: 'Higher vs. QQQM at 0.15%',   accent: '#f43f5e', rating: 'avg', ratingLabel: 'Above Average' },
      { icon: '🏦', label: 'AUM',           value: '$260B',  sub: 'Extremely deep liquidity',    accent: '#14b8a6', rating: 'low', ratingLabel: 'Best-in-class' },
      { icon: '📊', label: 'Annual Turnover', value: '~9%',  sub: 'Moderate index rebalancing',  accent: '#8b5cf6', rating: 'low', ratingLabel: 'Low' },
      { icon: '📈', label: 'Tracking Error', value: '~0.05%', sub: 'Very tight Nasdaq-100 track', accent: '#f59e0b', rating: 'low', ratingLabel: 'Minimal' },
      { icon: '📅', label: 'Inception',      value: '1999',  sub: 'Survived dot-com bust',       accent: '#6366f1', rating: null },
      { icon: '💧', label: 'Bid-Ask Spread', value: '~$0.01', sub: 'Institutional-grade liquidity', accent: '#22c55e', rating: 'low', ratingLabel: 'Near-zero' },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   3.2, bmk:   3.1 },
        { period: '3 Months',   etf:   6.9, bmk:   6.8 },
        { period: '1 Year',     etf:  30.1, bmk:  24.2 },
        { period: '3 Year',     etf:  11.4, bmk:  10.6 },
        { period: '5 Year',     etf:  20.9, bmk:  15.8 },
        { period: '10 Year',    etf:  18.1, bmk:  13.1 },
        { period: 'Since 1999', etf:   9.8, bmk:   8.6 },
      ],
      benchmark: 'S&P 500 (SPY)',
      notes: [
        '2022 drawdown reached \u201332.6%, materially worse than SPY\'s \u201319.4% due to rate-sensitive tech multiples.',
        'Outperformed SPY in 7 of the last 10 calendar years but with notably higher volatility (σ ~22% vs ~16%).',
        'AI-driven rally (2023–2024) supercharged returns; NVDA alone contributed >4% of index return in 2024.',
        'Peer note: QQQM offers identical exposure at 0.15% — preferred for long-term retail investors.',
      ],
    },
    risks: [
      { icon: '🔥', title: 'Mega-Cap Concentration', level: 'high', color: '#f43f5e', body: 'Top 10 holdings exceed 52% of the portfolio. A re-rating of the Magnificent 7 cohort would disproportionately impact QQQ.' },
      { icon: '📉', title: 'High Beta / Volatility',  level: 'high', color: '#f43f5e', body: 'Beta ≈ 1.18 vs S&P 500. Amplified drawdowns in risk-off environments (e.g., –82% in 2000–2002, –32% in 2022).' },
      { icon: '💸', title: 'Interest Rate Sensitivity', level: 'high', color: '#f43f5e', body: 'Long-duration growth stocks are disproportionately discounted by rising rates. QQQ is among the most rate-sensitive major ETFs.' },
      { icon: '🏭', title: 'No Financials or Energy',  level: 'med',  color: '#f59e0b', body: 'The Nasdaq-100 excludes financial stocks entirely, limiting diversification across economic cycles.' },
      { icon: '💹', title: 'Valuation Risk',          level: 'high', color: '#f43f5e', body: 'P/E and P/S multiples for Nasdaq-100 constituents sit well above historical averages, pricing in sustained hyper-growth.' },
    ],
    useCases: [
      { icon: '🚀', title: 'Growth-Oriented Investors', body: 'Investors with long time horizons (10+ years) who accept higher volatility in exchange for above-market growth potential from tech and innovation.' },
      { icon: '💡', title: 'Technology Satellite Allocation', body: 'As a complement to a broad market core (SPY/VTI), QQQ adds deliberate technology and growth tilt within a diversified portfolio.' },
      { icon: '⚡', title: 'Momentum & Tactical Strategies', body: 'QQQ is popular in trend-following and momentum strategies given its responsiveness to risk-on environments and AI/tech cycles.' },
      { icon: '🔮', title: 'AI & Innovation Thematic Bet', body: 'For investors who want concentrated exposure to the AI build-out and hyperscaler capex cycle without picking individual stocks.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'Exceptional long-run performance (~18% annualised over 10 years) driven by secular technology and AI tailwinds.' },
      { type: 'strength', text: 'Deep liquidity and tight spreads make it suitable for both tactical and long-term investors.' },
      { type: 'weakness', text: 'Concentration in top 10 holdings (>52%) creates idiosyncratic risk; poor single-sector breadth.' },
      { type: 'weakness', text: '0.20% expense ratio is higher than QQQM (0.15%) — retail buy-and-hold investors should prefer QQQM.' },
      { type: 'weakness', text: 'High valuation multiples and rate sensitivity make it vulnerable to macro tightening and sentiment shifts.' },
      { type: 'neutral',  text: 'Best used as a growth satellite position (15–30% of equity sleeve) rather than a standalone total-market replacement.' },
    ],
  },

  SCHD: {
    ticker: 'SCHD',
    name: 'Schwab US Dividend Equity ETF',
    issuer: 'Charles Schwab',
    category: 'Large-Cap Value / Dividend',
    price: 28.14,
    change: '+0.31%',
    changePositive: true,
    aumBn: 63,
    inceptionYear: 2011,
    description: `SCHD tracks the Dow Jones US Dividend 100 Index, selecting 100 high-dividend-paying 
      US stocks screened for dividend quality (10+ years of consecutive dividends, strong free cash flow, 
      low debt-to-equity). It blends current income with dividend growth, making it a favourite for 
      income-oriented and total-return investors who want quality-filtered dividend exposure.`,
    overview: [
      { label: 'AUM', value: '$63B', accent: 'accent-blue', sub: 'Top US dividend ETF' },
      { label: 'Expense Ratio', value: '0.06%', accent: 'accent-green', sub: 'One of the cheapest dividend ETFs' },
      { label: '12M Yield', value: '~3.5%', accent: 'accent-amber', sub: 'Quality dividend yield' },
      { label: 'Holdings', value: '100', accent: 'accent-purple', sub: 'Dividend-quality screened' },
    ],
    holdings: {
      concentration: { top10pct: '40.5%', top25pct: '58.2%', totalPositions: 100 },
      style: 'Large-cap value and dividend quality blend. Moderate concentration in top-tier dividend payers.',
      items: [
        { ticker: 'ABBV',  name: 'AbbVie Inc',              weight: 4.80 },
        { ticker: 'AVGO',  name: 'Broadcom Inc',            weight: 4.42 },
        { ticker: 'HD',    name: 'Home Depot Inc',          weight: 4.35 },
        { ticker: 'CVX',   name: 'Chevron Corp',            weight: 4.21 },
        { ticker: 'KO',    name: 'Coca-Cola Co',            weight: 4.12 },
        { ticker: 'PEP',   name: 'PepsiCo Inc',             weight: 3.80 },
        { ticker: 'MRK',   name: 'Merck & Co',              weight: 3.74 },
        { ticker: 'CSCO',  name: 'Cisco Systems',           weight: 3.60 },
        { ticker: 'AMGN',  name: 'Amgen Inc',               weight: 3.51 },
        { ticker: 'TXN',   name: 'Texas Instruments',       weight: 3.40 },
      ],
    },
    sectors: [
      { name: 'Financials',             pct: 17.8, color: '#8b5cf6' },
      { name: 'Health Care',            pct: 16.3, color: '#14b8a6' },
      { name: 'Industrials',            pct: 14.8, color: '#22c55e' },
      { name: 'Consumer Staples',       pct: 14.1, color: '#f43f5e' },
      { name: 'Information Technology', pct: 12.9, color: '#3b82f6' },
      { name: 'Energy',                 pct:  9.7, color: '#fb923c' },
      { name: 'Consumer Discretionary', pct:  7.8, color: '#f59e0b' },
      { name: 'Materials',              pct:  3.6, color: '#fbbf24' },
      { name: 'Utilities',              pct:  3.0, color: '#a78bfa' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.06%',  sub: 'Best-in-class for dividend ETFs',   accent: '#22c55e', rating: 'low', ratingLabel: 'Very Low' },
      { icon: '🏦', label: 'AUM',           value: '$63B',   sub: 'Top 10 equity ETF by AUM',           accent: '#14b8a6', rating: 'low', ratingLabel: 'Excellent' },
      { icon: '📊', label: 'Annual Turnover', value: '~26%', sub: 'Higher due to quality screens',      accent: '#8b5cf6', rating: 'avg', ratingLabel: 'Moderate' },
      { icon: '💰', label: '12M Yield',      value: '~3.5%', sub: 'Grows ~10%/yr on avg historically',  accent: '#f59e0b', rating: null },
      { icon: '📅', label: 'Inception',      value: '2011',  sub: '15-year track record',               accent: '#6366f1', rating: null },
      { icon: '🔄', label: 'Div Frequency',  value: 'Quarterly', sub: 'March, June, Sep, Dec',          accent: '#22c55e', rating: null },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   0.8, bmk:   2.1 },
        { period: '3 Months',   etf:   2.1, bmk:   4.8 },
        { period: '1 Year',     etf:  13.4, bmk:  24.2 },
        { period: '3 Year',     etf:   7.8, bmk:  10.6 },
        { period: '5 Year',     etf:  12.6, bmk:  15.8 },
        { period: '10 Year',    etf:  11.8, bmk:  13.1 },
        { period: 'Since 2011', etf:  13.0, bmk:  14.2 },
      ],
      benchmark: 'S&P 500 (SPY)',
      notes: [
        'Underperforms SPY during strong growth/tech rallies; outperforms during value-led markets (e.g., 2022: SCHD –3.2% vs SPY –19.4%).',
        'Dividend income reinvested accounts for a significant share of total return; total return basis narrows the gap vs SPY over long periods.',
        'Volatility significantly lower than SPY (σ ~14% vs ~16%); beta ≈ 0.78, providing meaningful downside cushion.',
        'Peer comparison: VYM (0.06%, ~$80B AUM) has a higher yield but lower dividend growth; HDV offers more defensive sector tilt.',
      ],
    },
    risks: [
      { icon: '📉', title: 'Growth Underperformance',  level: 'high', color: '#f43f5e', body: 'When mega-cap tech leads the market, SCHD lags significantly. The 2023–2024 AI rally saw SCHD trail SPY by ~15–20 percentage points per year.' },
      { icon: '💸', title: 'Interest Rate Risk',       level: 'med',  color: '#f59e0b', body: 'High-yield equities compete with bonds. Rising rates reduce the attractiveness of dividend stocks, pressuring valuations.' },
      { icon: '✂️', title: 'Dividend Cut Risk',        level: 'low',  color: '#22c55e', body: 'The quality screening (10+ yr dividends, FCF cover) reduces but does not eliminate cut risk. Recessions can stress even stalwart payers.' },
      { icon: '🔄', title: 'Index Reconstitution Risk', level: 'med', color: '#f59e0b', body: 'Annual rebalancing (March) can cause significant portfolio turnover and tracking differences; major holdings can enter/exit each year.' },
      { icon: '📊', title: 'Sector Concentration',    level: 'med',  color: '#f59e0b', body: 'Financials + Health Care + Industrials account for ~49% of the portfolio, creating cyclical sensitivity in financials and healthcare legislative risk.' },
    ],
    useCases: [
      { icon: '💰', title: 'Income-Oriented Investors', body: 'Retirees or near-retirees seeking reliable and growing dividend income without the risk of low-quality high-yield strategies.' },
      { icon: '🛡️', title: 'Downside Protection Sleeve', body: 'As a defensive equity holding within a diversified portfolio; SCHD\'s low beta cushions drawdowns versus a pure growth tilt.' },
      { icon: '⚖️', title: 'Value/Quality Counterweight', body: 'Balances a growth-heavy portfolio (e.g., QQQ) by adding exposure to fundamentally strong cash-generative businesses at reasonable valuations.' },
      { icon: '📈', title: 'Dividend Growth Compounding', body: 'For investors with long time horizons, reinvesting SCHD\'s growing dividends can produce competitive total returns with reduced volatility.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'Best-in-class expense ratio (0.06%) for a quality-screened dividend ETF with $63B in assets and deep liquidity.' },
      { type: 'strength', text: 'Low beta (≈0.78) and strong 2022 relative performance confirm genuine defensive characteristics during bear markets.' },
      { type: 'strength', text: 'Dividend growth averaging ~10% annually makes it compelling for income investors seeking purchasing-power protection.' },
      { type: 'weakness', text: 'Meaningfully lags during tech/growth-led rallies; not suitable as a sole equity holding for total-return maximisers.' },
      { type: 'weakness', text: 'Annual March reconstitution can produce surprise portfolio composition changes, including major exits of long-term holdings.' },
      { type: 'neutral',  text: 'Ideal as a 20–40% equity allocation complement to a broad-market or growth ETF for balanced risk/income portfolios.' },
    ],
  },

  VTI: {
    ticker: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    issuer: 'Vanguard',
    category: 'Total Market Blend',
    price: 248.63,
    change: '+0.74%',
    changePositive: true,
    aumBn: 430,
    inceptionYear: 2001,
    description: `VTI tracks the CRSP US Total Market Index, capturing virtually the entire US equity market 
      across large, mid, small, and micro-cap stocks (~3,700 holdings). It is Vanguard's flagship domestic 
      equity ETF and the purest single-fund expression of the US total market return — broader than the 
      S&P 500 and at one of the lowest costs of any equity ETF.`,
    overview: [
      { label: 'AUM', value: '$430B', accent: 'accent-blue', sub: 'Second only to SPY by AUM' },
      { label: 'Expense Ratio', value: '0.03%', accent: 'accent-green', sub: 'Among the lowest globally' },
      { label: 'Holdings', value: '~3,700', accent: 'accent-purple', sub: 'Full US market coverage' },
      { label: 'Avg Daily Vol', value: '$1.5B', accent: 'accent-teal', sub: 'Very liquid for the category' },
    ],
    holdings: {
      concentration: { top10pct: '30.8%', top25pct: '43.1%', totalPositions: 3700 },
      style: 'Total market blend — large-cap drives returns, but includes meaningful small/mid-cap exposure.',
      items: [
        { ticker: 'MSFT',  name: 'Microsoft Corp',        weight: 5.91 },
        { ticker: 'NVDA',  name: 'NVIDIA Corp',           weight: 5.41 },
        { ticker: 'AAPL',  name: 'Apple Inc',             weight: 5.22 },
        { ticker: 'AMZN',  name: 'Amazon.com Inc',        weight: 3.28 },
        { ticker: 'META',  name: 'Meta Platforms',        weight: 2.38 },
        { ticker: 'GOOGL', name: 'Alphabet Class A',      weight: 1.84 },
        { ticker: 'GOOG',  name: 'Alphabet Class C',      weight: 1.57 },
        { ticker: 'BRK.B', name: 'Berkshire Hathaway B',  weight: 1.46 },
        { ticker: 'LLY',   name: 'Eli Lilly & Co',        weight: 1.34 },
        { ticker: 'AVGO',  name: 'Broadcom Inc',          weight: 1.29 },
      ],
    },
    sectors: [
      { name: 'Information Technology', pct: 29.8, color: '#3b82f6' },
      { name: 'Financials',             pct: 13.4, color: '#8b5cf6' },
      { name: 'Health Care',            pct: 11.4, color: '#14b8a6' },
      { name: 'Consumer Discretionary', pct:  9.7, color: '#f59e0b' },
      { name: 'Communication Services', pct:  8.2, color: '#6366f1' },
      { name: 'Industrials',            pct:  9.0, color: '#22c55e' },
      { name: 'Consumer Staples',       pct:  5.2, color: '#f43f5e' },
      { name: 'Energy',                 pct:  3.6, color: '#fb923c' },
      { name: 'Real Estate',            pct:  3.5, color: '#34d399' },
      { name: 'Utilities',              pct:  2.5, color: '#a78bfa' },
      { name: 'Materials',              pct:  2.7, color: '#fbbf24' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.03%',  sub: 'Equal to SPY peers IVV/VOO',   accent: '#22c55e', rating: 'low', ratingLabel: 'Exceptional' },
      { icon: '🏦', label: 'AUM',           value: '$430B',  sub: 'Second largest US equity ETF', accent: '#14b8a6', rating: 'low', ratingLabel: 'Best-in-class' },
      { icon: '📊', label: 'Annual Turnover', value: '~3%',  sub: 'Very low for broad index',     accent: '#8b5cf6', rating: 'low', ratingLabel: 'Low' },
      { icon: '📈', label: 'Tracking Error', value: '~0.02%', sub: 'Exceptional CRSP replication', accent: '#f59e0b', rating: 'low', ratingLabel: 'Minimal' },
      { icon: '📅', label: 'Inception',      value: '2001',  sub: '24-year live track record',    accent: '#6366f1', rating: null },
      { icon: '🏢', label: 'Issuer',         value: 'Vanguard', sub: 'Investor-owned mutual structure', accent: '#22c55e', rating: null },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   2.0, bmk:   2.1 },
        { period: '3 Months',   etf:   4.6, bmk:   4.8 },
        { period: '1 Year',     etf:  23.9, bmk:  24.2 },
        { period: '3 Year',     etf:  10.4, bmk:  10.6 },
        { period: '5 Year',     etf:  15.6, bmk:  15.8 },
        { period: '10 Year',    etf:  13.4, bmk:  13.1 },
        { period: 'Since 2001', etf:   9.1, bmk:   8.9 },
      ],
      benchmark: 'S&P 500 (SPY)',
      notes: [
        'Marginally broader than SPY; small/mid-cap exposure can add alpha in certain cycles (e.g., small-cap outperformance in 2021).',
        'Virtually identical to SPY in most market environments; differences are small and cyclical.',
        'At 0.03% expense ratio, keeps more return in investors\' pockets vs. SPY at 0.0945%.',
        'Direct competitor ITOT (iShares, 0.03%) offers nearly identical exposure from BlackRock.',
      ],
    },
    risks: [
      { icon: '🏗️', title: 'Still Dominated by Large-Caps', level: 'med', color: '#f59e0b', body: 'Despite ~3,700 holdings, large-caps account for ~80% of weight. Small/mid-cap diversification benefit is real but limited.' },
      { icon: '📉', title: 'Full Market Beta',              level: 'high', color: '#f43f5e', body: 'Beta ≈ 1.0. Full participation in market declines with no defensive buffer. Max drawdown similar to SPY.' },
      { icon: '💰', title: 'Low Current Yield',             level: 'low',  color: '#22c55e', body: 'Dividend yield ~1.3% — unsuitable as a primary income vehicle. Total-return focused only.' },
      { icon: '🌐', title: 'US-Only Exposure',              level: 'low',  color: '#22c55e', body: 'International diversification requires adding VXUS or similar; VTI alone is fully domestically concentrated.' },
      { icon: '⚡', title: 'Tech Concentration',             level: 'med',  color: '#f59e0b', body: 'Inherits SPY\'s mega-cap tech concentration; ~30% in IT sector reflects the same single-sector overhang.' },
    ],
    useCases: [
      { icon: '🏛️', title: 'Ultimate Core Holding',         body: 'The single best one-fund US equity holding for passive long-term investors. Broad, cheap, tax-efficient, and proven over 24 years.' },
      { icon: '🌍', title: 'US Leg of Two-Fund Portfolio',   body: 'Paired with VXUS (international), VTI forms the simplest and most complete two-fund global equity portfolio.' },
      { icon: '🎓', title: 'Passive / FIRE Investors',       body: 'Popular in FIRE (financial independence) communities for its total-market exposure, negligible cost, and strong long-term compounding.' },
      { icon: '📐', title: 'Tax-Efficient Long-Term Holding', body: 'Low turnover (3%) minimises capital gains distributions. Vanguard\'s patent-expired share class structure further enhances tax efficiency.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'Unbeatable cost (0.03%) combined with the broadest possible US market coverage makes VTI the ideal passive core holding.' },
      { type: 'strength', text: 'Slightly broader than SPY; small/mid-cap exposure provides diversification which can meaningfully contribute during certain cycles.' },
      { type: 'strength', text: 'Vanguard\'s investor-owned structure creates structural alignment with long-term shareholders and ongoing pressure for cost reduction.' },
      { type: 'weakness', text: 'Large-caps dominate weight — effectively similar to SPY in most market conditions; small-cap "diversification" is real but limited in impact.' },
      { type: 'weakness', text: 'Low dividend yield (~1.3%) makes it unsuitable as an income vehicle for retirees.' },
      { type: 'neutral',  text: 'For most passive investors, VTI + VXUS is the minimal-cost, maximum-diversification global portfolio framework.' },
    ],
  },

  ARKK: {
    ticker: 'ARKK',
    name: 'ARK Innovation ETF',
    issuer: 'ARK Invest',
    category: 'Thematic / Disruptive Innovation',
    price: 44.81,
    change: '-0.62%',
    changePositive: false,
    aumBn: 6.4,
    inceptionYear: 2014,
    description: `ARKK is an actively managed ETF run by ARK Invest (Cathie Wood), targeting companies 
      involved in disruptive innovation across genomics, robotics, AI, fintech, and space exploration. 
      It gained extraordinary attention during 2020 but has since given back the majority of those gains. 
      It is the defining example of a high-conviction, high-volatility thematic fund.`,
    overview: [
      { label: 'AUM', value: '$6.4B', accent: 'accent-blue', sub: 'Down from $28B peak (2021)' },
      { label: 'Expense Ratio', value: '0.75%', accent: 'accent-rose', sub: 'Very high vs passive peers' },
      { label: 'Holdings', value: '~30–40', accent: 'accent-purple', sub: 'Highly concentrated active' },
      { label: 'Avg Daily Vol', value: '$200M', accent: 'accent-amber', sub: 'Adequate for retail investors' },
    ],
    holdings: {
      concentration: { top10pct: '62.4%', top25pct: '88.1%', totalPositions: 38 },
      style: 'Ultra-concentrated, high-conviction disruptive technology and innovation.',
      items: [
        { ticker: 'TSLA',  name: 'Tesla Inc',               weight: 11.40 },
        { ticker: 'COIN',  name: 'Coinbase Global',         weight:  9.80 },
        { ticker: 'ROKU',  name: 'Roku Inc',                weight:  8.20 },
        { ticker: 'PATH',  name: 'UiPath Inc',              weight:  6.30 },
        { ticker: 'EXAS',  name: 'Exact Sciences Corp',     weight:  5.90 },
        { ticker: 'CRSPR', name: 'CRISPR Therapeutics',     weight:  5.41 },
        { ticker: 'TWLO',  name: 'Twilio Inc',              weight:  4.92 },
        { ticker: 'HOOD',  name: 'Robinhood Markets',       weight:  4.40 },
        { ticker: 'RXRX',  name: 'Recursion Pharmaceuticals', weight: 3.88 },
        { ticker: 'DNA',   name: 'Ginkgo Bioworks',         weight:  2.19 },
      ],
    },
    sectors: [
      { name: 'Information Technology', pct: 38.2, color: '#3b82f6' },
      { name: 'Health Care / Genomics', pct: 28.1, color: '#14b8a6' },
      { name: 'Consumer Discretionary', pct: 12.4, color: '#f59e0b' },
      { name: 'Financials / Fintech',   pct: 11.3, color: '#8b5cf6' },
      { name: 'Communication Services', pct:  6.2, color: '#6366f1' },
      { name: 'Other / Robotics',       pct:  3.8, color: '#fb923c' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.75%',  sub: 'Expensive; 10x passive ETF cost',  accent: '#f43f5e', rating: 'high', ratingLabel: 'Expensive' },
      { icon: '🏦', label: 'AUM',           value: '$6.4B',  sub: 'Down ~77% from $28B 2021 peak',    accent: '#f43f5e', rating: 'avg', ratingLabel: 'Shrinking' },
      { icon: '📊', label: 'Annual Turnover', value: '~60%', sub: 'Active management = high turnover', accent: '#f43f5e', rating: 'high', ratingLabel: 'High' },
      { icon: '🎯', label: 'Management',    value: 'Active', sub: 'Cathie Wood, ARK Invest',           accent: '#8b5cf6', rating: null },
      { icon: '📅', label: 'Inception',     value: '2014',   sub: '12-year live track record',         accent: '#6366f1', rating: null },
      { icon: '🔓', label: 'Transparency',  value: 'Daily', sub: 'Holdings disclosed every day',       accent: '#22c55e', rating: null },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:  -2.4, bmk:   2.1 },
        { period: '3 Months',   etf:  -8.1, bmk:   4.8 },
        { period: '1 Year',     etf:  14.2, bmk:  24.2 },
        { period: '3 Year',     etf: -18.4, bmk:  10.6 },
        { period: '5 Year',     etf:  -3.1, bmk:  15.8 },
        { period: 'Since 2014', etf:   5.8, bmk:  14.1 },
      ],
      benchmark: 'S&P 500 (SPY)',
      notes: [
        '2020: +152% — one of the best single-year performances ever recorded for an ETF of this size.',
        '2021–2023 cumulative: –75% peak-to-trough, one of the worst drawdown sequences for a major ETF.',
        'Annualised volatility ~55–65% at peak; currently ~35% — roughly double the S&P 500.',
        'Active management has NOT outperformed SPY over its full lifetime including the 2020 highs.',
      ],
    },
    risks: [
      { icon: '🎢', title: 'Extreme Volatility',       level: 'high', color: '#f43f5e', body: 'Historical annualised volatility exceeds 55% in peak periods. The 2021–2023 drawdown of –75% destroyed most of the 2020 gains.' },
      { icon: '🔥', title: 'Concentration / Liquidity', level: 'high', color: '#f43f5e', body: 'Holding 30–40 names with major positions in small illiquid stocks; forced selling by redemptions can accelerate price declines.' },
      { icon: '👤', title: 'Manager Risk (Key Person)',  level: 'high', color: '#f43f5e', body: 'ARK\'s brand and strategy are inseparable from Cathie Wood. Departure or reputational damage could trigger rapid redemptions.' },
      { icon: '💸', title: 'High Cost Drag',            level: 'high', color: '#f43f5e', body: '0.75% annual fee means investors need ~0.75% of outperformance just to break even with a passive alternative each year.' },
      { icon: '📡', title: 'Thematic/Timing Risk',      level: 'high', color: '#f43f5e', body: 'Disruptive innovation themes can take decades to materialise; valuations can remain compressed for extended periods.' },
    ],
    useCases: [
      { icon: '🎰', title: 'High-Risk Satellite Position', body: 'Suitable only as a small satellite allocation (< 5% of portfolio) for investors who fully understand and accept the potential for 50–80% drawdowns.' },
      { icon: '🔬', title: 'Innovation Theme Expression',  body: 'For investors who believe in a specific disruptive technology thesis and want managed, diversified exposure without hand-picking individual names.' },
      { icon: '📚', title: 'Research & Idea Generation',   body: 'ARK\'s daily disclosure of holdings and public research can serve as a source of thematic investment ideas, regardless of whether investors hold ARKK.' },
    ],
    bottomLine: [
      { type: 'strength', text: '2020 performance (+152%) demonstrated the upside potential when disruptive innovation themes align with market sentiment.' },
      { type: 'strength', text: 'Daily holdings transparency and Cathie Wood\'s public commentary offer unusual insight into the fund\'s investment thesis.' },
      { type: 'weakness', text: 'Performance since inception significantly trails SPY; the 2020 bull market was the exception, not the norm.' },
      { type: 'weakness', text: '0.75% expense ratio, ~60% annual turnover, and redemption-driven selling create a high structural cost burden.' },
      { type: 'weakness', text: 'Concentration in illiquid small-cap innovation names amplifies downside risk during redemption cycles.' },
      { type: 'neutral',  text: 'Only appropriate for high-risk-tolerance investors as a minor speculative allocation — not a core equity holding.' },
    ],
  },

  GLD: {
    ticker: 'GLD',
    name: 'SPDR Gold Shares',
    issuer: 'State Street Global Advisors',
    category: 'Commodities / Precious Metals',
    price: 236.54,
    change: '+0.43%',
    changePositive: true,
    aumBn: 72,
    inceptionYear: 2004,
    description: `GLD is the world's largest gold-backed ETF, providing direct exposure to the spot gold 
      price by holding physical gold bullion in vaults. Each share represents approximately 0.093 troy oz 
      of gold. It is the primary vehicle for institutional and retail investors seeking gold exposure as 
      a store-of-value, inflation hedge, and portfolio diversifier without the complexity of futures or physical bullion.`,
    overview: [
      { label: 'AUM', value: '$72B', accent: 'accent-amber', sub: 'Largest physical gold ETF' },
      { label: 'Expense Ratio', value: '0.40%', accent: 'accent-rose', sub: 'IAU costs 0.25% — cheaper' },
      { label: 'Backing', value: 'Physical', accent: 'accent-green', sub: 'LBMA-approved gold bars' },
      { label: 'Gold/Share', value: '0.0930 oz', accent: 'accent-amber', sub: 'Ratio declines with fees over time' },
    ],
    holdings: {
      concentration: { top10pct: '100%', top25pct: '100%', totalPositions: 1 },
      style: 'Single-asset: physical gold bullion. No equity exposure. Pure commodity.',
      items: [
        { ticker: 'GOLD', name: 'Physical Gold Bullion (LBMA)', weight: 100.0 },
      ],
    },
    sectors: [
      { name: 'Precious Metals (Gold)', pct: 100.0, color: '#f59e0b' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.40%',  sub: 'IAU offers 0.25%; GLDM 0.10%', accent: '#f43f5e', rating: 'avg', ratingLabel: 'Above Peers' },
      { icon: '🏦', label: 'AUM',           value: '$72B',   sub: 'Most liquid gold ETF',          accent: '#f59e0b', rating: 'low', ratingLabel: 'Most Liquid' },
      { icon: '🏅', label: 'Backing',       value: 'Physical', sub: 'Allocated LBMA gold bars',    accent: '#22c55e', rating: null },
      { icon: '💧', label: 'Avg Daily Vol', value: '$1.5B',  sub: 'Highly liquid for hedging',     accent: '#14b8a6', rating: null },
      { icon: '📅', label: 'Inception',     value: '2004',   sub: '22-year track record',          accent: '#6366f1', rating: null },
      { icon: '🔑', label: 'Custodian',     value: 'HSBC',   sub: 'Primary vault custodian',       accent: '#8b5cf6', rating: null },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   4.8, bmk:   2.1 },
        { period: '3 Months',   etf:   8.2, bmk:   4.8 },
        { period: '1 Year',     etf:  38.1, bmk:  24.2 },
        { period: '3 Year',     etf:  14.2, bmk:  10.6 },
        { period: '5 Year',     etf:   9.8, bmk:  15.8 },
        { period: '10 Year',    etf:   7.4, bmk:  13.1 },
        { period: 'Since 2004', etf:   8.6, bmk:  10.4 },
      ],
      benchmark: 'S&P 500 (SPY)',
      notes: [
        'Gold surged in 2024–2025 driven by geopolitical uncertainty, de-dollarisation buying from central banks, and rate expectations.',
        'Long-run equity underperformance vs S&P 500 is expected — gold is a store of value, not a return-seeking asset.',
        'Gold\'s low/negative correlation to equities (ρ ≈ -0.02 to +0.10) is its primary portfolio benefit.',
        'Cheaper alternatives: IAU (0.25%) or GLDM (0.10%) — GLD preferred for institutional liquidity needs.',
      ],
    },
    risks: [
      { icon: '💰', title: 'No Income / Yield',          level: 'high', color: '#f43f5e', body: 'Gold generates zero income. The entire return is price appreciation. Compounding via reinvestment is impossible.' },
      { icon: '📉', title: 'Price Volatility',           level: 'med',  color: '#f59e0b', body: 'Gold can decline 30–40% in risk-on environments or during rapid rate hikes (e.g., 2013: –28%, 2022: –3%).' },
      { icon: '💵', title: 'USD Sensitivity',            level: 'med',  color: '#f59e0b', body: 'Gold is priced in USD. A strong dollar typically suppresses gold returns; USD weakness enhances them.' },
      { icon: '🏛️', title: 'Regulatory / Confiscation',  level: 'low',  color: '#22c55e', body: 'Theoretical tail risk that governments could restrict gold ownership; historical precedent exists (US 1933 Executive Order 6102).' },
      { icon: '💲', title: 'Fee Drag vs Peers',          level: 'low',  color: '#22c55e', body: '0.40% expense ratio slowly erodes gold holdings vs spot price; GLDM at 0.10% saves ~0.30%/year for long-term holders.' },
    ],
    useCases: [
      { icon: '🛡️', title: 'Portfolio Hedge / Diversifier', body: 'The primary use case: 5–15% portfolio allocation to gold historically reduces drawdowns and improves Sharpe ratio due to low equity correlation.' },
      { icon: '📈', title: 'Inflation Hedge',                body: 'Gold has historically maintained purchasing power over long periods, particularly effective during unexpected inflation or stagflation regimes.' },
      { icon: '🌍', title: 'Geopolitical Risk Hedge',        body: 'During geopolitical crises, currency debasement concerns, or financial system stress, gold tends to outperform equity and fixed income.' },
      { icon: '🏦', title: 'Institutional Liquidity Vehicle', body: 'For institutional investors needing liquid gold exposure for risk management or mandate compliance, GLD is the benchmark vehicle.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'Deepest liquidity of any gold ETF ($1.5B daily volume); preferred by institutional investors and traders requiring quick entry/exit.' },
      { type: 'strength', text: 'Near-zero equity correlation provides genuine portfolio diversification impossible to replicate with equity-based assets.' },
      { type: 'weakness', text: '0.40% expense ratio means cost-conscious long-term investors should consider GLDM (0.10%) or IAU (0.25%) instead.' },
      { type: 'weakness', text: 'Zero income generation; not suitable as a primary return driver — total-return lags equities over most long-term rolling periods.' },
      { type: 'neutral',  text: 'Optimal allocation is typically 5–15% of a diversified portfolio as a defensive hedge, not a growth engine.' },
      { type: 'neutral',  text: 'Recent outperformance (2024–2025) driven by specific macro factors; mean reversion risk should be considered for new entrants.' },
    ],
  },

  BND: {
    ticker: 'BND',
    name: 'Vanguard Total Bond Market ETF',
    issuer: 'Vanguard',
    category: 'Taxable Bond / Broad Market',
    price: 73.21,
    change: '+0.12%',
    changePositive: true,
    aumBn: 118,
    inceptionYear: 2007,
    description: `BND tracks the Bloomberg US Aggregate Float Adjusted Index, covering the entire investment-grade US bond market — Treasuries, government-related, corporate, and securitised bonds with maturities over one year. It is the definitive one-fund US fixed income holding, used as a core bond allocation by passive investors and as the bond leg of classic two-fund or three-fund portfolios.`,
    overview: [
      { label: 'AUM',           value: '$118B',    accent: 'accent-blue',   sub: 'Largest US bond ETF by AUM' },
      { label: 'Expense Ratio', value: '0.03%',    accent: 'accent-green',  sub: 'Cheapest in bond category' },
      { label: 'Holdings',      value: '~11,000',  accent: 'accent-purple', sub: 'Entire investment-grade universe' },
      { label: 'SEC Yield',     value: '~4.6%',    accent: 'accent-amber',  sub: '30-day SEC yield' },
    ],
    holdings: {
      concentration: { top10pct: '4.1%', top25pct: '9.3%', totalPositions: 11000 },
      style: 'Investment-grade only. ~45% Treasuries, ~25% corporate, ~20% mortgage-backed, ~10% other.',
      items: [
        { ticker: 'UST TIPS',  name: 'US Treasury Inflation-Protected', weight: 2.10 },
        { ticker: 'UST 2Y',    name: 'US Treasury Note 2-Year',         weight: 1.80 },
        { ticker: 'UST 5Y',    name: 'US Treasury Note 5-Year',         weight: 1.60 },
        { ticker: 'UST 10Y',   name: 'US Treasury Note 10-Year',        weight: 1.42 },
        { ticker: 'FNMA MBS',  name: 'Fannie Mae Mortgage-Backed',      weight: 1.30 },
        { ticker: 'FHLMC MBS', name: 'Freddie Mac Mortgage-Backed',     weight: 1.18 },
        { ticker: 'UST 30Y',   name: 'US Treasury Bond 30-Year',        weight: 1.05 },
        { ticker: 'GNMA MBS',  name: 'Ginnie Mae Mortgage-Backed',      weight: 0.98 },
        { ticker: 'AAPL CORP', name: 'Apple Inc Corporate Bond',        weight: 0.42 },
        { ticker: 'MSFT CORP', name: 'Microsoft Corp Bond',             weight: 0.38 },
      ],
    },
    sectors: [
      { name: 'US Treasuries',      pct: 44.8, color: '#3b82f6' },
      { name: 'Mortgage-Backed',    pct: 20.1, color: '#14b8a6' },
      { name: 'Corporate IG',       pct: 25.3, color: '#8b5cf6' },
      { name: 'Government-Related', pct:  5.9, color: '#22c55e' },
      { name: 'Asset-Backed',       pct:  2.4, color: '#f59e0b' },
      { name: 'Other',              pct:  1.5, color: '#6366f1' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.03%',    sub: 'Tied for cheapest bond ETF',       accent: '#22c55e', rating: 'low',  ratingLabel: 'Exceptional' },
      { icon: '🏦', label: 'AUM',           value: '$118B',    sub: 'Largest US bond ETF',              accent: '#14b8a6', rating: 'low',  ratingLabel: 'Best-in-class' },
      { icon: '📊', label: 'Duration',      value: '~6.1 yrs', sub: 'Intermediate; moderate rate risk', accent: '#f59e0b', rating: null },
      { icon: '💰', label: 'SEC Yield',      value: '~4.6%',    sub: '30-day distribution yield',       accent: '#22c55e', rating: null },
      { icon: '📅', label: 'Inception',      value: '2007',     sub: '19-year live track record',       accent: '#6366f1', rating: null },
      { icon: '📄', label: 'Credit Quality', value: 'AAA/AA',   sub: '~70% AAA-rated bonds',            accent: '#8b5cf6', rating: null },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   0.4, bmk:   2.1 },
        { period: '3 Months',   etf:   0.9, bmk:   4.8 },
        { period: '1 Year',     etf:   4.8, bmk:  24.2 },
        { period: '3 Year',     etf:  -1.2, bmk:  10.6 },
        { period: '5 Year',     etf:  -0.4, bmk:  15.8 },
        { period: '10 Year',    etf:   1.6, bmk:  13.1 },
        { period: 'Since 2007', etf:   2.8, bmk:   9.1 },
      ],
      benchmark: 'S&P 500 (SPY)',
      notes: [
        'Bond returns are not comparable to equity; BND plays a diversification and income role, not a growth role.',
        '2022 was the worst year in BND history: -13.1%, driven by the most aggressive Fed rate hike cycle in 40 years.',
        'Duration of ~6.1 years means a 1% rise in rates reduces NAV by approximately 6.1%, and vice versa.',
        'Peer AGG (iShares, 0.03%) is essentially identical in composition, cost, and performance.',
      ],
    },
    risks: [
      { icon: '📉', title: 'Interest Rate Risk',   level: 'high', color: '#f43f5e', body: 'Duration ~6.1 years. Rising interest rates reduce bond prices; the 2022 bear market in bonds illustrates this vividly (-13%).' },
      { icon: '💸', title: 'Low Real Return',       level: 'med',  color: '#f59e0b', body: 'After inflation and taxes, nominal bond returns have historically been low or negative in inflationary regimes.' },
      { icon: '⚠️', title: 'Credit Risk',           level: 'low',  color: '#22c55e', body: 'Investment-grade only; ~70% AAA-rated. Default risk is minimal but not zero for corporate and mortgage constituents.' },
      { icon: '🔁', title: 'Reinvestment Risk',     level: 'med',  color: '#f59e0b', body: 'When bonds mature, proceeds reinvest at prevailing rates, which may be lower than the original coupon.' },
      { icon: '💴', title: 'Inflation Risk',        level: 'med',  color: '#f59e0b', body: 'Fixed coupon payments lose purchasing power in high-inflation environments; TIPS or I-Bonds may offer better inflation protection.' },
    ],
    useCases: [
      { icon: '⚖️', title: 'Portfolio Ballast',              body: 'Classic role: reduce overall portfolio volatility and provide negative/low correlation to equities during risk-off events.' },
      { icon: '💰', title: 'Income Generation',              body: 'At current yields (~4.6%), BND provides meaningful income for retirees with a low-risk fixed income allocation.' },
      { icon: '🏛️', title: 'Three-Fund Portfolio Bond Leg',  body: 'BND is the bond component of the classic Vanguard three-fund portfolio (VTI + VXUS + BND), trusted by millions of passive investors.' },
      { icon: '🛡️', title: 'Recession Hedge',                body: 'Treasuries within BND typically appreciate during equity bear markets as investors flee to safety, providing a partial equity hedge.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'Ultra-low 0.03% cost, $118B AUM, and ~11,000 holdings provide the broadest and cheapest US bond market exposure available.' },
      { type: 'strength', text: 'Treasury component serves as a genuine equity hedge; correlation to SPY is typically negative during market stress.' },
      { type: 'weakness', text: '2022 demonstrated bonds are not risk-free; a -13% drawdown shocked investors who viewed BND as a safe haven.' },
      { type: 'weakness', text: 'Intermediate duration (~6.1 yrs) means meaningful interest rate sensitivity; rate rises directly hurt NAV.' },
      { type: 'neutral',  text: 'Bond allocation size should reflect investment horizon; typically 20-40% for balanced investors, lower for long-horizon accumulators.' },
      { type: 'neutral',  text: 'Direct substitute AGG (iShares, 0.03%) is functionally identical; choose based on brokerage ecosystem preference.' },
    ],
  },

  BNDW: {
    ticker: 'BNDW',
    name: 'Vanguard Total World Bond ETF',
    issuer: 'Vanguard',
    category: 'Global Bond / Broad Market',
    price: 69.44,
    change: '+0.09%',
    changePositive: true,
    aumBn: 4.8,
    inceptionYear: 2018,
    description: `BNDW is a fund-of-funds combining BND (US bonds) and BNDX (international bonds, currency-hedged) to provide exposure to the entire global investment-grade bond market in a single ticker. It holds approximately 70% US bonds and 30% international bonds, replicating the global bond market cap-weighted allocation. It is the fixed income equivalent of VT for global coverage.`,
    overview: [
      { label: 'AUM',           value: '$4.8B',   accent: 'accent-blue',   sub: 'Smaller but growing' },
      { label: 'Expense Ratio', value: '0.05%',   accent: 'accent-green',  sub: 'Near-free global bond exposure' },
      { label: 'Holdings',      value: '~17,000', accent: 'accent-purple', sub: 'Global IG bond universe' },
      { label: 'SEC Yield',     value: '~4.0%',   accent: 'accent-amber',  sub: 'Blended US + intl yield' },
    ],
    holdings: {
      concentration: { top10pct: '2.8%', top25pct: '6.1%', totalPositions: 17000 },
      style: 'Ultimate bond diversification: ~70% US IG, ~30% global IG (currency-hedged to USD).',
      items: [
        { ticker: 'BND',      name: 'Vanguard Total Bond Market ETF',    weight: 49.8 },
        { ticker: 'BNDX',     name: 'Vanguard Total Intl Bond ETF',      weight: 30.2 },
        { ticker: 'UST 5Y',   name: 'US Treasury Note 5-Year (direct)',  weight: 1.10 },
        { ticker: 'UST 10Y',  name: 'US Treasury Note 10-Year (direct)', weight: 0.90 },
        { ticker: 'JGB 10Y',  name: 'Japan Govt Bond 10-Year',           weight: 0.80 },
        { ticker: 'BUND 10Y', name: 'German Bund 10-Year',               weight: 0.72 },
        { ticker: 'GILT 10Y', name: 'UK Gilt 10-Year',                   weight: 0.55 },
        { ticker: 'OAT 10Y',  name: 'France OAT 10-Year',                weight: 0.48 },
        { ticker: 'CAD 10Y',  name: 'Canada Govt Bond 10-Year',          weight: 0.42 },
        { ticker: 'AUS 10Y',  name: 'Australia Govt Bond 10-Year',       weight: 0.38 },
      ],
    },
    sectors: [
      { name: 'US Bonds (BND)',          pct: 49.8, color: '#3b82f6' },
      { name: 'Intl Developed Bonds',    pct: 27.4, color: '#8b5cf6' },
      { name: 'US Mortgage-Backed',      pct:  9.8, color: '#14b8a6' },
      { name: 'Emerging Market Bonds',   pct:  7.2, color: '#f59e0b' },
      { name: 'US Corporate IG',         pct:  3.8, color: '#22c55e' },
      { name: 'Other / Govt-Related',    pct:  2.0, color: '#6366f1' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.05%',    sub: 'Effective after fund-of-funds cost', accent: '#22c55e', rating: 'low', ratingLabel: 'Excellent' },
      { icon: '🏦', label: 'AUM',           value: '$4.8B',    sub: 'Smaller; adequate for retail',      accent: '#f59e0b', rating: 'avg', ratingLabel: 'Adequate' },
      { icon: '📊', label: 'Duration',      value: '~6.8 yrs', sub: 'Slightly longer than BND alone',   accent: '#f59e0b', rating: null },
      { icon: '🌍', label: 'FX Hedge',      value: 'USD-Hedged', sub: 'Intl leg hedged back to USD',    accent: '#22c55e', rating: null },
      { icon: '📅', label: 'Inception',     value: '2018',      sub: '8-year track record',             accent: '#6366f1', rating: null },
      { icon: '📄', label: 'Structure',     value: 'Fund of Funds', sub: 'Holds BND + BNDX directly',  accent: '#8b5cf6', rating: null },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   0.3, bmk:   2.1 },
        { period: '3 Months',   etf:   0.8, bmk:   4.8 },
        { period: '1 Year',     etf:   4.2, bmk:  24.2 },
        { period: '3 Year',     etf:  -1.8, bmk:  10.6 },
        { period: '5 Year',     etf:  -0.9, bmk:  15.8 },
        { period: 'Since 2018', etf:   0.4, bmk:  12.8 },
      ],
      benchmark: 'S&P 500 (SPY)',
      notes: [
        'Returns track very closely with BND; the international leg (hedged) adds marginal diversification vs US-only bonds.',
        '2022 drawdown was -14.2%, slightly worse than BND (-13.1%) due to international duration exposure.',
        'Currency hedge removes FX volatility but introduces a hedging cost that varies with rate differentials.',
        'For most US investors, BNDW vs BND is a philosophical choice about global diversification in fixed income.',
      ],
    },
    risks: [
      { icon: '📉', title: 'Interest Rate Risk',      level: 'high', color: '#f43f5e', body: 'Duration ~6.8 years across global bond markets. A coordinated global rate rise hits both the US and international legs simultaneously.' },
      { icon: '💱', title: 'Hedge Cost Drag',         level: 'med',  color: '#f59e0b', body: 'Currency hedging of the international leg costs roughly 0.2-0.5%/year depending on rate differentials, reducing net yield.' },
      { icon: '🏛️', title: 'Sovereign Credit Risk',   level: 'low',  color: '#22c55e', body: 'Includes sovereign bonds from developed markets like Japan, Germany, and UK. Developed market default risk is extremely low.' },
      { icon: '💹', title: 'Lower Blended Yield',     level: 'med',  color: '#f59e0b', body: 'International developed bond yields are generally lower than US levels, pulling the blended BNDW yield below BND alone.' },
      { icon: '💧', title: 'Smaller AUM / Liquidity', level: 'low',  color: '#22c55e', body: 'At $4.8B AUM, BNDW is less liquid than BND or AGG; spreads may be slightly wider for large trades.' },
    ],
    useCases: [
      { icon: '🌍', title: 'Globally Diversified Bond Allocation', body: 'For investors who want their fixed income to mirror the global bond market, BNDW is the simplest one-fund solution.' },
      { icon: '📁', title: 'One-Fund Fixed Income Simplicity',    body: 'Eliminates the need to hold BND and BNDX separately; ideal as the bond leg of a globally diversified portfolio.' },
      { icon: '⚡', title: 'Complement to VT or VXUS',            body: 'Pairs naturally with VT (global equity) for a two-fund global portfolio covering both stocks and bonds effortlessly.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'Single-ticker access to ~17,000 global investment-grade bonds at just 0.05% expense ratio.' },
      { type: 'strength', text: 'Currency-hedged international leg removes FX noise and delivers pure global fixed income diversification.' },
      { type: 'weakness', text: 'International bonds currently yield less than US bonds; the global blend pulls yield below BND alone.' },
      { type: 'weakness', text: 'Smaller AUM ($4.8B vs BND $118B) means slightly wider spreads and less institutional adoption.' },
      { type: 'neutral',  text: 'Most US-based investors may find BND alone sufficient; BNDW suits those who want truly global bond diversification.' },
    ],
  },

  VXUS: {
    ticker: 'VXUS',
    name: 'Vanguard Total International Stock ETF',
    issuer: 'Vanguard',
    category: 'International Equity / Total Market',
    price: 62.18,
    change: '+0.55%',
    changePositive: true,
    aumBn: 78,
    inceptionYear: 2011,
    description: `VXUS tracks the FTSE Global All Cap ex US Index, providing exposure to virtually every publicly traded equity outside the United States — covering developed and emerging markets across ~49 countries and ~8,500 stocks of all market caps. It is the definitive non-US equity holding and the natural international complement to VTI in a two-fund global equity portfolio.`,
    overview: [
      { label: 'AUM',           value: '$78B',    accent: 'accent-blue',   sub: 'Top intl equity ETF' },
      { label: 'Expense Ratio', value: '0.07%',   accent: 'accent-green',  sub: 'Lowest-cost global ex-US ETF' },
      { label: 'Holdings',      value: '~8,500',  accent: 'accent-purple', sub: '49 countries, all caps' },
      { label: '12M Yield',     value: '~3.1%',   accent: 'accent-amber',  sub: 'Higher yield than US equity' },
    ],
    holdings: {
      concentration: { top10pct: '10.8%', top25pct: '18.4%', totalPositions: 8500 },
      style: 'Extremely diversified global ex-US blend. ~75% developed markets, ~25% emerging markets.',
      items: [
        { ticker: 'NOVO B',  name: 'Novo Nordisk (Denmark)',       weight: 1.42 },
        { ticker: '7203.T',  name: 'Toyota Motor (Japan)',         weight: 0.98 },
        { ticker: 'NESN',    name: 'Nestle SA (Switzerland)',      weight: 0.91 },
        { ticker: 'ASML',    name: 'ASML Holding (Netherlands)',   weight: 0.88 },
        { ticker: 'TENCENT', name: 'Tencent Holdings (China)',     weight: 0.85 },
        { ticker: 'SAMSUNG', name: 'Samsung Electronics (Korea)',  weight: 0.82 },
        { ticker: 'ROG',     name: 'Roche Holding (Switzerland)',  weight: 0.71 },
        { ticker: 'SHEL',    name: 'Shell PLC (UK)',               weight: 0.68 },
        { ticker: 'AZN',     name: 'AstraZeneca (UK)',             weight: 0.65 },
        { ticker: 'LVMH',    name: 'LVMH Moet Hennessy (France)',  weight: 0.61 },
      ],
    },
    sectors: [
      { name: 'Financials',             pct: 21.4, color: '#8b5cf6' },
      { name: 'Industrials',            pct: 15.2, color: '#22c55e' },
      { name: 'Consumer Discretionary', pct: 11.8, color: '#f59e0b' },
      { name: 'Health Care',            pct: 10.7, color: '#14b8a6' },
      { name: 'Information Technology', pct:  9.6, color: '#3b82f6' },
      { name: 'Consumer Staples',       pct:  9.1, color: '#f43f5e' },
      { name: 'Materials',              pct:  7.4, color: '#fbbf24' },
      { name: 'Energy',                 pct:  5.8, color: '#fb923c' },
      { name: 'Communication Services', pct:  4.6, color: '#6366f1' },
      { name: 'Utilities',              pct:  2.8, color: '#a78bfa' },
      { name: 'Real Estate',            pct:  1.6, color: '#34d399' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.07%',   sub: 'Cheapest global ex-US ETF',   accent: '#22c55e', rating: 'low', ratingLabel: 'Exceptional' },
      { icon: '🏦', label: 'AUM',           value: '$78B',    sub: 'Top 15 equity ETF globally',  accent: '#14b8a6', rating: 'low', ratingLabel: 'Excellent' },
      { icon: '📊', label: 'Annual Turnover', value: '~5%',   sub: 'Very low broad index fund',   accent: '#8b5cf6', rating: 'low', ratingLabel: 'Low' },
      { icon: '💰', label: '12M Yield',      value: '~3.1%',  sub: 'Higher yield than VTI/SPY',   accent: '#f59e0b', rating: null },
      { icon: '📅', label: 'Inception',      value: '2011',   sub: '15-year live track record',   accent: '#6366f1', rating: null },
      { icon: '🌍', label: 'Countries',      value: '~49',    sub: 'Developed + EM coverage',     accent: '#22c55e', rating: null },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   0.9, bmk:   2.1 },
        { period: '3 Months',   etf:   3.1, bmk:   4.8 },
        { period: '1 Year',     etf:  12.4, bmk:  24.2 },
        { period: '3 Year',     etf:   4.8, bmk:  10.6 },
        { period: '5 Year',     etf:   6.1, bmk:  15.8 },
        { period: '10 Year',    etf:   4.9, bmk:  13.1 },
        { period: 'Since 2011', etf:   5.3, bmk:  14.2 },
      ],
      benchmark: 'S&P 500 (SPY)',
      notes: [
        'International equities have underperformed US stocks significantly over the past 10-15 years; this gap is historically wide.',
        'Returns in USD are impacted by dollar strength; a weaker USD environment would flatter VXUS returns considerably.',
        'Emerging markets (~25% of VXUS) add growth potential but also political, currency, and governance risks.',
        'Historically, international equities trade at lower valuations (P/E ~13-15x vs US ~22x), implying potential reversion upside.',
      ],
    },
    risks: [
      { icon: '💱', title: 'Currency Risk',                   level: 'high', color: '#f43f5e', body: 'Returns for US investors are affected by USD movements against dozens of global currencies. USD strength is a persistent headwind.' },
      { icon: '🏛️', title: 'Political / Regulatory Risk',     level: 'med',  color: '#f59e0b', body: 'International markets carry varying degrees of political instability, governance risk, and regulatory unpredictability.' },
      { icon: '🌏', title: 'China / EM Concentration',        level: 'med',  color: '#f59e0b', body: 'Emerging markets (~25%) include China, India, Taiwan, South Korea. Geopolitical events or policy shifts can cause sharp drawdowns.' },
      { icon: '📉', title: 'Persistent US Underperformance',  level: 'high', color: '#f43f5e', body: 'VXUS has underperformed VTI in 9 of the past 14 years. There is no guarantee the valuation gap closes on any specific timeline.' },
      { icon: '💵', title: 'Dividend Withholding Tax',        level: 'low',  color: '#22c55e', body: 'Foreign dividend withholding taxes reduce net yield; the foreign tax credit partially offsets this in taxable US accounts.' },
    ],
    useCases: [
      { icon: '🌍', title: 'Global Diversification Partner',    body: 'The natural pair for VTI: together VTI + VXUS in a ~60/40 split mirrors global market cap weighting for a true total world allocation.' },
      { icon: '📉', title: 'Valuation-Based Rotation',          body: 'Investors who believe international valuations (P/E ~13-15x) will revert toward US levels allocate to VXUS as a long-term value play.' },
      { icon: '💰', title: 'Income Enhancement',                body: 'VXUS yields ~3.1% vs VTI ~1.3%; income-oriented investors tilt toward VXUS within their equity allocation for higher dividend cash flow.' },
      { icon: '🛡️', title: 'USD Hedge / Dollar Bearish Bet',    body: 'VXUS provides a natural hedge against USD weakness; if the dollar declines, non-USD assets appreciate in USD terms.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'Best-in-class cost (0.07%) with ~8,500 holdings across 49 countries provides unmatched global ex-US diversification.' },
      { type: 'strength', text: 'Higher dividend yield (~3.1%) than US equity ETFs adds meaningful income, particularly for investors in distribution phase.' },
      { type: 'weakness', text: 'Has underperformed VTI by ~9% annualised over the past decade; holding requires conviction in eventual international reversion.' },
      { type: 'weakness', text: 'Currency risk is structural and unhedged; USD appreciation persistently hurts USD-denominated returns.' },
      { type: 'neutral',  text: 'A 20-40% international allocation (VXUS) within the equity sleeve is widely recommended despite recent underperformance.' },
      { type: 'neutral',  text: 'Paired with VTI, VXUS forms one of the most cost-efficient total world equity portfolios available to retail investors.' },
    ],
  },

  IVV: {
    ticker: 'IVV',
    name: 'iShares Core S&P 500 ETF',
    issuer: 'BlackRock (iShares)',
    category: 'Large-Cap Blend',
    price: 521.88,
    change: '+0.83%',
    changePositive: true,
    aumBn: 490,
    inceptionYear: 2000,
    description: `IVV tracks the S&P 500 Index — identical to SPY and VOO — but is issued by BlackRock at an industry-leading 0.03% expense ratio, one-third the cost of SPY. It is the preferred long-term buy-and-hold vehicle for cost-conscious investors using brokerage platforms that default to iShares products.`,
    overview: [
      { label: 'AUM',           value: '$490B',   accent: 'accent-blue',   sub: '2nd largest ETF globally' },
      { label: 'Expense Ratio', value: '0.03%',   accent: 'accent-green',  sub: '3x cheaper than SPY' },
      { label: 'Holdings',      value: '503',     accent: 'accent-purple', sub: 'Identical to SPY/VOO' },
      { label: 'Avg Daily Vol', value: '$4.2B',   accent: 'accent-amber',  sub: 'Highly liquid' },
    ],
    holdings: {
      concentration: { top10pct: '34.2%', top25pct: '48.6%', totalPositions: 503 },
      style: 'Identical to SPY: large-cap blend with heavy mega-cap tech concentration.',
      items: [
        { ticker: 'MSFT',  name: 'Microsoft Corp',        weight: 6.89 },
        { ticker: 'NVDA',  name: 'NVIDIA Corp',           weight: 6.31 },
        { ticker: 'AAPL',  name: 'Apple Inc',             weight: 6.10 },
        { ticker: 'AMZN',  name: 'Amazon.com Inc',        weight: 3.81 },
        { ticker: 'META',  name: 'Meta Platforms',        weight: 2.72 },
        { ticker: 'GOOGL', name: 'Alphabet Class A',      weight: 2.11 },
        { ticker: 'GOOG',  name: 'Alphabet Class C',      weight: 1.80 },
        { ticker: 'BRK.B', name: 'Berkshire Hathaway B',  weight: 1.71 },
        { ticker: 'LLY',   name: 'Eli Lilly & Co',        weight: 1.58 },
        { ticker: 'AVGO',  name: 'Broadcom Inc',          weight: 1.52 },
      ],
    },
    sectors: [
      { name: 'Information Technology', pct: 31.5, color: '#3b82f6' },
      { name: 'Financials',             pct: 13.2, color: '#8b5cf6' },
      { name: 'Health Care',            pct: 11.8, color: '#14b8a6' },
      { name: 'Consumer Discretionary', pct:  9.9, color: '#f59e0b' },
      { name: 'Communication Services', pct:  8.7, color: '#6366f1' },
      { name: 'Industrials',            pct:  8.1, color: '#22c55e' },
      { name: 'Consumer Staples',       pct:  5.8, color: '#f43f5e' },
      { name: 'Energy',                 pct:  3.9, color: '#fb923c' },
      { name: 'Utilities',              pct:  2.4, color: '#a78bfa' },
      { name: 'Real Estate',            pct:  2.3, color: '#34d399' },
      { name: 'Materials',              pct:  2.4, color: '#fbbf24' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.03%',   sub: 'Tied with VOO; 3x less than SPY', accent: '#22c55e', rating: 'low', ratingLabel: 'Exceptional' },
      { icon: '🏦', label: 'AUM',           value: '$490B',   sub: '2nd largest ETF globally',        accent: '#14b8a6', rating: 'low', ratingLabel: 'Best-in-class' },
      { icon: '📊', label: 'Annual Turnover', value: '~3%',   sub: 'Very low index replication',      accent: '#8b5cf6', rating: 'low', ratingLabel: 'Low' },
      { icon: '📈', label: 'Tracking Error', value: '~0.02%', sub: 'Near-perfect S&P 500 replication', accent: '#f59e0b', rating: 'low', ratingLabel: 'Minimal' },
      { icon: '📅', label: 'Inception',  value: '2000',       sub: '26-year live track record',       accent: '#6366f1', rating: null },
      { icon: '💸', label: 'Div Frequency', value: 'Quarterly', sub: 'Mar, Jun, Sep, Dec payable',   accent: '#22c55e', rating: null },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   2.1, bmk:   2.1 },
        { period: '3 Months',   etf:   4.8, bmk:   4.8 },
        { period: '1 Year',     etf:  24.3, bmk:  24.2 },
        { period: '3 Year',     etf:  10.7, bmk:  10.6 },
        { period: '5 Year',     etf:  15.9, bmk:  15.8 },
        { period: '10 Year',    etf:  13.2, bmk:  13.1 },
        { period: 'Since 2000', etf:   7.9, bmk:   7.8 },
      ],
      benchmark: 'S&P 500 Index',
      notes: [
        'IVV and VOO are essentially interchangeable with SPY for long-term holders; the key differentiator is cost (0.03% vs 0.0945%).',
        'For a $500K investment, IVV saves approximately $325/year in fees vs SPY — significant compounding over 20-30 years.',
        'iShares structure allows intra-day dividend reinvestment vs end-of-day for SPY; a minor but real efficiency advantage.',
        'SPY remains preferred by institutional traders due to $22B/day volume vs $4.2B for IVV.',
      ],
    },
    risks: [
      { icon: '📉', title: 'Market / Equity Risk',         level: 'high', color: '#f43f5e', body: 'Full market beta (Beta = 1.0). No downside protection. Declines in line with the S&P 500 in bear markets.' },
      { icon: '🏗️', title: 'Tech Concentration',           level: 'med',  color: '#f59e0b', body: 'IT sector weight >31%; heavy dependence on a handful of mega-cap tech stocks for index-level returns.' },
      { icon: '🌐', title: 'US-Only Exposure',             level: 'low',  color: '#22c55e', body: 'No international diversification; VXUS or IXUS required for non-US equity coverage.' },
      { icon: '📊', title: 'Valuation Risk',               level: 'med',  color: '#f59e0b', body: 'At P/E ~22x, the S&P 500 trades above long-term historical averages; multiple compression remains a structural risk.' },
    ],
    useCases: [
      { icon: '🏛️', title: 'Core Long-Term S&P 500 Holding', body: 'For passive buy-and-hold investors who want S&P 500 exposure at rock-bottom cost, IVV is the iShares equivalent to VOO.' },
      { icon: '💰', title: 'Cost-Saving SPY Replacement',    body: 'Long-term investors in SPY can switch to IVV saving ~0.065%/year for identical exposure, meaningfully compounding over decades.' },
      { icon: '🏦', title: 'iShares Ecosystem Integration',  body: 'Investors using iShares products may prefer IVV for consistency; it pairs naturally with IEFA, IEMG, and AGG.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'Identical S&P 500 exposure to SPY at one-third the expense ratio (0.03% vs 0.0945%), a meaningful long-term cost advantage.' },
      { type: 'strength', text: '$490B AUM and $4.2B daily volume ensure high liquidity and institutional trust.' },
      { type: 'weakness', text: 'For active traders, SPY is superior due to $22B vs IVV $4.2B daily volume and tighter bid-ask spreads.' },
      { type: 'weakness', text: 'No differentiation from the benchmark; investors seeking any tilt or factor exposure must use a different vehicle.' },
      { type: 'neutral',  text: 'Choice between IVV and VOO (both 0.03%) is essentially irrelevant for performance; pick based on your brokerage.' },
    ],
  },

  VOO: {
    ticker: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    issuer: 'Vanguard',
    category: 'Large-Cap Blend',
    price: 478.92,
    change: '+0.82%',
    changePositive: true,
    aumBn: 570,
    inceptionYear: 2010,
    description: `VOO tracks the S&P 500 Index, offering identical exposure to SPY and IVV at 0.03% cost. It has surpassed SPY in AUM to become the largest ETF in the world, driven by Vanguard investors converting SPY holdings for cost savings. For most passive long-term investors, VOO is now the default S&P 500 choice.`,
    overview: [
      { label: 'AUM',           value: '$570B',   accent: 'accent-blue',   sub: 'Largest ETF by AUM (2025)' },
      { label: 'Expense Ratio', value: '0.03%',   accent: 'accent-green',  sub: 'Tied cheapest with IVV' },
      { label: 'Holdings',      value: '503',     accent: 'accent-purple', sub: 'S&P 500 constituents' },
      { label: 'Avg Daily Vol', value: '$3.8B',   accent: 'accent-amber',  sub: 'Liquid for long-term holds' },
    ],
    holdings: {
      concentration: { top10pct: '34.2%', top25pct: '48.6%', totalPositions: 503 },
      style: 'Identical to SPY/IVV: large-cap blend, heavy mega-cap technology weighting.',
      items: [
        { ticker: 'MSFT',  name: 'Microsoft Corp',        weight: 6.89 },
        { ticker: 'NVDA',  name: 'NVIDIA Corp',           weight: 6.31 },
        { ticker: 'AAPL',  name: 'Apple Inc',             weight: 6.10 },
        { ticker: 'AMZN',  name: 'Amazon.com Inc',        weight: 3.81 },
        { ticker: 'META',  name: 'Meta Platforms',        weight: 2.72 },
        { ticker: 'GOOGL', name: 'Alphabet Class A',      weight: 2.11 },
        { ticker: 'GOOG',  name: 'Alphabet Class C',      weight: 1.80 },
        { ticker: 'BRK.B', name: 'Berkshire Hathaway B',  weight: 1.71 },
        { ticker: 'LLY',   name: 'Eli Lilly & Co',        weight: 1.58 },
        { ticker: 'AVGO',  name: 'Broadcom Inc',          weight: 1.52 },
      ],
    },
    sectors: [
      { name: 'Information Technology', pct: 31.5, color: '#3b82f6' },
      { name: 'Financials',             pct: 13.2, color: '#8b5cf6' },
      { name: 'Health Care',            pct: 11.8, color: '#14b8a6' },
      { name: 'Consumer Discretionary', pct:  9.9, color: '#f59e0b' },
      { name: 'Communication Services', pct:  8.7, color: '#6366f1' },
      { name: 'Industrials',            pct:  8.1, color: '#22c55e' },
      { name: 'Consumer Staples',       pct:  5.8, color: '#f43f5e' },
      { name: 'Energy',                 pct:  3.9, color: '#fb923c' },
      { name: 'Utilities',              pct:  2.4, color: '#a78bfa' },
      { name: 'Real Estate',            pct:  2.3, color: '#34d399' },
      { name: 'Materials',              pct:  2.4, color: '#fbbf24' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.03%',   sub: 'Tied with IVV; 3x less than SPY', accent: '#22c55e', rating: 'low', ratingLabel: 'Exceptional' },
      { icon: '🏦', label: 'AUM',           value: '$570B',   sub: 'Surpassed SPY to be #1 ETF',      accent: '#14b8a6', rating: 'low', ratingLabel: 'Largest' },
      { icon: '📊', label: 'Annual Turnover', value: '~3%',   sub: 'Very low, passive index fund',    accent: '#8b5cf6', rating: 'low', ratingLabel: 'Low' },
      { icon: '📈', label: 'Tracking Error', value: '~0.01%', sub: 'Exceptional Vanguard replication', accent: '#f59e0b', rating: 'low', ratingLabel: 'Minimal' },
      { icon: '📅', label: 'Inception',      value: '2010',   sub: '16-year live track record',       accent: '#6366f1', rating: null },
      { icon: '🏢', label: 'Issuer',         value: 'Vanguard', sub: 'Investor-owned structure',      accent: '#22c55e', rating: null },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   2.1, bmk:   2.1 },
        { period: '3 Months',   etf:   4.8, bmk:   4.8 },
        { period: '1 Year',     etf:  24.3, bmk:  24.2 },
        { period: '3 Year',     etf:  10.7, bmk:  10.6 },
        { period: '5 Year',     etf:  15.9, bmk:  15.8 },
        { period: '10 Year',    etf:  13.2, bmk:  13.1 },
        { period: 'Since 2010', etf:  14.1, bmk:  14.0 },
      ],
      benchmark: 'S&P 500 Index',
      notes: [
        'VOO is statistically identical to IVV and SPY in performance; the 0.03% ER means near-zero drag vs the index.',
        'VOO surpassed SPY in AUM by late 2024, driven by millions of retail buy-and-hold investors preferring Vanguard.',
        'Vanguard patent-expired share class structure further enhances tax efficiency vs the SPDR trust structure used by SPY.',
        'For active intraday traders, SPY is superior ($22B daily volume); for all other investors, VOO is the preferred choice.',
      ],
    },
    risks: [
      { icon: '📉', title: 'Market / Equity Risk',    level: 'high', color: '#f43f5e', body: 'Full S&P 500 beta; declines tracking the index in bear markets. Same drawdown profile as SPY and IVV.' },
      { icon: '⚡', title: 'IT Sector Concentration', level: 'med',  color: '#f59e0b', body: 'Over 31% in Information Technology; mega-cap tech performance heavily drives index return outcomes.' },
      { icon: '🌐', title: 'US-Only Exposure',        level: 'low',  color: '#22c55e', body: 'Domestic-only; pair with VXUS for a complete global equity allocation at minimal additional cost.' },
      { icon: '📊', title: 'Valuation Risk',          level: 'med',  color: '#f59e0b', body: 'At P/E ~22x, the S&P 500 trades above long-term historical averages; multiple compression remains a structural risk.' },
    ],
    useCases: [
      { icon: '🏛️', title: 'Default Passive Core Holding',  body: 'For most individual investors, VOO is the single best starting point for US equity: maximum simplicity, minimum cost, proven track record.' },
      { icon: '📉', title: 'SPY Cost-Reduction Upgrade',    body: 'Long-term SPY holders should consider switching to VOO and saving ~0.065%/year for identical exposure, compounding meaningfully over decades.' },
      { icon: '🧱', title: 'Portfolio Foundation',          body: 'Serves as the equity foundation for countless portfolios; combined with BND and VXUS, forms the complete Vanguard three-fund portfolio.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'World\'s largest ETF by AUM ($570B); Vanguard structure aligns investor and fund interests, supporting ongoing cost reductions.' },
      { type: 'strength', text: '0.03% expense ratio saves meaningful dollars vs SPY over long holding periods, with zero difference in exposure.' },
      { type: 'weakness', text: 'Lower daily trading volume (~$3.8B vs SPY ~$22B) makes it less suited for active trading and institutional hedging needs.' },
      { type: 'weakness', text: 'US-only; does not provide international equity exposure — must be paired with VXUS for global diversification.' },
      { type: 'neutral',  text: 'For the vast majority of passive investors, VOO is the optimal S&P 500 vehicle. Choose SPY only if intraday liquidity matters.' },
    ],
  },

  AGG: {
    ticker: 'AGG',
    name: 'iShares Core US Aggregate Bond ETF',
    issuer: 'BlackRock (iShares)',
    category: 'Taxable Bond / Broad Market',
    price: 96.14,
    change: '+0.11%',
    changePositive: true,
    aumBn: 108,
    inceptionYear: 2003,
    description: `AGG is BlackRock\'s equivalent to BND, tracking the Bloomberg US Aggregate Bond Index with ~11,000 investment-grade US bonds including Treasuries, corporate bonds, and mortgage-backed securities. It is the oldest and most widely recognised US bond benchmark ETF, used as the fixed income standard by institutional allocators globally.`,
    overview: [
      { label: 'AUM',           value: '$108B',   accent: 'accent-blue',  sub: '2nd largest US bond ETF' },
      { label: 'Expense Ratio', value: '0.03%',   accent: 'accent-green', sub: 'Tied cheapest with BND' },
      { label: 'Holdings',      value: '~11,000', accent: 'accent-purple', sub: 'Full IG US bond market' },
      { label: 'SEC Yield',     value: '~4.6%',   accent: 'accent-amber', sub: '30-day SEC yield' },
    ],
    holdings: {
      concentration: { top10pct: '4.0%', top25pct: '9.1%', totalPositions: 11000 },
      style: 'Investment-grade US bonds only. Near-identical composition to BND; issuer is the only practical difference.',
      items: [
        { ticker: 'UST TIPS',  name: 'US Treasury Inflation-Protected', weight: 2.08 },
        { ticker: 'UST 2Y',    name: 'US Treasury Note 2-Year',         weight: 1.79 },
        { ticker: 'UST 5Y',    name: 'US Treasury Note 5-Year',         weight: 1.58 },
        { ticker: 'UST 10Y',   name: 'US Treasury Note 10-Year',        weight: 1.40 },
        { ticker: 'FNMA MBS',  name: 'Fannie Mae Mortgage-Backed',      weight: 1.28 },
        { ticker: 'FHLMC MBS', name: 'Freddie Mac Mortgage-Backed',     weight: 1.15 },
        { ticker: 'UST 30Y',   name: 'US Treasury Bond 30-Year',        weight: 1.04 },
        { ticker: 'GNMA MBS',  name: 'Ginnie Mae Mortgage-Backed',      weight: 0.96 },
        { ticker: 'AAPL CORP', name: 'Apple Inc Corporate Bond',        weight: 0.41 },
        { ticker: 'MSFT CORP', name: 'Microsoft Corp Bond',             weight: 0.37 },
      ],
    },
    sectors: [
      { name: 'US Treasuries',      pct: 44.6, color: '#3b82f6' },
      { name: 'Mortgage-Backed',    pct: 20.3, color: '#14b8a6' },
      { name: 'Corporate IG',       pct: 25.1, color: '#8b5cf6' },
      { name: 'Government-Related', pct:  6.1, color: '#22c55e' },
      { name: 'Asset-Backed',       pct:  2.4, color: '#f59e0b' },
      { name: 'Other',              pct:  1.5, color: '#6366f1' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.03%',    sub: 'Tied cheapest bond ETF (=BND)',      accent: '#22c55e', rating: 'low', ratingLabel: 'Exceptional' },
      { icon: '🏦', label: 'AUM',           value: '$108B',    sub: '2nd largest bond ETF',               accent: '#14b8a6', rating: 'low', ratingLabel: 'Excellent' },
      { icon: '📊', label: 'Duration',      value: '~6.1 yrs', sub: 'Intermediate; moderate rate risk',  accent: '#f59e0b', rating: null },
      { icon: '💰', label: 'SEC Yield',      value: '~4.6%',    sub: 'Same as BND',                       accent: '#22c55e', rating: null },
      { icon: '📅', label: 'Inception',      value: '2003',     sub: '23-year track record; oldest IG ETF', accent: '#6366f1', rating: null },
      { icon: '🏢', label: 'Issuer',         value: 'BlackRock', sub: 'iShares bond lineup standard',      accent: '#8b5cf6', rating: null },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   0.4, bmk:   2.1 },
        { period: '3 Months',   etf:   0.9, bmk:   4.8 },
        { period: '1 Year',     etf:   4.7, bmk:  24.2 },
        { period: '3 Year',     etf:  -1.3, bmk:  10.6 },
        { period: '5 Year',     etf:  -0.5, bmk:  15.8 },
        { period: '10 Year',    etf:   1.5, bmk:  13.1 },
        { period: 'Since 2003', etf:   3.2, bmk:  10.1 },
      ],
      benchmark: 'S&P 500 (SPY)',
      notes: [
        'AGG and BND have near-identical performance history; any gap at any period is typically under 5 basis points.',
        '2022 drawdown: AGG fell -13.0% vs BND -13.1% — essentially identical losses in the historic bond bear market.',
        'AGG is the institutional bond benchmark; many pension funds, endowments, and model portfolios reference AGG by name.',
        'For retail investors, AGG vs BND is purely a brokerage ecosystem preference: BlackRock vs Vanguard.',
      ],
    },
    risks: [
      { icon: '📉', title: 'Interest Rate Risk',    level: 'high', color: '#f43f5e', body: 'Duration ~6.1 years; identical rate sensitivity to BND. The 2022 experience (-13%) underscored this risk clearly.' },
      { icon: '💸', title: 'Low Real Return',       level: 'med',  color: '#f59e0b', body: 'Investment-grade bonds deliver low real returns in inflationary or equity-bull-market environments.' },
      { icon: '💴', title: 'Inflation Risk',        level: 'med',  color: '#f59e0b', body: 'Fixed rate bonds lose purchasing power in high-inflation periods; the 2021-2023 episode demonstrated this.' },
      { icon: '⚠️', title: 'Credit Risk',           level: 'low',  color: '#22c55e', body: 'Investment-grade only; default risk is extremely low. Credit spread widening during recessions can reduce NAV even without defaults.' },
    ],
    useCases: [
      { icon: '⚖️', title: 'Core Bond Allocation',        body: 'Primary use case: provides ballast to an equity portfolio, reducing overall volatility and offering income at low cost.' },
      { icon: '🏦', title: 'iShares Ecosystem Bond Leg',  body: 'Natural bond complement for portfolios using IVV or IEFA; pairs the iShares equity lineup with the iShares bond benchmark.' },
      { icon: '🛡️', title: 'Equity Crash Hedge',          body: 'Treasury component provides safe-haven appreciation during equity bear markets, partially offsetting equity losses.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'The original investment-grade bond ETF benchmark; 23-year track record and $108B AUM make it the most recognised fixed income ETF.' },
      { type: 'strength', text: '0.03% expense ratio identical to BND; both are best-in-class for cost in the bond ETF category.' },
      { type: 'weakness', text: '2022 loss of -13% demonstrated that broad bond ETFs are not capital-preservation vehicles during rate hiking cycles.' },
      { type: 'weakness', text: 'Duration ~6.1 years means ongoing sensitivity to interest rate movements; rate risk must be managed in portfolio context.' },
      { type: 'neutral',  text: 'Functionally interchangeable with BND; choose AGG for iShares-centric portfolios, BND for Vanguard-centric ones.' },
    ],
  },

  IEFA: {
    ticker: 'IEFA',
    name: 'iShares Core MSCI EAFE ETF',
    issuer: 'BlackRock (iShares)',
    category: 'International Developed Markets',
    price: 74.62,
    change: '+0.48%',
    changePositive: true,
    aumBn: 102,
    inceptionYear: 2012,
    description: `IEFA tracks the MSCI EAFE IMI Index, providing exposure to developed market equities in Europe, Australasia, and the Far East — excluding the US and Canada. With ~3,200 holdings across 21 countries, it is the definitive large/mid/small-cap developed international ETF and the primary non-US equity building block for investors using the iShares ecosystem.`,
    overview: [
      { label: 'AUM',           value: '$102B',   accent: 'accent-blue',   sub: 'Largest intl developed ETF' },
      { label: 'Expense Ratio', value: '0.07%',   accent: 'accent-green',  sub: 'Very low for intl developed' },
      { label: 'Holdings',      value: '~3,200',  accent: 'accent-purple', sub: 'Europe, Asia, Australasia' },
      { label: '12M Yield',     value: '~3.4%',   accent: 'accent-amber',  sub: 'Higher yield than US equity' },
    ],
    holdings: {
      concentration: { top10pct: '12.1%', top25pct: '21.8%', totalPositions: 3200 },
      style: 'Developed market ex-US/Canada blend. Japan ~22%, UK ~14%, France ~12%, Switzerland ~10%, Germany ~9%.',
      items: [
        { ticker: 'NOVO B', name: 'Novo Nordisk (Denmark)',       weight: 1.88 },
        { ticker: 'NESN',   name: 'Nestle SA (Switzerland)',      weight: 1.41 },
        { ticker: 'ASML',   name: 'ASML Holding (Netherlands)',   weight: 1.38 },
        { ticker: 'ROG',    name: 'Roche Holding (Switzerland)',  weight: 1.14 },
        { ticker: 'SHEL',   name: 'Shell PLC (UK)',               weight: 1.08 },
        { ticker: 'AZN',    name: 'AstraZeneca (UK)',             weight: 1.04 },
        { ticker: 'LVMH',   name: 'LVMH Moet Hennessy (France)', weight: 0.98 },
        { ticker: 'SAP',    name: 'SAP SE (Germany)',             weight: 0.88 },
        { ticker: '7203.T', name: 'Toyota Motor (Japan)',         weight: 0.82 },
        { ticker: 'HSBA',   name: 'HSBC Holdings (UK)',           weight: 0.78 },
      ],
    },
    sectors: [
      { name: 'Financials',             pct: 22.8, color: '#8b5cf6' },
      { name: 'Industrials',            pct: 16.4, color: '#22c55e' },
      { name: 'Health Care',            pct: 13.2, color: '#14b8a6' },
      { name: 'Consumer Staples',       pct: 12.1, color: '#f43f5e' },
      { name: 'Consumer Discretionary', pct:  9.8, color: '#f59e0b' },
      { name: 'Information Technology', pct:  8.4, color: '#3b82f6' },
      { name: 'Materials',              pct:  7.9, color: '#fbbf24' },
      { name: 'Energy',                 pct:  5.4, color: '#fb923c' },
      { name: 'Communication Services', pct:  4.0, color: '#6366f1' },
      { name: 'Utilities',              pct:  0.2, color: '#a78bfa' },
    ],
    costs: [
      { icon: '💲', label: 'Expense Ratio', value: '0.07%',  sub: 'Very low for intl developed ETF',   accent: '#22c55e', rating: 'low', ratingLabel: 'Excellent' },
      { icon: '🏦', label: 'AUM',           value: '$102B',  sub: 'Largest EAFE ETF by AUM',           accent: '#14b8a6', rating: 'low', ratingLabel: 'Best-in-class' },
      { icon: '📊', label: 'Annual Turnover', value: '~5%',  sub: 'Low, passive index fund',           accent: '#8b5cf6', rating: 'low', ratingLabel: 'Low' },
      { icon: '💰', label: '12M Yield',      value: '~3.4%', sub: 'Materially higher than US equity',  accent: '#f59e0b', rating: null },
      { icon: '📅', label: 'Inception',      value: '2012',  sub: '14-year live track record',         accent: '#6366f1', rating: null },
      { icon: '🌍', label: 'Countries',      value: '21',    sub: 'No US, Canada, or EM exposure',     accent: '#22c55e', rating: null },
    ],
    performance: {
      periods: [
        { period: '1 Month',    etf:   0.8, bmk:   2.1 },
        { period: '3 Months',   etf:   2.8, bmk:   4.8 },
        { period: '1 Year',     etf:  10.9, bmk:  24.2 },
        { period: '3 Year',     etf:   4.2, bmk:  10.6 },
        { period: '5 Year',     etf:   5.8, bmk:  15.8 },
        { period: '10 Year',    etf:   4.6, bmk:  13.1 },
        { period: 'Since 2012', etf:   5.8, bmk:  14.1 },
      ],
      benchmark: 'S&P 500 (SPY)',
      notes: [
        'IEFA covers developed markets only (no EM); less volatile than VXUS but misses emerging market growth potential.',
        'Japan (~22%) is the largest single country; Japanese equities have outperformed in local currency but USD/JPY swings affect returns.',
        'European heavyweight sectors (Financials, Industrials, Consumer Staples) provide very different factor exposure vs US markets.',
        'Peer EFA (0.32%) vs IEFA (0.07%): IEFA saves ~0.25%/year for near-identical exposure — always prefer IEFA over EFA.',
      ],
    },
    risks: [
      { icon: '💱', title: 'Currency Risk',                     level: 'high', color: '#f43f5e', body: 'Unhedged exposure to EUR, JPY, GBP, CHF and others. USD strength is a persistent headwind; currency swings can dominate annual returns.' },
      { icon: '📉', title: 'Persistent US Underperformance',    level: 'high', color: '#f43f5e', body: 'Developed international markets have lagged US equity returns significantly for over a decade.' },
      { icon: '🏛️', title: 'Slow-Growth Economies',             level: 'med',  color: '#f59e0b', body: 'Europe and Japan face structural headwinds: aging demographics, lower productivity growth, and heavier regulation vs the US.' },
      { icon: '🌍', title: 'Geopolitical Risk',                 level: 'med',  color: '#f59e0b', body: 'Ongoing European geopolitical tensions (Ukraine, energy security) and Japan trade dynamics add macro uncertainty.' },
      { icon: '💰', title: 'No Emerging Market Exposure',       level: 'low',  color: '#22c55e', body: 'IEFA covers developed markets only; investors seeking EM exposure must add IEMG or EEM separately.' },
    ],
    useCases: [
      { icon: '🌍', title: 'Developed International Sleeve',    body: 'Core allocation for non-US developed market exposure; lower volatility than including EM, suitable for more conservative international tilts.' },
      { icon: '🏦', title: 'iShares Global Portfolio Pair',     body: 'Pairs with IVV and AGG in an iShares-centric portfolio; together they cover US equity, intl equity, and bonds efficiently.' },
      { icon: '💰', title: 'Income Enhancement',                body: 'Higher dividend yield (~3.4%) than US equity ETFs; useful for income-oriented investors wanting international diversification with cash flow.' },
    ],
    bottomLine: [
      { type: 'strength', text: 'Largest EAFE ETF ($102B AUM) at rock-bottom 0.07% cost; the dominant benchmark for developed international equity in iShares portfolios.' },
      { type: 'strength', text: 'No emerging market exposure reduces volatility vs VXUS; suitable for investors who want developed-only international diversification.' },
      { type: 'weakness', text: 'Developed international markets have structurally underperformed US equities for over a decade; the valuation discount may persist.' },
      { type: 'weakness', text: 'Currency risk is unhedged and significant; a strong USD environment directly suppresses USD-denominated returns.' },
      { type: 'neutral',  text: 'Compared to VXUS, IEFA excludes EM (~25%) — choose IEFA for lower volatility, VXUS for broader global coverage.' },
    ],
  },

};

/* ──────────────────────────────────────────────────────────────────
   2.  DATA LAYER  (replace this function to connect a real API)
────────────────────────────────────────────────────────────────── */

/**
 * Simulates an async data fetch.
 * Replace with fetch('/api/etf?ticker='+ticker) or similar.
 * @param {string} ticker
 * @returns {Promise<object|null>}
 */
async function fetchETFData(ticker) {
  return new Promise((resolve) => {
    // Simulate network latency
    setTimeout(() => {
      const data = ETF_DATABASE[ticker.toUpperCase().trim()] || null;
      resolve(data);
    }, 700);
  });
}

/* ──────────────────────────────────────────────────────────────────
   3.  CANVAS CHART HELPERS
────────────────────────────────────────────────────────────────── */

/**
 * Draw a donut chart on a canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {Array<{name:string, pct:number, color:string}>} segments
 */
function drawDonut(canvas, segments) {
  const dpr = window.devicePixelRatio || 1;
  const size = Math.min(canvas.parentElement.clientWidth, 340);
  canvas.width  = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width  = size + 'px';
  canvas.style.height = size + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const cx = size / 2;
  const cy = size / 2;
  const outer = size * 0.42;
  const inner = size * 0.26;

  const total = segments.reduce((s, x) => s + x.pct, 0);
  let angle = -Math.PI / 2;

  segments.forEach((seg) => {
    const slice = (seg.pct / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, outer, angle, angle + slice);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();

    angle += slice;
  });

  // Punch inner circle
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, 2 * Math.PI);
  ctx.fillStyle = '#161d2e';
  ctx.fill();

  // Centre label
  ctx.fillStyle = '#f0f4ff';
  ctx.font = `700 ${size * 0.07}px Inter, system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${segments.length}`, cx, cy - size * 0.035);
  ctx.fillStyle = '#8b9ec7';
  ctx.font = `400 ${size * 0.045}px Inter, system-ui, sans-serif`;
  ctx.fillText('Sectors', cx, cy + size * 0.045);
}

/**
 * Draw a grouped bar chart for performance data.
 * @param {HTMLCanvasElement} canvas
 * @param {Array<{period,etf,bmk}>} periods
 * @param {string} benchmark
 */
function drawPerfBars(canvas, periods, benchmark) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.parentElement.clientWidth || 600;
  const h = 280;
  canvas.width  = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width  = w + 'px';
  canvas.style.height = h + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const padL = 52, padR = 20, padT = 20, padB = 50;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  // Determine value range
  const allVals = periods.flatMap(p => [p.etf, p.bmk]);
  const minVal  = Math.min(0, ...allVals);
  const maxVal  = Math.max(0, ...allVals);
  const valRange = maxVal - minVal || 1;

  const toY = (v) => padT + chartH - ((v - minVal) / valRange) * chartH;
  const zeroY = toY(0);

  // Grid lines
  const gridCount = 5;
  for (let i = 0; i <= gridCount; i++) {
    const v = minVal + (valRange / gridCount) * i;
    const y = toY(v);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.moveTo(padL, y);
    ctx.lineTo(w - padR, y);
    ctx.stroke();
    ctx.fillStyle = '#4e637e';
    ctx.font = `11px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(v.toFixed(0) + '%', padL - 6, y);
  }

  // Zero line
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1;
  ctx.moveTo(padL, zeroY);
  ctx.lineTo(w - padR, zeroY);
  ctx.stroke();

  const groupW = chartW / periods.length;
  const barW   = Math.min(groupW * 0.32, 22);
  const gap    = 4;

  periods.forEach((p, i) => {
    const gx = padL + i * groupW + groupW / 2;

    // ETF bar
    const etfX = gx - barW - gap / 2;
    const etfY = p.etf >= 0 ? toY(p.etf) : zeroY;
    const etfH = Math.abs(toY(p.etf) - zeroY);

    const etfGrad = ctx.createLinearGradient(0, etfY, 0, etfY + etfH);
    etfGrad.addColorStop(0, '#3b82f6');
    etfGrad.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = p.etf >= 0 ? etfGrad : '#f43f5e';
    roundRect(ctx, etfX, etfY, barW, Math.max(etfH, 2), 3);
    ctx.fill();

    // Benchmark bar
    const bmkX = gx + gap / 2;
    const bmkY = p.bmk >= 0 ? toY(p.bmk) : zeroY;
    const bmkH = Math.abs(toY(p.bmk) - zeroY);
    ctx.fillStyle = 'rgba(139,92,246,0.55)';
    roundRect(ctx, bmkX, bmkY, barW, Math.max(bmkH, 2), 3);
    ctx.fill();

    // X label
    ctx.fillStyle = '#8b9ec7';
    ctx.font = '10px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const label = p.period.replace(' Year', 'yr').replace(' Month', 'mo').replace(' Months', 'mo');
    ctx.fillText(label, gx, h - padB + 8);
  });

  // Legend
  const lx = padL;
  const ly = h - padB + 30;
  ctx.fillStyle = '#3b82f6';
  roundRect(ctx, lx, ly, 12, 8, 2);
  ctx.fill();
  ctx.fillStyle = '#8b9ec7';
  ctx.font = '11px Inter, system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('ETF', lx + 16, ly + 4);

  ctx.fillStyle = 'rgba(139,92,246,0.7)';
  roundRect(ctx, lx + 60, ly, 12, 8, 2);
  ctx.fill();
  ctx.fillStyle = '#8b9ec7';
  ctx.fillText(benchmark, lx + 76, ly + 4);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ──────────────────────────────────────────────────────────────────
   4.  RENDER FUNCTIONS
────────────────────────────────────────────────────────────────── */

/** Safely set inner HTML */
function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/** Create an element with optional class and html */
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function renderTickerBanner(data) {
  const banner = document.getElementById('tickerBanner');
  banner.innerHTML = `
    <div>
      <div class="tb-ticker">${data.ticker}</div>
    </div>
    <div>
      <div class="tb-name">${data.name}</div>
      <div class="tb-issuer">${data.issuer} · Since ${data.inceptionYear} · AUM $${data.aumBn}B</div>
    </div>
    <div class="tb-spacer"></div>
    <div class="tb-price-area">
      <div class="tb-price">$${data.price.toFixed(2)}</div>
      <div class="tb-change ${data.changePositive ? 'pos' : 'neg'}">${data.change} today</div>
    </div>
  `;
}

function renderOverview(data) {
  document.getElementById('badgeCategory').textContent = data.category;

  // Description
  document.getElementById('overviewDesc').innerHTML =
    `<p>${data.description.trim().replace(/\n\s+/g, ' ')}</p>`;

  // Stat tiles
  const tilesEl = document.getElementById('statTiles');
  tilesEl.innerHTML = data.overview.map(t => `
    <div class="stat-tile">
      <div class="st-label">${t.label}</div>
      <div class="st-value ${t.accent}">${t.value}</div>
      <div class="st-sub">${t.sub}</div>
    </div>
  `).join('');
}

function renderHoldings(data) {
  const h = data.holdings;
  const maxW = Math.max(...h.items.map(i => i.weight));

  document.getElementById('holdingsMeta').textContent =
    `Top 10 of ${h.concentration.totalPositions.toLocaleString()} holdings`;

  const tbody = document.getElementById('holdingsBody');
  tbody.innerHTML = h.items.map((item, idx) => `
    <tr>
      <td class="row-num">${idx + 1}</td>
      <td><span class="holding-ticker">${item.ticker}</span></td>
      <td class="holding-name">${item.name}</td>
      <td class="align-right holding-weight">${item.weight.toFixed(2)}%</td>
      <td class="weight-bar-cell">
        <div class="weight-bar-bg">
          <div class="weight-bar-fill" style="width:${(item.weight / maxW) * 100}%"></div>
        </div>
      </td>
    </tr>
  `).join('');

  const aside = document.getElementById('holdingsAside');
  aside.innerHTML = `
    <div class="ha-title">Concentration Summary</div>
    <div class="ha-metric">
      <div class="ha-val">${h.concentration.top10pct}</div>
      <div class="ha-desc">Top 10 holdings weight — ${parseFloat(h.concentration.top10pct) > 45 ? 'highly concentrated' : 'moderately concentrated'}</div>
    </div>
    <div class="ha-metric">
      <div class="ha-val">${h.concentration.top25pct}</div>
      <div class="ha-desc">Top 25 holdings weight</div>
    </div>
    <div class="ha-metric">
      <div class="ha-val">${h.concentration.totalPositions.toLocaleString()}</div>
      <div class="ha-desc">Total positions in portfolio</div>
    </div>
    <div class="ha-title" style="margin-top:4px">Style Note</div>
    <p class="ha-desc">${h.style}</p>
  `;
}

function renderSectors(data) {
  const sectors = data.sectors;
  const canvas = document.getElementById('sectorChart');
  drawDonut(canvas, sectors);

  // Bar rows
  const total = sectors.reduce((s, x) => s + x.pct, 0);
  const barsEl = document.getElementById('sectorBars');
  barsEl.className = 'sector-bars-wrap card';
  barsEl.innerHTML = sectors.map(s => `
    <div class="sector-bar-row">
      <div class="sb-label">${s.name}</div>
      <div class="sb-track">
        <div class="sb-fill" style="width:${(s.pct / total) * 100}%; background:${s.color}"></div>
      </div>
      <div class="sb-pct">${s.pct.toFixed(1)}%</div>
    </div>
  `).join('');
}

function renderCosts(data) {
  const grid = document.getElementById('metricsGrid');
  grid.innerHTML = data.costs.map(c => `
    <div class="metric-card">
      <div class="mc-accent" style="background:${c.accent}"></div>
      <span class="mc-icon">${c.icon}</span>
      <div class="mc-label">${c.label}</div>
      <div class="mc-value">${c.value}</div>
      <div class="mc-sub">${c.sub}</div>
      ${c.rating ? `<div class="mc-rating rating-${c.rating}">${c.ratingLabel}</div>` : ''}
    </div>
  `).join('');
}

function renderPerformance(data) {
  const perf = data.performance;

  // Chart
  const canvas = document.getElementById('perfChart');
  // Delay to let layout settle
  requestAnimationFrame(() => drawPerfBars(canvas, perf.periods, perf.benchmark));

  // Table
  const tableEl = document.getElementById('perfTable');
  tableEl.innerHTML = `
    <table class="perf-t">
      <thead>
        <tr>
          <th>Period</th>
          <th class="align-right">${data.ticker}</th>
          <th class="align-right">${perf.benchmark}</th>
          <th class="align-right">vs Bmk</th>
        </tr>
      </thead>
      <tbody>
        ${perf.periods.map(p => {
          const diff = p.etf - p.bmk;
          const diffStr = (diff >= 0 ? '+' : '') + diff.toFixed(1) + '%';
          return `
            <tr>
              <td class="td-period">${p.period}</td>
              <td class="td-return ${p.etf >= 0 ? 'pos' : 'neg'}">${p.etf >= 0 ? '+' : ''}${p.etf.toFixed(1)}%</td>
              <td class="td-bmk">${p.bmk >= 0 ? '+' : ''}${p.bmk.toFixed(1)}%</td>
              <td class="td-return ${diff >= 0 ? 'pos' : 'neg'}">${diffStr}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  // Notes
  const notesEl = document.getElementById('perfNotes');
  notesEl.innerHTML = `
    <ul>${perf.notes.map(n => `<li>${n}</li>`).join('')}</ul>
  `;
}

function renderRisks(data) {
  const grid = document.getElementById('riskGrid');
  grid.innerHTML = data.risks.map(r => `
    <div class="risk-card" style="border-left-color:${r.color}">
      <div class="rc-header">
        <span class="rc-icon">${r.icon}</span>
        <span class="rc-title">${r.title}</span>
        <span class="rc-level level-${r.level}">${r.level.toUpperCase()}</span>
      </div>
      <div class="rc-body">${r.body}</div>
    </div>
  `).join('');
}

function renderUseCases(data) {
  const grid = document.getElementById('useCaseGrid');
  grid.innerHTML = data.useCases.map(u => `
    <div class="uc-card">
      <span class="uc-icon">${u.icon}</span>
      <div class="uc-title">${u.title}</div>
      <div class="uc-body">${u.body}</div>
    </div>
  `).join('');
}

function renderBottomLine(data) {
  const card = document.getElementById('bottomLine');
  card.innerHTML = `
    <div class="bl-title">Bottom Line: ${data.ticker}</div>
    <ul class="bl-bullets">
      ${data.bottomLine.map(b => `
        <li class="bl-bullet">
          <span class="bl-dot ${b.type}">${b.type === 'strength' ? '✓' : b.type === 'weakness' ? '✗' : '●'}</span>
          <span>${b.text}</span>
        </li>
      `).join('')}
    </ul>
  `;
}

function renderDashboard(data) {
  renderTickerBanner(data);
  renderOverview(data);
  renderHoldings(data);
  renderSectors(data);
  renderCosts(data);
  renderPerformance(data);
  renderRisks(data);
  renderUseCases(data);
  renderBottomLine(data);
}

/* ──────────────────────────────────────────────────────────────────
   5.  UI STATE MANAGEMENT
────────────────────────────────────────────────────────────────── */

function showLoader(msg) {
  document.getElementById('loaderText').textContent = msg || 'Fetching data…';
  document.getElementById('loaderOverlay').classList.remove('hidden');
}

function hideLoader() {
  document.getElementById('loaderOverlay').classList.add('hidden');
}

function showHero() {
  document.getElementById('heroSection').classList.remove('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('notFound').classList.add('hidden');
}

function showDashboard() {
  document.getElementById('heroSection').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  document.getElementById('notFound').classList.add('hidden');
}

function showNotFound(ticker) {
  document.getElementById('heroSection').classList.add('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('notFound').classList.remove('hidden');
  document.getElementById('nfTitle').textContent = `"${ticker}" not found`;
  document.getElementById('nfMsg').textContent =
    `No data is available for ${ticker.toUpperCase()} in the sample dataset. ` +
    `Try: SPY, QQQ, SCHD, VTI, ARKK, GLD`;
}

/* ──────────────────────────────────────────────────────────────────
   6.  MAIN SEARCH HANDLER
────────────────────────────────────────────────────────────────── */

async function handleSearch(ticker) {
  const t = (ticker || '').trim().toUpperCase();
  if (!t) return;

  showLoader(`Analyzing ${t}…`);

  try {
    const data = await fetchETFData(t);
    if (!data) {
      hideLoader();
      showNotFound(t);
      return;
    }
    renderDashboard(data);
    showDashboard();
  } catch (err) {
    console.error('ETFLens error:', err);
    hideLoader();
    showNotFound(t);
    return;
  }

  hideLoader();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ──────────────────────────────────────────────────────────────────
   7.  EVENT LISTENERS
────────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  // Form submission
  document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = document.getElementById('tickerInput').value;
    handleSearch(val);
  });

  // Quick chips
  document.getElementById('searchChips').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const ticker = chip.dataset.ticker;
    document.getElementById('tickerInput').value = ticker;
    handleSearch(ticker);
  });

  // Input: auto-uppercase
  document.getElementById('tickerInput').addEventListener('input', (e) => {
    const cur = e.target.value;
    const upper = cur.toUpperCase();
    if (cur !== upper) {
      const pos = e.target.selectionStart;
      e.target.value = upper;
      e.target.setSelectionRange(pos, pos);
    }
  });

  // Redraw charts on resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const dashboard = document.getElementById('dashboard');
      if (dashboard.classList.contains('hidden')) return;
      // Re-draw canvas charts if data is loaded
      const ticker = document.getElementById('tickerInput').value.trim().toUpperCase();
      const data = ETF_DATABASE[ticker];
      if (data) {
        drawDonut(document.getElementById('sectorChart'), data.sectors);
        drawPerfBars(document.getElementById('perfChart'), data.performance.periods, data.performance.benchmark);
      }
    }, 200);
  });

  // Load SPY on first visit for demo purposes
  handleSearch('SPY');

  /* ── Watchlist file loader ─────────────────────────────────────── */

  // Snapshot the default chips HTML so we can restore it on reset
  const DEFAULT_CHIPS_HTML = document.getElementById('searchChips').innerHTML;

  function parseWatchlistText(text) {
    // Accept: one ticker per line, comma/semicolon/space separated, # comments ignored
    return text
      .split(/[\r\n,;\t ]+/)
      .map(s => s.replace(/#.*$/, '').trim().toUpperCase())
      .filter(s => /^[A-Z]{1,10}$/.test(s));
  }

  function resetToDefaultChips() {
    const chipsEl = document.getElementById('searchChips');
    chipsEl.innerHTML = DEFAULT_CHIPS_HTML;
    // Remove banner if present
    const banner = document.getElementById('watchlistBanner');
    if (banner) banner.remove();
    // Re-attach file input listener (HTML was replaced)
    attachFileInputListener();
  }

  function applyWatchlist(tickers, filename) {
    const chipsEl = document.getElementById('searchChips');
    if (!tickers.length) {
      alert('No valid tickers found in the file.\n\nFormat: one ticker per line, or comma-separated (e.g. SPY, QQQ, BND).');
      return;
    }

    // Build new chip row: load button + divider + reset + tickers
    chipsEl.innerHTML = '';

    // Keep the load button
    const loadLabel = document.createElement('label');
    loadLabel.className = 'chip chip-load';
    loadLabel.title = 'Load a .txt file with one ticker per line';
    loadLabel.innerHTML = '\ud83d\udcc2 Load Watchlist<input type="file" id="watchlistFileInput" accept=".txt,.csv" />';
    chipsEl.appendChild(loadLabel);
    // Re-attach event to new input
    loadLabel.querySelector('input').addEventListener('change', handleFileChange);

    // Divider
    const divider = document.createElement('span');
    divider.className = 'chip chip-divider';
    chipsEl.appendChild(divider);

    // Reset button
    const resetChip = document.createElement('span');
    resetChip.className = 'chip chip-reset';
    resetChip.textContent = '\u2715 Reset';
    resetChip.title = 'Restore default ticker chips';
    resetChip.addEventListener('click', resetToDefaultChips);
    chipsEl.appendChild(resetChip);

    // Ticker chips
    const knownTickers = [];
    tickers.forEach(t => {
      const chip = document.createElement('span');
      const known = !!ETF_DATABASE[t];
      chip.className = known ? 'chip' : 'chip chip-unknown';
      chip.dataset.ticker = t;
      chip.textContent = t;
      if (!known) chip.title = `${t} — not in local database`;
      chipsEl.appendChild(chip);
      if (known) knownTickers.push(t);
    });

    // Summary banner
    let banner = document.getElementById('watchlistBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'watchlistBanner';
      banner.className = 'watchlist-banner';
      chipsEl.parentElement.insertBefore(banner, chipsEl.nextSibling);
    }
    const unknown = tickers.length - knownTickers.length;
    banner.innerHTML =
      `\ud83d\udcc4 <strong>${filename}</strong> &mdash; ` +
      `<strong>${knownTickers.length}</strong> of ${tickers.length} tickers recognised` +
      (unknown ? ` &middot; <span style="color:#f87171">${unknown} not in database</span>` : '');

    // Auto-analyze the first recognised ticker
    if (knownTickers.length) {
      document.getElementById('tickerInput').value = knownTickers[0];
      handleSearch(knownTickers[0]);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // Reset the input value so the same file can be re-selected
    e.target.value = '';
    const reader = new FileReader();
    reader.onload = (ev) => {
      const tickers = parseWatchlistText(ev.target.result || '');
      applyWatchlist(tickers, file.name);
    };
    reader.onerror = () => alert('Could not read the file. Please try again.');
    reader.readAsText(file);
  }

  function attachFileInputListener() {
    const input = document.getElementById('watchlistFileInput');
    if (input) input.addEventListener('change', handleFileChange);
  }

  attachFileInputListener();
});

/* ══════════════════════════════════════════════════════════════════
   FEATURE 1 – ETF COMPARISON MODE
   ══════════════════════════════════════════════════════════════════ */

(function initCompare() {

  const compareToggleBtn = document.getElementById('compareToggleBtn');
  const comparePanel     = document.getElementById('comparePanel');
  const compareClose     = document.getElementById('compareClose');
  const compareRunBtn    = document.getElementById('compareRunBtn');
  const compareDashboard = document.getElementById('compareDashboard');
  const dashboard        = document.getElementById('dashboard');
  const heroSection      = document.getElementById('heroSection');
  const notFound         = document.getElementById('notFound');

  let compareActive = false;

  function openComparePanel() {
    comparePanel.classList.remove('hidden');
    compareToggleBtn.classList.add('active');
    compareActive = true;
  }

  function closeComparePanel() {
    comparePanel.classList.add('hidden');
    compareToggleBtn.classList.remove('active');
    compareActive = false;
  }

  compareToggleBtn.addEventListener('click', () => {
    if (compareActive) closeComparePanel();
    else openComparePanel();
  });

  compareClose.addEventListener('click', closeComparePanel);

  /* Auto-uppercase compare inputs */
  document.querySelectorAll('.cmp-input').forEach(inp => {
    inp.addEventListener('input', e => {
      const cur = e.target.value;
      const up  = cur.toUpperCase();
      if (cur !== up) { const p = e.target.selectionStart; e.target.value = up; e.target.setSelectionRange(p, p); }
    });
  });

  compareRunBtn.addEventListener('click', runComparison);

  function runComparison() {
    const inputs  = document.querySelectorAll('.cmp-input');
    const tickers = Array.from(inputs)
      .map(i => i.value.trim().toUpperCase())
      .filter(t => t.length > 0);

    if (tickers.length < 2) {
      alert('Please enter at least 2 tickers to compare.');
      return;
    }

    const datasets = tickers.map(t => ETF_DATABASE[t]).filter(Boolean);

    if (datasets.length < 2) {
      alert('At least 2 of the entered tickers must exist in the database.\n\nAvailable: ' + Object.keys(ETF_DATABASE).join(', '));
      return;
    }

    renderCompareDashboard(datasets);

    // Hide single-ticker views, show compare
    heroSection.classList.add('hidden');
    dashboard.classList.add('hidden');
    notFound.classList.add('hidden');
    document.getElementById('portfolioDashboard').classList.add('hidden');
    compareDashboard.classList.remove('hidden');

    closeComparePanel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderCompareDashboard(datasets) {
    const n = datasets.length;
    const colStyle = `grid-template-columns: 180px repeat(${n}, 1fr)`;
    const colStyleNoLabel = `grid-template-columns: repeat(${n}, 1fr)`;

    let html = `
      <div class="cmp-back-row">
        <button class="cmp-back-btn" id="cmpBackBtn">← Back</button>
        <span class="cmp-tickers-badge">${datasets.map(d => d.ticker).join(' vs ')}</span>
      </div>
    `;

    /* ── Column headers ── */
    html += `<div class="cmp-section">`;
    html += `<div class="cmp-columns" style="${colStyleNoLabel}">`;
    datasets.forEach(d => {
      html += `
        <div class="cmp-col-header">
          <div class="cmp-col-ticker">${d.ticker}</div>
          <div class="cmp-col-name">${d.name}</div>
          <div class="cmp-price">$${d.price.toFixed(2)}
            <span style="font-size:12px;margin-left:6px;" class="${d.changePositive ? 'td-return pos' : 'td-return neg'}">${d.change}</span>
          </div>
        </div>
      `;
    });
    html += `</div></div>`;

    /* ── Key Metrics ── */
    const metrics = [
      { label: 'Category',     fn: d => d.category,      win: null },
      { label: 'AUM',          fn: d => d.overview.find(o => o.label === 'AUM')?.value || '-', win: null },
      { label: 'Expense Ratio',fn: d => { const v = d.overview.find(o => o.label === 'Expense Ratio')?.value || '-'; return v; },
        winFn: d => { const v = d.overview.find(o => o.label === 'Expense Ratio')?.value || '-'; return parseFloat(v) || 999; },
        winType: 'min' },
      { label: 'Holdings',     fn: d => d.holdings.concentration.totalPositions.toLocaleString(), win: null },
      { label: 'Top-10 Weight', fn: d => d.holdings.concentration.top10pct,
        winFn: d => parseFloat(d.holdings.concentration.top10pct) || 999, winType: 'min' },
      { label: 'Inception',    fn: d => String(d.inceptionYear), win: null },
    ];

    html += `<div class="cmp-section"><div class="cmp-section-title">Key Metrics</div>`;
    html += `<div class="cmp-metric-grid">`;

    metrics.forEach(m => {
      let winnerIdx = -1;
      if (m.winFn && m.winType) {
        const vals = datasets.map(m.winFn);
        const best = m.winType === 'min' ? Math.min(...vals) : Math.max(...vals);
        winnerIdx = vals.indexOf(best);
      }
      html += `<div class="cmp-metric-row" style="${colStyle}">`;
      html += `<div class="cmp-metric-label-col">${m.label}</div>`;
      datasets.forEach((d, i) => {
        const isWinner = (winnerIdx === i);
        html += `<div class="cmp-metric-val-col${isWinner ? ' winner' : ''}">${m.fn(d)}${isWinner ? ' ✓' : ''}</div>`;
      });
      html += `</div>`;
    });
    html += `</div></div>`;

    /* ── Sector Exposure ── */
    html += `<div class="cmp-section"><div class="cmp-section-title">Sector Exposure</div>`;
    html += `<div class="cmp-columns" style="${colStyleNoLabel}">`;
    datasets.forEach(d => {
      const total = d.sectors.reduce((s, x) => s + x.pct, 0);
      let sectHtml = `<div class="card cmp-sector-bars">`;
      d.sectors.forEach(s => {
        const w = ((s.pct / total) * 100).toFixed(1);
        sectHtml += `
          <div class="cmp-sb-row">
            <div style="font-size:11px;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px;">${s.name}</div>
            <div class="cmp-sb-pct">${s.pct.toFixed(1)}%</div>
          </div>
          <div class="cmp-sb-track" style="margin-bottom:6px;">
            <div class="cmp-sb-fill" style="width:${w}%;background:${s.color}"></div>
          </div>`;
      });
      sectHtml += `</div>`;
      html += sectHtml;
    });
    html += `</div></div>`;

    /* ── Performance ── */
    // Gather all periods present in any dataset
    const allPeriods = [];
    datasets.forEach(d => d.performance.periods.forEach(p => { if (!allPeriods.includes(p.period)) allPeriods.push(p.period); }));

    html += `<div class="cmp-section"><div class="cmp-section-title">Historical Performance</div>`;
    html += `<div class="cmp-columns" style="${colStyleNoLabel}">`;
    datasets.forEach(d => {
      const perfMap = {};
      d.performance.periods.forEach(p => { perfMap[p.period] = p.etf; });
      html += `<div class="card" style="padding:0;overflow:hidden;">`;
      html += `<table class="cmp-perf-table"><thead><tr><th>Period</th><th>${d.ticker}</th></tr></thead><tbody>`;
      allPeriods.forEach(period => {
        const v = perfMap[period];
        if (v === undefined) return;
        const cls = v >= 0 ? 'p-pos' : 'p-neg';
        html += `<tr><td>${period}</td><td class="${cls}">${v >= 0 ? '+' : ''}${v.toFixed(1)}%</td></tr>`;
      });
      html += `</tbody></table></div>`;
    });

    // Highlight best performer per period
    // (We do this via a second pass with DOM after insertion)
    html += `</div></div>`;

    /* ── Risks ── */
    html += `<div class="cmp-section"><div class="cmp-section-title">Risk Profile</div>`;
    html += `<div class="cmp-columns" style="${colStyleNoLabel}">`;
    datasets.forEach(d => {
      html += `<div class="card">`;
      d.risks.forEach(r => {
        html += `
          <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--border);">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span>${r.icon}</span>
              <span style="font-size:13px;font-weight:700;color:var(--text-primary);">${r.title}</span>
              <span class="rc-level level-${r.level}" style="margin-left:auto;">${r.level.toUpperCase()}</span>
            </div>
            <p style="font-size:12px;color:var(--text-secondary);line-height:1.6;">${r.body}</p>
          </div>`;
      });
      html += `</div>`;
    });
    html += `</div></div>`;

    /* ── Bottom Line ── */
    html += `<div class="cmp-section"><div class="cmp-section-title">Bottom Line</div>`;
    html += `<div class="cmp-columns" style="${colStyleNoLabel}">`;
    datasets.forEach(d => {
      html += `<div class="card">`;
      d.bottomLine.forEach(b => {
        html += `
          <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;">
            <span class="bl-dot ${b.type}" style="flex-shrink:0;">${b.type === 'strength' ? '✓' : b.type === 'weakness' ? '✗' : '●'}</span>
            <span style="font-size:13px;color:var(--text-secondary);line-height:1.6;">${b.text}</span>
          </div>`;
      });
      html += `</div>`;
    });
    html += `</div></div>`;

    compareDashboard.innerHTML = html;

    /* Highlight best performance per period */
    highlightBestPerformance(datasets, allPeriods);

    document.getElementById('cmpBackBtn').addEventListener('click', () => {
      compareDashboard.classList.add('hidden');
      heroSection.classList.remove('hidden');
    });
  }

  function highlightBestPerformance(datasets, periods) {
    // Build a per-ETF lookup
    const maps = datasets.map(d => {
      const m = {};
      d.performance.periods.forEach(p => { m[p.period] = p.etf; });
      return m;
    });

    // For each period, find max etf return
    periods.forEach(period => {
      const vals = maps.map(m => m[period] !== undefined ? m[period] : -Infinity);
      const maxVal = Math.max(...vals);
      const winnerColIdx = vals.indexOf(maxVal);

      // Find all cmp-perf-table cells matching this period in winner column
      const tables = compareDashboard.querySelectorAll('.cmp-perf-table');
      const tbl = tables[winnerColIdx];
      if (!tbl) return;
      tbl.querySelectorAll('tbody tr').forEach(row => {
        if (row.cells[0] && row.cells[0].textContent.trim() === period && row.cells[1]) {
          row.cells[1].classList.add('winner-cell');
        }
      });
    });
  }

}());

/* ══════════════════════════════════════════════════════════════════
   FEATURE 2 – PORTFOLIO BUILDER
   ══════════════════════════════════════════════════════════════════ */

(function initPortfolio() {

  const portfolioToggleBtn = document.getElementById('portfolioToggleBtn');
  const portfolioPanel     = document.getElementById('portfolioPanel');
  const portfolioClose     = document.getElementById('portfolioClose');
  const portfolioRows      = document.getElementById('portfolioRows');
  const portAddRow         = document.getElementById('portAddRow');
  const portAnalyzeBtn     = document.getElementById('portAnalyzeBtn');
  const portWeightStatus   = document.getElementById('portWeightStatus');
  const portfolioDashboard = document.getElementById('portfolioDashboard');
  const heroSection        = document.getElementById('heroSection');
  const dashboard          = document.getElementById('dashboard');
  const notFound           = document.getElementById('notFound');
  const compareDashboard   = document.getElementById('compareDashboard');

  let panelOpen = false;

  /* ── Restore saved portfolio from localStorage ── */
  function loadSaved() {
    try {
      const raw = localStorage.getItem('etflens_portfolio');
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return null;
  }

  function saveCurrent() {
    const rows = getPortfolioRows();
    try { localStorage.setItem('etflens_portfolio', JSON.stringify(rows)); } catch (_) {}
  }

  function getPortfolioRows() {
    return Array.from(portfolioRows.querySelectorAll('.port-row')).map(row => ({
      ticker: row.querySelector('.port-ticker-input').value.trim().toUpperCase(),
      weight: parseFloat(row.querySelector('.port-weight-input').value) || 0,
    }));
  }

  function openPanel() {
    portfolioPanel.classList.remove('hidden');
    portfolioToggleBtn.classList.add('active');
    panelOpen = true;
    // Populate with saved if rows are empty
    if (portfolioRows.children.length === 0) {
      const saved = loadSaved();
      if (saved && saved.length) {
        saved.forEach(r => addRow(r.ticker, r.weight));
      } else {
        addRow('SPY', 60);
        addRow('BND', 40);
      }
      updateWeightStatus();
    }
  }

  function closePanel() {
    portfolioPanel.classList.add('hidden');
    portfolioToggleBtn.classList.remove('active');
    panelOpen = false;
  }

  portfolioToggleBtn.addEventListener('click', () => { if (panelOpen) closePanel(); else openPanel(); });
  portfolioClose.addEventListener('click', closePanel);
  portAddRow.addEventListener('click', () => { addRow('', 0); updateWeightStatus(); });
  portAnalyzeBtn.addEventListener('click', runPortfolioAnalysis);

  function addRow(ticker, weight) {
    const row = document.createElement('div');
    row.className = 'port-row';
    row.innerHTML = `
      <input type="text" class="port-ticker-input" placeholder="Ticker" maxlength="10" value="${ticker}" spellcheck="false" />
      <input type="number" class="port-weight-input" placeholder="0" min="0" max="100" step="1" value="${weight || ''}" />
      <span class="port-pct-label">%</span>
      <span class="port-status-tag"></span>
      <button class="port-remove-btn" title="Remove">✕</button>
    `;

    const tickerInput  = row.querySelector('.port-ticker-input');
    const weightInput  = row.querySelector('.port-weight-input');
    const statusTag    = row.querySelector('.port-status-tag');
    const removeBtn    = row.querySelector('.port-remove-btn');

    function updateStatus() {
      const t = tickerInput.value.trim().toUpperCase();
      if (!t) { statusTag.textContent = ''; statusTag.className = 'port-status-tag'; return; }
      if (ETF_DATABASE[t]) {
        statusTag.textContent = '✓ ' + ETF_DATABASE[t].name.split(' ').slice(0, 4).join(' ');
        statusTag.className = 'port-status-tag known';
      } else {
        statusTag.textContent = '? Not in DB';
        statusTag.className = 'port-status-tag unknown';
      }
    }

    tickerInput.addEventListener('input', e => {
      const cur = e.target.value; const up = cur.toUpperCase();
      if (cur !== up) { const p = e.target.selectionStart; e.target.value = up; e.target.setSelectionRange(p, p); }
      updateStatus();
      saveCurrent();
    });

    weightInput.addEventListener('input', () => { updateWeightStatus(); saveCurrent(); });
    removeBtn.addEventListener('click', () => { row.remove(); updateWeightStatus(); saveCurrent(); });

    if (ticker) updateStatus();
    portfolioRows.appendChild(row);
  }

  function updateWeightStatus() {
    const total = Array.from(portfolioRows.querySelectorAll('.port-weight-input'))
      .reduce((s, i) => s + (parseFloat(i.value) || 0), 0);
    portWeightStatus.textContent = `Total: ${total.toFixed(1)}%`;
    if (Math.abs(total - 100) < 0.01) {
      portWeightStatus.className = 'port-weight-status ok';
    } else if (total > 100) {
      portWeightStatus.className = 'port-weight-status over';
    } else {
      portWeightStatus.className = 'port-weight-status';
    }
  }

  function runPortfolioAnalysis() {
    const rows = getPortfolioRows().filter(r => r.ticker);
    if (rows.length < 2) { alert('Please add at least 2 ETFs to the portfolio.'); return; }

    const total = rows.reduce((s, r) => s + r.weight, 0);
    if (Math.abs(total - 100) > 0.5) {
      alert(`Weights sum to ${total.toFixed(1)}%. They must total 100%.`); return;
    }

    const known = rows.filter(r => ETF_DATABASE[r.ticker]);
    if (known.length < 2) { alert('At least 2 tickers must exist in the database.'); return; }

    // Normalise weights to exactly 100 across known
    const knownTotal = known.reduce((s, r) => s + r.weight, 0);
    const alloc = known.map(r => ({ ...r, w: r.weight / knownTotal }));

    renderPortfolioDashboard(alloc);

    heroSection.classList.add('hidden');
    dashboard.classList.add('hidden');
    notFound.classList.add('hidden');
    compareDashboard.classList.add('hidden');
    portfolioDashboard.classList.remove('hidden');

    closePanel();
    saveCurrent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderPortfolioDashboard(alloc) {
    // ── Weighted average expense ratio ──
    const weightedER = alloc.reduce((s, a) => {
      const d = ETF_DATABASE[a.ticker];
      const erStr = d.overview.find(o => o.label === 'Expense Ratio')?.value || '0';
      const er = parseFloat(erStr) || 0;
      return s + er * a.w;
    }, 0);

    // ── Blended sector exposure ──
    const sectorMap = {};
    const sectorColors = {};
    alloc.forEach(a => {
      const d = ETF_DATABASE[a.ticker];
      d.sectors.forEach(s => {
        sectorMap[s.name] = (sectorMap[s.name] || 0) + s.pct * a.w;
        if (!sectorColors[s.name]) sectorColors[s.name] = s.color;
      });
    });
    const blendedSectors = Object.entries(sectorMap)
      .map(([name, pct]) => ({ name, pct, color: sectorColors[name] }))
      .sort((a, b) => b.pct - a.pct);

    // ── Blended performance ──
    const perfPeriods = {};
    alloc.forEach(a => {
      const d = ETF_DATABASE[a.ticker];
      d.performance.periods.forEach(p => {
        if (!perfPeriods[p.period]) perfPeriods[p.period] = 0;
        perfPeriods[p.period] += p.etf * a.w;
      });
    });
    const blendedPerf = Object.entries(perfPeriods)
      .map(([period, ret]) => ({ period, ret }));

    // ── Overlap holdings ──
    const holdingMap = {};
    alloc.forEach(a => {
      const d = ETF_DATABASE[a.ticker];
      d.holdings.items.forEach(h => {
        if (!holdingMap[h.ticker]) holdingMap[h.ticker] = { ticker: h.ticker, name: h.name, etfs: [], totalW: 0 };
        holdingMap[h.ticker].etfs.push(a.ticker);
        holdingMap[h.ticker].totalW += h.weight * a.w;
      });
    });
    const overlapHoldings = Object.values(holdingMap)
      .filter(h => h.etfs.length > 1)
      .sort((a, b) => b.totalW - a.totalW)
      .slice(0, 10);

    // ── Build HTML ──
    let html = `
      <div class="port-back-row">
        <button class="port-back-btn" id="portBackBtn">← Back</button>
        <span class="port-banner-badge">Portfolio: ${alloc.map(a => `${a.ticker} ${(a.w * 100).toFixed(0)}%`).join(' · ')}</span>
      </div>

      <!-- Summary tiles -->
      <div class="port-summary-tiles">
        <div class="pst-tile">
          <div class="pst-label">Weighted Avg Expense Ratio</div>
          <div class="pst-value" style="color:var(--accent-teal)">${weightedER.toFixed(4)}%</div>
          <div class="pst-sub">Blended cost of holding</div>
        </div>
        <div class="pst-tile">
          <div class="pst-label">ETFs in Portfolio</div>
          <div class="pst-value" style="color:var(--accent-blue)">${alloc.length}</div>
          <div class="pst-sub">${alloc.map(a => a.ticker).join(' + ')}</div>
        </div>
        <div class="pst-tile">
          <div class="pst-label">Top Sector</div>
          <div class="pst-value" style="color:var(--accent-purple)">${blendedSectors[0]?.pct.toFixed(1)}%</div>
          <div class="pst-sub">${blendedSectors[0]?.name}</div>
        </div>
        <div class="pst-tile">
          <div class="pst-label">Shared Holdings</div>
          <div class="pst-value" style="color:var(--accent-amber)">${overlapHoldings.length}</div>
          <div class="pst-sub">Stocks held by 2+ ETFs</div>
        </div>
      </div>

      <!-- Allocation -->
      <div class="section">
        <div class="section-header"><h2 class="section-title">ETF Allocation</h2></div>
        <div class="card" style="padding:0;overflow:hidden;">
          <table class="port-allocation-table">
            <thead><tr><th>Ticker</th><th>Name</th><th class="align-right">Weight</th><th class="align-right">Expense Ratio</th></tr></thead>
            <tbody>
              ${alloc.map(a => {
                const d = ETF_DATABASE[a.ticker];
                const erVal = d.overview.find(o => o.label === 'Expense Ratio')?.value || '-';
                return `<tr>
                  <td><span class="holding-ticker">${a.ticker}</span></td>
                  <td class="holding-name">${d.name}</td>
                  <td class="align-right holding-weight">${(a.w * 100).toFixed(1)}%</td>
                  <td class="align-right">${erVal}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Blended Sector Exposure -->
      <div class="section">
        <div class="section-header"><h2 class="section-title">Blended Sector Exposure</h2></div>
        <div class="card sector-bars-wrap">
          ${blendedSectors.map(s => {
            const maxPct = blendedSectors[0].pct;
            return `
              <div class="sector-bar-row">
                <div class="sb-label">${s.name}</div>
                <div class="sb-track">
                  <div class="sb-fill" style="width:${(s.pct / maxPct) * 100}%;background:${s.color}"></div>
                </div>
                <div class="sb-pct">${s.pct.toFixed(1)}%</div>
              </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Blended Performance -->
      <div class="section">
        <div class="section-header"><h2 class="section-title">Blended Performance</h2></div>
        <div class="card" style="padding:0;overflow:hidden;">
          <table class="blended-perf-table">
            <thead><tr><th>Period</th><th>Blended Return</th></tr></thead>
            <tbody>
              ${blendedPerf.map(p => `
                <tr>
                  <td>${p.period}</td>
                  <td class="${p.ret >= 0 ? 'r-pos' : 'r-neg'}">${p.ret >= 0 ? '+' : ''}${p.ret.toFixed(2)}%</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Holdings Overlap -->
      ${overlapHoldings.length ? `
      <div class="section">
        <div class="section-header"><h2 class="section-title">Holdings Overlap</h2><span class="section-meta">Stocks held by 2+ ETFs in your portfolio</span></div>
        <div class="card" style="padding:0;overflow:hidden;">
          <table class="overlap-table">
            <thead><tr><th>Ticker</th><th>Company</th><th>Found In</th><th class="align-right">Blended Weight</th></tr></thead>
            <tbody>
              ${overlapHoldings.map(h => `
                <tr>
                  <td><span class="holding-ticker">${h.ticker}</span></td>
                  <td class="holding-name">${h.name}</td>
                  <td style="color:var(--accent-amber);font-size:12px;">${h.etfs.join(', ')}</td>
                  <td class="align-right holding-weight">${h.totalW.toFixed(2)}%</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>` : ''}
    `;

    portfolioDashboard.innerHTML = html;

    document.getElementById('portBackBtn').addEventListener('click', () => {
      portfolioDashboard.classList.add('hidden');
      heroSection.classList.remove('hidden');
    });
  }

}());

/* ══════════════════════════════════════════════════════════════════
   FEATURE 3 – EXPORT (PDF + CSV)
   ══════════════════════════════════════════════════════════════════ */

(function initExport() {

  /* ── CSV helpers ── */
  function downloadCSV(filename, rows) {
    const csv = rows.map(r => r.map(cell => {
      const s = String(cell ?? '').replace(/"/g, '""');
      return /[",\n]/.test(s) ? `"${s}"` : s;
    }).join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 200);
  }

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function getCurrentData() {
    const ticker = document.getElementById('tickerInput').value.trim().toUpperCase();
    return ticker ? ETF_DATABASE[ticker] : null;
  }

  /* ── PDF (print) ── */
  document.getElementById('exportPdfBtn').addEventListener('click', () => {
    const data = getCurrentData();
    if (!data) return;

    // Insert a temporary print header
    const hdr = document.createElement('div');
    hdr.className = 'print-header';
    hdr.innerHTML = `<strong>ETFLens Research Report</strong> — ${data.ticker}: ${data.name} &nbsp;|&nbsp; Generated ${todayStr()}`;
    const dashboard = document.getElementById('dashboard');
    dashboard.insertBefore(hdr, dashboard.firstChild);

    window.print();
    hdr.remove();
  });

  /* ── CSV dropdown ── */
  const csvBtn  = document.getElementById('exportCsvBtn');
  const csvMenu = document.getElementById('exportDropdownMenu');

  csvBtn.addEventListener('click', e => {
    e.stopPropagation();
    csvMenu.classList.toggle('open');
  });

  document.addEventListener('click', () => csvMenu.classList.remove('open'));

  document.getElementById('exportHoldingsCsv').addEventListener('click', () => {
    const data = getCurrentData();
    if (!data) return;
    csvMenu.classList.remove('open');
    const rows = [
      ['Rank', 'Ticker', 'Company', 'Weight (%)'],
      ...data.holdings.items.map((h, i) => [i + 1, h.ticker, h.name, h.weight.toFixed(2)]),
    ];
    downloadCSV(`${data.ticker}_holdings_${todayStr()}.csv`, rows);
  });

  document.getElementById('exportPerfCsv').addEventListener('click', () => {
    const data = getCurrentData();
    if (!data) return;
    csvMenu.classList.remove('open');
    const rows = [
      ['Period', `${data.ticker} Return (%)`, `${data.performance.benchmark} (%)`, 'vs Benchmark (%)'],
      ...data.performance.periods.map(p => [
        p.period,
        p.etf.toFixed(2),
        p.bmk.toFixed(2),
        (p.etf - p.bmk).toFixed(2),
      ]),
    ];
    downloadCSV(`${data.ticker}_performance_${todayStr()}.csv`, rows);
  });

}());

