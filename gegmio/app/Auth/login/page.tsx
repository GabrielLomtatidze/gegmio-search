"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {

    const [email, setEmail] = useState<string>("");
    const [showConfirm, setShowConfirm] = useState<boolean>(false);


    const [showRepeatPass, setShowRepeatPass] = useState<boolean>(false);


    return (
        <>

            <div className="w-[376px] p-6 rounded-2xl bg-[rgba(20,20,20,0.75)] backdrop-blur-xl border border-[#2B2B2B] shadow-2xl text-white">

                <h1 className="text-center text-[20px] font-semibold">
                    შენს ანგარიშში
                </h1>

                <p className="text-center text-sm text-gray-400 mt-1 mb-6">
                    დარეგისტრირდი და გამოიყენე ჩვენი სერვისები
                </p>

                <form className="flex flex-col gap-4">

                    <div>
                        <label className="text-sm text-gray-300 mb-1 block">
                            ელ-ფოსტა
                        </label>
                        <input placeholder="your@gmail.com" className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none transition" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm text-gray-300">
                                პაროლი
                            </label>
                            <span className="text-sm text-[#F94B00] cursor-pointer hover:underline">
                                დაგავიწყდა პაროლი?
                            </span>
                        </div>
                        <div className="relative">
                            <input type={showConfirm ? "text" : "password"} placeholder="********" className="w-full h-[52px] rounded-xl px-4 flex justtify-center items-center bg-transparent border border-[#2b2b2b]" />
                            <button type="button" onClick={() => setShowRepeatPass(!setShowRepeatPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white" >
                                {showRepeatPass ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <input type="checkbox" className="w-5 h-5 accent-[#F94B00]" />
                        <span className="text-sm text-gray-300">
                            დამახსოვრება
                        </span>
                    </div>

                    <button type="submit" className="w-full h-[52px] mt-3 rounded-xl bg-[#F94B00] hover:bg-[#ff5a1a] transition font-medium" >
                        შესვლა
                    </button>

                </form>
            </div>
        </>
    )
}