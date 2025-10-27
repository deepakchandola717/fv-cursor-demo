import { Input, Button } from 'antd';
import { Search, Filter, Grid3x3, List, Plus } from 'lucide-react';

const DriveHeader = ({ 
  searchValue, 
  onSearchChange, 
  viewMode, 
  onViewModeChange, 
  onNewDocument 
}) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search files..."
          prefix={<Search size={16} />}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-[300px]"
        />
        <Button icon={<Filter size={16} />} className="flex items-center gap-2">
          Filter
        </Button>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <Button
            type={viewMode === 'grid' ? 'primary' : 'text'}
            icon={<Grid3x3 size={18} />}
            onClick={() => onViewModeChange('grid')}
            className={viewMode === 'grid' ? 'bg-[#0A3746] border-[#0A3746]' : ''}
          />
          <Button
            type={viewMode === 'list' ? 'primary' : 'text'}
            icon={<List size={18} />}
            onClick={() => onViewModeChange('list')}
            className={viewMode === 'list' ? 'bg-[#0A3746] border-[#0A3746]' : ''}
          />
        </div>
        
        <Button
          type="primary"
          icon={<Plus size={18} />}
          onClick={onNewDocument}
          className="bg-[#0A3746] border-[#0A3746] flex items-center gap-2"
        >
          New Document
        </Button>
      </div>
    </div>
  );
};

export default DriveHeader;

