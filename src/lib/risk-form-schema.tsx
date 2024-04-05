import { z } from 'zod';

export const FormDataSchema = z.object({
  // Section 1: Personal and Financial Profile
  ageGroup: z.enum(['18-25', '26-30', '31-35', '36-40', '41-45', '46-50', '51+']).default('18-25'),
  employmentType: z.enum(['Govt.','Salaried', 'Self-employed', 'Unemployed', 'Student', 'Business']).default('Salaried'),
  dependents: z.enum(['0', '1', '2', '3', '4+']).default('0'),
  monthlyInvestmentAmount: z.enum(['5000 - 25000', '25001 - 50000', '50001 - 100000', '100001 - 150000', '150000+']).default('5000 - 25000'),
  attitudeTowardsRisk:  z.enum(['I am low risk taker, I need safety and security.', 'I am an average risk taker, can invest in risky instruments to earn a good return.', 'I am a high risk taker, will be happy to invest in risky instruments to earn high returns.']).default('I am low risk taker, I need safety and security.'),

  // Section 2: Investment Preferences and Goals
  investmentGoals: z.array(z.enum(['Wealth accumulation', 'Retirement planning', 'Education funding', 'Short-term gains', 'Capital preservation'])).default([]),
  preferredInstruments: z.enum(['Share Market', 'Mutual Funds', 'Bonds', 'Fixed Deposits', 'None']).default('None'),
  marketCorrectionTolerance: z.enum(['5%', '10%', '15%', '20%']).default('5%'),
  investmentHorizon: z.enum(['Less than 1 year', '1-3 years', '3-5 years', '6-10 years', 'More than 10 years']).default('Less than 1 year'),

  // Section 3: Risk Assessment Scenarios
  choiceOfTrain: z.enum(['The most crowded train to reach faster', 'A less crowded train to ensure personal space']).default('The most crowded train to reach faster'),
  preferredDrivingSpeed: z.enum(['Below the speed limit', 'At the speed limit', 'Slightly above the speed limit', 'Significantly above the speed limit']).default('Below the speed limit'),
  portfolioRecoveryTime: z.enum(['Immediately sell to limit losses', 'Wait for a short period (1-3 months)', 'Wait for a moderate period (4-12 months)', 'Wait for an extended period (more than 1 year)']).default('Immediately sell to limit losses'),
  preferredPortfolioStrategy: z.enum(['Aggressive (High risk, high potential return)', 'Moderate (Balanced risk and return)', 'Conservative (Low risk, low potential return)']).default('Aggressive (High risk, high potential return)')
});
