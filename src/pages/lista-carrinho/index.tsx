import numeral from 'numeral';
import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Image, List } from 'semantic-ui-react';
import AmountButton from '../../components/AmountButton';
import IconButton from '../../components/IconButton';
import { useCart } from '../../contexts/CartProvider';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { SaveCartActions } from '../../store/modules/cart/actions/save';
import { DescricaoProduto, PrecoTotal } from './styles';

export default function ListaCarrinhoPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { carrinho, alterarQuantidadeProduto, removeProduto, cleanCarrinho } = useCart();
    const loadingSave = useTypedSelector(states => states.cart.save.isRequesting);

    function salvarCompras() {
        dispatch(SaveCartActions.request({
            data: carrinho,
            onSuccess: () => {
                toast.success("Compra efetuada com sucesso! Em breve seus produtos estarão em sua casa.");
                history.push("/");
                cleanCarrinho();
            },
            onFailed: () => {
                toast.error("Houve um problema enquanto processávamos a sua compra. Tente novamente mais tarde.");
            }
        }))
    }

    return (
        <Container fluid style={{ paddingRight: 35 }}>
            <List divided animated>
                {carrinho.produtosDesejados.sort((a, b) => {
                    if (a.produto.title > b.produto.title) {
                        return 1;
                    } else if (a.produto.title < b.produto.title) {
                        return -1;
                    } else {
                        return 0;
                    }
                }).map((desejo) => (
                    <List.Item>
                        <Image avatar src={desejo.produto.image} size="tiny" centered style={{ marginTop: 20 }} />
                        <List.Content style={{ width: '75%', paddingTop: 10, paddingBottom: 10 }}>
                            <List.Header as={Link} to={`/produto/${desejo.produto.slug}`}>{desejo.produto.title}</List.Header>
                            <List.Description style={{ marginTop: 10 }}>
                                Quantidade:
                                    <AmountButton
                                    style={{ marginLeft: 10 }}
                                    value={desejo.quantidade}
                                    onAddClick={() => {
                                        if (desejo.quantidade < 99) {
                                            alterarQuantidadeProduto(desejo.produto.id, desejo.quantidade + 1)
                                        }
                                    }}
                                    onRemoveClick={() => {
                                        if (desejo.quantidade > 1) {
                                            alterarQuantidadeProduto(desejo.produto.id, desejo.quantidade - 1)
                                        }
                                    }}
                                />
                                <br />
                                <DescricaoProduto>
                                    {desejo.produto.description}
                                    <IconButton title="Remover produto" onClick={() => removeProduto(desejo.produto.id)}
                                        color="red">
                                        <FiTrash />
                                    </IconButton>
                                </DescricaoProduto>
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
            <PrecoTotal><label>Total:</label> {numeral(carrinho.total).format('$ 0,0.00')}</PrecoTotal>
            <div style={{ textAlign: 'right' }}>
                <Button onClick={cleanCarrinho} style={{ marginRight: 10 }}>Limpar carrinho</Button>
                <Button primary loading={loadingSave} onClick={salvarCompras}>Completar compra</Button>
            </div>
        </Container>
    )
}
