"use client";

import { CalendarIcon } from "@/assets/icons/CalendarIcon";
import { BtnMenuCard } from "@/components/Button/MenuButtonCard";
import { TCardLembranca } from "@/types/CardLembrancaType";
import { verificaString } from "@/utils/verifyString";
import { Chip, Divider } from "@nextui-org/react";

export const CardLembranca = ({ props }: TCardLembranca) => {

  if (!Array.isArray(props)) {
    return <p>Nenhum dado encontrado.</p>; // Renderize algo quando os dados não forem um array
  }

  return (
    <>
      {props.map((card) => (
        <div
          key={card.id}
          className="w-full sm:max-w-80 h-56 sm:h-64 border-2 rounded-lg bg-white py-4 shadow-[1px_8px_10px_1px_#00000014]"
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
              id={card.id}
              textoCard={card.content}
              titleCard={card.title}
            />
          </div>
          <div className="px-4 mt-2 h-[154px] sm:h-44 relative">
            <h4 className="text-default-800">{card.title}</h4>
            <p className="text-sm text-default-500 hyphens-auto break-words ">
              {verificaString(card.content)}
            </p>
            <Divider className="my-5 absolute bottom-7 w-11/12 sm:w-72" />
            <Chip className="absolute bottom-0 bg-gray-100 border-1 border-gray-200 cursor-default hover:bg-gray-200 hover:border-gray-300 transition-colors duration-300">
              <div className="flex gap-2 items-center justify-center">
                <CalendarIcon className="inline text-default-500" />
                <span className="text-sm text-default-600">{new Date(card.date).toLocaleDateString()}</span>
              </div>
            </Chip>
          </div>
        </div>
      ))}
    </>
  );
};
