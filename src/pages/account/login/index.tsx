import { useField } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthProvider';

function Input({ name, ...rest }: any) {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField } = useField(name);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);
    return <input ref={inputRef} defaultValue={defaultValue} {...rest} />;
}


type SubmitData = {
    login: string,
    password: string
}

export default function LoginPage() {
    const { entrar } = useAuth();

    return (
        <Form onSubmit={(data: SubmitData) => entrar(data.login, data.password)}>
            <Input name="login" />
            <Input name="password" />
            <button>Entrar</button>
        </Form>
    )
}
