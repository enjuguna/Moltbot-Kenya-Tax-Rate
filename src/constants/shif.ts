/**
 * SHIF (Social Health Insurance Fund) Constants
 * Replaced NHIF effective October 1, 2024
 * Source: Social Health Authority (SHA)
 */

import type { ShifConfig } from '../types';

/**
 * SHIF contribution configuration
 */
export const SHIF_CONFIG: ShifConfig = {
    /** 2.75% of gross salary */
    rate: 0.0275,
    /** Minimum monthly contribution in KES */
    minimumContribution: 300,
};

/**
 * SHIF became effective on this date
 */
export const SHIF_EFFECTIVE_DATE = new Date('2024-10-01');

/**
 * Payment due day of month
 */
export const SHIF_PAYMENT_DUE_DAY = 9;

/**
 * Late payment penalty rate
 */
export const SHIF_LATE_PENALTY_RATE = 0.02;
