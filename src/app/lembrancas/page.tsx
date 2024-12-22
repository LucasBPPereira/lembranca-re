import { LembrancaContainer } from "@/components/LembrancasContainer";

// const mock = [
//   {
//     key: 1,
//     title: "Testando de novo",
//     content:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, delectus deleniti id quos iure dignissimos voluptatum sit ullam error eligendi autem consectetur doloribus cumque unde voluptas minus perspiciatis explicabo provident.",
//     category: "Praia",
//     color: "#fafafa",
//     date: "24/12/20024",
//   },
//   {
//     key: 2,
//     title: "Testando",
//     content:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, delectus deleniti id quos iure dignissimos voluptatum sit ullam error eligendi autem consectetur doloribus cumque unde voluptas minus perspiciatis explicabo provident.",
//     category: "Praia",
//     color: "#da1818",
//     date: "24/12/20024",
//   },
//   {
//     key: 3,
//     title: "novo",
//     content:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, delect.",
//     category: "Praia",
//     color: "#fafafa",
//     date: "24/12/20024",
//   },
// ];

export default async function PageLembrancas() {
  const dados = await fetch("http://localhost:3000/api/r/lemb", {
    cache: "no-cache",
  });
  const response = await dados.json();
  const mock = response.mock;

  return (
    <div className="bg-gradient-to-tr from-[#d0e9f8] to-sky-50 w-full h-screen flex flex-col">
      <LembrancaContainer props={mock} />
    </div>
  );
}
