"use client";
import { useState } from "react";

// 47

export default function RegistrationPage() {
  
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  return (
    <>
      <div className="w-[376px] h-[726px] p-6 rounded-2xl bg-[rgba(20,20,20,0.75)] backdrop-blur-xl border border-[#2B2B2B] shadow-2xl text-white">

        <h1 className="text-center text-[20px] font-semibold">
          შექმენი პროფილი
        </h1>

        <p className="text-center text-sm text-gray-400 mt-1 mb-6">
          დარეგისტრირდი და მიიღე წვდომა სერვისებზე
        </p>

        <form className="flex flex-col gap-4">

          <div>
            <label className="text-sm textwhite0 mb-1 block">
              სახელი და გვარი
            </label>
            <input placeholder="სახელი გვარი" className="w-full h-[52px] rounded-xl px-4  bg-transparent border border-[#2b2b2b]"
            />
          </div>

          <div>
            <label className="text-sm text-white mb-1 block">
              დაბადების თარიღი
            </label>
            <input type="date" className="w-full h-[52px] rounded-xl px-4  bg-transparent border border-[#2b2b2b]"
            />
          </div>

          <div>
            <label className="text-sm text-white mb-1 block">
              ელ-ფოსტა
            </label>
            <input placeholder="your@gmail.com" className="w-full h-[52px] rounded-xl px-4  bg-transparent border border-[#2b2b2b]"
            />
          </div>

          <div>
            <label className="text-sm text-white mb-1 block">
              პაროლი
            </label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} placeholder="********" className="w-full h-[52px] rounded-xl px-4  bg-transparent border border-[#2b2b2b]"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
                👁
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              გაიმეორე პაროლი
            </label>
            <div className="relative">
              <input type={showConfirm ? "text" : "password"} placeholder="********" className="w-full h-[52px] rounded-xl px-4  bg-transparent border border-[#2b2b2b]" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white" >
                👁
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm mt-2">
            <input type="checkbox" defaultChecked className="accent-orange-500" />
            ვეთანხმები{" "}
            <span className="text-orange-500 underline">
              წესებს & პირობებს
            </span>
          </label>

          <button className="mt-3 h-[56px] rounded-xl  bg-orange-500 hover:bg-orange-600  transition font-medium"> შექმენი ანგარიში </button>

        </form>
      </div>

    </>

  );
}