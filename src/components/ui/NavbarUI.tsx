import React, { FC } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';

import { Badge, Button, Navbar, Text, useTheme } from '@nextui-org/react';
import { useAppSelector } from '@/store';
import { useRouter } from 'next/router';
import { selectCountFavorites } from '@/store/slices/favorites';

export const NavbarUI: FC = () => {
  const count = useAppSelector(selectCountFavorites);
  const { theme } = useTheme();
  const router = useRouter();

  const handleClickFav = () => {
    router.push('/favorites');
  };

  return (
    <Navbar
      variant={'sticky'}
      color="inherit"
      isBordered
      isCompact
      css={{ backgroundColor: '$gray50' }}
      style={{ width: 'auto' }}
    >
      <NextLink href={'/'} passHref>
        <Navbar.Brand css={{ cursor: 'pointer' }}>
          <Image
            src={'/images/ironmanicon.jpg'}
            alt="icon"
            width={30}
            height={30}
            style={{ marginRight: '6px' }}
          />
          <Text h3 css={{ color: theme?.colors.text }} hideIn="xs">
            Marvel
          </Text>
        </Navbar.Brand>
      </NextLink>
      <Navbar.Content>
        <Badge content={count} size={'md'} color="success">
          <Button size={'xs'} color="gradient" onClick={handleClickFav}>
            Favoritos
          </Button>
        </Badge>
      </Navbar.Content>
    </Navbar>
  );
};
