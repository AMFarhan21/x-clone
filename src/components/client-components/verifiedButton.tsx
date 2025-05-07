'use client'

import { Profiles } from '@/types'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import { AlertDialogHeader } from '../ui/alert-dialog'
import { XIcon } from 'lucide-react'
import { IoCheckmark, IoCheckmarkSharp } from 'react-icons/io5'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

type verifiedButtonProps = {
    userProfiles: Profiles,
    data: Profiles,
}

const PLANS = {
    annual: {
        premium: {
            name: "Premium",
            price: 'IDR 104,167',
            total: 'IDR 1,250,000',
            billing: '/ month',
            discount: 'SAVE 13%',
            features: [
                {
                    category: 'Everything in Basic, and',
                    items: [
                        'Half Ads for You and Following',
                        'Larger reply boost',
                        'Get paid to post',
                        'Checkmark',
                        'Grok with increased limits',
                        'X pro, Analytics, Media Studio',
                        'Creator Subscription'
                    ]
                }
            ]
        },
        premiumPlus: {
            name: 'Premium+',
            price: 'IDR 538,333',
            total: 'IDR 6,460,000',
            billing: '/ month',
            discount: 'SAVE 17%',
            features: [
                {
                    category: "Everything in Basic, and",
                    items: [
                        'Fully ad-free',
                        'Largest reply boost',
                        'Write Articles',
                        'Radar'
                    ]
                },
                {
                    category: "Everything in Premium, and",
                    items: [
                        'Highest usage limits',
                        'Unlock DeepSearch & Think',
                        'Early access to new features'
                    ]
                }
            ]
        }
    },
    monthly: {
        premium: {
            name: "Premium",
            price: "IDR 120,000",
            biling: '/ month',
            features: [
                {
                    category: 'Everything in Basic, and',
                    items: [
                        'Half Ads for You and Following',
                        'Larger reply boost',
                        'Get paid to post',
                        'Checkmark',
                        'Grok with increased limits',
                        'X pro, Analytics, Media Studio',
                        'Creator Subscription'
                    ]
                }
            ]
        },
        premiumPlus: {
            name: "Premium+",
            price: 'IDR 654,000',
            billing: '/ month',
            features: [
                {
                    category: "Everything in Basic, and",
                    items: [
                        'Fully ad-free',
                        'Largest reply boost',
                        'Write Articles',
                        'Radar'
                    ]
                },
                {
                    category: "Everything in Premium, and",
                    items: [
                        'Highest usage limits',
                        'Unlock DeepSearch & Think',
                        'Early access to new features'
                    ]
                }
            ]
        }
    }
}


const FEATURE_COMPARISON = [
    {
        category: 'Enhanced Experience',
        items: [
            { name: 'Ads', premium: 'Half in For You & Following', premiumPlus: 'Fully ad-free' },
            { name: 'Reply boost', premium: 'Larger', premiumPlus: 'Largest' },
            { name: 'Radar', premium: '', premiumPlus: <IoCheckmark /> },
            { name: 'Edit post', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> },
            { name: 'Longer posts', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> },
            { name: 'Background video playback', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> },
            { name: 'Download videos', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> }
        ]
    },
    {
        category: 'Grok AI',
        items: [
            { name: 'Use limits', premium: 'Higher', premiumPlus: 'Highest' },
            { name: 'Unlock DeepSearch & Think', premium: '', premiumPlus: <IoCheckmark /> },
            { name: 'Early access to new features', premium: '', premiumPlus: <IoCheckmark /> }
        ]
    },
    {
        category: 'Creator Hub',
        items: [
            { name: 'Write Articles', premium: '', premiumPlus: <IoCheckmark /> },
            { name: 'Get paid to post', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> },
            { name: 'X Pro', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> },
            { name: 'Media Studio', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> },
            { name: 'Analytics', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> }
        ]
    },
    {
        category: 'Verification & Security',
        items: [
            { name: 'Checkmark', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> },
            { name: 'Optional ID verification', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> },
            { name: 'Encrypted direct messages', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> }
        ]
    },
    {
        category: 'Customization',
        items: [
            { name: 'Highlights tab', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> },
            { name: 'Bookmark folders', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> },
            { name: 'App icons', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> },
            { name: 'Customize navigation', premium: <IoCheckmark />, premiumPlus: <IoCheckmark /> }
        ]
    }
]


const PlanCard = ({ plan, isSelected, onClick }: { isSelected: boolean, onClick: () => void }) => {
    return (
        <div onClick={onClick} className={`bg-slate-400/23 w-85 h-110 ${isSelected ? "border-2 border-blue-400" : ""} rounded-2xl m-auto p-6 text-white cursor-pointer`}>
            <div className='flex justify-between items-center'>
                {
                    isSelected ? (
                        <IoCheckmarkSharp className='text-xl bg-blue-400 rounded-full p-1' />
                    ) : (
                        <div className='w-5 h-5 rounded-full bg-black border'></div>
                    )
                }
            </div>
            <div className='flex justify-between mt-2'>
                <div className='text-4xl front-bold mt-2'>
                    {plan.price}<span className='text-lg font-light'>{plan.billing}</span>
                </div>
                {
                    plan.discount && (
                        <div className='bg-green-800/10 text-green-200 rounded-full px-2 text-xs h-4 font-bold'>
                            {plan.discount}
                        </div>
                    )
                }
            </div>
            {
                plan.features.map((featuresGroup, index: number) => (
                    <ul key={index} className='space-y-1 mt-4'>
                        <div className='font-semibold text-base'>{featuresGroup.category}</div>
                        {featuresGroup.items.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className='flex items-center text-base text-white/80'>
                                <IoCheckmark /><span className='ml-2'>{item}</span>
                            </li>
                        ))}
                    </ul>
                ))
            }
        </div>
    )
}


