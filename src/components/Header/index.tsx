import React from 'react';
import { FiLogIn, FiLogOut, FiSearch, FiUserPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Header as HeaderUi, Input } from 'semantic-ui-react';
import { useAuth } from '../../contexts/AuthProvider';
import { SearchbarActions } from '../../store/modules/searchbar/actions/search';
import { debounce } from '../../utils/debounce';
import IconButton from '../IconButton';
import { ActionButtons, Container } from './styles';

export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { authenticated, user, sair } = useAuth();

    function handleSearch(search: string) {
        debounce(() => {
            dispatch(SearchbarActions.save(search))
        }, 750)();
    }

    return (
        <Container>
            <HeaderUi as="h1" textAlign="center">Ateliê livre</HeaderUi>
            <div style={{ maxWidth: 550, width: '100%' }}>
                <Input
                    fluid
                    labelPosition='left'
                    icon={<IconButton title="Busca"><FiSearch /></IconButton>}
                    placeholder='Buscar...'
                    onChange={({ target }: any) => handleSearch(target.value)}
                />
            </div>
            <ActionButtons>
                {authenticated ? (
                    <>
                        <span style={{ marginRight: 10 }}>{user?.first_name}</span>
                        <Button animated onClick={() => sair()}>
                            <Button.Content visible>Sair</Button.Content>
                            <Button.Content hidden>
                                <FiLogOut />
                            </Button.Content>
                        </Button>
                    </>
                ) : (
                        <>
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
                        </>
                    )}

            </ActionButtons>
        </Container>
    )
}
