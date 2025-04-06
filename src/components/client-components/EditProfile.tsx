'use client'

import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { DotIcon, XIcon } from 'lucide-react'
import { IoIosArrowForward } from "react-icons/io";
import { toast } from 'sonner'

const EditProfile = ({ userId, userProfiles }) => {

    const [name, setName] = useState(userProfiles.displayName ? userProfiles.displayName : userProfiles.username)
    const [bio, setBio] = useState(userProfiles.bio ? userProfiles.bio : "")
    const [location, setLocation] = useState(userProfiles.location ? userProfiles.location : "")
    const [website, setWebsite] = useState(userProfiles.website ? userProfiles.website : "")
    const [coverImage, setCoverImage] = useState<File | null>(null)
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(null)
    const [previewProfileImage, setPreviewProfileImage] = useState<string | null>(null)
    const [birthMonth, setBirthMonth] = useState("")
    const [birthDay, setBirthDay] = useState("")
    const [birthYear, setBirthYear] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [open, setOpen] = useState(false)


    const updateProfileDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('location', location);
        formData.append('website', website);
        formData.append('birthMonth', birthMonth);
        formData.append('birthDay', birthDay);
        formData.append('birthYear', birthYear);
        formData.append('userId', userId)
        if (coverImage) formData.append('coverImage', coverImage);
        if (profileImage) formData.append('profileImage', profileImage);


        const response = await fetch("http://localhost:3000/api/profiles", {
            method: "POST",
            body: formData
        })

        const data = await response.json()

        if (data.success) {
            console.log(data.message)
            toast.success(data.message)
            setOpenDialog(false)
        } else {
            console.log(data.message, data.error)
            toast.error(data.message)
        }
    }


    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)


    return (




        <Dialog open={openDialog} onOpenChange={setOpenDialog}>

            <DialogTrigger asChild >
                <button className='ml-auto mr-4 mt-3 w-30 h-9 items-center rounded-full border border-white/50 bg-black font-bold cursor-pointer'
                    onClick={() => setOpenDialog(true)}>
                    Edit profile
                </button>
            </DialogTrigger>
            <form id="form-editProfile" onSubmit={updateProfileDetails}>
                <DialogOverlay className="bg-blue-300/20" />
                <DialogContent className='bg-black border border-transparent min-w-[600px] max-h-[650px] overflow-y-auto rounded-2xl pb-16'>
                    <DialogHeader>
                        <DialogTitle className='pl-3 py-2 font-semibold text-xl gap-x-4 flex items-center sticky top-0 bg-black/60'>
                            {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj5Z6h2su_P2Dpy48AmTVcigVGKB5bsYuMZQ&s' className='w-8 mx-auto' /> */}

                            <DialogClose className="cursor-pointer">
                                <XIcon />
                                <span className="sr-only">Close</span>
                            </DialogClose>
                            <div className='ml-4'>Edit profile</div>
                            <Button form='form-editProfile' type='submit' className='bg-white text-black font-bold rounded-full w-18 hover:bg-white/90 ml-auto mr-4'>Save</Button>
                        </DialogTitle>


                        <DialogDescription>

                            <label className='block w-full h-[27vh] bg-gray-600 cursor-pointer mt-[-8px]'>
                                {
                                    previewCoverImage && (
                                        <img src={previewCoverImage} alt='Preview Cover Image' className='w-full h-full object-cover' />
                                    )
                                }
                                {
                                     userProfiles.backgroundPicture && (
                                        <img src={userProfiles.backgroundPicture} alt='Preview Cover Image' className='w-full h-full object-cover' />
                                    )
                                }
                                <input onChange={(e) => {
                                    e.preventDefault()
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setCoverImage(file);
                                        setPreviewCoverImage(URL.createObjectURL(file))
                                    };

                                }} form='form-editProfile' name='coverImage' type='file' accept='image/*' className='hidden' />
                            </label>

                            <label className='z-10 block w-28 h-28 bg-gray-600 rounded-full mx-6 mb-6 mt-[-50px] border-3 border-black cursor-pointer'>

                                {
                                    previewProfileImage && (
                                        <div>
                                            <img src={previewProfileImage} alt="Preview Profile Image" className='block w-28 h-28 rounded-full border-3 border-black cursor-pointer object-cover object-top' />
                                        </div>
                                    )
                                }
                                {
                                    userProfiles.profilePicture && (
                                        <div>
                                            <img src={userProfiles.profilePicture} alt="Preview Profile Image" className='block w-28 h-28 rounded-full border-3 border-black cursor-pointer object-cover object-top' />
                                        </div>
                                    )
                                }

                                <input onChange={(e) => {
                                    e.preventDefault()
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        setProfileImage(file);
                                        setPreviewProfileImage(URL.createObjectURL(file))
                                    }
                                }} form='form-editProfile' name='profileImage' type='file' accept='image/*' className='hidden' />
                            </label>
                            <div className='px-4 space-y-8 flex flex-col text-base text-white/80' >
                                <input form='form-editProfile' value={name} onChange={(e) => setName(e.target.value)} name='name' className={`border border-white/20 rounded-[4px] py-4 px-2 ${userProfiles.displayName && "text-white"}`} placeholder='Name' />
                                <textarea form='form-editProfile' value={bio} onChange={(e) => setBio(e.target.value)} name='bio' className={`border border-white/20 w-full p-2 rounded-[4px] py-6 px-2 ${userProfiles.bio && "text-white"}`} placeholder='Bio'></textarea>
                                <input form='form-editProfile' value={location} onChange={(e) => setLocation(e.target.value)} name='location' className={`border border-white/20 rounded-[4px] py-4 px-2 ${userProfiles.location && "text-white"}`} placeholder='Location' />
                                <input form='form-editProfile' value={website} onChange={(e) => setWebsite(e.target.value)} name='website' className={`border border-white/20 rounded-[4px] py-4 px-2 ${userProfiles.website && "text-white"}`} placeholder='Website' />
                            </div>

                            {
                                open ? (
                                    <div className='px-4 mt-4'>
                                        <div className='flex text-white font-bold text-base'>
                                            <div className=''>Birth date</div>
                                            <DotIcon className='text-white/50' />
                                            <div className='text-blue-400 cursor-pointer font-medium' onClick={() => setOpen(false)}>Cancel</div>
                                        </div>
                                        <div className='text-white text-xl space-x-3'>
                                            <div className='text-base text-white/50'>This should be the date of birth of the person using the account. Even if you're making an account for your business, event, or cat.</div>
                                            <div className='text-base text-white/50'>X uses your age to customize your experience, including ads, as explained in our <span className='text-blue-400 cursor-pointer'>Privacy Policy</span> .</div>
                                            <select name="birthMonth" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className="bg-black px-22 py-4 text-base rounded-sm mt-4 border border-white/30 active:border-blue-400 cursor-pointer">
                                                <option disabled value={""}>Months</option>
                                                {
                                                    months.map((month) => (
                                                        <option key={month} value={month}> {month} </option>
                                                    ))
                                                }
                                            </select>
                                            <select name="birthDay" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} className="bg-black px-9 py-4 text-base rounded-sm mt-4 border border-white/30 active:border-blue-400 cursor-pointer">
                                                <option disabled value={""}>Days</option>
                                                {
                                                    days.map((day) => (
                                                        <option key={day} value={day}> {day} </option>
                                                    ))
                                                }
                                            </select>
                                            <select name="birthYear" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className="bg-black px-10 py-4 text-base rounded-sm mt-4 border border-white/30 active:border-blue-400 cursor-pointer">
                                                <option disabled value={""}>Years</option>
                                                {
                                                    years.map((year) => (
                                                        <option key={year} value={year}> {year} </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='px-4 mt-4'>
                                        <div className='flex'>
                                            <div className=''>Birth date</div>
                                            <DotIcon />
                                            <div className='text-blue-400 cursor-pointer' onClick={() => setOpen(true)}>Edit</div>
                                        </div>
                                        <div className='text-white text-xl'> {userProfiles.birthDate} </div>
                                    </div>
                                )
                            }

                            <div className='mt-4 cursor-pointer'>
                                <div className='text-white text-xl hover:bg-white/10 px-4 py-2 flex items-center'>
                                    <div>
                                        Create expanded bio
                                    </div>
                                    <IoIosArrowForward className='ml-auto text-white/40' />
                                </div>
                                <div className='text-white text-xl hover:bg-white/10 px-4 py-2 flex items-center'>
                                    <div>
                                        Edit professional profile
                                    </div>
                                    <IoIosArrowForward className='ml-auto text-white/40' />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </form>
        </Dialog>


    )
}

export default EditProfile