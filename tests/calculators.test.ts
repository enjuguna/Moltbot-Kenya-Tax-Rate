/**
 * Unit tests for Kenya Tax Rates calculators
 */

import { describe, it, expect } from 'vitest';
import {
    calculateGrossPaye,
    calculatePaye,
    calculateShif,
    calculateNssf,
    calculateHousingLevy,
    calculatePayroll,
    getNetSalary,
    getNssfLimitsForDate,
} from '../src';

describe('PAYE Calculator', () => {
    it('should return 0 for zero income', () => {
        expect(calculateGrossPaye(0)).toBe(0);
    });

    it('should calculate 10% for income up to 24,000', () => {
        expect(calculateGrossPaye(24000)).toBe(2400);
    });

    it('should calculate correct PAYE for 50,000 income', () => {
        // First 24,000 @ 10% = 2,400
        // Next 8,333 @ 25% = 2,083.25
        // Next 17,667 @ 30% = 5,300.10
        // Total = 9,783.35
        const paye = calculateGrossPaye(50000);
        expect(paye).toBeCloseTo(9783.35, 1);
    });

    it('should calculate correct PAYE for 100,000 income', () => {
        // First 24,000 @ 10% = 2,400
        // Next 8,333 @ 25% = 2,083.25
        // Next 67,667 @ 30% = 20,300.10
        // Total = 24,783.35
        const paye = calculateGrossPaye(100000);
        expect(paye).toBeCloseTo(24783.35, 1);
    });

    it('should apply personal relief correctly', () => {
        const result = calculatePaye(50000);
        expect(result.personalRelief).toBe(2400);
        expect(result.netPaye).toBe(result.grossPaye - result.personalRelief - result.insuranceRelief);
    });
});

describe('SHIF Calculator', () => {
    it('should return 0 for zero salary', () => {
        expect(calculateShif(0)).toBe(0);
    });

    it('should apply minimum contribution of 300', () => {
        expect(calculateShif(5000)).toBe(300); // 5000 * 0.0275 = 137.50, min 300
    });

    it('should calculate 2.75% for salaries above minimum threshold', () => {
        expect(calculateShif(50000)).toBe(1375); // 50000 * 0.0275 = 1375
    });

    it('should calculate 2.75% for high salaries (no cap)', () => {
        expect(calculateShif(1000000)).toBe(27500); // 1000000 * 0.0275 = 27500
    });
});

describe('NSSF Calculator', () => {
    it('should return 0 for zero earnings', () => {
        const result = calculateNssf(0);
        expect(result.employeeTotal).toBe(0);
        expect(result.employerTotal).toBe(0);
    });

    it('should calculate only Tier I for low earners (2024 rates)', () => {
        const date = new Date('2024-06-15');
        const result = calculateNssf(5000, date);
        // 5000 * 6% = 300
        expect(result.tierOne).toBe(300);
        expect(result.tierTwo).toBe(0);
        expect(result.employeeTotal).toBe(300);
    });

    it('should calculate both tiers for high earners (2024 rates)', () => {
        const date = new Date('2024-06-15');
        const result = calculateNssf(50000, date);
        // Tier I: 7000 * 6% = 420
        // Tier II: (36000 - 7000) * 6% = 1740
        // Total: 2160
        expect(result.tierOne).toBe(420);
        expect(result.tierTwo).toBe(1740);
        expect(result.employeeTotal).toBe(2160);
    });

    it('should use 2025 limits after February 2025', () => {
        const date = new Date('2025-03-15');
        const result = calculateNssf(100000, date);
        // Tier I: 8000 * 6% = 480
        // Tier II: (72000 - 8000) * 6% = 3840
        // Total: 4320
        expect(result.tierOne).toBe(480);
        expect(result.tierTwo).toBe(3840);
        expect(result.employeeTotal).toBe(4320);
    });

    it('should select correct NSSF limits based on date', () => {
        const limits2024 = getNssfLimitsForDate(new Date('2024-06-15'));
        expect(limits2024.upperEarningsLimit).toBe(36000);

        const limits2025 = getNssfLimitsForDate(new Date('2025-03-15'));
        expect(limits2025.upperEarningsLimit).toBe(72000);
    });
});

describe('Housing Levy Calculator', () => {
    it('should return 0 for zero salary', () => {
        expect(calculateHousingLevy(0)).toBe(0);
    });

    it('should calculate 1.5% of gross salary', () => {
        expect(calculateHousingLevy(100000)).toBe(1500);
    });
});

describe('Payroll Calculator', () => {
    it('should calculate complete payroll for 50,000 salary', () => {
        const result = calculatePayroll({
            grossSalary: 50000,
            calculationDate: new Date('2024-06-15'),
        });

        expect(result.grossSalary).toBe(50000);
        expect(result.deductions.shif).toBe(1375);
        expect(result.deductions.nssf).toBe(2160);
        expect(result.deductions.housingLevy).toBe(750);
        expect(result.netSalary).toBeLessThan(50000);
        expect(result.netSalary).toBeGreaterThan(0);
    });

    it('should calculate complete payroll for 100,000 salary', () => {
        const result = calculatePayroll({
            grossSalary: 100000,
            calculationDate: new Date('2024-06-15'),
        });

        expect(result.grossSalary).toBe(100000);
        expect(result.deductions.shif).toBe(2750);
        expect(result.deductions.nssf).toBe(2160);
        expect(result.deductions.housingLevy).toBe(1500);
        expect(result.reliefs.personalRelief).toBe(2400);
    });

    it('should handle zero salary', () => {
        const result = calculatePayroll({ grossSalary: 0 });
        expect(result.netSalary).toBe(0);
        expect(result.deductions.totalDeductions).toBe(0);
    });

    it('should include employer contributions', () => {
        const result = calculatePayroll({
            grossSalary: 100000,
            calculationDate: new Date('2024-06-15'),
        });

        expect(result.employerContributions.nssf).toBe(2160);
        expect(result.employerContributions.housingLevy).toBe(1500);
    });
});

describe('getNetSalary helper', () => {
    it('should return net salary directly', () => {
        const net = getNetSalary(50000, new Date('2024-06-15'));
        const full = calculatePayroll({
            grossSalary: 50000,
            calculationDate: new Date('2024-06-15'),
        });
        expect(net).toBe(full.netSalary);
    });
});
