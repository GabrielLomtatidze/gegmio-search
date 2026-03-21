"use client";
import { useState } from "react";

export default function Header() {

    const [lang, setLang] = useState("EN");

    return (
        <>
            <header className="border-b-2 border-b-[#242424] w-full flex justify-center bg-[#0F0F0F] sticky top-0 z-30 ">
                <div className="text-white flex justify-between items-center max-w-7xl w-full m-auto px-4 py-5 md:px-[100px]">
                    <a href="/" className="logo">
                        <img src="/images/logo.svg" alt="Gegmio Logo" />
                    </a>
                    <div className="w-[390px] h-[42px] flex justify-end items-center gap-2">
                        <div className="w-[42px] h-[42px] border-[1px] border-[#2b2b2b] rounded-xl flex justify-center items-center cursor-pointer">
                            <img src="/images/heart.svg" alt="Gegmio" />
                        </div>
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
                        <div className="md:hidden">
                            <img src="/images/menu_burger.svg" alt="burger" />
                        </div>
                    </div>

                </div>

            </header>
        </>
    )
}