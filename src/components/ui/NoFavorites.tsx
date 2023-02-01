import { Container, Image, Text } from '@nextui-org/react';

import React from 'react';

export const NoFavorites = () => {
  return (
    <Container
      css={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 100px)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}
    >
      <Text h1>No hay favoritos</Text>
      <Image
        src="/images/ironmanicon.jpg"
        alt="no hay favoritos"
        width={250}
        height={250}
        css={{ opacity: 0.5, marginTop: '10px' }}
      />
    </Container>
  );
};
