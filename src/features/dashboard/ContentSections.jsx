import { Card, Row, Col, List, Divider, Button } from 'antd';
import DocumentListItem from '../../components/ui/DocumentListItem';
import { FileText, FolderOpen, FileSignature, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContentSections = () => {
  const navigate = useNavigate();

  const recentDocs = [
    { id: 1, name: 'NDA - TechCorp Partnership', date: '2 hours ago', status: 'signed' },
    { id: 2, name: 'Employment Agreement - John Doe', date: '5 hours ago', status: 'pending' },
    { id: 3, name: 'Sales Contract - ACME Inc', date: '1 day ago', status: 'draft' },
    { id: 4, name: 'Service Agreement - XYZ Ltd', date: '2 days ago', status: 'signed' },
  ];

  const templates = [
    { id: 1, name: 'Non-Disclosure Agreement', uses: 34 },
    { id: 2, name: 'Employment Contract', uses: 28 },
    { id: 3, name: 'Service Agreement', uses: 22 },
    { id: 4, name: 'Sales Contract', uses: 19 },
  ];

  const signingQueue = [
    { id: 1, name: 'Partnership Agreement', date: 'Due in 2 days', status: 'pending' },
    { id: 2, name: 'Vendor Contract', date: 'Due in 4 days', status: 'pending' },
    { id: 3, name: 'Lease Agreement', date: 'Due in 5 days', status: 'pending' },
  ];

  return (
    <Card>
      <Row gutter={24}>
        <Col xs={24} lg={8}>
          <div>
            <h3 className="text-base font-semibold text-[#0A3746] mb-4">
              Recent Documents
            </h3>
            <List
              dataSource={recentDocs}
              renderItem={item => (
                <DocumentListItem
                  item={item}
                  icon={<FileText size={18} />}
                  onClick={() => navigate(`/document/${item.id}`)}
                />
              )}
            />
          </div>
        </Col>

        <Col xs={0} lg={1}>
          <Divider type="vertical" className="h-full m-0" />
        </Col>

        <Col xs={24} lg={7}>
          <div>
            <h3 className="text-base font-semibold text-[#0A3746] mb-4">
              Use Template
            </h3>
            <List
              dataSource={templates}
              renderItem={item => (
                <List.Item 
                  className="cursor-pointer py-3 border-0 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  onClick={() => navigate(`/editor?template=${item.id}`)}
                >
                  <List.Item.Meta
                    avatar={<div className="text-[#0A3746]"><FolderOpen size={18} /></div>}
                    title={<span className="text-sm font-medium">{item.name}</span>}
                    description={<span className="text-xs text-gray-400">Used {item.uses} times</span>}
                  />
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col xs={0} lg={1}>
          <Divider type="vertical" className="h-full m-0" />
        </Col>

        <Col xs={24} lg={7}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#0A3746] m-0">
                Signing Queue
              </h3>
              <Button 
                type="link" 
                size="small"
                onClick={() => navigate('/sign-queue')}
                className="p-0 h-auto flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </Button>
            </div>
            <List
              dataSource={signingQueue}
              renderItem={item => (
                <DocumentListItem
                  item={item}
                  icon={<div className="text-amber-500"><FileSignature size={18} /></div>}
                  onClick={() => navigate(`/sign-queue?doc=${item.id}`)}
                />
              )}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ContentSections;

