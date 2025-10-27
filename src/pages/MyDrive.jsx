import { useState } from 'react';
import { Row, Col, Space, Table, Button, Dropdown, Tag } from 'antd';
import { 
  FolderOpen, 
  FileText,
  Download,
  Share2,
  Trash2,
  MoreVertical,
  Edit3,
  Copy,
  Archive,
  Tags
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DriveHeader from '../features/drive/DriveHeader';
import FileCard from '../components/ui/FileCard';
import NewDocumentModal from '../features/drive/NewDocumentModal';

const MyDrive = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const allItems = [
    { 
      id: 1, 
      name: 'NDA', 
      type: 'folder',
      count: 12,
      size: '-',
      modified: '2 days ago',
      owner: 'You',
      tags: ['Legal', 'Confidential']
    },
    { 
      id: 2, 
      name: 'Sales', 
      type: 'folder',
      count: 8,
      size: '-',
      modified: '1 week ago',
      owner: 'You',
      tags: ['Business', 'Revenue']
    },
    { 
      id: 3, 
      name: 'Employment', 
      type: 'folder',
      count: 15,
      size: '-',
      modified: '3 days ago',
      owner: 'You',
      tags: ['HR', 'Contracts']
    },
    { 
      id: 4, 
      name: 'NDA - Tech Corp Partnership.docx', 
      type: 'document',
      status: 'signed',
      size: '245 KB',
      modified: '2 hours ago',
      owner: 'You'
    },
    { 
      id: 5, 
      name: 'Employment Agreement - John Doe.pdf', 
      type: 'document',
      status: 'pending',
      size: '512 KB',
      modified: '5 hours ago',
      owner: 'Sarah Johnson'
    },
    { 
      id: 6, 
      name: 'Sales Contract - ACME Inc.docx', 
      type: 'document',
      status: 'draft',
      size: '189 KB',
      modified: '1 day ago',
      owner: 'You'
    },
    { 
      id: 7, 
      name: 'Service Agreement - XYZ Ltd.pdf', 
      type: 'document',
      status: 'signed',
      size: '423 KB',
      modified: '2 days ago',
      owner: 'Mike Wilson'
    },
    { 
      id: 8, 
      name: 'Vendor Contract - ABC Corp.docx', 
      type: 'document',
      status: 'pending',
      size: '356 KB',
      modified: '3 days ago',
      owner: 'You'
    },
  ];

  const getStatusTag = (status) => {
    if (!status) return null;
    const statusConfig = {
      signed: { color: 'success', text: 'Signed' },
      pending: { color: 'warning', text: 'Pending' },
      draft: { color: 'default', text: 'Draft' },
    };
    return <Tag color={statusConfig[status]?.color}>{statusConfig[status]?.text}</Tag>;
  };

  const getCardMenuItems = (item) => [
    {
      key: 'open',
      icon: <FileText size={14} />,
      label: 'Open',
      onClick: () => navigate(item.type === 'folder' ? `/drive/folder/${item.id}` : `/document/${item.id}`),
    },
    {
      key: 'share',
      icon: <Share2 size={14} />,
      label: 'Share',
    },
    {
      key: 'download',
      icon: <Download size={14} />,
      label: 'Download',
    },
    {
      key: 'rename',
      icon: <Edit3 size={14} />,
      label: 'Rename',
    },
    {
      key: 'copy',
      icon: <Copy size={14} />,
      label: 'Make a copy',
    },
    item.type === 'folder' && {
      key: 'tags',
      icon: <Tags size={14} />,
      label: 'Modify tags',
    },
    {
      key: 'archive',
      icon: <Archive size={14} />,
      label: 'Archive',
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      icon: <Trash2 size={14} />,
      label: 'Delete',
      danger: true,
    },
  ].filter(Boolean);

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(`/document/${record.id}`)}
        >
          {record.type === 'folder' ? (
            <FolderOpen size={20} className="text-[#0A3746]" />
          ) : (
            <FileText size={20} className="text-[#0A3746]" />
          )}
          <span className="font-medium">{text}</span>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => record.type === 'folder' 
        ? <span className="text-gray-500">{record.count} items</span>
        : getStatusTag(status),
      filters: [
        { text: 'Signed', value: 'signed' },
        { text: 'Pending', value: 'pending' },
        { text: 'Draft', value: 'draft' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      sorter: (a, b) => {
        if (a.size === '-') return -1;
        if (b.size === '-') return 1;
        return 0;
      },
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Modified',
      dataIndex: 'modified',
      key: 'modified',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="small">
          <Button type="text" size="small" icon={<Share2 size={14} />} />
          <Button type="text" size="small" icon={<Download size={14} />} />
          <Dropdown menu={{ items: getCardMenuItems(record) }} placement="bottomRight" trigger={['click']}>
            <Button type="text" size="small" icon={<MoreVertical size={14} />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="large" className="w-full">
      <DriveHeader
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNewDocument={() => setCreateModalVisible(true)}
      />

      {viewMode === 'grid' ? (
        <Row gutter={[16, 16]}>
          {allItems.map(item => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <FileCard
                item={item}
                onClick={() => navigate(item.type === 'folder' ? `/drive/folder/${item.id}` : `/document/${item.id}`)}
                menuItems={getCardMenuItems}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Table
          dataSource={allItems}
          columns={tableColumns}
          rowKey="id"
          pagination={{ pageSize: 20 }}
          rowClassName="cursor-pointer"
          className="bg-white rounded-xl border-0 shadow-sm"
        />
      )}

      <NewDocumentModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
    </Space>
  );
};

export default MyDrive;
