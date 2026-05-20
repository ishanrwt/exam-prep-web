# Data Interpretation & Statistics: Advanced Practice Set
## Compound Percentages, Variance/SD, and Fill-Up-The-Box (FUB) Format

---

# DATASET 1: QUARTERLY REVENUE ANALYSIS (Tabular Format)

## Raw Data Table: Revenue (in millions USD) by Product Category and Quarter

| Product Category | Q1 2023 | Q2 2023 | Q3 2023 | Q4 2023 | Q1 2024 | Q2 2024 |
|------------------|---------|---------|---------|---------|---------|---------|
| Consumer Electronics | 240 | 268 | 295 | 312 | 328 | 361 |
| Software Services | 180 | 198 | 219 | 247 | 271 | 298 |
| Cloud Infrastructure | 95 | 114 | 138 | 167 | 205 | 251 |
| Enterprise Hardware | 160 | 172 | 185 | 198 | 215 | 234 |

---

## DATASET 1: QUESTIONS

**Q1.1 [FUB]: What is the percentage growth of Cloud Infrastructure revenue from Q1 2023 to Q2 2024?**

*Formula: ((Q2 2024 Value - Q1 2023 Value) / Q1 2023 Value) × 100*

Answer: **164.21%** (or 164.2)

---

**Q1.2 [FUB]: By what percentage did Consumer Electronics revenue grow from Q1 2023 to Q1 2024 compared to the percentage growth of Software Services in the same period?**

*Consumer Electronics: ((328 - 240) / 240) × 100 = 36.67%*  
*Software Services: ((271 - 180) / 180) × 100 = 50.56%*  
*Difference: 50.56% - 36.67% = ?*

Answer: **13.89** (percentage points difference)

---

**Q1.3: In which quarter did Cloud Infrastructure experience the largest percentage quarter-on-quarter growth?**

A) Q1 to Q2 2023 (20%)  
B) Q2 to Q3 2023 (21.05%)  
C) Q3 to Q4 2023 (21.01%)  
D) Q4 2023 to Q1 2024 (22.76%)  

**Correct Answer: D**

---

**Q1.4 [FUB]: Calculate the compound annual growth rate (CAGR) of Enterprise Hardware from Q1 2023 to Q2 2024 across 5 quarters.**

*CAGR = ((Ending Value / Beginning Value)^(1/n) - 1) × 100, where n = number of years (5 quarters ≈ 1.25 years)*  
*((234 / 160)^(1/1.25) - 1) × 100*

Answer: **16.19** (%)

---

**Q1.5: Comparing the growth trajectories, which product category demonstrates the most volatile growth pattern from Q1 2023 to Q2 2024?**

A) Consumer Electronics (steady, predictable growth)  
B) Software Services (moderate, consistent acceleration)  
C) Cloud Infrastructure (accelerating growth with increasing QoQ percentages)  
D) Enterprise Hardware (linear, minimal variation in percentage growth)  

**Correct Answer: C**  
*(Cloud Infrastructure shows accelerating QoQ growth: 20%, 21.05%, 21.01%, 22.76%, 22.44%)*

---

**Q1.6 [FUB]: If Consumer Electronics maintains its Q1-to-Q2 2024 growth rate (10.03%) into Q3 2024, what will be its projected revenue?**

*Q2 2024 revenue: 361 million*  
*Growth rate: ((361 - 328) / 328) × 100 = 10.06%*  
*Q3 2024 projection: 361 × 1.1006 = ?*

Answer: **397.52** (million USD)

---

---

# DATASET 2: GEOGRAPHIC MARKET PERFORMANCE (Pie Chart + Tabular Data)

## Raw Data: Regional Sales Distribution and Growth Rates (Current Year)

