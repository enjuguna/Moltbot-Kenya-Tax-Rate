/**
 * NSSF (National Social Security Fund) Calculator
 * Two-tier contribution system with date-based rate selection
 */

import { getNssfLimitsForDate, NSSF_CONTRIBUTION_RATE } from '../constants/nssf';
import type { NssfResult } from '../types';

/**
 * Calculate NSSF contributions using two-tier system
 * @param pensionableEarnings - Monthly pensionable earnings (usually gross salary)
 * @param date - Calculation date (determines which limits to use)
 * @returns NSSF contribution breakdown
 */
export function calculateNssf(
    pensionableEarnings: number,
    date: Date = new Date()
): NssfResult {
    if (pensionableEarnings <= 0) {
        return {
            tierOne: 0,
            tierTwo: 0,
            employeeTotal: 0,
            employerTotal: 0,
        };
    }

    const limits = getNssfLimitsForDate(date);
    const { lowerEarningsLimit, upperEarningsLimit, rate } = limits;

    // Tier I: Contribution on earnings up to Lower Earnings Limit
    const tierOneEarnings = Math.min(pensionableEarnings, lowerEarningsLimit);
    const tierOneContribution = tierOneEarnings * rate;

    // Tier II: Contribution on earnings between LEL and UEL
    let tierTwoContribution = 0;
    if (pensionableEarnings > lowerEarningsLimit) {
        const tierTwoEarnings = Math.min(
            pensionableEarnings - lowerEarningsLimit,
            upperEarningsLimit - lowerEarningsLimit
        );
        tierTwoContribution = tierTwoEarnings * rate;
    }

    const employeeTotal = tierOneContribution + tierTwoContribution;

    return {
        tierOne: Math.round(tierOneContribution * 100) / 100,
        tierTwo: Math.round(tierTwoContribution * 100) / 100,
        employeeTotal: Math.round(employeeTotal * 100) / 100,
        // Employer matches employee contribution
        employerTotal: Math.round(employeeTotal * 100) / 100,
    };
}

/**
 * Get maximum NSSF employee contribution for a given date
 * @param date - Calculation date
 * @returns Maximum monthly employee contribution
 */
export function getMaxNssfContribution(date: Date = new Date()): number {
    const limits = getNssfLimitsForDate(date);
    return limits.upperEarningsLimit * NSSF_CONTRIBUTION_RATE;
}
