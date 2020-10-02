import React from 'react';
import DetalheProdutoPage from '../pages/detalhe-produto';
import HomePage from '../pages/home';
import ListaCarrinhoPage from '../pages/lista-carrinho';

export const publicRoutes = [
    { path: '/', render: (props: any) => <HomePage {...props} />, navigationName: 'Início' },
    { path: '/home', render: (props: any) => <HomePage {...props} />, navigationName: 'Início' },
    { path: '/categoria/:slugCategoria', render: (props: any) => <HomePage {...props} />, navigationName: 'Início' },
    { path: '/produto/:slugProduto', render: (props: any) => <DetalheProdutoPage {...props} />, navigationName: 'Início' },
    { path: '/carrinho', render: (props: any) => <ListaCarrinhoPage {...props} />, navigationName: 'Início' },
]