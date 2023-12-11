import ITag from 'types/ITag';

const tags: ITag[] = [
    {
        text: 'Aventura',
        color: 'green',
        id: crypto.randomUUID()
    },
    {
        text: 'Romance',
        color: 'pink',
        id: crypto.randomUUID()
    },
    {
        text: 'Ação',
        color: 'red',
        id: crypto.randomUUID()
    },
    {
        text: 'Ficção científica',
        color: 'blue',
        id: crypto.randomUUID()
    },
    {
        text: 'Terror',
        color: 'purple',
        id: crypto.randomUUID()
    },
    {
        text: 'Didático',
        color: 'yellow',
        id: crypto.randomUUID()
    },
    {
        text: 'Auto-ajuda',
        color: 'orange',
        id: crypto.randomUUID()
    },
    {
        text: 'Outro',
        color: 'gray',
        id: crypto.randomUUID()
    }
];

export default tags;