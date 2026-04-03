"use client";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { useAuthPositionStore } from "@/zustand/User/userPositionStore";
import Main from "./page/main/page";
import PrivacyPolicy from "./page/privacypolicy/page";
import { useUserStore } from "@/zustand/User/profileStore";


// wogofaj349@fftube.com

export default function Home() {

  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale;
  const { isAuthenticated } = useAuthPositionStore();
  const { fetchUserInfo } = useUserStore();


  useEffect(() => {

    if (isAuthenticated) return;

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
