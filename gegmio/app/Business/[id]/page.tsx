"use client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

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

    const [businessDetails, setBusinessDetails] = useState<ProfileDetails | null>(null);
    const [favorite, setFavorite] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const images = businessDetails?.files?.map((f) => f.url) || [];

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
                setLoading(false);

                console.log("Fetched business details by ID:", id);
            } catch (error) {
                console.error("error fetching businessDetails data: ", error);
                setLoading(false);
            }
        };

        getBusinessDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;

    if (!businessDetails) return <p>No data found</p>;

    return (
        <>
            <Header />
            <div className="w-full flex justify-center sticky top-0 z-30 ">
                <div className="text-white flex justify-between items-center max-w-7xl w-full m-auto px-4 py-5 md:px-[100px]">
                    
                    <a href="/">
                        <div className="h-[42px] flex justify-center items-center  gap-[12px]">
                            <div className="w-[42px] h-[42px] border border-[#2b2b2b] rounded-full flex justify-center items-center mx-auto cursor-pointer">
                                <img src="/images/arrow_left.svg" alt="arrow_left" />
                            </div>
                            <h3 className="text-[#a7a7a7]">უკან დაბრუნება</h3>
                        </div>
                    </a>

                    <div className="h-full flex justofy-center items-center gap-[8px]">
                        <div className="p-2 border-[1px] border-[#2b2b2b] bg-[#141414] rounded-full flex justify-center items-center">
                            <h4 className="text-white font-bold">1.5 კმ</h4>
                            <img src="/images/map_pin.svg" alt="map-pin" className="w-[12px] ml-[10px]" />
                        </div>

                        <div className="w-[42px] h-[42px] border-[1px] border-[#2b2b2b] bg-[#141414] rounded-full flex justify-center items-center cursor-pointer">
                            <img src="/images/heart.svg" alt="Gegmio" />
                        </div>

                    </div>
                </div>
            </div>
            <div className="mt-10 mb-10">
                <h1>{businessDetails.name}</h1>
                <p>{businessDetails.description}</p>
                <p>{businessDetails.businessAddressName}</p>

                <div className="flex gap-2">
                    {images.map((img, index) => (
                        <img key={index} src={img} alt="business" className="w-32 h-32 object-cover" />
                    ))}
                </div>
            </div>
            <Footer />
        </>

    );
}