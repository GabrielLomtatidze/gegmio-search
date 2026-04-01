"use client";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect } from "react";
import { useBusinessStore } from "@/zustand/APIs/public/businessStore";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import { useAuthPositionStore } from "@/zustand/User/userPositionStore";
import Profile from "./page/profile/page";
import Main from "./page/main/page";
import PrivacyPolicy from "./page/privacypolicy/page";
import { useUserStore } from "@/zustand/User/profileStore";


// wogofaj349@fftube.com

export default function Home() {

  const t = useTranslations();
  const router = useRouter(); ``
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale;
  const { guessMode } = useAuthPositionStore();
  const { fetchUserInfo } = useUserStore();


  useEffect(() => {

    if (guessMode) return;
    
    fetchUserInfo();
  }, []);


  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Header />

      {pathname === `/${locale}/page/privacypolicy` ? (
        <PrivacyPolicy />
      ) : (
        <>
          <Main />
        </>
      )}

      < Footer />
    </div>


  );
}
