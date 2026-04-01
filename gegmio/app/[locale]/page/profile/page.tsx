// "use client";
// import { FaChevronRight } from 'react-icons/fa';
// import { useTranslations } from "next-intl";
// import Header from '@/components/header';
// import Footer from '@/components/footer';
// import { useState } from 'react';
// import { Eye, EyeOff } from "lucide-react";
// import { useEffect } from 'react';
// import { useUserStore } from '@/zustand/User/profileStore';
// import axios from 'axios';


// interface Errors {
//     email: string;
//     password: string;
//     repeatPassword: string
// }

// export default function Profile() {

//     const t = useTranslations();
//     const { userInfo } = useUserStore()

//     const [openModal, setOpenModal] = useState<boolean>(false);
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [showPassword, setShowPassword] = useState<boolean>(false);
//     const [repeatPassword, setRepeatPassword] = useState<string>("");
//     const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
//     const [rememberMe, setRememberMe] = useState<boolean>(false);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [errors, setErrors] = useState<Errors>({ email: "", password: "", repeatPassword: "" });
//     const [timecounter, setTimeCounter] = useState<number>(30);
//     const [isTimerActive, setIsTimerActive] = useState<boolean>(false);


//     useEffect(() => {
//         if (isTimerActive && timecounter > 0) {
//             const interval = setInterval(() => {
//                 setTimeCounter((pTime) => pTime - 1);
//             }, 1000);

//             return () => clearInterval(interval);
//         } else if (timecounter <= 0) {
//             setIsTimerActive(false);
//             setTimeCounter(30);
//         }
//     }, [isTimerActive, timecounter]);



//     const getCode = async () => {
        
//         console.log(userInfo?.email)

//         try {
//             const accessToken: string | null = await localStorage.getItem("accessToken");

//             const newErrors: Errors = {
//                 email: "",
//                 password: "",
//                 repeatPassword: "",
//             }

//             if (userInfo?.email === email) {
//                 await axios.post(
//                     `https://bookitcrm.runasp.net/api/v1/account/password-reset?email=${(email)}`, null,
//                     {
//                         headers: {
//                             Accept: "*/*",
//                             "Accept-Language": "ka-GE",
//                             Authorization: `Bearer ${accessToken}`,
//                             "Content-Type": "application/json",
//                         },
//                     }
//                 );

//                 setIsTimerActive(true);

//             } else {
//                 newErrors.email = t("auth.errors.valid_email");
//             }
//             setErrors(newErrors);


//         } catch (error) {
//             console.log(error);
//         };
//     };

//     return (

//         <>
//             <div className="min-h-screen flex flex-col bg-[#0F0F0F]">

//                 <Header />
//                 <div className="w-full bg-[#0F0F0F] flex justify-center">
//                     <div className="text-white flex flex-col w-full max-w-7xl px-4 py-5 md:px-[100px]">

//                         <a href="/">
//                             <div className="flex items-center gap-3 cursor-pointer mb-6">
//                                 <div className="w-[42px] h-[42px] border border-[#2b2b2b] rounded-full flex justify-center items-center">
//                                     <img src="/images/arrow_left.svg" alt="back" />
//                                 </div>
//                                 <h3 className="text-[#a7a7a7]">{t("pages.back")}</h3>
//                             </div>
//                         </a>

//                         <div className="w-full flex justify-start">
//                             <div className="w-full border border-[#2b2b2b] rounded-xl p-6 text-white">

//                                 <div className="mb-6">
//                                     <h1 className="text-xl font-semibold">{t("pages.profile_title")}</h1>
//                                     <p className="text-[#a7a7a7] text-sm">{t("pages.profile_subtitle")}</p>
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                                     <div className="flex flex-col gap-2">
//                                         <label className="text-[14px] text-white">{t("pages.full_name")}</label>
//                                         <input
//                                             type="text"
//                                             placeholder={t("pages.full_name")}
//                                             className="bg-transparent h-[48px] text-[14px] border border-[#2b2b2b] rounded-lg p-3 outline-none focus:border-white transition"
//                                         />
//                                     </div>

//                                     <div className="flex flex-col gap-2">
//                                         <label className="text-[14px] text-white">
//                                             {t("pages.birth_date")}
//                                         </label>
//                                         <input
//                                             type="date"
//                                             className="bg-transparent h-[48px] text-[14px] border border-[#2b2b2b] rounded-lg p-3 outline-none focus:border-white transition"
//                                         />
//                                     </div>

//                                     <div className="flex flex-col gap-2">
//                                         <label className="text-[14px] text-white">{t("pages.email")}</label>
//                                         <input
//                                             type="email"
//                                             placeholder="your@gmail.com"
//                                             className="bg-transparent h-[48px] text-[14px] border border-[#2b2b2b] rounded-lg p-3 outline-none focus:border-white transition"
//                                         />
//                                     </div>

//                                     <div className="flex flex-col gap-2">
//                                         <label className="text-[14px] text-white">{t("pages.mobile_number")}</label>
//                                         <input
//                                             type="text"
//                                             placeholder="555 555 555"
//                                             className="bg-transparent h-[48px] text-[14px] border border-[#2b2b2b] rounded-lg px-4 py-3 outline-none focus:border-white transition"
//                                         />
//                                     </div>

//                                 </div>

//                                 <div className="mt-6" onClick={() => setOpenModal(true)}>
//                                     <div className="flex items-center justify-between bg-[#22140E] rounded-xl p-4 cursor-pointer hover:bg-[#22120c] transition">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFEDE5]">
//                                                 <img src="/images/lock.svg" alt="lock" />
//                                             </div>
//                                             <div>
//                                                 <p className="font-medium">{t("pages.password_section")}</p>
//                                                 <p className="text-sm text-[#a7a7a7]">{t("pages.password_subtext")}</p>
//                                             </div>
//                                         </div>

