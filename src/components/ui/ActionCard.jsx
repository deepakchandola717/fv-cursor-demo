import { Card } from 'antd';

const ActionCard = ({ icon, title, description, onClick, iconBg = 'bg-gradient-to-br from-teal-500 to-teal-600' }) => {
  return (
    <Card 
      hoverable 
      onClick={onClick}
      className="h-full cursor-pointer"
    >
      <div className="flex gap-4 items-start">
        <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-[#0A3746] mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 m-0">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ActionCard;

