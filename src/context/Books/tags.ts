import ITag from 'types/ITag';

const tags: ITag[] = [
    {
        text: 'Aventura',
        backgroundColor: '#005B41',
        id: crypto.randomUUID()
    },
    {
        text: 'Romance',
        backgroundColor: '#FF7676',
        color: '#000',
        id: crypto.randomUUID()
    },
    {
        text: 'Ação',
        backgroundColor: '#D71313',
        id: crypto.randomUUID()
    },
    {
        text: 'Ficção científica',
        backgroundColor: '#38419D',
        id: crypto.randomUUID()
    },
    {
        text: 'Terror',
        backgroundColor: '#610C9F',
        id: crypto.randomUUID()
    },
    {
        text: 'Didático',
        backgroundColor: '#FFD93D',
        color: '#000',
        id: crypto.randomUUID()
    },
    {
        text: 'Auto-ajuda',
        backgroundColor: '#FB8B24',
        color: '#000',
        id: crypto.randomUUID()
    },
    {
        text: 'Outro',
        backgroundColor: '#607274',
        id: crypto.randomUUID()
    }
];

export default tags;