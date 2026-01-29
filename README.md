# Kenya Tax Rates

Comprehensive payroll calculation utilities for Kenya. Calculate PAYE, SHIF, NSSF, Housing Levy, and apply tax reliefs with accurate, up-to-date rates.

## Features

- **PAYE Calculator** - Progressive 5-band income tax (10% to 35%)
- **SHIF Calculator** - 2.75% Social Health Insurance (replaced NHIF Oct 2024)
- **NSSF Calculator** - Two-tier pension with auto date-based limits
- **Housing Levy** - 1.5% Affordable Housing Levy
- **Tax Reliefs** - Personal, insurance, pension, mortgage deductions
- **Full Payroll** - Complete salary breakdown with all deductions

## Installation

```bash
npm install kenya-tax-rates
```

## Quick Start

```typescript
import { calculatePayroll, getNetSalary } from 'kenya-tax-rates';

// Quick net salary calculation
const netSalary = getNetSalary(100000);
console.log(`Net Salary: KES ${netSalary}`);

// Full payroll breakdown
const payroll = calculatePayroll({
  grossSalary: 100000,
  pensionContribution: 5000, // Optional
  insurancePremium: 2000,    // Optional
});

console.log(payroll);
// {
//   grossSalary: 100000,
//   taxableIncome: 93590,
//   deductions: {
//     shif: 2750,
//     nssf: 2160,
//     housingLevy: 1500,
//     paye: 18594.70,
//     totalDeductions: 25004.70
//   },
//   netSalary: 74995.30,
//   ...
// }
```

## Individual Calculators

```typescript
import {
  calculatePaye,
  calculateShif,
  calculateNssf,
  calculateHousingLevy,
} from 'kenya-tax-rates';

// PAYE with reliefs
const paye = calculatePaye(85000);
// { grossPaye: 21283.35, personalRelief: 2400, netPaye: 18883.35, ... }

// SHIF (2.75%, min KES 300)
const shif = calculateShif(50000); // 1375

// NSSF (auto-detects 2024/2025 rates)
const nssf = calculateNssf(80000);
// { tierOne: 480, tierTwo: 3840, employeeTotal: 4320, ... }

// Housing Levy (1.5%)
const levy = calculateHousingLevy(100000); // 1500
```

## Current Tax Rates (2024/2025)

### PAYE Tax Bands (Monthly)
| Income Range (KES) | Rate |
|--------------------|------|
| 0 - 24,000 | 10% |
| 24,001 - 32,333 | 25% |
| 32,334 - 500,000 | 30% |
| 500,001 - 800,000 | 32.5% |
| Above 800,000 | 35% |

### Statutory Deductions
| Deduction | Rate | Notes |
|-----------|------|-------|
| SHIF | 2.75% | Min KES 300, no cap |
| NSSF | 6% | Up to UEL (see below) |
| Housing Levy | 1.5% | Employee + Employer |

### NSSF Limits
| Period | LEL | UEL | Max Contribution |
|--------|-----|-----|------------------|
| Feb 2024 - Jan 2025 | KES 7,000 | KES 36,000 | KES 2,160 |
| From Feb 2025 | KES 8,000 | KES 72,000 | KES 4,320 |

### Reliefs
- **Personal Relief**: KES 2,400/month
- **Insurance Relief**: 15% of premiums, max KES 5,000/month
- **Pension Deduction**: Max KES 30,000/month
- **Mortgage Interest**: Max KES 30,000/month

## API Reference

### `calculatePayroll(input: PayrollInput): PayrollResult`

Full payroll calculation with all deductions and reliefs.

### `getNetSalary(grossSalary: number, date?: Date): number`

Quick net salary calculation.

### `calculatePaye(taxableIncome: number, insurancePremium?: number, shifContribution?: number): PayeResult`

PAYE calculation with reliefs.

### `calculateShif(grossSalary: number): number`

SHIF contribution (2.75%, min KES 300).

### `calculateNssf(pensionableEarnings: number, date?: Date): NssfResult`

NSSF two-tier contribution.

### `calculateHousingLevy(grossSalary: number): number`

Employee housing levy (1.5%).

## License

MIT
