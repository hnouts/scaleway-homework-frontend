// components/ServerDetails.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getServer } from '../../services/Server.service';
import Server from '../../interfaces/Server';
import Loading from '../Loading/Loading';
import styles from './ServerDetails.module.css';

const ServerDetails: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [server, setServer] = useState<Server | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const data = await getServer(id);
      setTimeout(() => {
        setServer(data);
        setLoading(false);
      }, 500);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className={styles.container}>
      <h2>Server Details</h2>
      <div className={styles.card}>
        <h3>{server?.Name}</h3>
        <p><strong>Type:</strong> {server?.Type}</p>
        <p><strong>Status:</strong> {server?.Status}</p>
        <p><strong>Created at:</strong> {new Date(server?.CreatedAt || '').toLocaleString()}</p>
        <p><strong>Updated at:</strong> {new Date(server?.UpdatedAt || '').toLocaleString()}</p>
        <p><strong>Deleted at:</strong> {server?.DeletedAt ? new Date(server?.DeletedAt || '').toLocaleString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default ServerDetails;
