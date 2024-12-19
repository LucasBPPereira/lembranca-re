"use client";

import cn from "@/utils/cn";
import { DateValue, fromDate, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { Button, Chip, Form, Input, Link, Textarea } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { useState } from "react";

export const FormCreateLemb = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<DateValue | null>(
    fromDate(new Date(), "America/Sao_Paulo")
  );

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
      date: date.toDate(getLocalTimeZone()).toISOString(),
    };

    console.log("Dados enviados:", lembData);

    try {
      const response = await fetch("/api/r/lemb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lembData),
      });

      if (response.ok) {
        console.log("Lembrete criado com sucesso!");
      } else {
        console.error("Erro ao criar lembrete.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className="max-w-[450px] sm:max-w-[650px] bg-white rounded-lg px-4 py-2 shadow-[6px_10px_29px_14px_#00000010,0px_3px_11px_1px_#00000025] transition-all duration-500">
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

        <I18nProvider locale="pt-BR">
          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            selectorButtonPlacement="start"
            className={cn(
              "max-w-md [&_div[data-slot='segment'][data-editable='true']]:text-default-600 focus:[&_div[data-slot='segment'][data-editable='true']]:text-blue-700 [&_div[data-slot='description']]:text-default-500"
            )}
            classNames={{
              description: "data-[slot=description]:text-default-500",
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

        <div className="flex gap-2 items-center">
          <Input
            label="Categoria"
            color="primary"
            variant="bordered"
            name="category"
            placeholder="Insira uma tag para a lembrança"
            description="Dessa forma você consegue definir o ponto destaque da lembrança"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            isRequired={true}
            classNames={{
              description: "text-default-500"
            }}
          />
          <Chip>{category}</Chip>
          <Input 
            type="color"
            color="primary"
            variant="bordered"
            label="Cor"
          />
        </div>

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
              return "O conteúdo não pode estar vazio!"
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
            onKeyDown={(e) => {
              if ("continuePropagation" in e) {
                e.continuePropagation()
              }
            }}
          >
            Voltar
          </Button>
        </div>
      </Form>
    </div>
  );
};
