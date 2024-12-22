"use client";

import { IconSVGProp } from "@/types/IconSVGType";
import cn from "@/utils/cn";
import { Button, Link } from "@nextui-org/react";

export const ButtonSearch = () => {
  return (
    <>
      <Button
        size="sm"
        as={Link}
        color="primary"
        variant="flat"
        href="/lembrancas/criar"
        className={cn(
          "group relative border-2 border-transparent hover:border-primary-500 min-w-8 p-0 rounded-full sm:px-3 sm:w-44 sm:rounded-lg transition-all duration-300"
        )}
        startContent={
          <LembrancaIcon className="sm:block sm:absolute sm:left-3 transition-all duration-300" />
        }
      >
        <span className="absolute hidden sm:inline sm:left-8">
          Criar Lembranca
        </span>
      </Button>
    </>
  );
};

const LembrancaIcon = ({ className }: IconSVGProp) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "lucide lucide-notebook-pen sm:hidden stroke-primary-600 size-4",
        className
      )}
    >
      <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
      <path d="M2 6h4" />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
    </svg>
  );
};
