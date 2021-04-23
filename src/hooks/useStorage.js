import { useState, useEffect } from 'react';
import {
  projectStorage,
  projectFirestore,
  timestamp,
  auth,
} from '../firebase/config';

const useStorage = (file, type) => {
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection(`${auth.currentUser.uid}`);

    storageRef.put(file).on(
      'state_changed',
      (snap) => {
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        await collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    )
  }, [file, type]);

  return { url, error };
};

export default useStorage;