| Region | Sales Volume (Units: '000) | Market Share (%) | YoY Growth Rate (%) |
|--------|---------------------------|-----------------|-------------------|
| North America | 450 | 35% | 12.5 |
| Europe | 320 | 25% | 18.3 |
| Asia-Pacific | 280 | 22% | 24.7 |
| Latin America | 100 | 10% | 8.2 |
| Middle East & Africa | 50 | 8% | 31.5 |

**Total Market: 1,200,000 units**

---

## DATASET 2: QUESTIONS

**Q2.1 [FUB]: Calculate the absolute increase in sales for Asia-Pacific region compared to the absolute increase in Middle East & Africa, where both are growing at their respective YoY rates.**

*Asia-Pacific increase: 280 × 0.247 = 69.16 ('000 units)*  
*MEA increase: 50 × 0.315 = 15.75 ('000 units)*  
*Difference: 69.16 - 15.75 = ?*

Answer: **53.41** ('000 units)

---

**Q2.2: Which region's absolute growth (in units) would most closely match Latin America's current total sales if Latin America grows at its projected rate?**

A) North America (at 12.5% growth)  
B) Europe (at 18.3% growth)  
C) Asia-Pacific (at 24.7% growth)  
D) Middle East & Africa (at 31.5% growth)  

**Correct Answer: A**  
*(North America: 450 × 0.125 = 56.25; Latin America current = 100; MEA at 31.5% = 15.75)*

---

**Q2.3 [FUB]: If the total market grows by the weighted average growth rate of all regions, what will be the new total market size (in '000 units)?**

*Weighted average = (450×0.125 + 320×0.183 + 280×0.247 + 100×0.082 + 50×0.315) / 1200*  
*= (56.25 + 58.56 + 69.16 + 8.2 + 15.75) / 1200 = 207.92 / 1200 = 0.1733 or 17.33%*  
*New total: 1200 × 1.1733 = ?*

Answer: **1407.96** ('000 units)

---

**Q2.4: The ratio of growth contribution between Asia-Pacific and Latin America is:**

A) Approximately 8:1  
B) Approximately 4.4:1  
C) Approximately 3:1  
D) Approximately 2.2:1  

**Correct Answer: B**  
*(Asia-Pacific growth: 69.16; Latin America growth: 15.75; Ratio: 69.16/15.75 ≈ 4.39)*

---

**Q2.5 [FUB]: What is the difference in percentage growth between the highest-growth region (MEA) and the lowest-growth region (Latin America)?**

*Highest: Middle East & Africa = 31.5%*  
*Lowest: Latin America = 8.2%*  
*Difference: 31.5 - 8.2 = ?*

Answer: **23.3** (percentage points)

---

---

# DATASET 3: OPERATING COSTS ANALYSIS (Variance and Standard Deviation)

## Raw Data: Monthly Operating Costs (in thousands USD) for Q2 2024

| Month | Production | Distribution | Administration | Marketing | Facilities |
|-------|-----------|--------------|-----------------|-----------|-----------|
| April | 245 | 185 | 120 | 95 | 110 |
| May | 268 | 192 | 125 | 102 | 115 |
| June | 253 | 188 | 128 | 98 | 112 |

---

## DATASET 3: QUESTIONS

**Q3.1 [FUB]: Calculate the standard deviation of Production costs across the three months (April, May, June).**

*Data: 245, 268, 253*  
*Mean = (245 + 268 + 253) / 3 = 766 / 3 = 255.33*  
*Variance = [(245-255.33)² + (268-255.33)² + (253-255.33)²] / 3*  
*= [107.11 + 161.44 + 5.44] / 3 = 273.99 / 3 = 91.33*  
*SD = √91.33 = ?*

Answer: **9.56** (thousands USD)

---

**Q3.2: Across all five cost categories, which demonstrates the least variability (standard deviation) in Q2 2024?**

A) Production (SD ≈ 9.56)  
B) Distribution (SD ≈ 3.06)  
C) Administration (SD ≈ 4.00)  
D) Facilities (SD ≈ 1.53)  

**Correct Answer: D**  
*(Facilities: 110, 115, 112 — Mean: 112.33 — SD: ≈ 1.53)*

---

**Q3.3 [FUB]: Calculate the variance of Marketing costs for Q2 2024.**

*Data: 95, 102, 98*  
*Mean = 95 + 102 + 98 / 3 = 295 / 3 = 98.33*  
*Variance = [(95-98.33)² + (102-98.33)² + (98-98.33)²] / 3*  
*= [11.11 + 13.44 + 0.11] / 3 = 24.66 / 3 = ?*

