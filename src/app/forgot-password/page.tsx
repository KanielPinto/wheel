"use client"
import React, { useState } from 'react';
import { ClerkLoading, useAuth, useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [secondFactor, setSecondFactor] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { isLoaded, signIn, setActive } = useSignIn();

    if (!isLoaded) {
        return null;
    }

    // If the user is already signed in,
    // redirect them to the home page
    if (isSignedIn) {
        router.push('/');
    }

    // Send the password reset code to the user's email
    async function create(e: any) {
        e.preventDefault();
        await signIn
            ?.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            })
            .then(_ => {
                setSuccessfulCreation(true);
                setError('');
            })
            .catch(err => {
                console.error('error', err.errors[0].longMessage);
                setError(err.errors[0].longMessage);
            });
    }

    // Reset the user's password. 
    // Upon successful reset, the user will be 
    // signed in and redirected to the home page
    async function reset(e: React.FormEvent) {
        e.preventDefault();
        await signIn
            ?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            })
            .then(result => {
                // Check if 2FA is required
                if (result.status === 'needs_second_factor') {
                    setSecondFactor(true);
                    setError('');
                } else if (result.status === 'complete') {
                    // Set the active session to 
                    // the newly created session (user is now signed in)
                    setActive({ session: result.createdSessionId });
                    setError('');
                } else {
                    console.log(result);
                }
            })
            .catch(err => {
                console.error('error', err.errors[0].longMessage)
                setError(err.errors[0].longMessage);
            });
    }

    return (
        <div className='flex h-screen w-full justify-center items-center'>
            <div
                className='bg-white text-black w-96 p-12 rounded-lg'
            >
                <ClerkLoading>
                    <div>Clerk is loading</div>
                </ClerkLoading>
                <h1 className='py-5 text-2xl'>Forgot Password?</h1>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3em',
                    }}
                    onSubmit={!successfulCreation ? create : reset}
                >
                    {!successfulCreation && (
                        <>
                            <label htmlFor='email'>Please provide your email address</label>
                            <input
                                className='rounded-lg p-3 border-2 border-black bg-white focus:outline-none focus:border-2 focus:ring-2 focus:ring-gray-500'
                                type='email'
                                placeholder='e.g john@doe.com'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <button className='bg-blue-400 rounded-lg border border-black py-2 hover:bg-blue-700 transition-all hover:text-white'>Send password reset code</button>
                            {error && <p>{error}</p>}
                        </>
                    )}

                    {successfulCreation && (
                        <>
                            <label htmlFor='password'>Enter your new password</label>
                            <input
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <label htmlFor='password'>Enter the password reset code that was sent to your email</label>
                            <input
                                type='text'
                                value={code}
                                onChange={e => setCode(e.target.value)}
                            />

                            <button>Reset</button>
                            {error && <p>{error}</p>}
                        </>
                    )}

                    {secondFactor && <p>2FA is required, but this UI does not handle that</p>}
                </form>
            </div>
        </div>

    );
};

export default ForgotPasswordPage;