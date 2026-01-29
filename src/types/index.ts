/**
 * Kenya Tax Rates Package - Type Definitions
 */

/** PAYE tax band definition */
export interface PayeTaxBand {
    /** Lower limit of the band (inclusive) */
    from: number;
    /** Upper limit of the band (exclusive, Infinity for last band) */
    to: number;
    /** Tax rate as decimal (e.g., 0.10 for 10%) */
    rate: number;
}

/** NSSF tier limits */
export interface NssfLimits {
    /** Lower Earnings Limit */
    lowerEarningsLimit: number;
    /** Upper Earnings Limit */
    upperEarningsLimit: number;
    /** Contribution rate as decimal */
    rate: number;
    /** Effective from date */
    effectiveFrom: Date;
}

/** SHIF configuration */
export interface ShifConfig {
    /** Contribution rate as decimal */
    rate: number;
    /** Minimum monthly contribution */
    minimumContribution: number;
}

/** Housing Levy configuration */
export interface HousingLevyConfig {
    /** Employee contribution rate as decimal */
    employeeRate: number;
    /** Employer contribution rate as decimal */
    employerRate: number;
}

/** Tax relief limits */
export interface ReliefLimits {
    /** Monthly personal relief amount */
    personalRelief: number;
    /** Insurance relief rate as decimal */
    insuranceReliefRate: number;
    /** Maximum monthly insurance relief */
    maxInsuranceRelief: number;
    /** Maximum monthly pension contribution deduction */
    maxPensionDeduction: number;
    /** Maximum monthly mortgage interest deduction */
    maxMortgageInterest: number;
}

/** Input for payroll calculation */
export interface PayrollInput {
    /** Gross monthly salary in KES */
    grossSalary: number;
    /** Optional: Monthly pension contribution (beyond NSSF) */
    pensionContribution?: number;
    /** Optional: Monthly life/health insurance premium */
    insurancePremium?: number;
    /** Optional: Monthly mortgage interest paid */
    mortgageInterest?: number;
    /** Optional: Calculation date (defaults to current date) */
    calculationDate?: Date;
}

/** Breakdown of all deductions */
export interface DeductionsBreakdown {
    /** SHIF contribution */
    shif: number;
    /** NSSF employee contribution */
    nssf: number;
    /** Housing levy employee contribution */
    housingLevy: number;
    /** PAYE tax after reliefs */
    paye: number;
    /** Total deductions */
    totalDeductions: number;
}

/** Breakdown of tax reliefs applied */
export interface ReliefsBreakdown {
    /** Personal relief applied */
    personalRelief: number;
    /** Insurance relief applied */
    insuranceRelief: number;
    /** Total reliefs */
    totalReliefs: number;
}

/** Full payroll calculation result */
export interface PayrollResult {
    /** Original gross salary */
    grossSalary: number;
    /** Taxable income (after allowable deductions) */
    taxableIncome: number;
    /** Gross PAYE before reliefs */
    grossPaye: number;
    /** Breakdown of all deductions */
    deductions: DeductionsBreakdown;
    /** Breakdown of reliefs applied */
    reliefs: ReliefsBreakdown;
    /** Net salary after all deductions */
    netSalary: number;
    /** Employer contributions */
    employerContributions: {
        nssf: number;
        housingLevy: number;
    };
}

/** PAYE calculation result */
export interface PayeResult {
    /** Gross PAYE before reliefs */
    grossPaye: number;
    /** Personal relief applied */
    personalRelief: number;
    /** Insurance relief applied */
    insuranceRelief: number;
    /** Net PAYE after reliefs */
    netPaye: number;
}

/** NSSF calculation result */
export interface NssfResult {
    /** Tier I contribution */
    tierOne: number;
    /** Tier II contribution */
    tierTwo: number;
    /** Total employee contribution */
    employeeTotal: number;
    /** Total employer contribution */
    employerTotal: number;
}
