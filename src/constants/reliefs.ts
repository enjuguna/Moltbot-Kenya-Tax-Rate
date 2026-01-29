/**
 * Tax Reliefs and Deduction Limits
 * Source: Kenya Revenue Authority (KRA)
 */

import type { ReliefLimits } from '../types';

/**
 * Current relief limits
 */
export const RELIEF_LIMITS: ReliefLimits = {
    /** Monthly personal relief: KES 2,400 */
    personalRelief: 2400,

    /** Insurance relief rate: 15% of premiums */
    insuranceReliefRate: 0.15,

    /** Maximum monthly insurance relief: KES 5,000 */
    maxInsuranceRelief: 5000,

    /** Maximum monthly pension contribution deduction: KES 30,000 */
    maxPensionDeduction: 30000,

    /** Maximum monthly mortgage interest deduction: KES 30,000 */
    maxMortgageInterest: 30000,
};

/**
 * Annual relief limits (for reference)
 */
export const ANNUAL_RELIEF_LIMITS = {
    personalRelief: 28800,
    maxInsuranceRelief: 60000,
    maxPensionDeduction: 360000,
    maxMortgageInterest: 360000,
};
