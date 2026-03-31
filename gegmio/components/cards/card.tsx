"use client"
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuthPositionStore } from "@/zustand/User/userPositionStore";
import axios from "axios";

type Props = {
    businessId: string,
    isFavorite: boolean,
    title: string,
    image: string,
    address: string,
    businessCategory: string
    distance: string | null
}


export default function Card({ businessId, isFavorite, title, image, address, businessCategory, distance }: Props) {

    const t = useTranslations();
    const { guessMode } = useAuthPositionStore();

    const [heart, setHeart] = useState<boolean>(isFavorite);

    const addFavirite = async (): Promise<void> => {

        const accessToken = await localStorage.getItem("accessToken");

        try {
            if (!guessMode) {

                if (!heart) {

                    await axios.post(`https://bookitcrm.runasp.net/api/v1/favorites/${businessId}`, {}, {

                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${accessToken}`,
                            "Accept-Language": "ka-GE",
                        },
                    });
                } else {

                    await axios.delete(`https://bookitcrm.runasp.net/api/v1/favorites/${businessId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                }
                setHeart(!heart);
            }
        } catch (error) {
            console.log("save error");
        }
    }

    useEffect(() => {
        setHeart(isFavorite);
    }, [isFavorite]);

    return (
        <>
            <div className="w-[252px] h-[260px] border-[1px] border-[#2b2b2b] rounded-xl overflow-hidden">
                <div className="w-full h-[180px] relative">
                    <img src={image} alt="" className="w-full h-full object-cover" />

                    <div className="absolute inset-0">
                        <div className="flex flex-col justify-between h-full p-[10px]">
                            <div className="flex justify-between">
                                <div className="inline-flex px-[12px] backdrop-blur-sm bg-black/50 rounded-2xl items-center gap-2">
                                    <div className="w-[8px] h-[8px] bg-[#00d34d] rounded-full" />
                                    <h3 className="text-white">{t("components.profile_open_now")}</h3>
                                </div>

                                <div className="w-[32px] h-[32px] backdrop-blur-xl bg-black/40 rounded-full flex justify-center items-center cursor-pointer" onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addFavirite();
                                }}>
                                    <img src={`/images/${heart ? "fill-heart.svg" : "heart.svg"}`} alt="heart" className="w-5 h-5 object-contain" />
                                </div>
                            </div>

                            <div className="flex items-center gap-1 bg-black px-3 py-1 rounded-full w-fit z-10">
                                <h4 className="text-white text-sm">4.6</h4>
                                <img src="/images/start.svg" alt="star" className="w-4 h-4 object-contain" />
                            </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
                    </div>
                </div>

                <div className="p-[10px]">
                    <div className="w-full h-[18px] flex justify-between">
                        <h3 className="text-[14px] text-[#a7a7a7]">{businessCategory}</h3>
                        <div className="flex">
                            <h3 className="text-[14px] text-white">{distance} {t("components.distance")} </h3>
                            <img src="/images/map_pin.svg" alt="map icon" className="ml-[10px]" />
                        </div>
                    </div>
                    <h1 className="text-[16px] text-white mt-[2px]">{title}</h1>
                    <p className="text-[12px] text-[#a7a7a7] truncate">{address}</p>
                </div>
            </div>
        </>
    )
}