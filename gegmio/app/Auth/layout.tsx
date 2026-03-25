import RegistrationPage from "@/app/Auth/registration/page";
import Login from "./login/page";

export default function Registration() {

    return (

        <>
            <div className="min-h-screen bg-[url('/images/gegmio_background.svg')] bg-cover bg-center bg-no-repeat flex justify-center items-center">

                <Login />
                {/* <RegistrationPage /> */}

            </div>

        </>
    )
}