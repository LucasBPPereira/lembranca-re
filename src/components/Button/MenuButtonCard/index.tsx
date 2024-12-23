"use client";

import { BtnMenuCardIcon } from "@/assets/icons/BtnMenuCardIcon";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import { DeleteDocumentIcon } from "@/assets/icons/DeleteIcon";
import { EditIcon } from "@/assets/icons/EditIcon";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { FormEvent, useState } from "react";

type TBtnMenuCard = {
  textoCard: string;
  titleCard: string;
  id: string;
};

export const BtnMenuCard = ({ id, textoCard, titleCard }: TBtnMenuCard) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [edit, setEdit] = useState(true);
  const [title, setTitle] = useState(titleCard);
  const [content, setContent] = useState(textoCard);

  const submitEditForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lembEdit = {
      title,
      content,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/r/lemb/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(lembEdit),
      });

      if (response.ok) {
        console.log(lembEdit);

        console.log("Deu boa fechou");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitDeleteCard = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/r/lemb/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Deu boa DELETOU");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onResetModal = () => {
    setTitle(titleCard)
    setContent(textoCard)
    setEdit(true)
  }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            size="sm"
            color="primary"
            isIconOnly
            radius="full"
            variant="light"
          >
            <BtnMenuCardIcon className="stroke-blue-600" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            className="group text-primary"
            variant="flat"
            color="primary"
            onPress={onOpen}
            startContent={
              <HeartIcon className="size-5 [&>path]:stroke-blue-500 text-blue-200" />
            }
            key="new"
          >
            Relembrar
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            variant="flat"
            startContent={<DeleteDocumentIcon className="text-danger" />}
            onPress={submitDeleteCard}
          >
            Deletar lembrança
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="outside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {edit ? (
                <div>
                  <ModalHeader className="flex flex-col gap-1">
                    {titleCard}
                  </ModalHeader>
                  <ModalBody>
                    <p>{textoCard}</p>
                  </ModalBody>
                </div>
              ) : (
                <Form className="p-4" onSubmit={submitEditForm}>
                  <Input
                    className="mt-6"
                    label="Título"
                    name="title"
                    type="text"
                    value={title}
                    placeholder="Altere seu título"
                    variant="bordered"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    label="Conteúdo"
                    name="content"
                    type="text"
                    variant="bordered"
                    placeholder="Altere seu conteúdo"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <Button type="submit">Salvar</Button>
                </Form>
              )}
              <ModalFooter>
                <Button
                  startContent={<CloseIcon />}
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onResetModal()
                    onClose()
                  }}
                >
                  Fechar
                </Button>
                <Button
                  startContent={<EditIcon />}
                  color="primary"
                  onPress={() => edit ? setEdit(false) : onResetModal()}
                >
                  {edit ? "Editar" : "Ler"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
