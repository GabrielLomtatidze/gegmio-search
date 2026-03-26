"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";


type Errors = {
  num: string;
  email: string;
  password: string;
  repeatPass: string;
  checkbox: string;
};

export default function RegistrationPage() {

  const t = useTranslations();
  const router = useRouter();

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showRepeatPass, setShowRepeatPass] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDay] = useState<string>("");
  const [selectedGenderId, setSelectedGenderId] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPass, setRepeatPass] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<Errors>({
    num: "",
    email: "",
    password: "",
    repeatPass: "",
    checkbox: "",
  });

  const sendUserData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const newErrors: Errors = {
      num: "",
      email: "",
      password: "",
      repeatPass: "",
      checkbox: "",
    };

    if (!email || email.trim().length < 5 || !email.includes("@") || !email.includes(".") || /\s/.test(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("auth.errors.valid_email");
    }

    if (!password) newErrors.password = t("auth.errors.password_required");
    else if (password.length < 8 || password.length > 64) newErrors.password = t("auth.errors.password_length");
    else if (!/[A-Z]/.test(password)) newErrors.password = t("auth.errors.password_uppercase");
    else if (!/[a-z]/.test(password)) newErrors.password = t("auth.errors.password_lowercase");
    else if (!/[0-9]/.test(password)) newErrors.password = t("auth.errors.password_digit");
    else if (!/[^\w\s]/.test(password)) newErrors.password = t("auth.errors.password_symbol");
    else if (/\s/.test(password)) newErrors.password = t("auth.errors.password_whitespace");

    if (repeatPass !== password) newErrors.repeatPass = "Password not match";

    if (!isChecked) newErrors.checkbox = "Checkbox required";

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (hasError) return;

    setLoading(true);
    try {
      await axios.post(`https://bookitcrm.runasp.net/api/v1/account/register`, {
        firstName,
        lastName,
        birthDate,
        email,
        phoneNumber: "",
        genderId: selectedGenderId, password
      },
        {
          headers: {
            "Accept-Language": "en-EN",
            "Content-Type": "application/json",
          },
        });
      router.push("/auth/otp");
    } catch (error: any) {
      console.log("Server error:", error.response?.data?.detail);
      if (error.response?.data?.detail) setErrors({ ...newErrors, email: "Email already used" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[376px] h-[726px] p-6 rounded-2xl bg-[rgba(20,20,20,0.75)] backdrop-blur-xl border border-[#2B2B2B] shadow-2xl text-white">
      <h1 className="text-center text-[20px] font-semibold">{t("auth.create_profile")}</h1>
      <p className="text-center text-sm text-gray-400 mt-1 mb-6">
        დარეგისტრირდი და მიიღე წვდომა სერვისებზე
      </p>

      <form className="flex flex-col gap-4" onSubmit={sendUserData}>
        <div>
          <label className="text-sm textwhite0 mb-1 block">სახელი</label>
          <input
            placeholder="სახელი"
            className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm textwhite0 mb-1 block">გვარი</label>
          <input
            placeholder="გვარი"
            className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-white mb-1 block">დაბადების თარიღი</label>
          <input
            type="date"
            className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none"
            onChange={(e) => setBirthDay(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-white mb-1 block">ელ-ფოსტა</label>
          <input
            placeholder="your@gmail.com"
            className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="text-sm text-white mb-1 block">პაროლი</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="********"
              className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b] focus:border-[#F94B00] focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-1 block">გაიმეორე პაროლი</label>
          <div className="relative">
            <input
              type={showRepeatPass ? "text" : "password"}
              placeholder="********"
              className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b]"
              onChange={(e) => setRepeatPass(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowRepeatPass(!showRepeatPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
            >
              {showRepeatPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.repeatPass && <p className="text-red-500 text-sm mt-1">{errors.repeatPass}</p>}
        </div>

        <label className="flex items-center gap-2 text-sm mt-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="accent-[#F94B00]"
          />
          ვეთანხმები{" "}
          <span className="text-[#F94B00] underline cursor-pointer">წესებს & პირობებს</span>
        </label>
        {errors.checkbox && <p className="text-red-500 text-sm mt-1">{errors.checkbox}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-3 h-[56px] rounded-xl bg-[#F94B00] font-medium"
        >
          შექმენი ანგარიში
        </button>
      </form>
    </div>
  );
}
