"use client";

import { EyeClosedIcon } from "@/assets/icons/EyeClosedIcon";
import { EyeOpenIcon } from "@/assets/icons/EyeOpenIcon";
import { Button, Form, Input, Spinner } from "@nextui-org/react";
import { FormEvent, useState } from "react";
export default function PageLogin() {
  const [loading, setLoading] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("/api/acc/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("Login feito com sucesso");
      } else {
        console.log("Não deu boa");
      }
    } catch (erro) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
    <div className="border-4 h-72 w-96 rounded-xl shadow-md">
      <Form onSubmit={submitForm} className="px-2 py-1">
        <h1>Faça seu login</h1>
        <Input
          type="email"
          label="E-mail"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isRequired
          validate={(e) => {
            if (e.length == 0) {
              return "O e-mail não deve estar vazio";
            }
          }}
        />
        <Input
          type={eyeOpen ? "text" : "password"}
          label="Senha"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endContent={
            <Button
              onPress={() => (eyeOpen ? setEyeOpen(false) : setEyeOpen(true))}
              isIconOnly
              radius="full"
              size="sm"
              type="button"
            >
              {eyeOpen ? (
                <EyeClosedIcon className="size-5" />
              ) : (
                <EyeOpenIcon className="size-5" />
              )}
            </Button>
          }
          isRequired
        />
        <Button
          color="primary"
          className="w-full"
          type="submit"
          endContent={loading && <Spinner size="sm" color="default" />}
        >
          Entrar
        </Button>
      </Form>
    </div>
    </div>
  );
}
