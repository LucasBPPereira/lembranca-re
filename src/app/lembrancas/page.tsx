import { LembrancaContainer } from "@/components/LembrancasContainer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PageLembrancas() {
  const respostaGET = await fetch("http://localhost:3000/api/acc/pg", {
    method: "GET",
    headers: headers(),
    credentials: "include",
  });
  if (respostaGET.status === 401) {
    redirect("/login");
  }
  if (!respostaGET.ok) {  
    throw new Error(`Erro ao carregar dados: ${respostaGET.status}`);
  }
  let response;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/r/lemb`, {
      next: { revalidate: 5 },
    });
    if (!res.ok) throw new Error(`Erro na API: ${res.statusText}`);
    const data = await res.json();

    response = data.dados;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    response = [];
  }


  return (
    <div className="bg-gradient-to-tr from-[#d0e9f8] to-sky-50 w-full flex flex-col">
      <LembrancaContainer props={response} />
    </div>
  );
}
