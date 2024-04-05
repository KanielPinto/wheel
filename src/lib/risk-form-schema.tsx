import { z } from 'zod';

export const FormDataSchema = z.object({
  // Section 1: Personal and Financial Profile
  ageGroup: z.enum(['18-25', '26-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56-60']).default('18-25'),
  employmentType: z.enum(['Full-time', 'Part-time', 'Self-employed', 'Unemployed', 'Student', 'Retired']).default('Full-time'),
  dependents: z.enum(['None', '1', '2', '3 or more']).default('None'),
  monthlyInvestmentAmount: z.enum(['Less than $100', '$100 - $500', '$501 - $1000', 'More than $1000']).default('Less than $100'),
  attitudeTowardsRisk: z.string().min(1, 'Attitude towards risk and return is required'),

  // Section 2: Investment Preferences and Goals
  investmentGoals: z.array(z.enum(['Wealth accumulation', 'Retirement planning', 'Education funding', 'Short-term gains', 'Capital preservation'])).default([]),
  preferredInstruments: z.string().min(1, 'Preferred investment instruments are required'),
  marketCorrectionTolerance: z.enum(['5%', '10%', '15%', '20% or more']).default('5%'),
  investmentHorizon: z.enum(['Less than 3 years', '3-5 years', '6-10 years', 'More than 10 years']).default('Less than 3 years'),

  // Section 3: Risk Assessment Scenarios
  choiceOfTrain: z.enum(['The most crowded train to reach faster', 'A less crowded train to ensure personal space']).default('The most crowded train to reach faster'),
  preferredDrivingSpeed: z.enum(['Below the speed limit', 'At the speed limit', 'Slightly above the speed limit', 'Significantly above the speed limit']).default('Below the speed limit'),
  portfolioRecoveryTime: z.enum(['Immediately sell to limit losses', 'Wait for a short period (1-3 months)', 'Wait for a moderate period (4-12 months)', 'Wait for an extended period (more than 1 year)']).default('Immediately sell to limit losses'),
  preferredPortfolioStrategy: z.enum(['Aggressive (High risk, high potential return)', 'Moderate (Balanced risk and return)', 'Conservative (Low risk, low potential return)']).default('Aggressive (High risk, high potential return)')
});
