import { useState } from 'react';
import { Card, Tabs, Button, Input, List, Tag, Space, Modal, Form, Upload, Table, Avatar } from 'antd';
import {
  Building2,
  Users,
  BookOpen,
  FileText,
  Layout,
  Plus,
  Edit,
  Trash2,
  Upload as UploadIcon,
  Save,
  X
} from 'lucide-react';

const { TextArea } = Input;

const Memory = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [aboutFormVisible, setAboutFormVisible] = useState(false);
  const [contactFormVisible, setContactFormVisible] = useState(false);
  const [ruleFormVisible, setRuleFormVisible] = useState(false);

  // About You Data
  const [aboutData, setAboutData] = useState([
    { id: 1, label: 'Company Name', value: 'TechCorp Solutions Inc.' },
    { id: 2, label: 'Industry', value: 'Technology & Software' },
    { id: 3, label: 'Headquarters', value: 'San Francisco, CA' },
    { id: 4, label: 'Founded', value: '2015' },
    { id: 5, label: 'Company Size', value: '50-200 employees' },
    { id: 6, label: 'Legal Entity Type', value: 'C-Corporation' },
    { id: 7, label: 'Tax ID', value: 'XX-XXXXXXX' },
    { id: 8, label: 'Primary Contact', value: 'John Smith, Legal Counsel' },
  ]);

  const [customStatements, setCustomStatements] = useState([
    'We prioritize data privacy and GDPR compliance in all contracts',
    'Standard payment terms are Net 30',
    'All contracts must be reviewed by legal before execution',
  ]);

  // Contacts Data
  const contacts = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      company: 'ACME Corp',
      role: 'CEO',
      phone: '+1 (555) 123-4567',
      tags: ['Client', 'VIP'],
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@vendor.com',
      company: 'Vendor Services Ltd',
      role: 'Account Manager',
      phone: '+1 (555) 234-5678',
      tags: ['Vendor'],
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.w@partner.com',
      company: 'Partner Solutions',
      role: 'Partner Manager',
      phone: '+1 (555) 345-6789',
      tags: ['Partner'],
    },
  ];

  // Rules Data
  const [rules, setRules] = useState([
    {
      id: 1,
      title: 'Confidentiality Clause Required',
      description: 'All vendor and partnership contracts must include a comprehensive confidentiality clause',
      category: 'Compliance',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Payment Terms Standard',
      description: 'Default payment terms should be Net 30 unless otherwise approved by finance',
      category: 'Financial',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Governing Law',
      description: 'Contracts should specify California law as governing law',
      category: 'Legal',
      priority: 'High',
    },
    {
      id: 4,
      title: 'Termination Notice',
      description: 'Include 30-day termination notice period in service agreements',
      category: 'Terms',
      priority: 'Medium',
    },
  ]);

  // Files Data
  const files = [
    {
      id: 1,
      name: 'Company Policies 2024.pdf',
      size: '2.4 MB',
      uploadedDate: '2024-10-15',
      type: 'Policy Document',
    },
    {
      id: 2,
      name: 'Standard Terms & Conditions.docx',
      size: '156 KB',
      uploadedDate: '2024-10-10',
      type: 'Template',
    },
    {
      id: 3,
      name: 'Compliance Guidelines.pdf',
      size: '1.8 MB',
      uploadedDate: '2024-10-05',
      type: 'Compliance',
    },
  ];

  // Templates Data
  const templates = [
    {
      id: 1,
      name: 'Standard NDA Template',
      description: 'Mutual non-disclosure agreement template',
      category: 'Confidentiality',
      lastUpdated: '2024-10-12',
      uses: 45,
    },
    {
      id: 2,
      name: 'Employment Agreement',
      description: 'Standard employment contract for full-time employees',
      category: 'HR',
      lastUpdated: '2024-10-08',
      uses: 32,
    },
    {
      id: 3,
      name: 'Vendor Service Agreement',
      description: 'Template for engaging external vendors',
      category: 'Procurement',
      lastUpdated: '2024-09-28',
      uses: 28,
    },
  ];

  const getPriorityTag = (priority) => {
    const colors = {
      High: 'red',
      Medium: 'orange',
      Low: 'green',
    };
    return <Tag color={colors[priority]}>{priority}</Tag>;
  };

  // About You Tab
  const renderAboutTab = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card 
        title="Organization Details"
        extra={
          <Button 
            type="primary"
            icon={<Edit size={16} />}
            style={{ background: '#0A3746', borderColor: '#0A3746' }}
          >
            Edit Details
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutData.map(item => (
            <div key={item.id}>
              <div className="text-sm text-gray-500 mb-1">{item.label}</div>
              <div className="font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card 
        title="Custom Statements"
        extra={
          <Button 
            icon={<Plus size={16} />}
            onClick={() => setAboutFormVisible(true)}
          >
            Add Statement
          </Button>
        }
      >
        <List
          dataSource={customStatements}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button type="text" icon={<Edit size={16} />} key="edit" />,
                <Button type="text" danger icon={<Trash2 size={16} />} key="delete" />,
              ]}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  minWidth: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: '#e6f0f3',
                  color: '#0A3746'
                }}>
                  {index + 1}
                </div>
                <span style={{ flex: 1 }}>{item}</span>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );

  // Contacts Tab
  const renderContactsTab = () => (
    <Card 
      title="Contact Directory"
      extra={
        <Button 
          type="primary"
          icon={<Plus size={16} />}
          onClick={() => setContactFormVisible(true)}
          style={{ background: '#0A3746', borderColor: '#0A3746' }}
        >
          Add Contact
        </Button>
      }
      className="custom-card"
    >
      <Table
        dataSource={contacts}
        rowKey="id"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar style={{ background: '#0A3746' }}>
                  {text.charAt(0)}
                </Avatar>
                <div>
                  <div className="font-medium">{text}</div>
                  <div className="text-xs text-gray-500">{record.email}</div>
                </div>
              </div>
            ),
          },
          {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
          },
          {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
          },
          {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (tags) => (
              <>
                {tags.map(tag => (
                  <Tag key={tag} color="blue">{tag}</Tag>
                ))}
              </>
            ),
          },
          {
            title: 'Actions',
            key: 'actions',
            render: () => (
              <Space>
                <Button type="text" icon={<Edit size={16} />} />
                <Button type="text" danger icon={<Trash2 size={16} />} />
              </Space>
            ),
          },
        ]}
      />
    </Card>
  );

  // Rules Tab
  const renderRulesTab = () => (
    <Card 
      title="Contract Rules & Guidelines"
      extra={
        <Button 
          type="primary"
          icon={<Plus size={16} />}
          onClick={() => setRuleFormVisible(true)}
          style={{ background: '#0A3746', borderColor: '#0A3746' }}
        >
          Add Rule
        </Button>
      }
      className="custom-card"
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {rules.map(rule => (
          <Card key={rule.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <h4 className="font-semibold mb-0" style={{ color: '#0A3746' }}>
                    {rule.title}
                  </h4>
                  {getPriorityTag(rule.priority)}
                  <Tag>{rule.category}</Tag>
                </div>
                <p className="text-gray-600 mb-0">{rule.description}</p>
              </div>
              <Space>
                <Button type="text" icon={<Edit size={16} />} />
                <Button type="text" danger icon={<Trash2 size={16} />} />
              </Space>
            </div>
          </Card>
        ))}
      </Space>
    </Card>
  );

  // Files Tab
  const renderFilesTab = () => (
    <Card 
      title="Reference Files"
      extra={
        <Upload>
          <Button 
            type="primary"
            icon={<UploadIcon size={16} />}
            style={{ background: '#0A3746', borderColor: '#0A3746' }}
          >
            Upload File
          </Button>
        </Upload>
      }
      className="custom-card"
    >
      <Table
        dataSource={files}
        rowKey="id"
        columns={[
          {
            title: 'File Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={20} style={{ color: '#0A3746' }} />
                <span className="font-medium">{text}</span>
              </div>
            ),
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => <Tag>{type}</Tag>,
          },
          {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
          },
          {
            title: 'Uploaded',
            dataIndex: 'uploadedDate',
            key: 'uploadedDate',
          },
          {
            title: 'Actions',
            key: 'actions',
            render: () => (
              <Space>
                <Button type="text">Download</Button>
                <Button type="text" danger icon={<Trash2 size={16} />} />
              </Space>
            ),
          },
        ]}
      />
    </Card>
  );

  // Templates Tab
  const renderTemplatesTab = () => (
    <Card 
      title="Saved Templates"
      extra={
        <Button 
          type="primary"
          icon={<Plus size={16} />}
          style={{ background: '#0A3746', borderColor: '#0A3746' }}
        >
          Create Template
        </Button>
      }
      className="custom-card"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <Card key={template.id} className="file-card" hoverable>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Layout size={24} style={{ color: '#0A3746' }} />
                <Tag color="blue">{template.category}</Tag>
              </div>
              <div>
                <h4 style={{ fontWeight: 600, marginBottom: '4px', color: '#0A3746', fontSize: '15px' }}>
                  {template.name}
                </h4>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', margin: 0 }}>{template.description}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280' }}>
                <span>Updated {template.lastUpdated}</span>
                <span>{template.uses} uses</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
                <Button size="small" block>Use Template</Button>
                <Button size="small" icon={<Edit size={14} />} />
              </div>
            </Space>
          </Card>
        ))}
      </div>
    </Card>
  );

  const tabItems = [
    {
      key: 'about',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Building2 size={18} />
          <span>About You</span>
        </span>
      ),
      children: renderAboutTab(),
    },
    {
      key: 'contacts',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Users size={18} />
          <span>Contacts</span>
        </span>
      ),
      children: renderContactsTab(),
    },
    {
      key: 'rules',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={18} />
          <span>Rules</span>
        </span>
      ),
      children: renderRulesTab(),
    },
    {
      key: 'files',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileText size={18} />
          <span>Files</span>
        </span>
      ),
      children: renderFilesTab(),
    },
    {
      key: 'templates',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Layout size={18} />
          <span>Templates</span>
        </span>
      ),
      children: renderTemplatesTab(),
    },
  ];

  return (
    <div>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        tabBarStyle={{ marginBottom: '24px' }}
      />
    </div>
  );
};

export default Memory;

