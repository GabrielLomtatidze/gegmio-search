import { useBusinessStoreId } from "@/zustand/APIs/public/businessStoreId"


export default function Details() {

    const { business } = useBusinessStoreId();

    return (
        <>
            <div className="w-full mt-[30px] mb-[100px] flex flex-col lg:flex-row gap-[24px] justify-between">

                <div className="w-full lg:w-[528px] bg-[#171717] rounded-xl p-[12px]">
                    <div className="w-full h-[20px] flex items-center">
                        <h3 className="text-[#a7a7a7] font-bold">სამუშაო საათები</h3>
                    </div>
                    <div>
                        {business?.businessBookingTime?.map((item, index) => (
                            <div key={index} className="w-full h-[48px] flex justify-between py-[12px] items-center border-t-[1px] border-[#2b2b2b]">
                                <div className="gap-[8px] flex items-center">
                                    <img src="/images/clock.svg" alt="clock" />
                                    <h4 className="font-bold">{item.name}</h4>
                                </div>
                                <h4>
                                    {item.bookingStartTime} - {item.bookingEndTime}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-[528px] h-[234px] bg-[#171717] rounded-xl p-[12px]">
                    <div className="w-full h-[20px] flex items-center">
                        <h3 className="text-[#a7a7a7] font-bold">საკონტაქტო ინფორმაცია</h3>
                    </div>
                    <div className="w-full h-[48px] flex gap-[8px] py-[12px] items-center">
                        <img src="/images/call.svg" alt="call" />
                        <h4 className="font-bold">+995 555 888 999</h4>
                    </div>
                    <div className="w-full h-[48px] flex gap-[8px] py-[12px] items-center border-t-[1px] border-[#2b2b2b]">
                        <img src="/images/map_pin.svg" alt="map_pin" className="w-[12px]" />
                        <h4 className="text-[#F94B00] underline">{business?.businessAddressName}</h4>
                    </div>
                    <div className="w-full py-[12px] border-t-[1px] border-[#2b2b2b]">
                        <h5 className="text-[#a7a7a7] text-[12px] font-bold">ოპიექტის შესახებ</h5>
                        <p className="text-[#a7a7a7] text-[12px] font-bold mt-[8px]">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, maiores? Dicta officia voluptatibus deserunt voluptatum dolores suscipit ipsum dolorem cupiditate distinctio enim, soluta repellat sint nihil expedita quis nemo nobis.
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}