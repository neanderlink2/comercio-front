import numeral from 'numeral';
import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Preco } from './styles';

type CardProdutoProps = {
    nome: string;
    preco: number;
    qtdeVezes: number;
    valorDividido: number;
}

const layout = `
    imagem imagem
    nome nome    
    dividido preco
`;

export default function CardProduto({ nome, preco, qtdeVezes, valorDividido }: CardProdutoProps) {
    return (
        <div>
            <Card link>
                <Image src='https://picsum.photos/200' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{nome}</Card.Header>
                    <Card.Meta>
                        {qtdeVezes}x {numeral(valorDividido).format('$ 0,0.00')} sem juros
                </Card.Meta>
                    <Card.Description>
                        <Preco>{numeral(preco).format('$ 0,0.00')}</Preco>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    )
}
