import { FormCreateLemb } from "@/components/Form/FormCreateLemb";
import { MainComponent } from "@/components/ind/MainComponent";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "| RM - Criar Lembrança |",
  description: "Um aplicativo para que seja possível anotar nossas lembranças!",
};

export default async function PageCriarLembranca() {
  const response = await fetch("http://localhost:3000/api/acc/pg", {
    method: "GET",
    headers: headers(),
    credentials: "include",
  });
  if (response.status === 401) {
    redirect("/login");
  } 
  if (!response.ok) {
      console.log("status é:",response.status);
      
      throw new Error(`Erro ao carregar dados: ${response.status}`);
  }
  
  return (
    <MainComponent className="h-full sm:h-screen bg-blue-50 justify-center items-center py-10">
      <FormCreateLemb />
    </MainComponent>
  );
}
