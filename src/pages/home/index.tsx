import React from 'react';
import { FiEye } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import { useAuth } from '../../contexts/AuthProvider';
import { useFetch } from '../../hooks/useFetch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { PagedList } from '../../models/PagedList';
import { Produto } from '../../models/Produto';
import CardProduto from './card-produto';
import { Container } from './styles';

export default function HomePage() {
    const term = useTypedSelector(states => (
        states.searchbar.search.term
    ));
    const { slugCategoria } = useParams<{ slugCategoria: string }>();

    const { response, isLoading } = useFetch<PagedList<Produto>>(slugCategoria ?
        `/produtos/categoria/${slugCategoria}/?search=${term}&page=1`
        : `/produtos/?search=${term}&page=1`);

    const { user, sair } = useAuth();

    if (isLoading) {
        return <span>Carregando...</span>
    }
    return response?.results.length > 0 ? (
        <Container>
            {response?.results.map(produto => (
                <CardProduto
                    imagem={produto.image}
                    nome={produto.title}
                    preco={parseFloat(produto.price)}
                />
            ))}
        </Container>
    ) : (
            <div>
                <Message icon>
                    <FiEye size={28} style={{ marginRight: 15 }} />
                    <Message.Content>
                        <Message.Header>Opa, parece que nada foi encontrado.</Message.Header>
                    Nenhum produto foi encontrado, experimente alterar a sua busca ou procurar em outras categorias!
                </Message.Content>
                </Message>
            </div>
        )
}
