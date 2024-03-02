import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main  className="container flex flex-col gap-5 items-center justify-center w-full h-full">
        <h1>Home Page - Esdras</h1>

        <Link   href="/signin"> <Button>Faça Login</Button></Link>
        <Link   href="/signup"> <Button>Cadastre-se</Button></Link>
    </main>
  );
}
