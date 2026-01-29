/**
 * Kenya Tax Rates
 * 
 * Comprehensive payroll calculation utilities for Kenya
 * Includes PAYE, SHIF, NSSF, Housing Levy, and tax reliefs
 * 
 * @packageDocumentation
 */

// Types
export type {
    PayeTaxBand,
    NssfLimits,
    ShifConfig,
    HousingLevyConfig,
    ReliefLimits,
    PayrollInput,
    PayrollResult,
    PayeResult,
    NssfResult,
    DeductionsBreakdown,
    ReliefsBreakdown,
} from './types';

// Constants
export {
    PAYE_TAX_BANDS,
    PAYE_TAX_BANDS_ANNUAL,
    NON_CASH_BENEFIT_THRESHOLD,
} from './constants/paye';

export {
    SHIF_CONFIG,
    SHIF_EFFECTIVE_DATE,
    SHIF_PAYMENT_DUE_DAY,
    SHIF_LATE_PENALTY_RATE,
} from './constants/shif';

export {
    NSSF_CONTRIBUTION_RATE,
    NSSF_LIMITS_2024,
    NSSF_LIMITS_2025,
    NSSF_LIMITS_HISTORY,
    getNssfLimitsForDate,
    NSSF_PAYMENT_DUE_DAY,
} from './constants/nssf';

export {
    HOUSING_LEVY_CONFIG,
    HOUSING_LEVY_EFFECTIVE_DATE,
    HOUSING_LEVY_TAX_DEDUCTIBLE_DATE,
} from './constants/housing-levy';

export {
    RELIEF_LIMITS,
    ANNUAL_RELIEF_LIMITS,
} from './constants/reliefs';

// Calculators
export {
    calculateGrossPaye,
    calculateInsuranceRelief,
    calculatePaye,
} from './calculators/paye-calculator';

export {
    calculateShif,
    calculateShifPenalty,
} from './calculators/shif-calculator';

export {
    calculateNssf,
    getMaxNssfContribution,
} from './calculators/nssf-calculator';

export {
    calculateHousingLevy,
    calculateEmployerHousingLevy,
    calculateTotalHousingLevy,
} from './calculators/housing-levy-calculator';

export {
    calculatePayroll,
    getNetSalary,
} from './calculators/payroll-calculator';
