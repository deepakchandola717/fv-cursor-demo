import { List, Tag } from 'antd';

const getStatusTag = (status) => {
  const statusConfig = {
    signed: { color: 'success', text: 'Signed' },
    pending: { color: 'warning', text: 'Pending' },
    draft: { color: 'default', text: 'Draft' },
  };
  const config = statusConfig[status] || statusConfig.draft;
  return <Tag color={config.color}>{config.text}</Tag>;
};

const DocumentListItem = ({ item, icon, onClick }) => {
  return (
    <List.Item 
      className="cursor-pointer py-3 border-0 border-b border-gray-100 hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <List.Item.Meta
        avatar={<div className="text-[#0A3746]">{icon}</div>}
        title={<span className="text-sm font-medium">{item.name}</span>}
        description={
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-400">{item.date}</span>
            {item.status && getStatusTag(item.status)}
          </div>
        }
      />
    </List.Item>
  );
};

export default DocumentListItem;

