type TCardLembrancaProps = {
    key: number;
    title: string;
    content: string;
    category: string;
    color?: string;
    date?: string;
}

export type TCardLembranca = {
    props: TCardLembrancaProps[]
}