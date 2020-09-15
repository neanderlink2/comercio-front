import React from 'react';
import { FiLogIn, FiSearch, FiUserPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown, Header as HeaderUi, Input } from 'semantic-ui-react';
import IconButton from '../IconButton';
import { ActionButtons, Container } from './styles';

const options = [
    { key: 'produtos', text: 'Produtos', value: 'produtos' },
    { key: 'servicos', text: 'Serviços', value: 'servicos' },
]


export default function Header() {
    const history = useHistory();
    return (
        <Container>
            <HeaderUi as="h1" textAlign="center">Ateliê livre</HeaderUi>
            <div style={{ maxWidth: 550, width: '100%' }}>
                <Input
                    fluid
                    label={<Dropdown defaultValue='produtos' options={options} />}
                    labelPosition='left'
                    icon={<IconButton title="Busca"><FiSearch /></IconButton>}
                    placeholder='Buscar...'
                />
            </div>
            <ActionButtons>
                <Button animated onClick={() => history.push('/register')}>
                    <Button.Content visible>Cadastrar</Button.Content>
                    <Button.Content hidden>
                        <FiUserPlus />
                    </Button.Content>
                </Button>

                <Button animated primary onClick={() => history.push('/login')}>
                    <Button.Content visible>Entrar</Button.Content>
                    <Button.Content hidden>
                        <FiLogIn />
                    </Button.Content>
                </Button>
            </ActionButtons>
        </Container>
    )
}
