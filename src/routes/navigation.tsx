import React from 'react';
import HomePage from '../pages/home';

export const publicRoutes = [
    { path: '/', render: (props: any) => <HomePage {...props} />, navigationName: 'Início' },
    { path: '/home', render: (props: any) => <HomePage {...props} />, navigationName: 'Início' },
]