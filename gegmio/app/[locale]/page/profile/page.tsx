import { FaChevronRight } from 'react-icons/fa';
import { useTranslations } from "next-intl";


export default function Profile() {

    const t = useTranslations();

    return (

        <>
            <div className="w-full flex justify-center">
                <div className="text-white flex flex-col w-full max-w-7xl px-4 py-5 md:px-[100px]">

                    <a href="/">
                        <div className="flex items-center gap-3 cursor-pointer mb-6">
                            <div className="w-[42px] h-[42px] border border-[#2b2b2b] rounded-full flex justify-center items-center">
                                <img src="/images/arrow_left.svg" alt="back" />
                            </div>
                            <h3 className="text-[#a7a7a7]">{t("pages.back")}</h3>
                        </div>
                    </a>

                    <div className="w-full flex justify-start">
                        <div className="w-full border border-[#2b2b2b] rounded-xl p-6 text-white">

                            <div className="mb-6">
                                <h1 className="text-xl font-semibold">{t("pages.profile_title")}</h1>
                                <p className="text-[#a7a7a7] text-sm">{t("pages.profile_subtitle")}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="flex flex-col gap-2">
                                    <label className="text-[14px] text-white">{t("pages.full_name")}</label>
                                    <input
                                        type="text"
                                        placeholder={t("pages.full_name")}
                                        className="bg-transparent h-[48px] text-[14px] border border-[#2b2b2b] rounded-lg p-3 outline-none focus:border-white transition"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[14px] text-white">
                                        {t("pages.birth_date")}
                                    </label>
                                    <input
                                        type="date"
                                        className="bg-transparent h-[48px] text-[14px] border border-[#2b2b2b] rounded-lg p-3 outline-none focus:border-white transition"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[14px] text-white">{t("pages.email")}</label>
                                    <input
                                        type="email"
                                        placeholder="your@gmail.com"
                                        className="bg-transparent h-[48px] text-[14px] border border-[#2b2b2b] rounded-lg p-3 outline-none focus:border-white transition"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[14px] text-white">{t("pages.mobile_number")}</label>
                                    <input
                                        type="text"
                                        placeholder="555 555 555"
                                        className="bg-transparent h-[48px] text-[14px] border border-[#2b2b2b] rounded-lg px-4 py-3 outline-none focus:border-white transition"
                                    />
                                </div>

                            </div>

                            <div className="mt-6">
                                <div className="flex items-center justify-between bg-[#22140E] rounded-xl p-4 cursor-pointer hover:bg-[#22120c] transition">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFEDE5]">
                                            <img src="/images/lock.svg" alt="lock" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{t("pages.password_section")}</p>
                                            <p className="text-sm text-[#a7a7a7]">{t("pages.password_subtext")}</p>
                                        </div>
                                    </div>

                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFEDE5]">
                                        <FaChevronRight color="#F94B00" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button className="bg-[#2b2b2b] text-[#a7a7a7] px-6 py-3 rounded-lg cursor-not-allowed">{t("pages.save_changes")}</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}