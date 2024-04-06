import { CurrencyDollarIcon, ShieldCheckIcon, NewspaperIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const features = [
    {
        name: 'Investment Recommendations',
        description:
            'Get personalized recommendations on mutual fund investments based on your financial goals and risk profile.',
        icon: CurrencyDollarIcon,
    },
    {
        name: 'Risk Assessment',
        description:
            'Assess your risk tolerance to determine the most suitable investment strategies for your financial future.',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Market News',
        description:
            'Stay updated with the latest news and trends in the stock market and mutual funds to make informed decisions.',
        icon: NewspaperIcon,
    },
    {
        name: 'Expense Tracking',
        description:
            'Easily enter and tabulate your bank statements to keep track of your expenses and manage your budget effectively.',
        icon: BanknotesIcon,
    },
];

export default function FeatureGrid() {
    return (
        <div className="bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Personal Finance Made Easy</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Everything you need to manage your finances
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-200">
                        Take control of your financial future with our comprehensive features tailored to meet your needs.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-white">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-200">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