//                                         <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFEDE5]">
//                                             <FaChevronRight color="#F94B00" />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="mt-6 flex justify-end">
//                                     <button className="bg-[#2b2b2b] text-[#a7a7a7] px-6 py-3 rounded-lg cursor-not-allowed">{t("pages.save_changes")}</button>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {openModal && (
//                     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 z-9999 bg-opacity-70" onClick={() => setOpenModal(false)} >
//                         <div className="w-[376px] h-[494px] flex flex-col border border-[#2b2b2b] rounded-xl bg-[#0F0F0F] p-[24px]" onClick={(e) => e.stopPropagation()} >
//                             <div className="w-full flex flex-col justify-center items-center">
//                                 <h3 className="text-white text-[18px] font-bold">{t("auth.change_password")}</h3>
//                                 <p className="text-[#a7a7a7] mt-2 text-center">{t("auth.password_guideline")}</p>
//                             </div>
//                             <form className="flex flex-col gap-4 mt-[32px]" >
//                                 <div>
//                                     <label className="text-sm text-gray-300 mb-1 block">
//                                         {t("auth.email_label")}
//                                     </label>

//                                     <div className="relative">
//                                         <input
//                                             placeholder="your@gmail.com"
//                                             className="w-full h-[48px] rounded-xl text-white px-4 bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none transition"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
//                                         />

//                                         <button className="absolute right-2 top-1/2 -translate-y-1/2 px-[10px] py-[5px] text-sm bg-[#F94B00] text-white rounded-lg hover:opacity-90 transition cursor-pointer" onClick={getCode}>
//                                             {t("pages.get_code")}
//                                         </button>
//                                     </div>

//                                     {errors.email && (
//                                         <span className="text-red-500 text-sm">{errors.email}</span>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <div className="flex justify-between items-center mb-1">
//                                         <label className="text-sm text-gray-300">{t("auth.password_label")}</label>
//                                     </div>
//                                     <div className="relative">
//                                         <input
//                                             type={showPassword ? "text" : "password"}
//                                             placeholder="********"
//                                             className="w-full h-[48px] rounded-xl px-4 bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none transition"
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                         />
//                                         <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white" >
//                                             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                                         </button>
//                                     </div>
//                                     {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
//                                 </div>

//                                 <div>
//                                     <div className="flex justify-between items-center mb-1">
//                                         <label className="text-sm text-gray-300">{t("auth.repeat_password")}</label>
//                                     </div>
//                                     <div className="relative">
//                                         <input
//                                             type={showRepeatPassword ? "text" : "password"}
//                                             placeholder="********"
//                                             className="w-full h-[48px] rounded-xl px-4 bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none transition"
//                                             value={repeatPassword}
//                                             onChange={(e) => setRepeatPassword(e.target.value)}
//                                         />
//                                         <button type="button" onClick={() => setShowPassword(!showRepeatPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white" >
//                                             {showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                                         </button>
//                                     </div>
//                                     {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
//                                 </div>


//                                 <button type="submit" className="w-full h-[48px] mt-3 rounded-xl bg-[#F94B00] text-white font-medium cursor-pointer" disabled={loading}>
//                                     {loading ? "დელოდე..." : t("auth.change_password")}
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 )}

//                 <Footer />
//             </div>

//         </>
//     )
// }


"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

interface Errors {
  email?: string;
  password?: string;
  repeatPassword?: string;
  code?: string;
}

export default function ChangePasswordModal({ open, onClose, userEmail }: any) {
  const [email, setEmail] = useState(userEmail || "");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const [time, setTime] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time <= 0) {
      setTimerActive(false);
      setTime(30);
    }

    return () => clearInterval(interval);
  }, [timerActive, time]);

  // ✅ SEND CODE
  const handleGetCode = async (e: any) => {
    e.preventDefault();

    let newErrors: Errors = {};

    if (!email) {
      newErrors.email = "Email is required";
      return setErrors(newErrors);
    }

    try {
      const token = localStorage.getItem("accessToken");

      await axios.post(
        `https://bookitcrm.runasp.net/api/v1/account/password-reset`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTimerActive(true);
      setErrors({});
    } catch (err) {
      newErrors.email = "Failed to send code";
      setErrors(newErrors);
    }
  };

  // ✅ CHANGE PASSWORD
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let newErrors: Errors = {};

    if (!code) newErrors.code = "Code is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== repeatPassword)
      newErrors.repeatPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      await axios.post(
        `https://your-api.com/api/v1/account/change-password`,
        {
          email,
          code,
          newPassword: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose(); // close modal on success
    } catch (err) {
      setErrors({ password: "Failed to change password" });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/70 z-50"
      onClick={onClose}
    >
      <div
        className="w-[400px] bg-[#0F0F0F] p-6 rounded-xl border border-[#2b2b2b]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-lg font-bold text-center">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {/* EMAIL */}
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* CODE */}
          <div className="relative">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Verification Code"
              className="input w-full"
            />

            <button
              onClick={handleGetCode}
              className="absolute right-2 top-2 bg-orange-500 px-3 py-1 rounded text-sm"
              disabled={timerActive}
            >
              {timerActive ? `${time}s` : "Get Code"}
            </button>

            {errors.code && <p className="text-red-500">{errors.code}</p>}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          {/* REPEAT PASSWORD */}
          <div className="relative">
            <input
              type={showRepeatPassword ? "text" : "password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="Repeat Password"
              className="input w-full"
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword((p) => !p)}
              className="absolute right-3 top-3"
            >
              {showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.repeatPassword && (
              <p className="text-red-500">{errors.repeatPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 h-[45px] rounded text-white"
          >
            {loading ? "Loading..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}