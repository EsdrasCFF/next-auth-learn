import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main  className="container h-screen flex flex-col gap-5 items-center justify-center w-full ">
        <h1 className="text-3xl" >Home Page</h1>

        <div className="flex gap-5" >
          <Link   href="/signin"> <Button>Faça Login</Button></Link>

          <Link   href="/signup"> <Button>Cadastre-se</Button></Link>
        </div>
    </main>
  );
}
