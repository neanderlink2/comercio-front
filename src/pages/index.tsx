import { Composition } from 'atomic-layout';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import { useAuth } from '../contexts/AuthProvider';
import PrivateRoutes from '../routes/index.private';
import PublicRoutes from '../routes/index.public';

const areas = `
  header header
  leftMenu principal
  footer footer
`

export default function Pages() {
    const { authenticated } = useAuth();

    return (
        <Composition areas={areas}
            height="100vh"
            templateCols="275px 1fr"
            templateRows="75px 1fr 100px"
        >
            {(Areas) => (
                <>
                    <Areas.Header as="header" flex>
                        <Header />
                    </Areas.Header>
                    <Areas.LeftMenu as="aside" flex>
                        <LeftMenu />
                    </Areas.LeftMenu>
                    <Areas.Principal as="main" flex>
                        <PublicRoutes />
                        {authenticated && <PrivateRoutes />}
                    </Areas.Principal>
                    <Areas.Footer as="footer" flex>
                        <Footer />
                    </Areas.Footer>
                </>
            )}
        </Composition>
    )
}
