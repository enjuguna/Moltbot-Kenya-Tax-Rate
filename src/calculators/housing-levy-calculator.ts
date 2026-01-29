/**
 * Affordable Housing Levy Calculator
 */

import { HOUSING_LEVY_CONFIG } from '../constants/housing-levy';

/**
 * Calculate employee housing levy contribution
 * @param grossSalary - Monthly gross salary in KES
 * @returns Employee housing levy amount
 */
export function calculateHousingLevy(grossSalary: number): number {
    if (grossSalary <= 0) return 0;
    return Math.round(grossSalary * HOUSING_LEVY_CONFIG.employeeRate * 100) / 100;
}

/**
 * Calculate employer housing levy contribution
 * @param grossSalary - Monthly gross salary in KES
 * @returns Employer housing levy amount
 */
export function calculateEmployerHousingLevy(grossSalary: number): number {
    if (grossSalary <= 0) return 0;
    return Math.round(grossSalary * HOUSING_LEVY_CONFIG.employerRate * 100) / 100;
}

/**
 * Calculate total housing levy (employee + employer)
 * @param grossSalary - Monthly gross salary in KES
 * @returns Total housing levy object
 */
export function calculateTotalHousingLevy(grossSalary: number): {
    employee: number;
    employer: number;
    total: number;
} {
    const employee = calculateHousingLevy(grossSalary);
    const employer = calculateEmployerHousingLevy(grossSalary);
    return {
        employee,
        employer,
        total: employee + employer,
    };
}
