"use client";
import Header from "./components/header";
import Footer from "./components/footer";
import Card from "./components/card";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useBusinessStore } from "@/zustand/APIs/public/businessStore";
import debounce from "lodash.debounce";

export default function Home() {

  const { businessStore, loading, fetchBusiness } = useBusinessStore();

  

  const [countedBusiness, setCountedBusiness] = useState<number>(0);
  const [search, setSearch] = useState<string>("")

  const debouncedFetchBusiness = useMemo(
    () =>
      debounce((query: string) => {
        fetchBusiness({ searchKey: query,});
      }, 500),
      
    [fetchBusiness]
    
  );

  useEffect(() => {
    if (search === "") {
      fetchBusiness({ searchKey: "" });
      
      return;
    }

    debouncedFetchBusiness(search);


    return () => debouncedFetchBusiness.cancel();
  }, [search]);
  
  


  return (
    <>
      <Header />

      <div className="w-full h-[42px] flex justify-center mt-[20px]">
        <div className="w-full h-full max-w-7xl flex">
          <div className="w-full flex gap-[12px] ">
            <div className="w-[272px] h-[42px] flex items-center bg-[#0f0f0f] px-4 border border-[#2b2b2b] rounded-xl focus-within:border-[#F94B00] transition">
              <Search className="w-5 h-5 text-white mr-3" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="რას ეძებ?" className="bg-transparent outline-none text-white placeholder-[#a7a7a7] w-full" />
            </div>
            <select id="fruits" className="border border-[#2b2b2b] bg-[#0f0f0f] p-[10px] rounded-xl">
              <option value="">ქალაქი</option>
              <option value="tbilisi">თბილისი</option>
              <option value="qutaisi">ქუთაისი</option>
              <option value="batumi">ბათუმი</option>
              <option value="ozurgeti">ოზურგეთი</option>
            </select>
            <select id="fruits" className="border border-[#2b2b2b] bg-[#0f0f0f] p-[10px] rounded-xl">
              <option value="">შენთან ახლოს</option>
              <option value="#">შორს</option>
              <option value="#1">შორიახლოს</option>
              <option value="#2">ძაან იქით</option>
            </select>
          </div>
          <div className="w-[109px] h-[20px] flex justify-center gap-[8px] items-center">
            <div className="w-[8px] h-[8px] bg-[#F94B00] rounded-full" />
            <h3 className="text-[16px] text-white font-bold">შედეგი</h3>
            <h3 className="text-[16px] text-[#a7a7a7] font-bold">({countedBusiness})</h3>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-6 mb-6 max-w-7xl mx-auto">
        {businessStore?.map((item: any) => {
          const distance = item.distance != null ? item.distance.toFixed(1) : null;
          const imageSource = item?.file?.url || "/images/start.svg";

          return (
            <Card
              key={item.id}
              businessId={item.id}
              isFavorite={item.isFavorite}
              title={item.name}
              image={imageSource}
              address={item.addressName}
              businessCategory={item.businessCategory.name}
              distance={distance}
            />
          );
        })}
      </div>

      <Footer />
    </>
  );
}
