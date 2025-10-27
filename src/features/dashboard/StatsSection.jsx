import { Row, Col } from 'antd';
import StatCard from '../../components/ui/StatCard';
import {
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      title: 'Total Documents',
      value: 156,
      icon: <FileText size={20} />,
      color: '#0A3746'
    },
    {
      title: 'Signed Contracts',
      value: 89,
      icon: <CheckCircle size={20} />,
      color: '#10B981'
    },
    {
      title: 'Pending Signatures',
      value: 23,
      icon: <Clock size={20} />,
      color: '#F59E0B'
    },
    {
      title: 'Active This Month',
      value: 44,
      icon: <TrendingUp size={20} />,
      color: '#3B82F6'
    },
    {
      title: 'Team Members',
      value: 12,
      icon: <Users size={20} />,
      color: '#8B5CF6'
    },
    {
      title: 'Due This Week',
      value: 7,
      icon: <Calendar size={20} />,
      color: '#EF4444'
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <StatCard
            title={stat.title}
            value={stat.value}
            prefix={stat.icon}
            valueColor={stat.color}
          />
        </Col>
      ))}
    </Row>
  );
};

export default StatsSection;

