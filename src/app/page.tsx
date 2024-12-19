import { MainComponent } from "@/components/ind/MainComponent";
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
    <MainComponent className="bg-blue-50 justify-center items-center">
      <div className="w-96 h-64 border-2 border-sky-300 bg-white border- rounded-xl px-2 py-1">
        <h1 className="mt-5 font-bold text-black text-center">
          Olá, {cumprimento} O que deseja agora?
        </h1>
        <p className="text-black text-center">Já bebeu água?</p>
        <nav className="flex justify-center gap-5 mt-4">
          <div className="w-40 h-36 rounded-lg border-2 focus-within:border-violet-500 focus-within:shadow-lg hover:border-violet-400 transition-all duration-300">
            <Link href="/lembrancas/criar" className="outline-none group flex flex-col justify-center items-center transition-all duration-300 w-full h-full rounded-lg hover:bg-violet-50 focus-visible:bg-violet-100">
              <p className="text-purple-950 group-hover:text-purple-600 group-focus-visible:text-purple-800 transition-colors duration-300">Criar Lembrança</p>
            </Link>
          </div>
          <div className="w-40 h-36 rounded-lg border-2 focus-within:border-blue-500 focus-within:shadow-lg hover:border-blue-400 transition-all duration-300">
            <Link href="" className="outline-none group flex flex-col justify-center items-center transition-all duration-300 w-full h-full rounded-lg hover:bg-blue-100 focus-visible:bg-sky-50">
              <p className="text-sky-950 group-hover:text-sky-600 group-focus-visible:bg-text-sky-800 transition-colors duration-300">Ver lembranças</p>
            </Link>
          </div>
        </nav>
      </div>
    </MainComponent>
  );
}
