import { useState } from 'react';
import { Card, Input, Button, Space } from 'antd';
import { ArrowRight } from 'lucide-react';

const AIContractCreation = ({ onCreateContract }) => {
  const [promptValue, setPromptValue] = useState('');

  return (
    <Card>
      <Space direction="vertical" size="middle" className="w-full">
        <div>
          <h3 className="text-base font-semibold text-[#0A3746] mb-1">
            Draft Contract using AI
          </h3>
          <p className="text-sm text-gray-600 m-0">
            Describe the contract you need and let AI create a draft for you
          </p>
        </div>
        <div className="flex gap-3 items-start">
          <Input.TextArea
            size="large"
            rows={3}
            placeholder="Create a comprehensive NDA for a tech partnership that includes a 2-year confidentiality period, mutual obligations, and provisions for handling proprietary information."
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            className="flex-1 resize-none"
          />
          <Button
            type="primary"
            size="large"
            icon={<ArrowRight size={18} />}
            onClick={() => onCreateContract(promptValue)}
            className="h-[90px] min-w-[140px] flex items-center justify-center gap-2 bg-[#0A3746] hover:bg-[#082d3a] border-[#0A3746]"
          >
            Draft with AI
          </Button>
        </div>
      </Space>
    </Card>
  );
};

export default AIContractCreation;