Answer: **8.22** (variance in thousands² USD)

---

**Q3.4: If Distribution costs increase by 8% in July while maintaining the same variability observed in Q2, what would be the projected standard deviation?**

A) Increases by 8%  
B) Remains constant (unchanged)  
C) Decreases proportionally  
D) Cannot be determined without additional data  

**Correct Answer: B**  
*(Standard deviation scales proportionally with data values, but percentage changes don't affect relative variability; absolute SD would increase by 8%, but proportional variability remains constant)*

---

**Q3.5 [FUB]: Calculate the combined standard deviation of Administration and Marketing costs across the three months (treating the sum as a single variable).**

*Combined costs: April: 215, May: 227, June: 226*  
*Mean = (215 + 227 + 226) / 3 = 668 / 3 = 222.67*  
*Variance = [(215-222.67)² + (227-222.67)² + (226-222.67)²] / 3*  
*= [58.78 + 18.78 + 11.11] / 3 = 88.67 / 3 = 29.56*  
*SD = √29.56 = ?*

Answer: **5.44** (thousands USD)

---

---

# DATASET 4: EMPLOYEE PRODUCTIVITY INDEX (Line Chart Data)

## Raw Data: Weekly Productivity Scores (0-100 scale) by Department

| Week | Engineering | Sales | Customer Success | Human Resources |
|------|-----------|-------|------------------|-----------------|
| Week 1 | 78 | 72 | 68 | 75 |
| Week 2 | 82 | 75 | 71 | 78 |
| Week 3 | 85 | 77 | 74 | 80 |
| Week 4 | 88 | 79 | 76 | 82 |
| Week 5 | 91 | 81 | 79 | 84 |

---

## DATASET 4: QUESTIONS

**Q4.1 [FUB]: Calculate the percentage growth of Engineering productivity from Week 1 to Week 5.**

*Week 1: 78, Week 5: 91*  
*Growth = ((91 - 78) / 78) × 100 = (13 / 78) × 100 = ?*

Answer: **16.67** (%)

---

**Q4.2 [FUB]: By what percentage did Customer Success outperform Sales in Week 5 relative to Week 1's performance gap?**

*Week 1 gap: Sales (72) - Customer Success (68) = 4 points*  
*Week 5 gap: Sales (81) - Customer Success (79) = 2 points*  
*Percentage reduction in gap: ((4 - 2) / 4) × 100 = ?*

Answer: **50.00** (%)

---

**Q4.3: Which department shows the most consistent linear growth trajectory across the five weeks?**

A) Engineering (13 points over 5 weeks: 2.6/week)  
B) Sales (9 points over 5 weeks: 1.8/week)  
C) Customer Success (11 points over 5 weeks: 2.2/week)  
D) Human Resources (9 points over 5 weeks: 1.8/week)  

**Correct Answer: A**  
*(Engineering: 78→82→85→88→91; differences: 4, 3, 3, 3 = most consistent)*

---

**Q4.4 [FUB]: Calculate the standard deviation of Sales productivity scores across the five weeks.**

*Data: 72, 75, 77, 79, 81*  
*Mean = (72 + 75 + 77 + 79 + 81) / 5 = 384 / 5 = 76.8*  
*Variance = [(72-76.8)² + (75-76.8)² + (77-76.8)² + (79-76.8)² + (81-76.8)²] / 5*  
*= [23.04 + 3.24 + 0.04 + 4.84 + 17.64] / 5 = 48.8 / 5 = 9.76*  
*SD = √9.76 = ?*

Answer: **3.12** (points)

---

**Q4.5: If Human Resources maintains its Week 4-to-Week 5 growth rate (2 points) for Weeks 6 and 7, what would be the projected score for Week 7?**

A) 86  
B) 88  
C) 90  
D) 92  

**Correct Answer: B**  
*(Week 5: 84; +2 for Week 6 = 86; +2 for Week 7 = 88)*

---

---

# DATASET 5: MARKET SHARE DYNAMICS (Bar Chart + Compound Percentages)

## Raw Data: Market Share (%) and Absolute Sales (millions) by Competitor

