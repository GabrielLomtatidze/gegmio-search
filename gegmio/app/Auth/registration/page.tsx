"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

// 47

type Errors = {
  num: string;
  email: string,
  password: string;
  repeatPass: string;
  checkbox: string;
}

export default function RegistrationPage() {

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showRepeatPass, setShowRepeatPass] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDay, setBirthDay] = useState<any>();
  const [selectedGenderId, setSelectedGenderId] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPass, setRepeatPass] = useState<string>("");
  const [isChecked, setIsChecnked] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false)

  const [errors, setErrors] = useState<Errors>({
    num: "",
    email: "",
    password: "",
    repeatPass: "",
    checkbox: "",
  })


  const sendUserData = async () => {

    if (loading) return;

    const newErrors: Errors = {
      num: "",
      email: "",
      password: "",
      repeatPass: "",
      checkbox: "",
    }

   
    if (!email || email.trim().length < 5) {
      // newErrors.email = t("auth.errors.valid_email");
    } else if (!email.includes("@")) {
      // newErrors.email = t("auth.errors.valid_email");
    } else if (!email.includes(".")) {
      // newErrors.email = t("auth.errors.valid_email");
    } else if (email.includes(" ")) {
      // newErrors.email = t("auth.errors.valid_email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // newErrors.email = t("auth.errors.valid_email");
    }

    if (!password) {
      // newErrors.password = t("auth.errors.password_required");
    } else if (password.length < 8 || password.length > 64) {
      // newErrors.password = t("auth.errors.password_length");
    } else if (!/[A-Z]/.test(password)) {
      // newErrors.password = t("auth.errors.password_uppercase");
    } else if (!/[a-z]/.test(password)) {
      // newErrors.password = t("auth.errors.password_lowercase");
    } else if (!/[0-9]/.test(password)) {
      // newErrors.password = t("auth.errors.password_digit");
    } else if (!/[^\w\s]/.test(password)) {
      // newErrors.password = t("auth.errors.password_symbol");
    } else if (/\s/.test(password)) {
      // newErrors.password = t("auth.errors.password_whitespace");
    }
    if (repeatPass !== password) {
      newErrors.repeatPass = "Passowrd not match"
    }

    if (!isChecked) {
      newErrors.checkbox ="checkbox required"
    }

    setErrors(newErrors);

    setLoading(true);

    const hasError = Object.values(newErrors).some((err) => err !== "");

    if (hasError) {
      setLoading(false);
      return;
    } else {

      if (loading) return;

      try {
        await axios.post(`https://bookitcrm.runasp.net/api/v1/account/register`, {
          firstName,
          lastName,
          birthDate: birthDay,
          email,
          phoneNumber: null,
          genderId: 1,
          password
        })


      } catch (error: any) {

        console.log("ciudaa:", error.response.data.detail);

        const serverErrors: Errors = {
          num: "",
          email: "",
          password: "",
          repeatPass: "",
          checkbox: "",
        };

        if (error.response?.data?.detail) {
          serverErrors.email = "Email used"
        }

        setErrors(serverErrors);

      } finally {
        setLoading(false)
      }
    };
  }


  return (
    <>
      <div className="w-[376px] h-[726px] p-6 rounded-2xl bg-[rgba(20,20,20,0.75)] backdrop-blur-xl border border-[#2B2B2B] shadow-2xl text-white">

        <h1 className="text-center text-[20px] font-semibold">
          შექმენი პროფილი
        </h1>

        <p className="text-center text-sm text-gray-400 mt-1 mb-6">
          დარეგისტრირდი და მიიღე წვდომა სერვისებზე
        </p>

        <form className="flex flex-col gap-4">

          <div>
            <label className="text-sm textwhite0 mb-1 block">
              სახელი
            </label>
            <input placeholder="სახელი" className="w-full h-[52px] rounded-xl px-4  bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none" onChange={((e) => setFirstName(e.target.value))} />
          </div>

          <div>
            <label className="text-sm textwhite0 mb-1 block">
              გვარი
            </label>
            <input placeholder="გვარი" className="w-full h-[52px] rounded-xl px-4  bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none" onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div>
            <label className="text-sm text-white mb-1 block">
              დაბადების თარიღი
            </label>
            <input type="date" className="w-full h-[52px] rounded-xl px-4  bg-transparent border border-[#2b2b2b] ocus:border-[#F94B00] focus:outline-none" onChange={(e) => e.target.value} />
          </div>

          <div>
            <label className="text-sm text-white mb-1 block">
              ელ-ფოსტა
            </label>
            <input placeholder="your@gmail.com" className="w-full h-[52px] rounded-xl px-4  bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="text-sm text-white mb-1 block">
              პაროლი
            </label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} placeholder="********" className="w-full h-[52px] rounded-xl px-4  bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none" onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              გაიმეორე პაროლი
            </label>
            <div className="relative">
              <input type={showConfirm ? "text" : "password"} placeholder="********" className="w-full h-[52px] rounded-xl px-4 flex justtify-center items-center bg-transparent border border-[#2b2b2b]" onChange={(e) => setRepeatPass(e.target.value)} />
              <button type="button" onClick={() => setShowRepeatPass(!setShowRepeatPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white" >
                {showRepeatPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm mt-2">
            <input type="checkbox" defaultChecked className="accent-[#F94B00]" />
            ვეთანხმები{" "}
            <span className="text-[#F94B00] underline cursor-pointer">
              წესებს & პირობებს
            </span>
          </label>

          <button className="mt-3 h-[56px] rounded-xl  bg-[#F94B00] transition font-medium mt-[10pz]" onClick={sendUserData}> შექმენი ანგარიში </button>

        </form>
      </div>

    </>

  );
}