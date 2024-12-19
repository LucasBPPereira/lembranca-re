import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MainComponentProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const MainComponent = ({ children, ...rest }: MainComponentProps) => {
  return (
    <main  
        {...rest}
        className={twMerge("h-screen w-full flex flex-col m-auto py-5 px-3 gap-5", rest.className)}
    >
      {children}
    </main>
  );
};
