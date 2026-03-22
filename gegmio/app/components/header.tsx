"use client";
import { useState } from "react";

export default function Header() {

    const [lang, setLang] = useState("EN");
    const [openProfileModal, setOpenProfileModal] = useState<boolean>(true);

    return (
        <>
            <header className="border-b-2 border-b-[#242424] w-full flex justify-center bg-[#0F0F0F] sticky top-0 z-30 ">
                <div className="text-white flex justify-between items-center max-w-7xl w-full m-auto px-4 py-5 md:px-[100px]">
                    <a href="/" className="logo">
                        <img src="/images/logo.svg" alt="Gegmio Logo" />
                    </a>
                    <div className="h-[42px] flex justify-end items-center gap-2">
                        {/* <div className="w-[42px] h-[42px] border-[1px] border-[#2b2b2b] rounded-xl flex justify-center items-center cursor-pointer">
                            <img src="/images/heart.svg" alt="Gegmio" />
                        </div> */}
                        <div className="hidden md:flex  w-[102px] h-[42px] border-[1px] border-[#2b2b2b] rounded-xl  p-[3px] flex items-center">
                            <div className="relative w-full h-full bg-[#111] rounded-full flex ">
                                <div className={`absolute top-0 h-full w-1/2 bg-[#F94B00] rounded-xl transition-all duration-300 ${lang === "EN" ? "left-0" : "left-1/2"}`} />

                                <button onClick={() => setLang("EN")} className={`w-1/2 z-10 text-sm font-semibold ${lang === "EN" ? "text-white" : "text-[#6C6C6C]"}`} >
                                    EN
                                </button>

                                <button onClick={() => setLang("GE")} className={`w-1/2 z-10 text-sm font-semibold ${lang === "GE" ? "text-white" : "text-[#6C6C6C]"}`} >
                                    GE
                                </button>
                            </div>
                        </div>
                        <button className="hidden md:block w-[214px] h-full bg-[#F94B00] rounded-xl text-white font-bold text-sm">
                            დაამატე ბიზნესი უფასოდ
                        </button>

                        <div className="relative hidden md:block">
                            <div className="px-[12px] py-[8px] border-[1px] border-[#2b2b2b] flex justify-center items-center rounded-xl gap-[8px] cursor-pointer" onClick={() => setOpenProfileModal(!openProfileModal)} >
                                <div className="w-[28px] h-[28px] bg-[#242424] rounded-full flex justify-center items-center">
                                    s
                                </div>
                                <h3 className="font-bold">shmagi</h3>
                                <img src="/images/arrow_down.svg" alt="arrow_down" />
                            </div>

                            {openProfileModal && (
                                <div className="absolute top-full right-0 mt-2 w-[209px] h-[237px] bg-[#0F0F0F] p-[14px] border border-[#2b2b2b] rounded-xl shadow-lg z-50 transition-all duration-300">

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2A2A2A] text-white font-semibold">
                                            I
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white text-sm font-medium truncate">Shmagi</p>
                                            <p className="text-[#9CA3AF] text-xs truncate">shmagi23@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="my-3 h-px bg-[#2b2b2b]" />

                                    <div className="flex flex-col gap-2">

                                        <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#1A1A1A] transition cursor-pointer">
                                            <img src="/images/grey_profile.svg" alt="profile" />
                                            <span className="text-[#a7a7a7] text-sm font-bold">ჩემი პროფილი</span>
                                        </button>

                                        <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#1A1A1A] transition cursor-pointer">
                                            <img src="/images/grey_heart.svg" alt="heart" />
                                            <span className="text-[#a7a7a7] text-sm font-bold">რჩეულები</span>
                                        </button>

                                    </div>

                                    <div className="mt-2">
                                        <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#1A1A1A] transition w-full cursor-pointer">
                                             <img src="/images/log_out.svg" alt="logout" />
                                            <span className="text-[#FF2A2A] text-sm font-bold">გასვლა</span>
                                        </button>
                                    </div>

                                </div>
                            )}
                        </div>

                        <div className="md:hidden">
                            <img src="/images/menu_burger.svg" alt="burger" />
                        </div>
                    </div>

                </div>

            </header>
        </>
    )
}