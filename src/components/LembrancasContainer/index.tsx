"use client";

import { TCardLembranca } from "@/types/CardLembrancaType";
import cn from "@/utils/cn";
import { Select, Selection, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { ButtonSearch } from "../Button/ButtonSearch";
import { CardLembranca } from "../Card/CardLembranca";
import { MainComponent } from "../ind/MainComponent";
import { InputSearch } from "../Input/InputSearch";

const categoria = [
  { key: "title", label: "Título" },
  { key: "tag", label: "Tag" },
];

export const LembrancaContainer = ({ props }: TCardLembranca) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchCategory, setSearchCategory] = useState<Selection>(new Set([]));

  const filteredData = props.filter((item) => {
    const categoryKey = Array.from(searchCategory)[0];

    if (categoryKey === "title") {
      return item.title.toLowerCase().includes(searchValue.toLowerCase());
    }

    if (categoryKey === "tag") {
      return item.category.toLowerCase().includes(searchValue.toLowerCase());
    }

    // Caso nenhuma categoria esteja selecionada, retorna todos os itens
    return true;
  });

  return (
    <>
      <div className="fixed h-16 w-full border-2 bg-white rounded-b-md shadow-md z-50 mb-20 px-2 flex gap-4 items-center">
        <ButtonSearch />
        <InputSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Select
          label="Selecione"
          size="sm"
          selectedKeys={searchCategory}
          onSelectionChange={setSearchCategory}
          className="w-[156px]"
          classNames={{
            trigger: cn("py-0 px-2 !min-h-8 h-8"),
            value: "text-[10px]",
          }}
        >
          {categoria.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
      </div>
      <MainComponent className="mt-20 h-full sm:h-screen ">
        <div className="flex flex-col flex-wrap justify-center sm:flex-row sm:justify-start gap-5 transition-all duration-500">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <CardLembranca key={item.id} props={[item]} />
            ))
          ) : (
            <p className="text-gray-500">Nenhum resultado encontrado.</p>
          )}
        </div>
      </MainComponent>
    </>
  );
};
