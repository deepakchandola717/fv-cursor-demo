import { useState } from 'react';
import { Modal, Space, Card, Row, Col, Input, Button } from 'antd';
import { Sparkles, UploadCloud, BookOpen, FileEdit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewDocumentModal = ({ visible, onClose }) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const navigate = useNavigate();

  const handleAiPrompt = () => {
    if (aiPrompt.trim()) {
      navigate('/editor?mode=ai&prompt=' + encodeURIComponent(aiPrompt));
      onClose();
      setAiPrompt('');
    }
  };

  return (
    <Modal
      title={
        <span className="text-xl font-semibold text-[#0A3746]">
          Create New Document
        </span>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Space direction="vertical" size="large" className="w-full mt-5">
        {/* AI Prompt Box */}
        <Card className="bg-gradient-to-br from-[#0A3746] to-[#0d4a5e] border-0">
          <Space direction="vertical" size="middle" className="w-full">
            <div className="text-white text-base font-semibold flex items-center gap-2.5">
              <Sparkles size={20} />
              Draft with AI
            </div>
            <Input.TextArea
              placeholder="Describe the document you need... e.g., 'Create a comprehensive NDA for a tech partnership'"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={3}
              className="rounded-lg text-sm"
            />
            <Button
              type="primary"
              size="large"
              icon={<Sparkles size={18} />}
              onClick={handleAiPrompt}
              block
              className="bg-[#10B981] border-[#10B981] h-11 text-base font-semibold flex items-center justify-center gap-2"
            >
              Generate Document
            </Button>
          </Space>
        </Card>

        {/* Other Options */}
        <Row gutter={[16, 16]}>
          {/* Upload File */}
          <Col span={12}>
            <Card 
              hoverable 
              onClick={() => {
                onClose();
                // Handle upload logic
              }}
              className="cursor-pointer h-[140px] flex items-center justify-center"
            >
              <div className="text-center">
                <UploadCloud size={36} className="text-blue-500 mb-3 mx-auto" />
                <div className="text-base font-semibold text-[#0A3746] mb-1">
                  Upload File
                </div>
                <div className="text-xs text-gray-600">
                  Import existing document
                </div>
              </div>
            </Card>
          </Col>

          {/* Use Template */}
          <Col span={12}>
            <Card 
              hoverable 
              onClick={() => {
                onClose();
                navigate('/editor?mode=template');
              }}
              className="cursor-pointer h-[140px] flex items-center justify-center"
            >
              <div className="text-center">
                <BookOpen size={36} className="text-teal-500 mb-3 mx-auto" />
                <div className="text-base font-semibold text-[#0A3746] mb-1">
                  Use Template
                </div>
                <div className="text-xs text-gray-600">
                  Start from pre-built template
                </div>
              </div>
            </Card>
          </Col>

          {/* Blank Document */}
          <Col span={24}>
            <Card 
              hoverable 
              onClick={() => {
                onClose();
                navigate('/editor');
              }}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-amber-50">
                  <FileEdit size={24} className="text-amber-500" />
                </div>
                <div>
                  <div className="text-base font-semibold text-[#0A3746] mb-1">
                    Blank Document
                  </div>
                  <div className="text-sm text-gray-600">
                    Start writing from scratch
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Space>
    </Modal>
  );
};

export default NewDocumentModal;

