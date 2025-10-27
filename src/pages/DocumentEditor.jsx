import { useState } from 'react';
import { Card, Button, Divider, Tag, Space, Drawer, Input, List, Avatar, Dropdown, Menu } from 'antd';
import {
  Save,
  Send,
  Eye,
  Edit3,
  MessageSquare,
  FileText,
  Users,
  Clock,
  ChevronLeft,
  MoreVertical,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List as ListIcon,
  Link,
  Image as ImageIcon,
  Download,
  Share2
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const { TextArea } = Input;

const DocumentEditor = () => {
  const [mode, setMode] = useState('edit'); // 'edit' or 'read'
  const [metadataVisible, setMetadataVisible] = useState(true);
  const [chatDrawerVisible, setChatDrawerVisible] = useState(false);
  const [content, setContent] = useState(
    `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement (the "Agreement") is entered into as of [DATE], by and between [PARTY A] ("Disclosing Party") and [PARTY B] ("Receiving Party").

1. CONFIDENTIAL INFORMATION

For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged.

2. NON-DISCLOSURE

Receiving Party agrees to hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party.

3. TERM

This Agreement shall remain in effect for a period of [DURATION] from the date of disclosure.

4. RETURN OF MATERIALS

All documents and other tangible objects containing or representing Confidential Information which have been disclosed shall be and remain the property of Disclosing Party.

5. NO LICENSE

Nothing in this Agreement is intended to grant any rights to Receiving Party under any patent, copyright, or other intellectual property right.`
  );

  const navigate = useNavigate();
  const location = useLocation();

  const documentMetadata = {
    type: 'Non-Disclosure Agreement',
    parties: ['TechCorp Inc.', 'Innovation Labs'],
    createdBy: 'John Smith',
    createdDate: '2024-10-15',
    version: 'v2.1',
    lastModified: '2 hours ago',
    status: 'Draft',
  };

  const comments = [
    {
      id: 1,
      user: 'Sarah Johnson',
      comment: 'Should we extend the term to 5 years instead?',
      timestamp: '1 hour ago',
    },
    {
      id: 2,
      user: 'Mike Wilson',
      comment: 'The confidentiality clause looks good to me.',
      timestamp: '3 hours ago',
    },
  ];

  const aiSuggestions = [
    'Explain clause 2 in simple terms',
    'Simplify this section',
    'Add a termination clause',
    'Check for legal compliance',
    'Suggest improvements',
  ];

  const menuItems = [
    { key: 'file', label: 'File', children: [
      { key: 'save', label: 'Save' },
      { key: 'saveas', label: 'Save As...' },
      { key: 'export', label: 'Export PDF' },
      { key: 'print', label: 'Print' },
    ]},
    { key: 'edit', label: 'Edit', children: [
      { key: 'undo', label: 'Undo' },
      { key: 'redo', label: 'Redo' },
      { key: 'find', label: 'Find & Replace' },
    ]},
    { key: 'view', label: 'View', children: [
      { key: 'metadata', label: metadataVisible ? 'Hide Metadata' : 'Show Metadata' },
      { key: 'fullscreen', label: 'Full Screen' },
    ]},
  ];

  return (
    <div className="min-h-screen bg-gray-50 -m-6">
      {/* Top Navigation Bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '12px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button 
              type="text" 
              icon={<ChevronLeft size={20} />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Divider type="vertical" style={{ margin: '0 12px' }} />
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0, marginBottom: '2px', color: '#0A3746' }}>
                Non-Disclosure Agreement
              </h2>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>
                Last saved 2 minutes ago
              </div>
            </div>
          </div>

          <Space size="middle">
            <Button
              type={mode === 'read' ? 'default' : 'text'}
              icon={<Eye size={18} />}
              onClick={() => setMode('read')}
            >
              Read Mode
            </Button>
            <Button
              type={mode === 'edit' ? 'default' : 'text'}
              icon={<Edit3 size={18} />}
              onClick={() => setMode('edit')}
            >
              Edit Mode
            </Button>
            <Divider type="vertical" />
            <Button icon={<Download size={18} />}>
              Export
            </Button>
            <Button icon={<Share2 size={18} />}>
              Share
            </Button>
            <Button
              type="primary"
              icon={<Send size={18} />}
              style={{ background: '#0A3746', borderColor: '#0A3746' }}
            >
              Send for Signature
            </Button>
          </Space>
        </div>
      </div>

      {/* Menu Bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '8px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {menuItems.map(item => (
            <Dropdown
              key={item.key}
              menu={{ items: item.children }}
              placement="bottomLeft"
            >
              <Button type="text" style={{ padding: '0 8px' }}>
                {item.label}
              </Button>
            </Dropdown>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Left Sidebar - Metadata */}
        {metadataVisible && (
          <div style={{ 
            width: '260px', 
            background: 'white', 
            borderRight: '1px solid #e5e7eb', 
            padding: '20px', 
            height: 'calc(100vh - 140px)', 
            overflowY: 'auto' 
          }}>
            <h3 style={{ fontWeight: 600, marginBottom: '16px', color: '#0A3746', fontSize: '15px' }}>
              Document Info
            </h3>
            
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <div className="text-xs text-gray-500 mb-1">Document Type</div>
                <Tag color="blue">{documentMetadata.type}</Tag>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Status</div>
                <Tag color="orange">{documentMetadata.status}</Tag>
              </div>

              <Divider className="my-3" />

              <div>
                <div className="text-xs text-gray-500 mb-1">Parties</div>
                {documentMetadata.parties.map((party, idx) => (
                  <div key={idx} style={{ fontSize: '14px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={14} />
                    {party}
                  </div>
                ))}
              </div>

              <Divider className="my-3" />

              <div>
                <div className="text-xs text-gray-500 mb-1">Created By</div>
                <div className="text-sm">{documentMetadata.createdBy}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Created Date</div>
                <div className="text-sm">{documentMetadata.createdDate}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Version</div>
                <div className="text-sm">{documentMetadata.version}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Last Modified</div>
                <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={14} />
                  {documentMetadata.lastModified}
                </div>
              </div>

              <Divider className="my-3" />

              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>Comments ({comments.length})</div>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  {comments.map(comment => (
                    <div key={comment.id} style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 500 }}>{comment.user}</div>
                      <div style={{ color: '#6b7280', marginTop: '4px' }}>{comment.comment}</div>
                      <div style={{ color: '#9ca3af', marginTop: '4px' }}>{comment.timestamp}</div>
                    </div>
                  ))}
                </Space>
              </div>
            </Space>
          </div>
        )}

        {/* Main Editor Area */}
        <div style={{ 
          flex: 1, 
          background: 'white', 
          padding: '32px', 
          overflowY: 'auto', 
          height: 'calc(100vh - 140px)' 
        }}>
          <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
            {mode === 'edit' && (
              <div style={{ 
                marginBottom: '16px', 
                padding: '12px', 
                background: 'white', 
                borderRadius: '8px', 
                border: '1px solid #e5e7eb', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                flexWrap: 'wrap' 
              }}>
                <Button icon={<Bold size={16} />} type="text" />
                <Button icon={<Italic size={16} />} type="text" />
                <Button icon={<Underline size={16} />} type="text" />
                <Divider type="vertical" />
                <Button icon={<AlignLeft size={16} />} type="text" />
                <Button icon={<AlignCenter size={16} />} type="text" />
                <Button icon={<AlignRight size={16} />} type="text" />
                <Divider type="vertical" />
                <Button icon={<ListIcon size={16} />} type="text" />
                <Button icon={<Link size={16} />} type="text" />
                <Button icon={<ImageIcon size={16} />} type="text" />
                <Divider type="vertical" />
                <Button
                  icon={<MessageSquare size={16} />}
                  type="primary"
                  ghost
                  onClick={() => setChatDrawerVisible(true)}
                  style={{ borderColor: '#0A3746', color: '#0A3746' }}
                >
                  AI Assistant
                </Button>
              </div>
            )}

            <Card className="document-editor">
              {mode === 'edit' ? (
                <TextArea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  autoSize={{ minRows: 30 }}
                  style={{
                    border: 'none',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    fontFamily: 'Georgia, serif',
                  }}
                />
              ) : (
                <div 
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    fontFamily: 'Georgia, serif',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {content}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* AI Chat Drawer */}
        <Drawer
          title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MessageSquare size={20} style={{ color: '#0A3746' }} />
          <span>AI Assistant</span>
        </div>
          }
          placement="right"
          onClose={() => setChatDrawerVisible(false)}
          open={chatDrawerVisible}
          width={400}
        >
          <Space direction="vertical" size="large" style={{ width: '100%', padding: '20px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Quick Actions</div>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {aiSuggestions.map((suggestion, idx) => (
                  <Button
                    key={idx}
                    block
                    style={{ textAlign: 'left' }}
                    onClick={() => console.log('AI action:', suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </Space>
            </div>

            <Divider style={{ margin: 0 }} />

            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Ask AI</div>
              <Input.TextArea
                placeholder="Ask about this contract..."
                rows={4}
                style={{ marginBottom: '8px' }}
              />
              <Button
                type="primary"
                block
                style={{ background: '#0A3746', borderColor: '#0A3746' }}
              >
                Ask
              </Button>
            </div>

            <Divider style={{ margin: 0 }} />

            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Recent Suggestions</div>
              <List
                size="small"
                dataSource={[
                  'Consider adding an early termination clause',
                  'The confidentiality period is standard for this type',
                  'You may want to specify the governing law',
                ]}
                renderItem={item => (
                  <List.Item className="text-sm">
                    <div className="flex items-start gap-2">
                      <MessageSquare size={14} className="mt-1" style={{ color: '#0A3746' }} />
                      <span>{item}</span>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Space>
        </Drawer>
      </div>
    </div>
  );
};

export default DocumentEditor;

