'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { DialogTitle } from '@radix-ui/react-dialog'
import { signup } from '@/lib/action'
import { createClient } from '@/utils/supabase/client'

const AuthModel = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const checkAuth = async () => {
            const supabase = await createClient()
            const { data: { user }, error } = await supabase.auth.getUser()
            // console.log("USER: ", user);
            // console.log("ERROR: ", error);

            if (!user) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        }

        checkAuth();
    }, [])

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTitle></DialogTitle>
                <DialogContent className='bg-black min-w-screen h-screen border border-transparent flex justify-center items-center' onInteractOutside={(e) => e.preventDefault()}>
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
                                    <Button className='rounded-full bg-black text-blue-400 font-bold w-full border border-white/50 '>Sign in</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>


            {/* SIGN UP DIALOG */}
            <Dialog open={signUp} onOpenChange={setSignUp}>
                <DialogTitle></DialogTitle>
                <DialogContent className='bg-black px-18' onInteractOutside={(e) => e.preventDefault()}>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj5Z6h2su_P2Dpy48AmTVcigVGKB5bsYuMZQ&s' className='w-8 mx-auto' />
                    <div className='font-bold text-3xl'>Create your account</div>
                    <form action={signup}>
                        <Input type='text' onChange={(e) => setUsername(e.target.value)} min={3} name='username' placeholder="Name" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        <Input type='email' onChange={(e) => setEmail(e.target.value)} name='email' placeholder="Email" className='my-4 py-7 placeholder:text-[17px] border border-white/40' />
                        <Button type='submit' className='w-full rounded-full bg-white font-bold py-6 text-black hover:bg-white/90' disabled={isLoading}>Next</Button>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AuthModel