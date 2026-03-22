"use client";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";

type ProfileDetails = {
    id: string;
    name: string;
    description: string;
    webSite: string;
    tikTok: string;
    instagram: string;
    facebook: string;
    businessAddressName: string;
    latitude: number;
    longitude: number;
    distnace: number;
    serviceCount: number;
    isFavorite: boolean;
    businessBookingTime: {
        businessBookingTimeTypeId: number;
        name: string;
        bookingStartTime: string;
        bookingEndTime: string;
    }[];
    files: {
        id: number;
        url: string;
        isProfile: boolean;
    }[];
};

export default function Business() {
    const params = useParams();
    const id = params?.id as string;

    const [businessDetails, setBusinessDetails] =
        useState<ProfileDetails | null>(null);
    const [favorite, setFavorite] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;

        const getBusinessDetails = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                const response = await axios.get(
                    `https://bookitcrm.runasp.net/api/v1/public/${id}`,
                    {
                        ...(accessToken && {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }),
                    }
                );

                const data = response.data;

                setBusinessDetails(data);
                setFavorite(data.isFavorite);
            } catch (error) {
                console.error("error fetching businessDetails data: ", error);
            } finally {
                setLoading(false);
            }
        };

        getBusinessDetails();
    }, [id]);

    if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
    if (!businessDetails)
        return <p className="text-white text-center mt-10">No data found</p>;

    const images = businessDetails.files || [];

    return (
        <>
            <div className="bg-[#0F0F0F]">
                <Header />

                <div className="w-full flex justify-center sticky top-0 z-30 ">
                    <div className="text-white flex justify-between items-center max-w-7xl w-full px-4 py-5 md:px-[100px]">
                        <a href="/">
                            <div className="flex items-center gap-3 cursor-pointer">
                                <div className="w-[42px] h-[42px] border border-[#2b2b2b] rounded-full flex justify-center items-center">
                                    <img src="/images/arrow_left.svg" alt="back" />
                                </div>
                                <h3 className="text-[#a7a7a7]">უკან დაბრუნება</h3>
                            </div>
                        </a>

                        <div className="flex items-center gap-3">
                            <div className="px-3 py-2 border border-[#2b2b2b] bg-[#141414] rounded-full flex items-center">
                                <h4 className="font-bold">1.5 კმ</h4>
                                <img src="/images/map_pin.svg" alt="map" className="w-[12px] ml-2" />
                            </div>

                            <div onClick={() => setFavorite(!favorite)} className="w-[42px] h-[42px] border border-[#2b2b2b] bg-[#141414] rounded-full flex justify-center items-center cursor-pointer">
                                <img src={favorite ? "/images/heart_filled.svg" : "/images/heart.svg"} alt="favorite" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl w-full mx-auto px-4 md:px-[100px] py-6">
                    <div className="flex gap-[5px] h-[417px]">

                        <div className="w-1/2 relative">
                            {images[0] && (
                                <img src={images[0].url} alt="main" className="w-full h-full object-cover rounded-2xl" />
                            )}
                        </div>

                        <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-[5px]">
                            {images.slice(1, 5).map((img, index) => (
                                <div key={img.id} className="relative">
                                    <img src={img.url} alt={`img-${index}`} className="w-full h-full object-cover rounded-xl" />

                                    {index === 3 && images.length > 5 && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-2xl font-bold rounded-xl">
                                            +{images.length - 5}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <Footer />
            </div>
        </>

    );
}