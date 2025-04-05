'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signin, signup } from '@/lib/action'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/db'
import { profiles } from '@/lib/db/schema'

const AuthModel = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = await createClient()
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
                toast.success("You have logged in")
            }
        }
        checkAuth();
    }, [])

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTitle></DialogTitle>
                <DialogOverlay className="bg-blue-300/20" />
                <DialogContent className='bg-black min-w-screen h-screen border border-transparent flex justify-center items-center' onInteractOutside={(e) => e.preventDefault()}>
                    {(signUp || signIn) && <div className="absolute inset-0 bg-blue-300/20" />}
                    <div className='w-2xl mr-30 '>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj5Z6h2su_P2Dpy48AmTVcigVGKB5bsYuMZQ&s' className='w-xs mx-auto' />
                    </div>
                    <div className=''>
                        <div className='text-6xl font-bold pb-8'>Happening now</div>
                        <div className='max-w-2xs'>
                            <div className='text-3xl font-bold pb-6'>Join today.</div>
                            <div className='space-y-3'>
                                <Button className='rounded-full bg-white text-black w-full font-semibold border border-transparent hover:bg-white/90'>Sign up with Google</Button>
                                <Button className='rounded-full bg-white text-black w-full font-bold hover:bg-white/90'>Sign up with Apple</Button>
                                <Button className='rounded-full text-white bg-blue-400 hover:bg-blue-400/90 font-bold w-full' onClick={() => setSignUp(true)}>Create an account</Button>
                                <div className='font-bold space-y-4'>
                                    <div>Already have an account?</div>
                                    <Button className='rounded-full bg-black text-blue-400 font-bold w-full border border-white/50' onClick={() => setSignIn(true)}>Sign in</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>


            {/* SIGN UP DIALOG */}
            <Dialog open={signUp} onOpenChange={setSignUp}>
                <DialogTitle></DialogTitle>
                <DialogOverlay className="bg-blue-300/20" />
                <DialogContent className='bg-black px-18 border border-transparent' onInteractOutside={(e) => e.preventDefault()}>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj5Z6h2su_P2Dpy48AmTVcigVGKB5bsYuMZQ&s' className='w-8 mx-auto' />
                    <div className='font-bold text-3xl'>Create your account</div>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        setIsLoading(true);

                        const formData = new FormData();
                        formData.append("username", username);
                        formData.append("email", email);
                        formData.append("password", password);

                        const data = await signup(formData);

                        if (data.success) {
                            toast.success(data.message)
                            router.refresh()
                            router.push("/")
                            // console.log(data.signedUp)

                            
                        } else {
                            toast.error(data.message)
                        }
                    }}>
                        <Input type='text' onChange={(e) => setUsername(e.target.value)} min={3} name='username' placeholder="Name" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        <Input type='email' onChange={(e) => setEmail(e.target.value)} name='email' placeholder="Email" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        <Input type='password' onChange={(e) => setPassword(e.target.value)} name='password' placeholder="Password" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        <Button type='submit' className='w-full rounded-full bg-white font-bold py-6 text-black hover:bg-white/90' disabled={isLoading}>Next</Button>
                    </form>
                </DialogContent>
            </Dialog>


            {/* SIGN IN DIALOG */}
            <Dialog open={signIn} onOpenChange={setSignIn}>
                <DialogTitle></DialogTitle>
                <DialogOverlay className='bg-blue-300/20' />
                <DialogContent className='bg-black px-26 border border-transparent' onInteractOutside={(e) => e.preventDefault()}>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj5Z6h2su_P2Dpy48AmTVcigVGKB5bsYuMZQ&s' className='w-8 mx-auto' />
                    <div className='font-bold text-3xl mb-4'>Sign in to X</div>
                    <form className='space-y-6'>
                        <Button className='rounded-full bg-white text-black w-full font-semibold border border-transparent hover:bg-white/90'>Sign up with Google</Button>
                        <Button className='rounded-full bg-white text-black w-full font-bold hover:bg-white/90'>Sign up with Apple</Button>
                        <div className='flex items-center'><hr className='border-gray-600 w-full' /> <span className='px-4 text-[18px]'> or </span> <hr className='border-gray-600 w-full' /></div>
                        <Input type='email' onChange={(e) => setEmail(e.target.value)} name='email' placeholder="Email" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        <Input type='password' onChange={(e) => setPassword(e.target.value)} name='password' placeholder="Password" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        <Button formAction={signin} className='w-full rounded-full bg-white font-bold py-4 text-black hover:bg-white/90' disabled={isLoading}>Next</Button>
                    </form>


                    <Button className='rounded-full border border-gray-400 bg-black text-white w-full font-bold hover:bg-white/90'>Forgot password?</Button>
                    <div className='text-gray-500 mt-8 mb-14'> Don't have an account? <Link href={'/'} className='text-blue-400'>Sign up</Link> </div>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default AuthModel