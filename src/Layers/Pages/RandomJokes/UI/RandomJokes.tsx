import React from 'react';

import { Button } from '@/Layers/Shared/UI/Button';

import styles from './styles.module.scss';
import { useFetchRandomJokeQuery } from '../api/RandomJokeService.ts';

export const RandomJokes: React.FC = () => {
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
      <div className={styles.randomJokes_text}>{renderRandomJoke()}</div>
      <Button onClick={handleUpdateJoke} className={styles.randomJokes_btn}>
        Обновить
      </Button>
    </div>
  );
};
