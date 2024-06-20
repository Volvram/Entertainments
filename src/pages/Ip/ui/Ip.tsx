import React, { useEffect, useState } from 'react';

import { Block } from '@/entities/Block';
import { useLazyFetchIpGeoQuery } from '@/pages/Ip/api/IpService.ts';
import { useFetchOwnIpQuery } from '@/pages/Ip/api/OwnIpService.ts';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

import styles from './styles.module.scss';
import { ipHost } from '@/pages/Ip/config/hosts.ts';

const Ip: React.FC = () => {
  const [ip, setIp] = useState('');

  const { data: ownIp, error: ownIpError, isLoading: isLoadingOwnIp } = useFetchOwnIpQuery();
  const [fetchIp, ipGeo] = useLazyFetchIpGeoQuery();

  useEffect(() => {
    if (ownIp) {
      setIp(ownIp.ip);
      fetchIp(ownIp.ip);
    }
  }, [ownIp]);

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
      return <div>Данные IP-адреса ищутся...</div>;
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
            <a href={`${ipHost}/${ipGeo.data.ip}`} className={styles.ip_geo_link}>
              {`${ipHost}/${ipGeo.data.ip}`}
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
      <Block>{renderIpGeo()}</Block>
    </div>
  );
};

export default Ip;
