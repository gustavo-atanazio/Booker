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
        text: 'Mistério',
        backgroundColor: '#1B4242',
        id: crypto.randomUUID()
    },
    {
        text: 'Suspense',
        backgroundColor: '#3B3486',
        id: crypto.randomUUID()
    },
    {
        text: 'Fantasia',
        backgroundColor: '#7D0A0A',
        id: crypto.randomUUID()
    },
    {
        text: 'Biografia',
        backgroundColor: '#D0D4CA',
        color: '#000',
        id: crypto.randomUUID()
    },
    {
        text: 'Drama',
        backgroundColor: '#392467',
        id: crypto.randomUUID()
    },
    {
        text: 'Humor',
        backgroundColor: '#FF9800',
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