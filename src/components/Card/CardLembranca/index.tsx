"use client";

import { CalendarIcon } from "@/assets/icons/CalendarIcon";
import { BtnMenuCard } from "@/components/Button/MenuButtonCard";
import { TCardLembranca } from "@/types/CardLembrancaType";
import { Chip, Divider } from "@nextui-org/react";

export const CardLembranca = ({ props }: TCardLembranca) => {

  if (!Array.isArray(props)) {
    return <p>Nenhum dado encontrado.</p>; // Renderize algo quando os dados não forem um array
  }

  function verificaString(valor: string): string {
    if (valor.length >= 160) {
      const valorAtual = valor.slice(0, 160);
      return `${valorAtual}...`;
    }
    return `${valor}`;
  }
  return (
    <>
      {props.map((card) => (
        <div
          key={card.key}
          className="max-w-80 border-2 rounded-lg bg-white py-4"
        >
          <div className="w-full flex items-center justify-between px-4">
            <Chip
              className=" border-1"
              style={{
                borderColor: card.color, // Cor da borda dinâmica
                backgroundColor: `${card.color}20`, // Cor de fundo com transparência (hex com opacidade)
                color: card.color, // Cor do texto dinâmica
              }}
            >
              {card.category}
            </Chip>
            <BtnMenuCard
              id={card.key}
              textoCard={card.content}
              titleCard={card.title}
            />
          </div>
          <div className="px-4 mt-2">
            <h4>{card.title}</h4>
            <p className="text-sm text-default-500">
              {verificaString(card.content)}
            </p>
            <Divider className="my-6" />
            <Chip className=" bg-gray-100 border-1 border-gray-200 cursor-default hover:bg-gray-200 hover:border-gray-300 transition-colors duration-300">
              <div className="flex gap-2 items-center justify-center">
                <CalendarIcon className="inline text-default-500" />
                <span className="text-sm text-default-600">{card.date}</span>
              </div>
            </Chip>
          </div>
        </div>
      ))}
    </>
  );
};
