import React, { useEffect, useState } from 'react';

import { Button } from '@/Layers/Shared/UI/Button';
import { Input } from '@/Layers/Shared/UI/Input';

import styles from './styles.module.scss';
import { useLazyFetchIpGeoQuery } from '../api/ip/IpService.ts';
import { useFetchOwnIpQuery } from '../api/ownIp/OwnIpService.ts';
import { IP_HOST } from '../lib/consts/IpHosts.ts';

export const Ip: React.FC = () => {
  const [ip, setIp] = useState('');

  const { data: ownIp, error: ownIpError, isLoading: isLoadingOwnIp } = useFetchOwnIpQuery();
  const [fetchIp, ipGeo] = useLazyFetchIpGeoQuery();

  useEffect(() => {
    if (ownIp) {
      setIp(ownIp.ip);
      fetchIp(ownIp.ip);
    }
  }, [fetchIp, ownIp]);

  const handleSearch = () => {
    fetchIp(ip);
  };

  const renderOwnIp = () => {
    if (ownIpError) {
      return <div>Что-то пошло не так, попробуйте позже</div>;
    }

    if (isLoadingOwnIp) {
      return <div>Идет подгрузка IP...</div>;
    } else {
      return (
        <h2 className={styles.ip_h}>
          Ваш IP-адрес: <span className={styles.ip_h_adress}>{ownIp?.ip}</span>
        </h2>
      );
    }
  };

  const renderIpGeo = () => {
    if (ipGeo.error) {
      return <div>Ошибка получения данных IP-адреса: {`${ipGeo.error}`}</div>;
    }

    if (ipGeo.isLoading || !ipGeo.data) {
      return <div className={styles.ip_geo}>Данные IP-адреса ищутся...</div>;
    } else {
      return (
        <div className={styles.ip_geo}>
          <h3 className={styles.ip_geo_h}>IP: {ipGeo.data.ip}</h3>
          <div>Город: {ipGeo.data.city}</div>
          <div>Регион: {ipGeo.data.region}</div>
          <div>Страна: {ipGeo.data.country}</div>
          <div>Координаты: {ipGeo.data.loc}</div>
          <div>Организация: {ipGeo.data.org}</div>
          <div>Индекс: {ipGeo.data.postal}</div>
          <div>Часовой пояс: {ipGeo.data.timezone}</div>
          <div>
            Подробнее на:{' '}
            <a href={`${IP_HOST}/${ipGeo.data.ip}`} className={styles.ip_geo_link}>
              {`${IP_HOST}/${ipGeo.data.ip}`}
            </a>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.ip}>
      {renderOwnIp()}
      <div className={styles.ip_search}>
        <Input
          value={ip}
          onChange={(value: string) => {
            setIp(value);
          }}
        />
        <Button onClick={handleSearch}>Найти</Button>
      </div>
      <div>{renderIpGeo()}</div>
    </div>
  );
};
