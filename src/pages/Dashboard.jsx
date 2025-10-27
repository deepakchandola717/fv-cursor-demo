import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import StatsSection from '../features/dashboard/StatsSection';
import AIContractCreation from '../features/dashboard/AIContractCreation';
import ActionCards from '../features/dashboard/ActionCards';
import ContentSections from '../features/dashboard/ContentSections';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateContract = (prompt) => {
    if (prompt.trim()) {
      navigate(`/editor?prompt=${encodeURIComponent(prompt)}`);
    }
  };

  const handleUploadClick = () => {
    navigate('/drive');
  };

  const handleCreateClick = () => {
    navigate('/editor');
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      <StatsSection />
      <AIContractCreation onCreateContract={handleCreateContract} />
      <ActionCards 
        onUploadClick={handleUploadClick}
        onCreateClick={handleCreateClick}
      />
      <ContentSections />
    </Space>
  );
};

export default Dashboard;
