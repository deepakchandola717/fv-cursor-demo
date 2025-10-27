import { useState, useRef, useEffect } from 'react';
import { Drawer, Input, Button, Avatar, Divider, Card, Space, Tag } from 'antd';
import { Send, Sparkles, FileText, Lightbulb, TrendingUp, Clock } from 'lucide-react';

const AIChatDrawer = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: <FileText size={16} />, text: 'Explain this clause', color: '#0A3746' },
    { icon: <Lightbulb size={16} />, text: 'Suggest improvements', color: '#F59E0B' },
    { icon: <TrendingUp size={16} />, text: 'Check compliance', color: '#10B981' },
    { icon: <Clock size={16} />, text: 'Simplify language', color: '#3B82F6' },
  ];

  const insights = [
    { label: 'Contracts Reviewed', value: '156', trend: '+12%' },
    { label: 'Avg. Review Time', value: '4.2 min', trend: '-15%' },
    { label: 'Issues Found', value: '23', trend: '-8%' },
  ];

  const recentSuggestions = [
    'Consider adding a termination clause with 30-day notice',
    'The confidentiality period is standard for this industry',
    'Specify governing law for dispute resolution',
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'I can help you with that. Let me analyze your request and provide detailed insights...',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #0A3746 0%, #10B981 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A3746' }}>AI Assistant</div>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'normal' }}>Powered by FlowVerify AI</div>
          </div>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={420}
      styles={{
        body: { padding: 0, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 65px)' }
      }}
    >
      {/* Insights Section */}
      <div style={{ padding: '20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <h4 style={{ margin: 0, marginBottom: '12px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
          Today's Insights
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {insights.map((insight, idx) => (
            <Card key={idx} size="small" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0A3746', marginBottom: '2px' }}>
                {insight.value}
              </div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
                {insight.label}
              </div>
              <Tag color={insight.trend.startsWith('+') ? 'success' : 'blue'} style={{ fontSize: '10px', padding: '0 4px' }}>
                {insight.trend}
              </Tag>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h4 style={{ margin: 0, marginBottom: '12px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
          Quick Actions
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {quickActions.map((action, idx) => (
            <Button
              key={idx}
              style={{
                height: 'auto',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'flex-start'
              }}
              onClick={() => setInputValue(action.text)}
            >
              <div style={{ color: action.color }}>{action.icon}</div>
              <span style={{ fontSize: '13px', fontWeight: 500 }}>{action.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Suggestions */}
      <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h4 style={{ margin: 0, marginBottom: '12px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
          Recent Suggestions
        </h4>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          {recentSuggestions.map((suggestion, idx) => (
            <Card key={idx} size="small" hoverable style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Lightbulb size={14} style={{ color: '#F59E0B', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: '#374151' }}>{suggestion}</span>
              </div>
            </Card>
          ))}
        </Space>
      </div>

      {/* Chat Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9ca3af' }}>
            <Sparkles size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ fontSize: '14px', margin: 0 }}>Ask me anything about your contracts!</p>
          </div>
        ) : (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <Avatar
                  size={32}
                  style={{ 
                    background: message.type === 'user' ? '#10B981' : 'linear-gradient(135deg, #0A3746 0%, #10B981 100%)',
                    flexShrink: 0
                  }}
                  icon={message.type === 'user' ? null : <Sparkles size={16} />}
                >
                  {message.type === 'user' ? 'U' : null}
                </Avatar>
                <div
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: message.type === 'user' ? '#0A3746' : '#f3f4f6',
                    color: message.type === 'user' ? 'white' : '#374151',
                  }}
                >
                  <p style={{ fontSize: '14px', margin: 0, marginBottom: '4px' }}>{message.content}</p>
                  <span style={{ 
                    fontSize: '11px', 
                    color: message.type === 'user' ? 'rgba(255,255,255,0.7)' : '#9ca3af' 
                  }}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </Space>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box at Bottom */}
      <div style={{ 
        padding: '16px 20px', 
        background: 'white', 
        borderTop: '1px solid #e5e7eb',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <Input.TextArea
            placeholder="Ask AI about contracts, clauses, compliance..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            autoSize={{ minRows: 1, maxRows: 4 }}
            style={{ flex: 1, resize: 'none' }}
          />
          <Button
            type="primary"
            icon={<Send size={16} />}
            onClick={handleSend}
            disabled={!inputValue.trim()}
            style={{
              background: 'linear-gradient(135deg, #0A3746 0%, #10B981 100%)',
              border: 'none',
              height: '40px',
              minWidth: '40px',
              padding: '0 16px'
            }}
          >
            Send
          </Button>
        </div>
        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px', textAlign: 'center' }}>
          Press Shift + Enter for new line
        </div>
      </div>
    </Drawer>
  );
};

export default AIChatDrawer;
