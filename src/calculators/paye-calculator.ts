/**
 * PAYE (Pay As You Earn) Calculator
 * Calculates income tax using Kenya's progressive tax bands
 */

import { PAYE_TAX_BANDS } from '../constants/paye';
import { RELIEF_LIMITS } from '../constants/reliefs';
import type { PayeResult } from '../types';

/**
 * Calculate gross PAYE using progressive tax bands
 * @param taxableIncome - Monthly taxable income in KES
 * @returns Gross PAYE amount before reliefs
 */
export function calculateGrossPaye(taxableIncome: number): number {
    if (taxableIncome <= 0) return 0;

    let totalTax = 0;
    let remainingIncome = taxableIncome;

    for (const band of PAYE_TAX_BANDS) {
        if (remainingIncome <= 0) break;

        const bandWidth = band.to - band.from;
        const taxableInBand = Math.min(remainingIncome, bandWidth);
        totalTax += taxableInBand * band.rate;
        remainingIncome -= taxableInBand;
    }

    return Math.round(totalTax * 100) / 100;
}

/**
 * Calculate insurance relief
 * @param insurancePremium - Monthly insurance premium paid
 * @param shifContribution - SHIF contribution (also qualifies for relief)
 * @returns Insurance relief amount
 */
export function calculateInsuranceRelief(
    insurancePremium: number = 0,
    shifContribution: number = 0
): number {
    const totalPremiums = insurancePremium + shifContribution;
    const relief = totalPremiums * RELIEF_LIMITS.insuranceReliefRate;
    return Math.min(relief, RELIEF_LIMITS.maxInsuranceRelief);
}

/**
 * Calculate complete PAYE with all reliefs
 * @param taxableIncome - Monthly taxable income in KES
 * @param insurancePremium - Optional monthly insurance premium
 * @param shifContribution - SHIF contribution (for insurance relief calculation)
 * @returns PAYE calculation result with breakdown
 */
export function calculatePaye(
    taxableIncome: number,
    insurancePremium: number = 0,
    shifContribution: number = 0
): PayeResult {
    const grossPaye = calculateGrossPaye(taxableIncome);

    // Apply personal relief
    const personalRelief = Math.min(RELIEF_LIMITS.personalRelief, grossPaye);

    // Calculate insurance relief (includes SHIF for 15% relief calculation)
    const insuranceRelief = calculateInsuranceRelief(insurancePremium, shifContribution);

    // Net PAYE cannot be negative
    const netPaye = Math.max(0, grossPaye - personalRelief - insuranceRelief);

    return {
        grossPaye: Math.round(grossPaye * 100) / 100,
        personalRelief: Math.round(personalRelief * 100) / 100,
        insuranceRelief: Math.round(insuranceRelief * 100) / 100,
        netPaye: Math.round(netPaye * 100) / 100,
    };
}
