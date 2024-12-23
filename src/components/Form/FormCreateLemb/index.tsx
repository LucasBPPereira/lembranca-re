"use client";

import { CalendarIcon } from "@/assets/icons/CalendarIcon";
import { ColorPicker } from "@/components/ColorPicker";
import cn from "@/utils/cn";
import { verificaString } from "@/utils/verifyString";
import { DateValue, fromDate, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import {
  Button,
  Chip,
  Divider,
  Form,
  Input,
  Link,
  Textarea,
} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Color, parseColor } from "react-aria-components";

export const FormCreateLemb = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("Tag");
  const [cor, setCor] = useState<Color>(parseColor("rgb(91, 59, 235)"));
  const [date, setDate] = useState<DateValue | null>(
    fromDate(new Date(), "America/Sao_Paulo")
  );
  const corHex = cor.toString("hex");
  const router = useRouter()
  // Formatter ajustado para formato 24 horas
  // const formatter = useDateFormatter({
  //   dateStyle: "short",
  //   timeStyle: "short",
  //   hourCycle: "h23", // Usa o formato 24 horas
  // });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !date) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const lembData = {
      title,
      content,
      category,
      color: corHex,
      date: date.toDate(getLocalTimeZone()).toISOString(),
    };

    try {
      const response = await fetch("api/r/lemb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lembData),
      });

      if (response.ok) {
        router.push("/lembrancas")
      } else {
        alert("Erro ao criar lembrete.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className="h-full max-w-[1000px] flex flex-col sm:flex-row items-center gap-5 my-2">
      <div className="max-w-[450px] sm:w-full sm:max-w-[650px] bg-white rounded-lg px-4 py-2 shadow-[6px_10px_29px_14px_#00000010,0px_3px_11px_1px_#00000025] transition-all duration-500">
        <div className="w-full px-4 mb-2 flex flex-col gap-2 items-start justify-center">
          <h1 className="font-bold text-lg sm:text-xl text-blue-700">
            Crie a sua Lembrança aqui!{" "}
            <span className="text-green-400 drop-shadow-[0_2px_3px_rgba(23,2,211,0.308)]">
              ✍️
            </span>
          </h1>
          <p className="text-sm font-light text-default-700">
            Escreva seus melhores momentos aqui e após isso clique no botão para
            salvar e adicionar
          </p>
        </div>
        <Form
          onSubmit={handleSubmit}
          validationBehavior="native"
          className="w-full pb-8 pt-4 px-4 text-default-700"
        >
          <Input
            label="Título"
            color="primary"
            variant="bordered"
            name="title"
            placeholder="Insira o título aqui"
            description="Isso vai ajudar a encontrar na sua lista"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            validate={(value) => {
              if (value.length < 5) {
                return "O título precisa ter mais de 5 letras.";
              }
              if (value.length > 100) {
                return "O título não pode ter mais de 100 letras";
              }
            }}
            isRequired={true}
            classNames={{
              description: "text-default-500",
            }}
          />
          <div className="w-full flex flex-col gap-2 items-center">
            <div className="flex flex-col sm:flex-row items-center w-full">
              <Input
                label="Categoria"
                color="primary"
                variant="bordered"
                name="category"
                placeholder="Insira uma tag para a lembrança"
                description="Dessa forma você consegue definir o ponto destaque da lembrança"
                value={category === "Tag" ? "" : category}
                onChange={(e) => setCategory(e.target.value)}
                isRequired={true}
                classNames={{
                  description: "text-default-500",
                }}
                className="max-w-[400px]"
              />
              <Chip
                style={{
                  borderColor: corHex, // Cor da borda dinâmica
                  backgroundColor: `${corHex}10`, // Cor de fundo com transparência (hex com opacidade)
                  color: corHex, // Cor do texto dinâmica
                }}
                className={"mb-5 mt-2 sm:mt-0 sm:ml-3 border-1"}
              >
                {category}
              </Chip>
            </div>
            <div className="flex flex-col justify-start w-full mb-4">
              <ColorPicker value={cor} onChange={setCor} label="Cor da tag" />
              <p className="text-xs text-default-500">
                Personalize do seu jeito, você define o que representa.
              </p>
            </div>
            {/* <Input
              type="color"
              color="primary"
              variant="bordered"
              label="Cor"
              value={cor}
              onChange={(e) => {
                setCor(e.target.value);
                console.log(cor);
              }}
            /> */}
          </div>
          <I18nProvider locale="pt-BR">
            <DatePicker
              hideTimeZone
              showMonthAndYearPickers
              selectorButtonPlacement="start"
              className={cn(
                "max-w-md [&_div[data-slot='segment'][data-editable='true']]:text-default-600 focus:[&_div[data-slot='segment'][data-editable='true']]:text-blue-700 [&_div[data-slot='description']]:text-default-500 "
              )}
              classNames={{
                description: "data-[slot=description]:text-default-500",
                timeInputLabel: "text-default-700",
              }}
              label="Data do lembrete"
              description="Selecione a data da qual você deseja lembrar futuramente"
              color="primary"
              name="date"
              value={date}
              variant="bordered"
              onChange={setDate}
              isRequired={true}
            />
          </I18nProvider>
          <Textarea
            label="Conteúdo"
            color="primary"
            variant="bordered"
            name="content"
            placeholder="Insira o conteúdo da lembrança aqui"
            description="Não vai esquecer de nenhum detalhe em"
            value={content}
            maxRows={20}
            onChange={(e) => setContent(e.target.value)}
            validate={(value) => {
              if (value == "") {
                return "O conteúdo não pode estar vazio!";
              }
              if (value.length < 20) {
                return "O conteúdo da lembrança é pequeno!";
              }
            }}
            isRequired={true}
            classNames={{
              description: "text-default-500",
            }}
          />
          <div className="w-full flex gap-5 items-center mt-4">
            <Button className="w-9/12" color="primary" type="submit">
              Criar
            </Button>
            <Button
              as={Link}
              color="secondary"
              className="w-1/4"
              variant="bordered"
              href="/lembrancas"
            >
              Voltar
            </Button>
          </div>
        </Form>
      </div>

      <div className="w-full">
        <h2>Seu card vai ficar assim:</h2>
        <div className="w-full sm:max-w-80 border-2 rounded-lg bg-white py-4 shadow-[1px_8px_10px_1px_#00000014]">
          <div className="w-full flex items-center justify-between px-4">
            <Chip
              className=" border-1"
              style={{
                borderColor: corHex, // Cor da borda dinâmica
                backgroundColor: `${corHex}20`, // Cor de fundo com transparência (hex com opacidade)
                color: corHex, // Cor do texto dinâmica
              }}
            >
              {category}
            </Chip>
          </div>
          <div className="px-4 mt-2 ">
            <h4>{title}</h4>
            <p className="text-sm text-default-500 hyphens-auto break-words ">
              {verificaString(content)}
            </p>
            <Divider className="my-6" />
            <Chip className=" bg-gray-100 border-1 border-gray-200 cursor-default hover:bg-gray-200 hover:border-gray-300 transition-colors duration-300">
              <div className="flex gap-2 items-center justify-center">
                <CalendarIcon className="inline text-default-500" />
                <span className="text-sm text-default-600">
                  { date?.toDate(getLocalTimeZone()).toLocaleDateString()}
                </span>
              </div>
            </Chip>
          </div>
        </div>
      </div>
    </div>
  );
};
