import { Card, Statistic } from 'antd';

const StatCard = ({ title, value, prefix, valueColor = '#0A3746' }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <Statistic
        title={title}
        value={value}
        prefix={<div className="text-xl" style={{ color: valueColor }}>{prefix}</div>}
        valueStyle={{ color: valueColor }}
      />
    </Card>
  );
};

export default StatCard;

