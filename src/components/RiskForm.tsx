'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/risk-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useUser } from '@clerk/nextjs'

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
    {
        id: 'Step 1',
        name: 'Personal and Financial Profile',
        fields: ['ageGroup', 'employmentType', 'dependents', 'monthlyInvestmentAmount', 'attitudeTowardsRisk']
    },
    {
        id: 'Step 2',
        name: 'Investment Preferences and Goals',
        fields: ['investmentGoals', 'preferredInstruments', 'marketCorrectionTolerance', 'investmentHorizon']
    },
    {
        id: 'Step 3',
        name: 'Risk Assessment Scenarios',
        fields: ['choiceOfTrain', 'preferredDrivingSpeed', 'portfolioRecoveryTime', 'preferredPortfolioStrategy']
    },
    { id: 'Step 4', name: 'Complete' }
];


export default function RiskForm() {
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep
    var { user } = useUser();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema),
    })

    const processForm: SubmitHandler<Inputs> = data => {
        if (user) {
            const mydata = JSON.stringify(data)
            var mydataJSON = JSON.parse(mydata); //change to obj
            mydataJSON.uid = user.id; //add something
            mydataJSON = JSON.stringify(mydataJSON); //change back to string

            fetch(process.env.API_BASE_URL+"/risk/calculate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: mydataJSON
            })
            
        }
        reset()
    }

    type FieldName = keyof Inputs

    const next = async () => {
        const fields = steps[currentStep].fields
        const output = await trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return

        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                await handleSubmit(processForm)()
            }
            setPreviousStep(currentStep)
            setCurrentStep(step => step + 1)
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setCurrentStep(step => step - 1)
        }
    }

    return (
        <section className='relative inset-0 flex flex-col w-full justify-between md:p-24 mt-7 md:mt-2 mb-10'>
            {/* steps */}
            <nav aria-label='Progress'>
                <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                    {steps.map((step, index) => (
                        <li key={step.name} className='md:flex-1'>
                            {currentStep > index ? (
                                <div className='group flex w-full flex-col border-l-4 border-purple-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-lg font-medium text-purple-600 transition-colors '>
                                        {step.id}
                                    </span>
                                    <span className='text-lg font-medium'>{step.name}</span>
                                </div>
                            ) : currentStep === index ? (
                                <div
                                    className='flex w-full flex-col border-l-4 border-purple-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                                    aria-current='step'
                                >
                                    <span className='text-lg font-medium text-purple-600'>
                                        {step.id}
                                    </span>
                                    <span className='text-lg font-medium'>{step.name}</span>
                                </div>
                            ) : (
                                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-lg font-medium text-white transition-colors'>
                                        {step.id}
                                    </span>
                                    <span className='text-lg font-medium'>{step.name}</span>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>

            {/* Form */}
            <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>

                {currentStep === 0 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <h2 className='text-base font-semibold leading-7 text-white'>
                            Personal and Financial Profile
                        </h2>
                        <p className='mt-1 text-lg leading-6 text-gray-400'>
                            Provide your personal details.
                        </p>

                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            {/* Age Group */}
                            <div className='sm:col-span-3'>
                                <label htmlFor='ageGroup' className='block text-lg font-medium leading-6 text-white'>
                                    Age Group
                                </label>
                                <div className='mt-2'>
                                    <select
                                        id='ageGroup'
                                        {...register('ageGroup')}
                                        className='block w-full  bg-black rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:max-w-xs sm:text-lg sm:leading-6'
                                    >
                                        <option value='18-25'>18-25</option>
                                        <option value='26-30'>26-30</option>
                                        <option value='31-35'>31-35</option>
                                        <option value='36-40'>36-40</option>
                                        <option value='41-45'>41-45</option>
                                        <option value='46-50'>46-50</option>
                                        <option value='51+'>51+</option>
                                    </select>
                                    {errors.ageGroup?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.ageGroup.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Employment Type */}
                            <div className='sm:col-span-3'>
                                <label htmlFor='employmentType' className='block text-lg font-medium leading-6 text-white'>
                                    Employment Type
                                </label>
                                <div className='mt-2'>
                                    <select
                                        id='employmentType'
                                        {...register('employmentType')}
                                        className='block w-full  bg-black rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:max-w-xs sm:text-lg sm:leading-6'
                                    >
                                        <option value='Self-employed'>Self Employed</option>
                                        <option value='Unemployed'>Unemployed</option>
                                        <option value='Student'>Student</option>
                                        <option value='Business'>Business</option>
                                        <option value='Govt.'>Govt.</option>
                                        <option value='Salaried'>Salaried</option>
                                    </select>
                                    {errors.employmentType?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.employmentType.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Number of Dependents */}
                            <div className='sm:col-span-3'>
                                <label htmlFor='dependents' className='block text-lg font-medium leading-6 text-white'>
                                    Number of Dependents
                                </label>
                                <div className='mt-2'>
                                    <select
                                        id='dependents'
                                        {...register('dependents')}
                                        className='block w-full  bg-black rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:max-w-xs sm:text-lg sm:leading-6'
                                    >
                                        <option value='0'>None</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4+'>4 or more</option>
                                    </select>
                                    {errors.dependents?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.dependents.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Monthly Investment Amount */}
                            <div className='sm:col-span-3'>
                                <label htmlFor='monthlyInvestmentAmount' className='block text-lg font-medium leading-6 text-white'>
                                    Monthly Investment Amount
                                </label>
                                <div className='mt-2'>
                                    <select
                                        id='monthlyInvestmentAmount'
                                        {...register('monthlyInvestmentAmount')}
                                        className='block w-full  bg-black rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:max-w-xs sm:text-lg sm:leading-6'
                                    >
                                        <option value='5000 - 25000'>5000 - 25000</option>
                                        <option value='25001 - 50000'>25001 - 50000</option>
                                        <option value='50001 - 100000'>50001 - 100000</option>
                                        <option value='100001 - 150000'>100001 - 150000</option>
                                        <option value='150000+'>150000+</option>
                                    </select>
                                    {errors.monthlyInvestmentAmount?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.monthlyInvestmentAmount.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Attitude Towards Risk */}
                            <div className='col-span-full'>
                                <label htmlFor='attitudeTowardsRisk' className='block text-lg font-medium leading-6 text-white'>
                                    Attitude Towards Risk
                                </label>
                                <div className='mt-2'>
                                    <select
                                        id='attitudeTowardsRisk'
                                        {...register('attitudeTowardsRisk')}
                                        className='block w-full bg-black rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:max-w-xs sm:text-lg sm:leading-6'
                                    >
                                        <option value='I am low risk taker, I need safety and security.'>
                                            I am low risk taker, I need safety and security.
                                        </option>
                                        <option value='I am an average risk taker, can invest in risky instruments to earn a good return.'>
                                            I am an average risk taker, can invest in risky instruments to earn a good return.
                                        </option>
                                        <option value='I am a high risk taker, will be happy to invest in risky instruments to earn high returns.'>
                                            I am a high risk taker, will be happy to invest in risky instruments to earn high returns.
                                        </option>
                                    </select>
                                    {errors.attitudeTowardsRisk?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.attitudeTowardsRisk.message}
                                        </p>
                                    )}
                                </div>
                            </div>


                        </div>
                    </motion.div>
                )}

                {currentStep === 1 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <h2 className='text-base font-semibold leading-7 text-white'>
                            Investment Preferences and Goals
                        </h2>
                        <p className='mt-1 text-lg leading-6 text-gray-400'>
                            Provide your investment preferences and goals.
                        </p>

                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>

                            {/* Investment Goals */}
                            <div className='col-span-full'>
                                <label htmlFor='investmentGoals' className='block text-lg font-medium leading-6 text-white'>
                                    Investment Goals
                                </label>
                                <div className='mt-2 space-y-2'>
                                    <div>
                                        <input
                                            type='checkbox'
                                            id='wealthAccumulation'
                                            {...register('investmentGoals')}
                                            value='Wealth accumulation'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='wealthAccumulation'>Wealth accumulation</label>
                                    </div>
                                    <div>
                                        <input
                                            type='checkbox'
                                            id='retirementPlanning'
                                            {...register('investmentGoals')}
                                            value='Retirement planning'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='retirementPlanning'>Retirement planning</label>
                                    </div>
                                    <div>
                                        <input
                                            type='checkbox'
                                            id='educationFunding'
                                            {...register('investmentGoals')}
                                            value='Education funding'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='educationFunding'>Education funding</label>
                                    </div>
                                    <div>
                                        <input
                                            type='checkbox'
                                            id='shortTermGains'
                                            {...register('investmentGoals')}
                                            value='Short-term gains'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='shortTermGains'>Short-term gains</label>
                                    </div>
                                    <div>
                                        <input
                                            type='checkbox'
                                            id='capitalPreservation'
                                            {...register('investmentGoals')}
                                            value='Capital preservation'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='capitalPreservation'>Capital preservation</label>
                                    </div>
                                    {errors.investmentGoals?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.investmentGoals.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Preferred Investment Instruments */}
                            <div className='col-span-full'>
                                <label htmlFor='preferredInstruments' className='block text-lg font-medium leading-6 text-white'>
                                    Preferred Instruments
                                </label>
                                <div className='mt-2'>
                                    <select
                                        id='preferredInstruments'
                                        {...register('preferredInstruments')}
                                        className='block w-full bg-black rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:max-w-xs sm:text-lg sm:leading-6'
                                    >
                                        <option value='Share Market'>Share Market</option>
                                        <option value='Mutual Funds'>Mutual Funds</option>
                                        <option value='Bonds'>Bonds</option>
                                        <option value='Fixed Deposits'>Fixed Deposits</option>
                                        <option value='None'>None</option>
                                    </select>
                                    {errors.preferredInstruments?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.preferredInstruments.message}
                                        </p>
                                    )}
                                </div>
                            </div>


                            {/* Market Correction Tolerance */}
                            <div className='sm:col-span-3'>
                                <label htmlFor='marketCorrectionTolerance' className='block text-lg font-medium leading-6 text-white'>
                                    Corrections into the markets are normal. What percentage of fall into your portfolio would make you uncomfortable?
                                </label>
                                <div className='mt-2'>
                                    <select
                                        id='marketCorrectionTolerance'
                                        {...register('marketCorrectionTolerance')}
                                        className='block w-full  bg-black rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:max-w-xs sm:text-lg sm:leading-6'
                                    >
                                        <option value='5%'>5%</option>
                                        <option value='10%'>10%</option>
                                        <option value='15%'>15%</option>
                                        <option value='20%'>20%</option>
                                    </select>
                                    {errors.marketCorrectionTolerance?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.marketCorrectionTolerance.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Investment Horizon */}
                            <div className='sm:col-span-3'>
                                <label htmlFor='investmentHorizon' className='block text-lg font-medium leading-6 text-white'>
                                    How many years will you allow your investments to grow before you will need to start significant withdrawals?
                                </label>
                                <div className='mt-2'>
                                    <select
                                        id='investmentHorizon'
                                        {...register('investmentHorizon')}
                                        className='block w-full  bg-black rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:max-w-xs sm:text-lg sm:leading-6'
                                    >
                                        <option value='Less than 1 year'>Less than 1 year</option>
                                        <option value='1-3 years'>1-3 years</option>
                                        <option value='3-5 years'>3-5 years</option>
                                        <option value='6-10 years'>6-10 years</option>
                                        <option value='More than 10 years'>More than 10 years</option>
                                    </select>
                                    {errors.investmentHorizon?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.investmentHorizon.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <h2 className='text-base font-semibold leading-7 text-white'>
                            Risk Assessment Scenarios
                        </h2>
                        <p className='mt-1 text-lg leading-6 text-gray-400'>
                            Answer the following risk assessment scenarios.
                        </p>

                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>

                            {/* Choice of Train in Peak Hours */}
                            <div className='sm:col-span-6'>
                                <label htmlFor='choiceOfTrain' className='block text-lg font-medium leading-6 text-white'>
                                    Which train to choose in peak hours?
                                </label>
                                <div className='mt-2 space-y-2'>
                                    <div>
                                        <input
                                            type='radio'
                                            id='mostCrowdedTrain'
                                            {...register('choiceOfTrain')}
                                            value='The most crowded train to reach faster'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='mostCrowdedTrain'>The most crowded train to reach faster</label>
                                    </div>
                                    <div>
                                        <input
                                            type='radio'
                                            id='lessCrowdedTrain'
                                            {...register('choiceOfTrain')}
                                            value='A less crowded train to ensure personal space'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='lessCrowdedTrain'>A less crowded train to ensure personal space</label>
                                    </div>
                                    <div>
                                        <input
                                            type='radio'
                                            id='fasterTrain'
                                            {...register('choiceOfTrain')}
                                            value='Whichever comes faster'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='fasterTrain'>Whichever comes faster</label>
                                    </div>
                                    {errors.choiceOfTrain?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.choiceOfTrain.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Preferred Driving Speed */}
                            <div className='sm:col-span-6'>
                                <label htmlFor='preferredDrivingSpeed' className='block text-lg font-medium leading-6 text-white'>
                                    What speed would you drive at?
                                </label>
                                <div className='mt-2 space-y-2'>
                                    <div>
                                        <input
                                            type='radio'
                                            id='belowSpeedLimit'
                                            {...register('preferredDrivingSpeed')}
                                            value='Below 40 km/h'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='belowSpeedLimit'>Below 40 km/h</label>
                                    </div>
                                    <div>
                                        <input
                                            type='radio'
                                            id='atSpeedLimit'
                                            {...register('preferredDrivingSpeed')}
                                            value='40-60 km/h'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='atSpeedLimit'>40-60 km/h</label>
                                    </div>
                                    <div>
                                        <input
                                            type='radio'
                                            id='slightlyAboveSpeedLimit'
                                            {...register('preferredDrivingSpeed')}
                                            value='60-80 km/h'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='slightlyAboveSpeedLimit'>60-80 km/h</label>
                                    </div>
                                    <div>
                                        <input
                                            type='radio'
                                            id='significantlyAboveSpeedLimit'
                                            {...register('preferredDrivingSpeed')}
                                            value='Above 80 km/h'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='significantlyAboveSpeedLimit'>Above 80 km/h</label>
                                    </div>
                                    {errors.preferredDrivingSpeed?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.preferredDrivingSpeed.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Portfolio Recovery Time */}
                            <div className='sm:col-span-6'>
                                <label htmlFor='portfolioRecoveryTime' className='block text-lg font-medium leading-6 text-white'>
                                    If there is a loss in your portfolio due to some external reasons, how long will you wait for the liquidation of your portfolio?
                                </label>
                                <div className='mt-2 space-y-2'>
                                    <div>
                                        <input
                                            type='radio'
                                            id='immediatelySell'
                                            {...register('portfolioRecoveryTime')}
                                            value='Immediately sell to limit losses'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='immediatelySell'>Immediately sell to limit losses</label>
                                    </div>
                                    <div>
                                        <input
                                            type='radio'
                                            id='shortPeriodSell'
                                            {...register('portfolioRecoveryTime')}
                                            value='Wait for a short period (1-3 months)'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='shortPeriodSell'>Wait for a short period (1-3 months)</label>
                                    </div>
                                    <div>
                                        <input
                                            type='radio'
                                            id='moderatePeriodSell'
                                            {...register('portfolioRecoveryTime')}
                                            value='Wait for a moderate period (4-12 months)'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='moderatePeriodSell'>Wait for a moderate period (4-12 months)</label>
                                    </div>
                                    <div>
                                        <input
                                            type='radio'
                                            id='extendedPeriodSell'
                                            {...register('portfolioRecoveryTime')}
                                            value='Wait for an extended period (more than 1 year)'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='extendedPeriodSell'>Wait for an extended period (more than 1 year)</label>
                                    </div>
                                    {errors.portfolioRecoveryTime?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.portfolioRecoveryTime.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Preferred Portfolio Strategy */}
                            <div className='sm:col-span-6'>
                                <label htmlFor='preferredPortfolioStrategy' className='block text-lg font-medium leading-6 text-white'>
                                    Which of the following portfolio would you prefer?
                                </label>
                                <div className='mt-2 space-y-2'>
                                    <div>
                                        <input
                                            type='radio'
                                            id='aggressivePortfolio'
                                            {...register('preferredPortfolioStrategy')}
                                            value='Aggressive (High risk, high potential return)'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='aggressivePortfolio'>Aggressive (High risk, high potential return)</label>
                                    </div>
                                    <div>
                                        <input
                                            type='radio'
                                            id='moderatePortfolio'
                                            {...register('preferredPortfolioStrategy')}
                                            value='Moderate (Balanced risk and return)'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='moderatePortfolio'>Moderate (Balanced risk and return)</label>
                                    </div>
                                    <div>
                                        <input
                                            type='radio'
                                            id='conservativePortfolio'
                                            {...register('preferredPortfolioStrategy')}
                                            value='Conservative (Low risk, low potential return)'
                                            className='mr-2 text-purple-600 focus:ring-purple-600'
                                        />
                                        <label htmlFor='conservativePortfolio'>Conservative (Low risk, low potential return)</label>
                                    </div>
                                    {errors.preferredPortfolioStrategy?.message && (
                                        <p className='mt-2 text-lg text-red-400'>
                                            {errors.preferredPortfolioStrategy.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}

                {currentStep === 3 && (
                    <>
                        <h2 className='text-base font-semibold leading-7 text-white'>
                            Complete
                        </h2>
                        <p className='mt-1 text-lg leading-6 text-gray-400'>
                            Thank you for your submission.
                        </p>
                    </>
                )}

            </form>


            {/* Navigation */}
            <div className='mt-4 mb-10 pt-5'>
                <div className='flex justify-between'>
                    {/* Render Previous and Next buttons for steps other than the last step */}
                    {currentStep !== steps.length - 1 ? (
                        <>
                            <button
                                type='button'
                                onClick={prev}
                                disabled={currentStep === 0}
                                className='rounded bg-white px-2 py-1 text-lg font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                    className='h-6 w-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M15.75 19.5L8.25 12l7.5-7.5'
                                    />
                                </svg>
                            </button>
                            <button
                                type='button'
                                onClick={next}
                                disabled={currentStep === steps.length - 1}
                                className='rounded bg-white px-2 py-1 text-lg font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                    className='h-6 w-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M8.25 4.5l7.5 7.5-7.5 7.5'
                                    />
                                </svg>
                            </button>
                        </>
                    ) : (
                        // Render a central button for the last step
                        <button
                            type='button'
                            onClick={() => {
                                // Redirect to another page
                                window.location.href = '/dashboards/my-wheel';
                            }}
                            className='rounded bg-purple-600 px-4 py-2 text-lg font-semibold text-white shadow-sm ring-1 hover:bg-black transition-colors'
                        >
                            Generate Wheel
                        </button>
                    )}
                </div>
            </div>

        </section>
    )
}