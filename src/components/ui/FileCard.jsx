import { Card, Tag, Button, Dropdown } from 'antd';
import { FolderOpen, FileText, MoreVertical } from 'lucide-react';

const getStatusTag = (status) => {
  if (!status) return null;
  const statusConfig = {
    signed: { color: 'success', text: 'Signed' },
    pending: { color: 'warning', text: 'Pending' },
    draft: { color: 'default', text: 'Draft' },
  };
  return <Tag color={statusConfig[status]?.color}>{statusConfig[status]?.text}</Tag>;
};

const FileCard = ({ item, onClick, menuItems }) => {
  const isFolder = item.type === 'folder';

  return (
    <Card 
      hoverable
      className="h-full border-0 shadow-sm hover:shadow-md transition-shadow relative"
      bodyStyle={{ padding: '16px' }}
    >
      {/* Three dots menu */}
      <Dropdown
        menu={{ items: menuItems(item) }}
        placement="bottomRight"
        trigger={['click']}
      >
        <Button
          type="text"
          icon={<MoreVertical size={16} />}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 z-10 p-1 w-7 h-7"
        />
      </Dropdown>

      <div 
        onClick={onClick}
        className="flex flex-col items-center text-center gap-3 cursor-pointer"
      >
        {isFolder ? (
          <FolderOpen size={48} className="text-[#0A3746]" />
        ) : (
          <FileText size={48} className="text-[#0A3746]" />
        )}
        <div className="w-full">
          <div className="font-medium text-sm mb-2 overflow-hidden text-ellipsis whitespace-nowrap" title={item.name}>
            {item.name}
          </div>
          
          {/* Tags for folders */}
          {isFolder && item.tags && (
            <div className="flex gap-1 justify-center mb-2 flex-wrap">
              {item.tags.map((tag, idx) => (
                <Tag key={idx} className="m-0 text-xs" color="blue">{tag}</Tag>
              ))}
            </div>
          )}
          
          <div className="text-xs text-gray-600">
            {isFolder ? (
              <span>{item.count} items</span>
            ) : (
              <div className="flex flex-col gap-1.5 items-center">
                <div>{item.size}</div>
                <div className="inline-block">{getStatusTag(item.status)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FileCard;

