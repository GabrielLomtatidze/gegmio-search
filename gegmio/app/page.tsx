"use client";
import Header from "./components/header";
import Footer from "./components/footer";
import Card from "./components/card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const [business, setBusiness] = useState<any>();

  const getBusiness = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const params = {
        // RegionId: regionId,
        // Latitude: latitude,
        // Longitude: longitude,
        // DistrictIds: districtIds.length ? districtIds : undefined,
      };

      const response = await axios.get("https://bookitcrm.runasp.net/api/v1/public", {
        params,
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {},
      });

      setBusiness(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching business:", error);
    }
  };

  useEffect(() => {
    getBusiness()

  }, [])

  return (
    <>
      <Header />

      <div className="flex flex-wrap justify-center gap-6 mt-6 mb-6">
        {business?.map((item: any) => {
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
