import React from 'react';

import { Block } from '@/entities/Block';
import { useFetchRandomJokeQuery } from '@/pages/RandomJokes/api/RandomJokeService.ts';
import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss';

const RandomJokes: React.FC = () => {
  // const { data: randomJoke } = randomJokeApi.useFetchRandomJokeQuery('');
  const { data: randomJoke, error, isLoading, refetch } = useFetchRandomJokeQuery();

  const handleUpdateJoke = () => {
    refetch();
  };

  const renderRandomJoke = () => {
    if (error) {
      return <div>Произошла ошибка, попробуйте позже</div>;
    }

    if (isLoading) {
      return <div>Шутка подгружается...</div>;
    } else {
      return (
        <div>
          <div>{randomJoke?.setup}</div>
          <div>{randomJoke?.punchline}</div>
        </div>
      );
    }
  };

  return (
    <div className={styles.randomJokes}>
      <Block>{renderRandomJoke()}</Block>
      <Button onClick={handleUpdateJoke} className={styles.randomJokes_btn}>
        Обновить
      </Button>
    </div>
  );
};

export default RandomJokes;
