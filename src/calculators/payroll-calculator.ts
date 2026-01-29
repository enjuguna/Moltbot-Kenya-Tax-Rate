/**
 * Main Payroll Calculator
 * Orchestrates all deduction calculations to compute net salary
 */

import { calculatePaye } from './paye-calculator';
import { calculateShif } from './shif-calculator';
import { calculateNssf } from './nssf-calculator';
import { calculateHousingLevy, calculateEmployerHousingLevy } from './housing-levy-calculator';
import { RELIEF_LIMITS } from '../constants/reliefs';
import type { PayrollInput, PayrollResult } from '../types';

/**
 * Calculate complete payroll with all deductions and reliefs
 * @param input - Payroll input parameters
 * @returns Complete payroll result with all breakdowns
 */
export function calculatePayroll(input: PayrollInput): PayrollResult {
    const {
        grossSalary,
        pensionContribution = 0,
        insurancePremium = 0,
        mortgageInterest = 0,
        calculationDate = new Date(),
    } = input;

    if (grossSalary <= 0) {
        return createEmptyResult(grossSalary);
    }

    // Step 1: Calculate statutory deductions (these are deducted from gross)
    const shif = calculateShif(grossSalary);
    const nssfResult = calculateNssf(grossSalary, calculationDate);
    const housingLevy = calculateHousingLevy(grossSalary);

    // Step 2: Apply caps to voluntary deductions
    const cappedPension = Math.min(pensionContribution, RELIEF_LIMITS.maxPensionDeduction);
    const cappedMortgage = Math.min(mortgageInterest, RELIEF_LIMITS.maxMortgageInterest);

    // Step 3: Calculate taxable income
    // Deductible items: SHIF, NSSF, Housing Levy, Pension, Mortgage Interest
    const totalDeductibleFromIncome =
        shif +
        nssfResult.employeeTotal +
        housingLevy +
        cappedPension +
        cappedMortgage;

    const taxableIncome = Math.max(0, grossSalary - totalDeductibleFromIncome);

    // Step 4: Calculate PAYE with reliefs
    const payeResult = calculatePaye(taxableIncome, insurancePremium, shif);

    // Step 5: Calculate net salary
    const totalDeductions =
        shif +
        nssfResult.employeeTotal +
        housingLevy +
        payeResult.netPaye;

    const netSalary = grossSalary - totalDeductions;

    return {
        grossSalary,
        taxableIncome: Math.round(taxableIncome * 100) / 100,
        grossPaye: payeResult.grossPaye,
        deductions: {
            shif,
            nssf: nssfResult.employeeTotal,
            housingLevy,
            paye: payeResult.netPaye,
            totalDeductions: Math.round(totalDeductions * 100) / 100,
        },
        reliefs: {
            personalRelief: payeResult.personalRelief,
            insuranceRelief: payeResult.insuranceRelief,
            totalReliefs: Math.round(
                (payeResult.personalRelief + payeResult.insuranceRelief) * 100
            ) / 100,
        },
        netSalary: Math.round(netSalary * 100) / 100,
        employerContributions: {
            nssf: nssfResult.employerTotal,
            housingLevy: calculateEmployerHousingLevy(grossSalary),
        },
    };
}

/**
 * Create empty result for zero or negative salary
 */
function createEmptyResult(grossSalary: number): PayrollResult {
    return {
        grossSalary,
        taxableIncome: 0,
        grossPaye: 0,
        deductions: {
            shif: 0,
            nssf: 0,
            housingLevy: 0,
            paye: 0,
            totalDeductions: 0,
        },
        reliefs: {
            personalRelief: 0,
            insuranceRelief: 0,
            totalReliefs: 0,
        },
        netSalary: 0,
        employerContributions: {
            nssf: 0,
            housingLevy: 0,
        },
    };
}

/**
 * Quick calculation: Get net salary from gross
 * @param grossSalary - Monthly gross salary in KES
 * @param calculationDate - Optional calculation date for NSSF rates
 * @returns Net salary after all deductions
 */
export function getNetSalary(
    grossSalary: number,
    calculationDate?: Date
): number {
    return calculatePayroll({ grossSalary, calculationDate }).netSalary;
}