const FeatureComparisonTable = () => {
    return (
        <div className='m-auto w-[1000px] text-white text-lg mt-[80px]'>
            <div className='text-2xl font-bold'>Compare tiers & features</div>
            {
                FEATURE_COMPARISON.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <div className='grid grid-cols-3 font-semibold mt-8 border-b-1 border-white/15 py-1.5'>
                            <div> {section.category} </div>
                            <div> Premium </div>
                            <div> Premium+ </div>
                        </div>
                        {
                            section.items.map((item, itemIndex) => (
                                <div key={itemIndex} className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                                    <div className='text-white/85'> {item.name} </div>
                                    <div> {item.premium} </div>
                                    <div> {item.premiumPlus} </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}



const VerifiedButton = ({ userProfiles, data }: verifiedButtonProps) => {

    const [selectedPlan, setSelectedPlan] = useState<'premium' | 'premiumPlus'>('premium')
    const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual')

    const plans = PLANS[billingCycle];
    const selectedPlanData = plans[selectedPlan]


    return (

        <Dialog>
            <DialogTrigger>
                {
                    userProfiles.username === data.username && <Button className='rounded-full border border-white/50 bg-black font-bold cursor-pointer'><RiVerifiedBadgeFill className='text-blue-400' />Get verified</Button>
                }
            </DialogTrigger>
            {/* <DialogOverlay className='bg-blue-400/20' /> */}
            <DialogContent className='bg-black text-white min-w-screen h-screen items-center border border-transparent overflow-scroll'>
                <AlertDialogHeader className='z-0'>
                    <DialogClose className='absolute top-6 left-6'> <XIcon /> </DialogClose>
                    <DialogTitle className='font-bold text-[54px] w-170 mx-auto mt-12'>Get verified with Premium</DialogTitle>
                    <DialogDescription className='m-auto text-[17.5px] w-200 text-center font-normal text-white/70'>
                        Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security. <br></br>
                        (For organizations, <span className='font-bold text-white border-b-3 border-white'>sign up here</span>)
                    </DialogDescription>

                    <div>
                        <Tabs defaultValue="annual" className="w-[712px] m-auto">
                            <TabsList className="flex w-60 p-[2px] m-auto rounded-full bg-slate-400/20 justify-between">
                                <TabsTrigger value="annual" className={`w-40 cursor-pointer ${billingCycle === 'annual' && 'bg-black'} rounded-full m-auto px-2 py-1`} onClick={() => setBillingCycle('annual')}>
                                    Annual <span className='font-bold bg-green-400/20 text-green-200 rounded-xl w-20 text-xs h-4 px-2'> Best Value</span>
                                </TabsTrigger>
                                <TabsTrigger value="monthly" className={`w-20 cursor-pointer ${billingCycle === 'monthly' && 'bg-black'} rounded-full m-auto px-2 py-1`} onClick={() => setBillingCycle('monthly')}>
                                    Monthly
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="annual" className='flex'>

                                <PlanCard plan={PLANS.annual.premium} isSelected={selectedPlan === 'premium' && billingCycle === 'annual'} onClick={() => setSelectedPlan('premium')} />
                                <PlanCard plan={PLANS.annual.premiumPlus} isSelected={selectedPlan === 'premiumPlus' && billingCycle === 'annual'} onClick={() => setSelectedPlan('premiumPlus')} />

                            </TabsContent>
                            <TabsContent value="monthly" className='flex' >

                                <PlanCard plan={PLANS.monthly.premium} isSelected={selectedPlan === 'premium' && billingCycle === 'monthly'} onClick={() => setSelectedPlan('premium')} />
                                <PlanCard plan={PLANS.monthly.premiumPlus} isSelected={selectedPlan === 'premiumPlus' && billingCycle === 'monthly'} onClick={() => setSelectedPlan('premiumPlus')} />

                            </TabsContent>
                        </Tabs>
                    </div>

                    <FeatureComparisonTable />
                </AlertDialogHeader>
                <AlertDialogHeader className='bg-black border-t-1 border-white/30 sticky bottom-0 min-w-full h-40'>
                    <div className='flex m-auto w-196'>
                        <div className='w-235 mt-3'>
                            <div className='text-xl font-semibold'> {selectedPlanData.name} </div>
                            <div className='text-4xl font-bold mt-3'>
                                <span>IDR </span>
                                {
                                    selectedPlan === 'premium' ? (
                                        billingCycle === 'annual' ? "1.250,000" : "120,000"
                                    ) : (
                                        billingCycle === 'annual' ? "6,460,000" : "654,000"
                                    )
                                }

                                <span className='text-lg font-light'> /  {billingCycle === "annual" ? "year" : "month"} </span></div>
                            <div className='text-white/80'>Billed  {billingCycle === "annual" ? "annually" : "monthly"} </div>
                        </div>
                        <div>
                            <Button className='bg-blue-400 text-white w-full font-bold rounded-full mt-4 py-4.5 hover:bg-blue-400/80 active:bg-blue-400/80'>Subscribe & Pay</Button>
                            <div className='border border-white/30 text-[13px] text-white/80 p-2 my-3 rounded-lg leading-4'>
                                By subscribing, you agree to our <span className='border-b font-bold'>Purchaser Terms of Service</span>. Subscriptions auto-renew until canceled. <span className='border-b font-bold'>Cancel anytime</span>,  at least 24 hours prior to renewal to avoid additional charges. Manage your subscription through the platform you subscribed on.
                            </div>
                        </div>
                    </div>
                </AlertDialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default VerifiedButton