| Competitor | 2022 | 2023 | 2024 |
|-----------|------|------|------|
| Company A | 28% ($420M) | 26% ($435M) | 24% ($480M) |
| Company B | 22% ($330M) | 24% ($402M) | 26% ($520M) |
| Company C | 18% ($270M) | 22% ($368M) | 25% ($500M) |
| Company D | 32% ($480M) | 28% ($469M) | 25% ($500M) |

**Total Market: $1,500M (2022) → $1,675M (2023) → $2,000M (2024)**

---

## DATASET 5: QUESTIONS

**Q5.1 [FUB]: Calculate the year-over-year percentage growth of Company C's absolute sales from 2023 to 2024.**

*2023: $368M, 2024: $500M*  
*Growth = ((500 - 368) / 368) × 100 = (132 / 368) × 100 = ?*

Answer: **35.87** (%)

---

**Q5.2: Comparing market share loss, which company lost the greatest percentage of its original 2022 market share by 2024?**

A) Company A (28% → 24% = -4 points = -14.29%)  
B) Company B (22% → 26% = +4 points)  
C) Company C (18% → 25% = +7 points)  
D) Company D (32% → 25% = -7 points = -21.88%)  

**Correct Answer: D**

---

**Q5.3 [FUB]: By how many percentage points did Company B outperform Company A in terms of absolute sales growth from 2022 to 2024?**

*Company B growth: ((520 - 330) / 330) × 100 = 57.58%*  
*Company A growth: ((480 - 420) / 420) × 100 = 14.29%*  
*Difference: 57.58 - 14.29 = ?*

Answer: **43.29** (percentage points)

---

**Q5.4: Which competitor's absolute sales growth most closely correlates with the overall market growth from 2022 to 2024?**

*Market growth: ((2000 - 1500) / 1500) × 100 = 33.33%*

A) Company A (14.29% growth)  
B) Company B (57.58% growth)  
C) Company C (85.19% growth)  
D) Company D (4.17% growth)  

**Correct Answer: A**  
*(While market grew 33.33%, Company A at 14.29% underperformed but is closest to proportional to market dynamics)*

---

**Q5.5 [FUB]: If the market contracts by 5% in 2025, and Company B maintains its 2024 market share of 26%, what would be its projected absolute sales for 2025?**

*2024 total market: $2,000M*  
*2025 market (after 5% contraction): 2000 × 0.95 = $1,900M*  
*Company B's 26% of $1,900M = ?*

Answer: **494.00** (million USD)

---

---

# COMPREHENSIVE ANSWER KEY

## Dataset 1 (Quarterly Revenue)
- Q1.1: 164.21%
- Q1.2: 13.89 (percentage points)
- Q1.3: D
- Q1.4: 16.19%
- Q1.5: C
- Q1.6: 397.52 (million USD)

## Dataset 2 (Geographic Markets)
- Q2.1: 53.41 ('000 units)
- Q2.2: A
- Q2.3: 1407.96 ('000 units)
- Q2.4: B
- Q2.5: 23.3 (percentage points)

## Dataset 3 (Operating Costs)
- Q3.1: 9.56 (thousands USD)
- Q3.2: D
- Q3.3: 8.22 (variance)
- Q3.4: B
- Q3.5: 5.44 (thousands USD)

## Dataset 4 (Productivity Index)
- Q4.1: 16.67%
- Q4.2: 50.00%
- Q4.3: A
- Q4.4: 3.12 (points)
- Q4.5: B

## Dataset 5 (Market Share)
- Q5.1: 35.87%
- Q5.2: D
- Q5.3: 43.29 (percentage points)
- Q5.4: A
- Q5.5: 494.00 (million USD)

---

## STATISTICS FORMULAS REFERENCE

**Standard Deviation:**
SD = √[Σ(x - mean)² / n]

**Variance:**
Var = Σ(x - mean)² / n

**CAGR (Compound Annual Growth Rate):**
CAGR = [(Ending Value / Beginning Value)^(1/n) - 1] × 100

**Percentage Growth:**
% Growth = [(New Value - Old Value) / Old Value] × 100

**Weighted Average:**
Weighted Avg = (Σ(value × weight)) / Σ(weight)

---
