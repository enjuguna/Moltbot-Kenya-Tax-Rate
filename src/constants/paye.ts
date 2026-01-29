/**
 * PAYE Tax Bands - Effective July 1, 2023
 * Source: Kenya Revenue Authority (KRA)
 */

import type { PayeTaxBand } from '../types';

/**
 * Monthly PAYE tax bands
 * Progressive tax system with 5 brackets
 */
export const PAYE_TAX_BANDS: PayeTaxBand[] = [
    { from: 0, to: 24000, rate: 0.10 },
    { from: 24000, to: 32333, rate: 0.25 },
    { from: 32333, to: 500000, rate: 0.30 },
    { from: 500000, to: 800000, rate: 0.325 },
    { from: 800000, to: Infinity, rate: 0.35 },
];

/**
 * Annual PAYE tax bands (for reference)
 */
export const PAYE_TAX_BANDS_ANNUAL: PayeTaxBand[] = [
    { from: 0, to: 288000, rate: 0.10 },
    { from: 288000, to: 388000, rate: 0.25 },
    { from: 388000, to: 6000000, rate: 0.30 },
    { from: 6000000, to: 9600000, rate: 0.325 },
    { from: 9600000, to: Infinity, rate: 0.35 },
];

/**
 * Taxable non-cash benefits threshold
 * Benefits below this are not taxed
 */
export const NON_CASH_BENEFIT_THRESHOLD = 5000;
