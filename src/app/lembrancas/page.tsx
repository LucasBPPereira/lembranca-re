import { CardLembranca } from "@/components/Card/CardLembranca";
import { MainComponent } from "@/components/ind/MainComponent";

const mock = [
    {
    key: 1,
    title: "Testando de novo",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, delectus deleniti id quos iure dignissimos voluptatum sit ullam error eligendi autem consectetur doloribus cumque unde voluptas minus perspiciatis explicabo provident.",
    category: "Praia",
    color: "#fafafa",
    date: "24/12/20024"
},
    {
    key: 2,
    title: "Testando",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, delectus deleniti id quos iure dignissimos voluptatum sit ullam error eligendi autem consectetur doloribus cumque unde voluptas minus perspiciatis explicabo provident.",
    category: "Praia",
    color: "#fafafa",
    date: "24/12/20024"
},
    {
    key: 3,
    title: "novo",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, delect.",
    category: "Praia",
    color: "#fafafa",
    date: "24/12/20024"
},
]

export default function PageLembrancas() {
  return (
    <MainComponent className="bg-gradient-to-tr from-[#d0e9f8] to-sky-50">
        <div className="flex gap-5">
        <CardLembranca props={mock} />
        </div>
      
    </MainComponent>
  );
}
 