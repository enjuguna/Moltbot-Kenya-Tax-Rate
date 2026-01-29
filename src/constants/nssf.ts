/**
 * NSSF (National Social Security Fund) Constants
 * Two-tier system with phased implementation
 * Source: NSSF Kenya
 */

import type { NssfLimits } from '../types';

/**
 * NSSF contribution rate (applies to both employee and employer)
 */
export const NSSF_CONTRIBUTION_RATE = 0.06;

/**
 * NSSF limits for Year 2 (February 2024 - January 2025)
 */
export const NSSF_LIMITS_2024: NssfLimits = {
    lowerEarningsLimit: 7000,
    upperEarningsLimit: 36000,
    rate: NSSF_CONTRIBUTION_RATE,
    effectiveFrom: new Date('2024-02-01'),
};

/**
 * NSSF limits for Year 3 (From February 2025)
 */
export const NSSF_LIMITS_2025: NssfLimits = {
    lowerEarningsLimit: 8000,
    upperEarningsLimit: 72000,
    rate: NSSF_CONTRIBUTION_RATE,
    effectiveFrom: new Date('2025-02-01'),
};

/**
 * All NSSF limit configurations in chronological order
 */
export const NSSF_LIMITS_HISTORY: NssfLimits[] = [
    NSSF_LIMITS_2024,
    NSSF_LIMITS_2025,
];

/**
 * Get the applicable NSSF limits for a given date
 * @param date - The calculation date
 * @returns The applicable NSSF limits
 */
export function getNssfLimitsForDate(date: Date = new Date()): NssfLimits {
    // Find the most recent limits that are effective
    for (let i = NSSF_LIMITS_HISTORY.length - 1; i >= 0; i--) {
        if (date >= NSSF_LIMITS_HISTORY[i].effectiveFrom) {
            return NSSF_LIMITS_HISTORY[i];
        }
    }
    // Default to earliest limits if date is before all
    return NSSF_LIMITS_HISTORY[0];
}

/**
 * Payment due day of month
 */
export const NSSF_PAYMENT_DUE_DAY = 9;
