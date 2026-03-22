"use client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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
                                <>
                                    <img src={images[0].url} alt="main" className="w-full h-full object-cover rounded-2xl" />

                                    <div className="absolute bottom-3 left-3 inline-flex px-[12px] py-[6px] backdrop-blur-sm bg-black/50 rounded-2xl items-center gap-2">
                                        <div className="w-[8px] h-[8px] bg-[#00d34d] rounded-full" />
                                        <h3 className="text-white text-sm">ახლა ღიაა</h3>
                                    </div>
                                </>
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

                <div className="max-w-7xl w-full mx-auto mb-[20px] px-4 md:px-[100px] ">
                    <div className="h-[100px]">
                        <div className="w-full h-[43px] flex justify-between items-center">

                            <div className="flex h-full gap-2 items-center">
                                <h1 className="text-[26px] text-white font-bold">
                                    {businessDetails.name}
                                </h1>

                                <div className="flex gap-1 items-center">
                                    {[1, 2, 3, 4, 5].map((i) => {
                                        const rating = 3.5;
                                        if (rating >= i) {
                                            return <FaStar key={i} className="text-[#FFB83F]" />;
                                        } else if (rating >= i - 0.5) {
                                            return <FaStarHalfAlt key={i} className="text-[#FFB83F]" />;
                                        } else {
                                            return <FaRegStar key={i} className="text-[#FFB83F]" />;
                                        }
                                    })}
                                </div>
                            </div>

                            <a href="tel:+995555777777">
                                <button className="flex bg-[#00D34D] px-[16px] py-[12px] rounded-xl justify-center items-center gap-[8px] cursor-pointer">
                                    <img src="/images/call.svg" alt="call" />
                                    <h3 className="font-bold">+995 555 777 777</h3>
                                </button>
                            </a>
                        </div>

                        <div className="w-full h-[42px] flex justify-between items-center mt-[16px]">

                            <div className="h-[42px] flex justify-center items-center gap-[12px]">

                                <div className="flex max-h-[42px] px-[16px] py-[12px] max-w-[359px] border border-[#2b2b2b] rounded-xl items-center gap-[4px] overflow-hidden">
                                    <img src="/images/map_pin.svg" alt="map_pin" className="w-[12px] shrink-0" />
                                    <h3 className="text-[#a7a7a7] text-[14px] truncate">ქ.თბილისის,შალვა დადიანის 99 ა</h3>
                                    <img src="/images/arrow_right.svg" alt="arrow_right" className="relative left-[10px] shrink-0" />
                                </div>

                                <div className="flex max-h-[42px] px-[16px] py-[12px] max-w-[216px] border border-[#2b2b2b] rounded-xl items-center gap-[4px] overflow-hidden">
                                    <img src="/images/qisa.svg" alt="map_pin" className="w-[16px] shrink-0" />
                                    <h3 className="text-[#a7a7a7] text-[14px] truncate">პერსონაზე - <span className="text-white font-bold">45 ლარი +</span></h3>
                                </div>
                            </div>

                            <div className="h-[42px] flex gap-5">
                                <a href="https://www.facebook.com/profile.php?id=61583853083725" target="_blank" className="group w-[42px] h-[42px] border-3 border-[#2b2b2b] rounded-full flex items-center justify-center relative overflow-hidden">
                                    <img src="/images/facebook-big.svg" alt="Facebook" className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    <img src="/images/fill_facebook_icon.svg" alt="Facebook Hover" className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </a>
                                <a href="#" className="group w-[42px] h-[42px] border-3 border-[#2b2b2b] rounded-full flex items-center justify-center relative overflow-hidden">
                                    <img src="/images/tiktok-big.svg" alt="tiktok" className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    <img src="/images/fill_tiktok_icon.svg" alt="tiktok" className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </a>
                                <a href="#" className="group w-[42px] h-[42px] border-3 border-[#2b2b2b] rounded-full flex items-center justify-center relative overflow-hidden">
                                    <img src="/images/Linkedin.svg" alt="linkedin" className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                    <img src="/images/fill_linkedin_icon.svg" alt="linkedin" className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </a>
                            </div>

                        </div>

                    </div>
                </div>

                <Footer />
            </div>
        </>

    );
}