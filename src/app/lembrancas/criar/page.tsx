import { FormCreateLemb } from "@/components/Form/FormCreateLemb";
import { MainComponent } from "@/components/ind/MainComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "| RM - Criar Lembrança |",
    description: "Um aplicativo para que seja possível anotar nossas lembranças!",
  };

export default function PageCriarLembranca() {
    return (
    <MainComponent className="bg-blue-50 justify-center items-center">
        <FormCreateLemb />
    </MainComponent>
    )
}