"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import MenuService from "@/app/[locale]/leyout/menuServices";
import Reviews from "@/app/[locale]/leyout/reviews";
import Details from "@/app/[locale]/leyout/details";
import { useBusinessStoreId } from "@/zustand/APIs/public/businessStoreId";
import ErrorPage from "@/app/[locale]/leyout/errorPage";

export default function Business() {

    const params = useParams();
    const id = params?.id as string;

    const { business, loading, favorite, getBusinessById, toggleFavorite, } = useBusinessStoreId();

    const [selectedNavId, setSelectedNavId] = useState<number>(0);

    const navItems = [
        { id: 0, name: "მენიუ & სერვისები" },
        { id: 1, name: "შეფასებები" },
        { id: 2, name: "დეტალები" },
    ];

    useEffect(() => {
        if (id) {
            getBusinessById(id);
        }
    }, [id]);

    useEffect(() => {
        return () => {
            useBusinessStoreId.getState().reset();
        };
    }, []);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
                <Spinner color="#F94B00" />
            </div>
        );

    if (!business) return (<ErrorPage />);

    const images = business.files || [];
    const rating = 3.5;

    return (
        <div className="bg-[#0F0F0F]">
            <Header />

            <div className="w-full flex justify-center sticky top-0 z-30">
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
                            <img src="/images/map_pin.svg" className="w-[12px] ml-2" />
                        </div>

                        <div onClick={toggleFavorite} className="w-[42px] h-[42px] border border-[#2b2b2b] bg-[#141414] rounded-full flex justify-center items-center cursor-pointer">
                            <img src={favorite ? "/images/heart_filled.svg" : "/images/heart.svg"} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-[100px] py-6">
                <div className="flex gap-[5px] h-[417px]">
                    <div className="w-1/2">
                        {images[0] && (
                            <img src={images[0].url} className="w-full h-full object-cover rounded-2xl" />
                        )}
                    </div>

                    <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-[5px]">
                        {images.slice(1, 5).map((img) => (
                            <img key={img.id} src={img.url} className="w-full h-full object-cover rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>

            {/* INFO */}
            <div className="max-w-7xl mx-auto px-4 md:px-[100px]">
                <h1 className="text-white text-2xl font-bold">
                    {business.name}
                </h1>

                <div className="flex gap-1 mt-2 text-[#FFB83F]">
                    {[1, 2, 3, 4, 5].map((i) => {
                        if (rating >= i) return <FaStar key={i} />;
                        if (rating >= i - 0.5) return <FaStarHalfAlt key={i} />;
                        return <FaRegStar key={i} />;
                    })}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-[100px] mt-6">
                <div className="flex gap-6 border-b border-[#2b2b2b]">
                    {navItems.map((item) => (
                        <div key={item.id} onClick={() => setSelectedNavId(item.id)} className="cursor-pointer py-2 relative">
                            <h2
                                style={{ color: selectedNavId === item.id ? "#F94B00" : "#a7a7a7", }}>
                                {item.name}
                            </h2>

                            {selectedNavId === item.id && (
                                <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F94B00]" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    {selectedNavId === 0 && <MenuService />}
                    {selectedNavId === 1 && <Reviews />}
                    {selectedNavId === 2 && <Details />}
                </div>
            </div>

            <Footer />
        </div>
    );
}