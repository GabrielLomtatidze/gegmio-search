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
  const { setAuthenticated } = useAuthPositionStore();
  const { fetchUserInfo } = useUserStore();


  useEffect(() => {
    fetchUserInfo();
  }, []);



  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      router.replace(`/${locale}/auth/login`);
      setAuthenticated(false);
    }

    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          router.replace(`/${locale}/auth/login`);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [locale, router]);


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
