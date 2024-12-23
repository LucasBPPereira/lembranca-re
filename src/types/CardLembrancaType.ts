type TCardLembrancaProps = {
    id: string;
    title: string;
    content: string;
    category: string;
    color?: string;
    date: string;
}

export type TCardLembranca = {
    props: TCardLembrancaProps[]
}