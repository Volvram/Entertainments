import React, { useEffect, useState } from 'react';

import { useIntl } from 'react-intl';

import { Button } from '@/Layers/Shared/UI/Button';
import { Input } from '@/Layers/Shared/UI/Input';

import styles from './styles.module.scss';
import { useLazyFetchIpGeoQuery } from '../api/ip/IpService.ts';
import { useFetchOwnIpQuery } from '../api/ownIp/OwnIpService.ts';
import { IP_HOST } from '../lib/consts/IpHosts.ts';

export const Ip: React.FC = () => {
  const intl = useIntl();
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
      return <div>{intl.messages['somethingWentWrongTryLater'] as string}</div>;
    }

    if (isLoadingOwnIp) {
      return <div>{intl.messages['IpUploading'] as string}...</div>;
    } else {
      return (
        <h2 className={styles.ip_h}>
          {intl.messages['yourIpAddress'] as string}:
          <span className={styles.ip_h_adress}>{ownIp?.ip}</span>
        </h2>
      );
    }
  };

  const renderIpGeo = () => {
    if (ipGeo.error) {
      return (
        <div>
          {intl.messages['gettingIpAddressError'] as string}: {`${ipGeo.error}`}
        </div>
      );
    }

    if (ipGeo.isLoading || !ipGeo.data) {
      return (
        <div className={styles.ip_geo}>{`${intl.messages['IpAddressDataIsSearched']}...`}</div>
      );
    } else {
      return (
        <div className={styles.ip_geo}>
          <h3 className={styles.ip_geo_h}>
            {intl.messages['IP'] as string}: {ipGeo.data.ip}
          </h3>
          <div>
            {intl.messages['city'] as string}: {ipGeo.data.city}
          </div>
          <div>
            {intl.messages['region'] as string}: {ipGeo.data.region}
          </div>
          <div>
            {intl.messages['country'] as string}: {ipGeo.data.country}
          </div>
          <div>
            {intl.messages['coordinates'] as string}: {ipGeo.data.loc}
          </div>
          <div>
            {intl.messages['organization'] as string}: {ipGeo.data.org}
          </div>
          <div>
            {intl.messages['index'] as string}: {ipGeo.data.postal}
          </div>
          <div>
            {intl.messages['timeZone'] as string}: {ipGeo.data.timezone}
          </div>
          <div>
            {`${intl.messages['moreDetailsAt']}: `}
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
        <Button onClick={handleSearch}>{intl.messages['find'] as string}</Button>
      </div>
      <div>{renderIpGeo()}</div>
    </div>
  );
};
