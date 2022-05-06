import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { fetchCommunityData } from '../utils/firebase/firestore';
import { Center } from '@chakra-ui/react';
import SpinningLogo from '../components/loaders/SpinningLogo';
import CommunityHeader from '../components/CommunityHeader';
import Community404 from '../pages/Community404';

const CommunityLayout = () => {
  const { communityName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [communityData, setCommunityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchCommunityData(communityName);

        if (data) setCommunityData(data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [communityName]);

  if (isLoading) {
    return (
      <Center
        position='absolute'
        top={0}
        left={0}
        w='100vw'
        h='100vh'
        zIndex={-1}
      >
        <SpinningLogo />
      </Center>
    );
  }

  return communityData ? (
    <>
      <CommunityHeader {...communityData} setCommunityData={setCommunityData} />
      <Outlet
        context={{
          ...communityData,
        }}
      />
    </>
  ) : (
    <Community404 />
  );
};

export default CommunityLayout;
