'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signin, signup, updateGoogleSignUp } from '@/lib/action'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { XIcon } from 'lucide-react'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from 'react-icons/fa'
import { UserLogin } from '@/types'

const AuthModel = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = await createClient()
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error) {
                setIsOpen(true)
            } else {
                updateGoogleSignUp(user as UserLogin)


                setIsOpen(false)
                toast.success("You have logged in")
                router.refresh()
            }
        }
        checkAuth();
    }, [])

    const signUpWithGoogle = async () => {
        const supabase = await createClient()
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://x-clone-gngx.vercel.app/'
            }
        })
        if (error) {
            console.log("ERROR LOGIN WITH GOOGLE", error)
        }

    }

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
                                <Button onClick={signUpWithGoogle} className='rounded-full py-5 font-normal bg-white text-black w-full border border-transparent hover:bg-white/90'>
                                    <FcGoogle />
                                    Sign up with Google
                                </Button>
                                <Button className='rounded-full py-5 font-normal bg-white text-black w-full hover:bg-white/90'>
                                    <FaApple />
                                    Sign up with Apple
                                </Button>
                                <div className='flex items-center'><hr className='border-gray-600 w-full' /> <span className='px-4 text-[18px]'> OR </span> <hr className='border-gray-600 w-full' /></div>
                                <Button className='rounded-full py-5 text-white bg-blue-400 hover:bg-blue-400/90 font-bold w-full' onClick={() => setSignUp(true)}> Create an account</Button>
                                <div className='font-bold space-y-4'>
                                    <div>Already have an account?</div>
                                    <Button className='rounded-full py-5 bg-black text-blue-400 font-bold w-full border border-white/50' onClick={() => setSignIn(true)}>Sign in</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>


            {/* SIGN UP DIALOG */}
            <Dialog open={signUp} onOpenChange={setSignUp}>
                <DialogOverlay className="bg-blue-300/20" />
                <DialogContent className='bg-black px-18 border border-transparent py-6' onInteractOutside={(e) => e.preventDefault()}>
                    <DialogTitle>
                        <DialogClose className='cursor-pointer absolute left-4 top-4'>
                            <XIcon />
                        </DialogClose>
                    </DialogTitle>
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
                            setIsOpen(false)
                            // console.log(data.signedUp)


                        } else {
                            toast.error(data.message)
                        }
                    }}>
                        <Input type='text' onChange={(e) => {
                            const value = e.target.value
                            if (value.length > 24) {
                                setError("Your username must be less than 24 characters")
                                return
                            }
                            setUsername(e.target.value)
                            setError("")
                        }} min={3} name='username' placeholder="Username" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        {error && <p className='text-red-600 mt-[-16px]'> {error} </p>}
                        <Input type='email' onChange={(e) => setEmail(e.target.value)} name='email' placeholder="Email" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        <Input type='password' onChange={(e) => setPassword(e.target.value)} name='password' placeholder="Password" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        <Button type='submit' className='w-full rounded-full bg-white font-bold py-6 text-black hover:bg-white/90' disabled={isLoading}>Next</Button>
                    </form>
                </DialogContent>
            </Dialog>


            {/* SIGN IN DIALOG */}
            <Dialog open={signIn} onOpenChange={setSignIn}>

                <DialogOverlay className='bg-blue-300/20' />

                <DialogContent className='bg-black px-26 border border-transparent py-4' onInteractOutside={(e) => e.preventDefault()}>
                    <DialogTitle>
                        <DialogClose className='cursor-pointer absolute left-4 top-4'>
                            <XIcon />
                        </DialogClose>
                    </DialogTitle>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj5Z6h2su_P2Dpy48AmTVcigVGKB5bsYuMZQ&s' className='w-8 mx-auto' />
                    <div className='font-bold text-3xl mb-4'>Sign in to X</div>
                    <form className='space-y-6'>
                        <Button onClick={signUpWithGoogle} className='rounded-full py-5 font-normal bg-white text-black w-full border border-transparent hover:bg-white/90'>
                            <FcGoogle />
                            Sign up with Google
                        </Button>
                        <Button className='rounded-full py-5 bg-white text-black w-full hover:bg-white/90'> <FaApple /> Sign up with Apple</Button>
                        <div className='flex items-center'><hr className='border-gray-600 w-full' /> <span className='px-4 text-[18px]'> or </span> <hr className='border-gray-600 w-full' /></div>
                        <Input type='email' onChange={(e) => setEmail(e.target.value)} name='email' placeholder="Email" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        <Input type='password' onChange={(e) => setPassword(e.target.value)} name='password' placeholder="Password" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        <Button formAction={signin} className='w-full rounded-full bg-white font-bold py-5 text-black hover:bg-white/90' disabled={isLoading}>Next</Button>
                    </form>


                    <Button className='rounded-full py-5 border border-gray-400 bg-black text-white w-full font-bold hover:bg-white/90'>Forgot password?</Button>
                    <div className='text-gray-500 mt-8 mb-14'> Don&apos;t have an account? <Link href={'/'} className='text-blue-400'>Sign up</Link> </div>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default AuthModel