/**
 * SHIF (Social Health Insurance Fund) Calculator
 * Calculates SHIF contributions based on gross salary
 */

import { SHIF_CONFIG } from '../constants/shif';

/**
 * Calculate SHIF contribution
 * @param grossSalary - Monthly gross salary in KES
 * @returns SHIF contribution amount (minimum KES 300)
 */
export function calculateShif(grossSalary: number): number {
    if (grossSalary <= 0) return 0;

    const contribution = grossSalary * SHIF_CONFIG.rate;

    // Apply minimum contribution
    const finalContribution = Math.max(contribution, SHIF_CONFIG.minimumContribution);

    return Math.round(finalContribution * 100) / 100;
}

/**
 * Calculate SHIF late payment penalty
 * @param unpaidAmount - Amount of unpaid SHIF contribution
 * @returns Penalty amount (2% of unpaid)
 */
export function calculateShifPenalty(unpaidAmount: number): number {
    if (unpaidAmount <= 0) return 0;
    return Math.round(unpaidAmount * 0.02 * 100) / 100;
}
