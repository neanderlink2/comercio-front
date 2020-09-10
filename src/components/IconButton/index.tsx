import React from 'react';
import { Button, Popup } from 'semantic-ui-react';

type IconButtonProps = {
    children: React.ReactNode;
    title?: string;
}

export default function IconButton({ children, title }: IconButtonProps) {
    return (
        <Popup content={title} trigger={
            <Button icon>
                {children}
            </Button>
        } />
    )
}
