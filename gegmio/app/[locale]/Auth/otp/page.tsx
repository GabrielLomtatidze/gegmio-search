import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";

export default function Otp() {

    const [otp, setOtp] = useState<string>("")


    return (
        <div className="w-[376px] h-[302px] p-6 rounded-2xl bg-[rgba(20,20,20,0.75)] backdrop-blur-xl border border-[#2B2B2B] shadow-2xl text-white flex flex-col items-center justify-between">

            <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold">ვერიფიკაცია</h2>
                <p className="text-[12px] text-[#a7a7a7]">
                    კოდი გამოგზავნილია მითითებულ ელ-ფოსტაზე
                </p>
            </div>

            <InputOTP maxLength={6} onChange={setOtp}>
                <InputOTPGroup className="gap-2">
                    {[0, 1, 2].map((i) => (
                        <InputOTPSlot
                            key={i}
                            index={i}
                            className="w-10 h-12 rounded-lg text-lg transition-all border border-[#2B2B2B] bg-transparent text-white outline-none focus:ring-0 data-[active=true]:border-[#F94B00] data-[active=true]:bg-[#F94B00]/10 data-[filled=true]:bg-[#F94B00]/20 data-[filled=true]:text-white" />
                    ))}
                </InputOTPGroup>

                <InputOTPSeparator className="mx-2 text-gray-500" />

                <InputOTPGroup className="gap-2">
                    {[3, 4, 5].map((i) => (
                        <InputOTPSlot
                            key={i}
                            index={i}
                            className="w-10 h-12 rounded-lg text-lg transition-all border border-[#2B2B2B] bg-transparent text-white outline-none focus:ring-0 data-[active=true]:border-[#F94B00] data-[active=true]:bg-[#F94B00]/10 data-[filled=true]:bg-[#F94B00]/20 data-[filled=true]:text-white"/>
                    ))}
                </InputOTPGroup>
            </InputOTP>

            <button className="w-full h-12 rounded-xl bg-[#F94B00] transition font-medium cursor-pointer">
                რეგისტრაცია
            </button>

            <p className="text-[14px] text-white">
                არ მოვიდა კოდი?{" "}
                <span className="text-[#F94B00] cursor-pointer hover:underline">
                    გაგზავნა
                </span>
            </p>
        </div>
    )
}