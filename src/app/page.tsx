import { MainComponent } from "@/components/ind/MainComponent";
import Image from "next/image";

import IMGCinnamorollComendo from "@/assets/images/cinnamoroll-comendo.png";
import IMGCinnamorollEstrelas from "@/assets/images/cinnamoroll-estrelas.png";
import IMGCinna from "@/assets/images/cinnamorollwebp.webp";
import Link from "next/link";

export default function Home() {
  const horaAtual = new Date().getHours();
  let cumprimento = "";
  if (horaAtual >= 18) {
    cumprimento = "boa noite.";
  } else if (horaAtual > 6 && horaAtual < 12) {
    cumprimento = "bom dia!";
  } else {
    cumprimento = "boa tarde!";
  }

  return (
    <MainComponent className=" bg-blue-50 justify-center items-center">
      <div className="relative max-w-96 h-[450px] min-mobile:h-64 border-2 border-sky-300 bg-white rounded-xl px-2 py-1 ">
        <h1 className="mt-5 font-bold text-black text-center">
          Olá, {cumprimento} O que deseja agora?
        </h1>
        <p className="text-black text-center">Já bebeu água?</p>
        <Image 
        src={IMGCinna}
        alt="Cina"
        width={280}
        height={280}
        className="absolute z-50 -top-36"
      />
        <nav className="h-72 min-mobile:h-40 flex flex-col min-mobile:flex-row justify-center items-center gap-5 mt-4">
          <div className="w-40 h-20 hover:h-36 focus-within:h-36 rounded-lg border-2 focus-within:border-violet-500 focus-within:shadow-lg hover:border-violet-400 transition-all duration-300">
            <Link href="/lembrancas/criar"  className="outline-none group flex flex-col justify-center items-center transition-all duration-300 w-full h-full rounded-lg hover:bg-violet-50 focus-visible:bg-violet-100">
              <div className="opacity-0 relative -top-4 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300">
                <Image 
                  src={IMGCinnamorollComendo}
                  alt="Cinnamoroll comendo rosquinha"
                  width={80}
                  height={80}
                />
              </div>
              <p className="-mt-20 group-hover:-mt-6 group-focus-visible:-mt-6 text-purple-950 group-hover:text-purple-600 group-focus-visible:text-purple-800 transition-all duration-300">Criar Lembrança</p>
            </Link>
          </div>
          <div className="w-40 h-20 hover:h-36 focus-within:h-36 rounded-lg border-2 focus-within:border-blue-500 focus-within:shadow-lg hover:border-blue-400 transition-all duration-300">
            <Link href="/lembrancas" className="outline-none group flex flex-col justify-center items-center transition-all duration-300 w-full h-full rounded-lg hover:bg-blue-100 focus-visible:bg-sky-50">
            <div className="opacity-0 relative -top-4 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300">
                <Image 
                  src={IMGCinnamorollEstrelas}
                  alt="Cinnamoroll feliz com estrelas em volta dele"
                  width={80}
                  height={80}
                />
              </div>
              <p className="-mt-20 group-hover:-mt-6 group-focus-visible:-mt-6 text-sky-950 group-hover:text-sky-600 group-focus-visible:bg-text-sky-800 transition-all duration-300">Ver lembranças</p>
            </Link>
          </div>
        </nav>
      </div>
    </MainComponent>
  );
}
