import ITag from 'types/ITag';

const tags: ITag[] = [
    {
        text: 'Aventura',
        backgroundColor: 'green',
        id: crypto.randomUUID()
    },
    {
        text: 'Romance',
        backgroundColor: 'pink',
        color: '#000',
        id: crypto.randomUUID()
    },
    {
        text: 'Ação',
        backgroundColor: 'red',
        id: crypto.randomUUID()
    },
    {
        text: 'Ficção científica',
        backgroundColor: 'blue',
        id: crypto.randomUUID()
    },
    {
        text: 'Terror',
        backgroundColor: 'purple',
        id: crypto.randomUUID()
    },
    {
        text: 'Didático',
        backgroundColor: 'yellow',
        color: '#000',
        id: crypto.randomUUID()
    },
    {
        text: 'Auto-ajuda',
        backgroundColor: 'orange',
        color: '#000',
        id: crypto.randomUUID()
    },
    {
        text: 'Outro',
        backgroundColor: 'gray',
        id: crypto.randomUUID()
    }
];

export default tags;