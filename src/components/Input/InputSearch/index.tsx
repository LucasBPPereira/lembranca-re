"use client";

import { SearchIcon } from "@/assets/icons/SearchIcon";
import { Input } from "@nextui-org/react";

type TInputSearch = {
  searchValue: string;
  setSearchValue: (valor: string) => void;
}

export const InputSearch = ({ searchValue, setSearchValue}: TInputSearch) => {

  return (
    <>
      <Input
        aria-label="Campo de pesquisa"
        type="text"
        endContent={<SearchIcon />}
        className="max-w-96 sm:max-w-full"
        size="sm"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </>
  );
};
