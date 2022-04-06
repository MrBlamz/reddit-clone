import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { checkIfCommunityExists } from '../utils/firebase/firestore';
import { Center } from '@chakra-ui/react';
import SpinningLogo from '../components/loaders/SpinningLogo';
import CommunityHeader from '../components/CommunityHeader';
import Community404 from '../pages/Community404';

const CommunityLayout = () => {
  const { communityName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isCommunity, setIsCommunity] = useState(null);

  useEffect(() => {
    const verifyIfCommunityExists = async () => {
      setIsLoading(true);

      try {
        const communityExists = await checkIfCommunityExists(communityName);

        setIsCommunity(communityExists);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    verifyIfCommunityExists();
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

  return isCommunity ? (
    <>
      <CommunityHeader communityName={communityName} />
      <Outlet />
    </>
  ) : (
    <Community404 />
  );
};

export default CommunityLayout;
