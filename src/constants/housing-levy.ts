/**
 * Affordable Housing Levy Constants
 * Effective March 19, 2024
 * Source: Kenya Affordable Housing Act, 2024
 */

import type { HousingLevyConfig } from '../types';

/**
 * Housing Levy configuration
 */
export const HOUSING_LEVY_CONFIG: HousingLevyConfig = {
    /** Employee contribution: 1.5% of gross salary */
    employeeRate: 0.015,
    /** Employer contribution: 1.5% of gross salary (matching) */
    employerRate: 0.015,
};

/**
 * Housing Levy became effective on this date
 */
export const HOUSING_LEVY_EFFECTIVE_DATE = new Date('2024-03-19');

/**
 * Housing Levy became tax deductible on this date
 */
export const HOUSING_LEVY_TAX_DEDUCTIBLE_DATE = new Date('2024-12-27');
