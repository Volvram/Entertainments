import React from 'react';

import { useIntl } from 'react-intl';

import { Button } from '@/Layers/Shared/UI/Button';

import styles from './styles.module.scss';
import { useFetchRandomJokeQuery } from '../api/RandomJokeService.ts';

export const RandomJokes: React.FC = () => {
  const intl = useIntl();
  // const { data: randomJoke } = randomJokeApi.useFetchRandomJokeQuery('');
  const { data: randomJoke, error, isLoading, refetch } = useFetchRandomJokeQuery();

  const handleUpdateJoke = () => {
    refetch();
  };

  const renderRandomJoke = () => {
    if (error) {
      return <div>{intl.messages['somethingWentWrongTryLater'] as string}</div>;
    }

    if (isLoading) {
      return <div>{`${intl.messages['jokeUploading']}...`}</div>;
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
        {intl.messages['Update'] as string}
      </Button>
    </div>
  );
};
