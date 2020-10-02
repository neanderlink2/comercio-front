import numeral from 'numeral';
import React from 'react';
import { Image, List } from 'semantic-ui-react';
import { useCart } from '../../contexts/CartProvider';

export default function ListaCarrinhoPage() {

    const { carrinho } = useCart();

    return (
        <div>
            <span>Carrinho</span>
            <span>Total: {numeral(carrinho.total).format('$ 0,0.00')}</span>
            <List>
                {carrinho.produtosDesejados.map((desejo) => (
                    <List.Item>
                        <Image avatar src={desejo.produto.image} />
                        <List.Content>
                            <List.Header as='a'>{desejo.produto.title} - Quantidade: {desejo.quantidade}</List.Header>
                            <List.Description>{desejo.produto.description}</List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </div>
    )
}
