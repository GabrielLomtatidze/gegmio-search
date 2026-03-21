"use client"
import { useState } from "react"


export default function Card() {

    const [checked, setCheckeed] = useState<boolean>(false);

    return (
        <>
            <div className="w-[252px] h-[260px] border-[1px] border-[#2b2b2b] rounded-xl">
                <div className="w-full h-[180px] p-[20px]">
                    <div className="w-full flex justify-between">
                        <div className="inline-flex pt-[8px] px-[12px] backdrop-blur-xl bg-white/5 rounded-2xl items-center gap-2">
                            <div className="w-[8px] h-[8px] bg-[#00d34d] rounded-full" />
                            <h3>ღიაა ახლა</h3>
                        </div>
                        <div className="w-[32px] h-[32px] backdrop-blur-xl bg-white/5 rounded-full flex justify-center items-center" onClick={() => setCheckeed(!checked)}>
                            <img src={`/images/${checked ? "fill-heart.png" : "heart.png"}`} alt="" className="w-5 h-5 object-contain" />
                        </div>
                    </div>

                    {/* <img src="" alt="" /> */}
                </div>
            </div>
        </>
    )
}