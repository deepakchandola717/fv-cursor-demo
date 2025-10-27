import { Row, Col } from 'antd';
import ActionCard from '../../components/ui/ActionCard';
import { Upload, FileEdit } from 'lucide-react';

const ActionCards = ({ onUploadClick, onCreateClick }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <ActionCard
          icon={<Upload size={24} />}
          title="Upload Document for Signature"
          description="Upload an existing document and send it for e-signature"
          onClick={onUploadClick}
          iconBg="bg-gradient-to-br from-teal-500 to-teal-600"
        />
      </Col>
      <Col xs={24} md={12}>
        <ActionCard
          icon={<FileEdit size={24} />}
          title="Create New Contract Manually"
          description="Start with a blank document and write your own contract"
          onClick={onCreateClick}
          iconBg="bg-gradient-to-br from-[#0A3746] to-[#082d3a]"
        />
      </Col>
    </Row>
  );
};

export default ActionCards;

