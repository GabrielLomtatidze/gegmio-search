<<<<<<< HEAD

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
=======
import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
>>>>>>> 11b5b728c13906a32e28cfb04e6951391486ff96
  return (
    <div className="min-h-screen bg-[url('/images/gegmio_background.svg')] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      {children}
    </div>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 11b5b728c13906a32e28cfb04e6951391486ff96
}