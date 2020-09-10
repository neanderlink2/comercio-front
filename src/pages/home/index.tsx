import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import CardProduto from './card-produto';
import { Container } from './styles';

export default function HomePage() {
    const { user, sair } = useAuth();

    return (
        <Container>
            <CardProduto
                nome="Botinha de bebê unicórnio"
                preco={35}
                qtdeVezes={5}
                valorDividido={7}
            />
            <CardProduto
                nome="Sapatinho de bebê unicórnio"
                preco={29.9}
                qtdeVezes={5}
                valorDividido={5.98}
            />
            <CardProduto
                nome="Sapatinho de bebê rosas"
                preco={29.9}
                qtdeVezes={5}
                valorDividido={5.98}
            />
        </Container>
    )
}
