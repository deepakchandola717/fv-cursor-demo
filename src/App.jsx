import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import MyDrive from './pages/MyDrive';
import SignQueue from './pages/SignQueue';
import DocumentEditor from './pages/DocumentEditor';
import Memory from './pages/Memory';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0A3746',
          colorSuccess: '#10B981',
          colorWarning: '#F59E0B',
          colorError: '#EF4444',
          colorInfo: '#3B82F6',
          borderRadius: 8,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        components: {
          Layout: {
            headerBg: '#ffffff',
            siderBg: '#ffffff',
          },
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/drive" element={<MainLayout><MyDrive /></MainLayout>} />
          <Route path="/drive/folder/:folderId" element={<MainLayout><MyDrive /></MainLayout>} />
          <Route path="/sign-queue" element={<MainLayout><SignQueue /></MainLayout>} />
          <Route path="/document/:id" element={<DocumentEditor />} />
          <Route path="/editor" element={<DocumentEditor />} />
          <Route path="/memory" element={<MainLayout><Memory /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
