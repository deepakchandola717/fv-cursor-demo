import { useState } from 'react';
import { Layout, Menu, Input, Badge, Avatar, Dropdown, Button } from 'antd';
import { 
  Home,
  FolderOpen, 
  FileSignature, 
  Brain, 
  Settings, 
  Search,
  Bell,
  Sparkles,
  User,
  LogOut,
  UserCircle,
  Crown,
  HelpCircle
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AIChatDrawer from '../AI/AIChatDrawer';
import flowVerifyLogo from '../../assets/FlowVerify Logo.svg';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const [chatDrawerVisible, setChatDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <Home size={20} />,
      label: 'Home',
    },
    {
      key: '/drive',
      icon: <FolderOpen size={20} />,
      label: 'My Drive',
    },
    {
      key: '/sign-queue',
      icon: <FileSignature size={20} />,
      label: 'Sign Queue',
    },
    {
      key: '/memory',
      icon: <Brain size={20} />,
      label: 'Memory',
    },
    {
      key: '/settings',
      icon: <Settings size={20} />,
      label: 'Settings',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserCircle size={16} />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <Settings size={16} />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    {
      key: 'help',
      icon: <HelpCircle size={16} />,
      label: 'Help & Support',
    },
    {
      type: 'divider',
    },
    {
      key: 'upgrade',
      icon: <Crown size={16} style={{ color: '#F59E0B' }} />,
      label: (
        <span className="text-amber-500 font-semibold">
          Upgrade Plan
        </span>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogOut size={16} />,
      label: 'Logout',
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider 
        width={260}
        style={{ 
          background: '#ffffff',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', flexShrink: 0 }}>
          <img 
            src={flowVerifyLogo} 
            alt="FlowVerify" 
            style={{ 
              height: '32px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
        
        {/* Menu */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          overflowX: 'hidden',
          minHeight: 0
        }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ 
              background: 'transparent',
              border: 'none',
              marginTop: '8px'
            }}
          />
        </div>

        {/* User Profile */}
        <div style={{ 
          borderTop: '1px solid #e5e7eb', 
          padding: '16px',
          background: '#ffffff',
          flexShrink: 0,
        }}>
          <Dropdown 
            menu={{ items: userMenuItems }} 
            placement="topRight"
            trigger={['click']}
          >
            <div 
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors hover:bg-gray-50"
            >
              <Avatar 
                size={40}
                style={{ background: '#0A3746', flexShrink: 0 }}
                icon={<User size={20} />}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#0A3746] overflow-hidden text-ellipsis whitespace-nowrap">
                  John Smith
                </div>
                <div className="text-xs text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                  john@company.com
                </div>
              </div>
            </div>
          </Dropdown>
        </div>
      </Sider>

      <Layout style={{ marginLeft: '260px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff',
            height: '64px',
            padding: '0 32px',
            lineHeight: 'normal',
            position: 'fixed',
            top: 0,
            right: 0,
            left: '260px',
            zIndex: 999
          }}
        >
          <div style={{ flex: 1, maxWidth: '600px', margin: '0 auto' }}>
            <Input
              placeholder="Search contracts, documents..."
              prefix={<Search size={18} />}
              size="large"
              className="rounded-lg"
            />
          </div>

          <div className="flex items-center gap-3 ml-8">
            <Badge count={3} size="small">
              <Button 
                type="text" 
                icon={<Bell size={20} />}
                className="w-10 h-10 p-0 flex items-center justify-center"
              />
            </Badge>

            <Button 
              type="text"
              icon={<Sparkles size={20} />}
              onClick={() => setChatDrawerVisible(true)}
              className="ai-chat-button w-10 h-10 p-0 flex items-center justify-center relative"
            />
          </div>
        </Header>

        <Content style={{ 
          marginTop: '64px',
          padding: '32px', 
          height: 'calc(100vh - 64px)',
          overflow: 'auto',
          background: '#f8fafc'
        }}>
          {children}
        </Content>
      </Layout>

      <AIChatDrawer 
        visible={chatDrawerVisible}
        onClose={() => setChatDrawerVisible(false)}
      />
    </Layout>
  );
};

export default MainLayout;
