import { Outlet, useParams } from 'react-router-dom';
import CommunityHeader from '../components/CommunityHeader';

const CommunityLayout = () => {
  const { communityName } = useParams();

  return (
    <>
      <CommunityHeader communityName={communityName} />
      <Outlet />
    </>
  );
};

export default CommunityLayout;
