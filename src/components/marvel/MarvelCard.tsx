import { FC } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { Character } from '@/interfaces';

interface Props {
  character: Character;
}

export const MarvelCard: FC<Props> = ({ character }) => {
  const router = useRouter();
  const { name, image, id, slug } = character;

  const handleClick = () => {
    router.push({
      pathname: '/character/[id]',
      query: { id },
    });
  };

  return (
    <Grid xs={12} sm={6} md={3} lg={2} xl={1}>
      <Card isHoverable isPressable onClick={handleClick}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={image} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{name}</Text>
            <Text>{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
