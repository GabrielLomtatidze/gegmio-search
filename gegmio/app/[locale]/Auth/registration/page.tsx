
"use client";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/User/authStore";

type Gender = {
  id: number;
  name: string;
};

type Errors = {
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  email: string;
  password: string;
  repeatPass: string;
  checkbox: string;
};

export default function RegistrationPage() {
  const t = useTranslations();
  const router = useRouter();
  const { setUserEmail, setUserPassword } = useAuthStore()

  const onlyLettersEnter = /^[a-zA-Zა-ჰ\s]+$/;

  const [genderOptions, setGenderOptions] = useState<Gender[]>([]);
  const [selectedGenderId, setSelectedGenderId] = useState<number | null>(1);

  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDay] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Errors>({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    email: "",
    password: "",
    repeatPass: "",
    checkbox: "",
  });

  useEffect(() => {
    const getGender = async () => {
      try {
        const res = await axios.get(`https://bookitcrm.runasp.net/api/v1/account/gender-dropdown`);
        setGenderOptions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGender();
  }, []);

  const sendUserData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const newErrors: Errors = {
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      email: "",
      password: "",
      repeatPass: "",
      checkbox: "",
    };

    if (!firstName) newErrors.firstName = "First name required";
    else if (!onlyLettersEnter.test(firstName)) newErrors.firstName = "Only letters allowed";
    else if (firstName.length >= 50) newErrors.firstName = "Max 50 characters";

    if (!lastName) newErrors.lastName = "Last name required";
    else if (!onlyLettersEnter.test(lastName)) newErrors.lastName = "Only letters allowed";
    else if (lastName.length >= 50) newErrors.lastName = "Max 50 characters";

    if (!selectedGenderId) newErrors.gender = "Select gender";

    if (!birthDate) {
      newErrors.age = "Birth date required";
    } else {
      const today = new Date();
      const bd = new Date(birthDate);

      const age = today.getFullYear() - bd.getFullYear();
      const m = today.getMonth() - bd.getMonth();
      const d = today.getDate() - bd.getDate();

      if (age < 18 || (age === 18 && (m < 0 || (m === 0 && d < 0)))) {
        newErrors.age = "Must be 18+";
      }
    }

    if (
      !email ||
      email.length < 5 ||
      !email.includes("@") ||
      !email.includes(".") ||
      /\s/.test(email)
    ) {
      newErrors.email = t("auth.errors.valid_email");
    }

    if (!password) newErrors.password = t("auth.errors.password_required");
    else if (password.length < 8 || password.length > 64)
      newErrors.password = t("auth.errors.password_length");
    else if (!/[A-Z]/.test(password))
      newErrors.password = t("auth.errors.password_uppercase");
    else if (!/[a-z]/.test(password))
      newErrors.password = t("auth.errors.password_lowercase");
    else if (!/[0-9]/.test(password))
      newErrors.password = t("auth.errors.password_digit");
    else if (!/[^\w\s]/.test(password))
      newErrors.password = t("auth.errors.password_symbol");
    else if (/\s/.test(password))
      newErrors.password = t("auth.errors.password_whitespace");

    if (repeatPass !== password)
      newErrors.repeatPass = "Password not match";

    if (!isChecked)
      newErrors.checkbox = "Checkbox required";

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (hasError) return;

    setLoading(true);

    try {
      await axios.post(
        `https://bookitcrm.runasp.net/api/v1/account/register`,
        {
          firstName,
          lastName,
          birthDate: new Date(birthDate).toISOString(),
          email,
          genderId: selectedGenderId,
          password,
        },
        {
          headers: {
            "Accept-Language": "en-EN",
            "Content-Type": "application/json",
          },
        }
      );

<<<<<<< HEAD
      setUserEmail(email);
      setUserPassword(password);
=======
>>>>>>> 11b5b728c13906a32e28cfb04e6951391486ff96
      router.push("/auth/otp");
    } catch (error: any) {
      if (error.response?.data?.detail) {
        setErrors((prev) => ({
          ...prev,
          email: "Email already used",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[376px] h-[726px] p-6 rounded-2xl bg-[rgba(20,20,20,0.75)] backdrop-blur-xl border border-[#2B2B2B] shadow-2xl text-white">
      <h1 className="text-center text-[20px] font-semibold">
        {t("auth.create_profile")}
      </h1>

      <p className="text-center text-sm text-gray-400 mt-1 mb-6">
        დარეგისტრირდი და მიიღე წვდომა სერვისებზე
      </p>

      <form className="flex flex-col gap-4" onSubmit={sendUserData}>
<<<<<<< HEAD

=======
        
>>>>>>> 11b5b728c13906a32e28cfb04e6951391486ff96
        <div>
          <label className="text-sm mb-1 block">სახელი</label>
          <input
            className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b]"
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div>
          <label className="text-sm mb-1 block">გვარი</label>
          <input
            className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b]"
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        <div>
          <label className="text-sm mb-1 block">დაბადების თარიღი</label>
          <input
            type="date"
            className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b]"
            onChange={(e) => setBirthDay(e.target.value)}
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

        <div>
          <label className="text-sm mb-1 block">Gender</label>
          <select
            className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b]"
            onChange={(e) => setSelectedGenderId(Number(e.target.value))}
          >
            <option value="">Select gender</option>
            {genderOptions.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <label className="text-sm mb-1 block">ელ-ფოსტა</label>
          <input
            className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b]"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="text-sm mb-1 block">პაროლი</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2">
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <label className="text-sm mb-1 block">გაიმეორე პაროლი</label>
          <div className="relative">
            <input
              type={showRepeatPass ? "text" : "password"}
              className="w-full h-[52px] rounded-xl px-4 bg-transparent border border-[#2b2b2b]"
              onChange={(e) => setRepeatPass(e.target.value)}
            />
            <button type="button" onClick={() => setShowRepeatPass(!showRepeatPass)} className="absolute right-4 top-1/2 -translate-y-1/2">
              {showRepeatPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.repeatPass && <p className="text-red-500 text-sm">{errors.repeatPass}</p>}
        </div>

        <label className="flex items-center gap-2 text-sm mt-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="accent-[#F94B00]"
          />
          ვეთანხმები{" "}
          <span className="text-[#F94B00] underline cursor-pointer">
            წესებს & პირობებს
          </span>
        </label>
        {errors.checkbox && <p className="text-red-500 text-sm">{errors.checkbox}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-3 h-[56px] rounded-xl bg-[#F94B00] font-medium"
        >
          {loading ? "Loading..." : "შექმენი ანგარიში"}
        </button>
      </form>
    </div>
  );
}