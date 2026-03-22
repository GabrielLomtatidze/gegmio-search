

export default function ErrorPage() {

    return (
        <>
            <div className="w-full flex justify-center sticky top-0 z-30 ">
                <div className="text-white flex justify-between items-center max-w-7xl w-full px-4 py-5 md:px-[100px]">
                    <a href="/">
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="w-[42px] h-[42px] border border-[#2b2b2b] rounded-full flex justify-center items-center">
                                <img src="/images/arrow_left.svg" alt="back" />
                            </div>
                            <h3 className="text-[#a7a7a7]">უკან დაბრუნება</h3>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}