import { useState } from 'react';
import { Card, Tabs, Form, Input, Button, Switch, Select, Divider, List, Tag, Avatar, Space, Table } from 'antd';
import {
  Settings as SettingsIcon,
  Shield,
  Users,
  Bell,
  Puzzle,
  Globe,
  Palette,
  Key,
  Mail,
  Smartphone,
  Lock,
  Plus,
  Trash2,
  Check,
  X,
  Cloud,
  Folder,
  MessageSquare,
  FileSignature,
  Monitor,
  Zap
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  // General Settings Tab
  const renderGeneralTab = () => (
    <Space direction="vertical" size="large" className="w-full">
      <Card title="Profile Information">
        <Form layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Full Name">
              <Input placeholder="John Smith" />
            </Form.Item>
            <Form.Item label="Email">
              <Input type="email" placeholder="john@company.com" />
            </Form.Item>
            <Form.Item label="Job Title">
              <Input placeholder="Legal Counsel" />
            </Form.Item>
            <Form.Item label="Department">
              <Input placeholder="Legal" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" style={{ background: '#0A3746', borderColor: '#0A3746' }}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Preferences">
        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Language</div>
              <div className="text-sm text-gray-500">Choose your preferred language</div>
            </div>
            <Select defaultValue="en" className="w-[200px]">
              <Select.Option value="en">English</Select.Option>
              <Select.Option value="es">Spanish</Select.Option>
              <Select.Option value="fr">French</Select.Option>
              <Select.Option value="de">German</Select.Option>
            </Select>
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Time Zone</div>
              <div className="text-sm text-gray-500">Set your local time zone</div>
            </div>
            <Select defaultValue="pst" className="w-[200px]">
              <Select.Option value="pst">Pacific Time (PT)</Select.Option>
              <Select.Option value="est">Eastern Time (ET)</Select.Option>
              <Select.Option value="cst">Central Time (CT)</Select.Option>
              <Select.Option value="mst">Mountain Time (MT)</Select.Option>
            </Select>
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Date Format</div>
              <div className="text-sm text-gray-500">Choose how dates are displayed</div>
            </div>
            <Select defaultValue="mdy" className="w-[200px]">
              <Select.Option value="mdy">MM/DD/YYYY</Select.Option>
              <Select.Option value="dmy">DD/MM/YYYY</Select.Option>
              <Select.Option value="ymd">YYYY-MM-DD</Select.Option>
            </Select>
          </div>
        </Space>
      </Card>

      <Card title="Display">
        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-gray-500">Choose light or dark mode</div>
            </div>
            <Select defaultValue="light" className="w-[200px]">
              <Select.Option value="light">Light</Select.Option>
              <Select.Option value="dark">Dark</Select.Option>
              <Select.Option value="auto">Auto</Select.Option>
            </Select>
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Compact Mode</div>
              <div className="text-sm text-gray-500">Use smaller spacing</div>
            </div>
            <Switch />
          </div>
        </Space>
      </Card>
    </Space>
  );

  // Security Tab
  const renderSecurityTab = () => (
    <Space direction="vertical" size="large" className="w-full">
      <Card title="Password">
        <Form layout="vertical">
          <Form.Item label="Current Password">
            <Input.Password placeholder="Enter current password" />
          </Form.Item>
          <Form.Item label="New Password">
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item label="Confirm New Password">
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ background: '#0A3746', borderColor: '#0A3746' }}>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Two-Factor Authentication">
        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Enable 2FA</div>
              <div className="text-sm text-gray-500">Add an extra layer of security</div>
            </div>
            <Switch />
          </div>
        </Space>
      </Card>

      <Card title="Active Sessions">
        <List
          dataSource={[
            { device: 'Chrome on MacOS', location: 'San Francisco, CA', time: 'Current session' },
            { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '2 hours ago' },
          ]}
          renderItem={item => (
            <List.Item
              actions={[<Button type="text" danger size="small">Revoke</Button>]}
            >
              <List.Item.Meta
                avatar={<div className="text-[#0A3746]"><Monitor size={20} /></div>}
                title={item.device}
                description={`${item.location} • ${item.time}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );

  // Users Tab
  const renderUsersTab = () => (
    <Space direction="vertical" size="large" className="w-full">
      <Card 
        title="Team Members"
        extra={
          <Button 
            type="primary" 
            icon={<Plus size={16} />} 
            style={{ background: '#0A3746', borderColor: '#0A3746' }}
            className="flex items-center gap-2"
          >
            Invite User
          </Button>
        }
      >
        <Table
          dataSource={[
            { key: 1, name: 'John Smith', email: 'john@company.com', role: 'Admin', status: 'Active' },
            { key: 2, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Editor', status: 'Active' },
            { key: 3, name: 'Mike Wilson', email: 'mike@company.com', role: 'Viewer', status: 'Pending' },
          ]}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (text, record) => (
                <div className="flex items-center gap-3">
                  <Avatar style={{ background: '#0A3746' }}>{text[0]}</Avatar>
                  <div>
                    <div className="font-medium">{text}</div>
                    <div className="text-sm text-gray-500">{record.email}</div>
                  </div>
                </div>
              ),
            },
            {
              title: 'Role',
              dataIndex: 'role',
              key: 'role',
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: status => (
                <Tag color={status === 'Active' ? 'success' : 'warning'}>
                  {status}
                </Tag>
              ),
            },
            {
              title: 'Actions',
              key: 'actions',
              render: () => (
                <Space>
                  <Button type="text" size="small">Edit</Button>
                  <Button type="text" danger size="small">Remove</Button>
                </Space>
              ),
            },
          ]}
        />
      </Card>
    </Space>
  );

  // Notifications Tab
  const renderNotificationsTab = () => (
    <Space direction="vertical" size="large" className="w-full">
      <Card title="Email Notifications">
        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium flex items-center gap-2.5">
                <Mail size={16} />
                Contract Updates
              </div>
              <div className="text-sm text-gray-500">Get notified when a contract status changes</div>
            </div>
            <Switch defaultChecked />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium flex items-center gap-2.5">
                <Bell size={16} />
                Signature Requests
              </div>
              <div className="text-sm text-gray-500">Receive alerts for new signature requests</div>
            </div>
            <Switch defaultChecked />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium flex items-center gap-2.5">
                <MessageSquare size={16} />
                Comments & Mentions
              </div>
              <div className="text-sm text-gray-500">Get notified when someone mentions you</div>
            </div>
            <Switch />
          </div>
        </Space>
      </Card>

      <Card title="Push Notifications">
        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium flex items-center gap-2.5">
                <Smartphone size={16} />
                Mobile Notifications
              </div>
              <div className="text-sm text-gray-500">Receive push notifications on your mobile device</div>
            </div>
            <Switch defaultChecked />
          </div>
        </Space>
      </Card>
    </Space>
  );

  // Integrations Tab
  const renderIntegrationsTab = () => (
    <Space direction="vertical" size="large" className="w-full">
      <Card title="Available Integrations">
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3 }}
          dataSource={[
            { name: 'Google Drive', icon: <Cloud size={24} />, connected: true },
            { name: 'Dropbox', icon: <Folder size={24} />, connected: false },
            { name: 'Slack', icon: <MessageSquare size={24} />, connected: true },
            { name: 'Salesforce', icon: <Zap size={24} />, connected: false },
          ]}
          renderItem={item => (
            <List.Item>
              <Card className="text-center">
                <div className="mb-3">{item.icon}</div>
                <div className="font-medium mb-2">{item.name}</div>
                {item.connected ? (
                  <div className="flex items-center justify-center gap-1.5 text-green-600">
                    <Check size={16} />
                    Connected
                  </div>
                ) : (
                  <Button type="primary" size="small" style={{ background: '#0A3746', borderColor: '#0A3746' }}>
                    Connect
                  </Button>
                )}
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );

  // Billing Tab
  const renderBillingTab = () => (
    <Space direction="vertical" size="large" className="w-full">
      <Card title="Current Plan">
        <div className="text-center py-8">
          <div className="text-3xl font-bold text-[#0A3746] mb-2">Professional</div>
          <div className="text-gray-500 mb-4">$49/month</div>
          <Button type="primary" style={{ background: '#0A3746', borderColor: '#0A3746' }}>
            Upgrade Plan
          </Button>
        </div>
      </Card>

      <Card title="Payment Method">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
              VISA
            </div>
            <div>
              <div className="font-medium">•••• •••• •••• 4242</div>
              <div className="text-sm text-gray-500">Expires 12/24</div>
            </div>
          </div>
          <Button>Update</Button>
        </div>
      </Card>

      <Card title="Billing History">
        <Table
          dataSource={[
            { key: 1, date: '2024-10-01', amount: '$49.00', status: 'Paid' },
            { key: 2, date: '2024-09-01', amount: '$49.00', status: 'Paid' },
            { key: 3, date: '2024-08-01', amount: '$49.00', status: 'Paid' },
          ]}
          columns={[
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Amount', dataIndex: 'amount', key: 'amount' },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: status => <Tag color="success">{status}</Tag>,
            },
            {
              title: 'Invoice',
              key: 'invoice',
              render: () => <Button type="link" size="small">Download</Button>,
            },
          ]}
        />
      </Card>
    </Space>
  );

  const tabItems = [
    {
      key: 'general',
      label: (
        <span className="flex items-center gap-2.5">
          <SettingsIcon size={18} />
          <span>General</span>
        </span>
      ),
      children: renderGeneralTab(),
    },
    {
      key: 'security',
      label: (
        <span className="flex items-center gap-2.5">
          <Shield size={18} />
          <span>Security</span>
        </span>
      ),
      children: renderSecurityTab(),
    },
    {
      key: 'users',
      label: (
        <span className="flex items-center gap-2.5">
          <Users size={18} />
          <span>Users</span>
        </span>
      ),
      children: renderUsersTab(),
    },
    {
      key: 'notifications',
      label: (
        <span className="flex items-center gap-2.5">
          <Bell size={18} />
          <span>Notifications</span>
        </span>
      ),
      children: renderNotificationsTab(),
    },
    {
      key: 'integrations',
      label: (
        <span className="flex items-center gap-2.5">
          <Puzzle size={18} />
          <span>Integrations</span>
        </span>
      ),
      children: renderIntegrationsTab(),
    },
    {
      key: 'billing',
      label: (
        <span className="flex items-center gap-2.5">
          <Globe size={18} />
          <span>Billing</span>
        </span>
      ),
      children: renderBillingTab(),
    },
  ];

  return (
    <div style={{ 
      height: 'calc(100vh - 96px)', // Full height minus header
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        tabPosition="left"
        style={{ 
          height: '100%',
          overflow: 'hidden'
        }}
        tabBarStyle={{
          height: '100%',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default Settings;
