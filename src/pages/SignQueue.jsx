import { useState } from 'react';
import { Button, Tag, Input, Select, Table, Space, Dropdown, Row, Col, Modal, Steps, Form, Upload, message } from 'antd';
import { 
  FileSignature, 
  Send, 
  Eye, 
  CheckCircle, 
  Clock,
  Search,
  MoreVertical,
  Mail,
  XCircle,
  RefreshCw,
  X,
  ChevronRight,
  ChevronLeft,
  UploadCloud,
  User,
  FolderOpen,
  MousePointer,
  Type,
  CalendarDays,
  Pencil,
  FileText,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;

const SignQueue = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [signModalVisible, setSignModalVisible] = useState(false);
  const [signModalType, setSignModalType] = useState(''); // 'send' or 'self'
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [placeholders, setPlaceholders] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const allDocuments = [
    {
      id: 1,
      name: 'Partnership Agreement - TechCorp',
      type: 'sent',
      recipient: 'John Smith',
      email: 'john.smith@techcorp.com',
      sentDate: '2024-10-20',
      dueDate: '2024-10-25',
      status: 'viewed',
    },
    {
      id: 2,
      name: 'NDA - Vendor Services',
      type: 'sent',
      recipient: 'Sarah Johnson',
      email: 'sarah.j@vendor.com',
      sentDate: '2024-10-18',
      dueDate: '2024-10-24',
      status: 'sent',
    },
    {
      id: 3,
      name: 'Employment Contract - Mike Wilson',
      type: 'awaiting',
      sender: 'HR Department',
      email: 'hr@company.com',
      receivedDate: '2024-10-19',
      dueDate: '2024-10-26',
      status: 'awaiting_signature',
    },
    {
      id: 4,
      name: 'Lease Agreement - Office Space',
      type: 'awaiting',
      sender: 'Property Management',
      email: 'landlord@properties.com',
      receivedDate: '2024-10-17',
      dueDate: '2024-10-23',
      status: 'awaiting_signature',
    },
    {
      id: 5,
      name: 'Sales Contract - ACME Inc',
      type: 'completed',
      parties: 'You, ACME Inc',
      completedDate: '2024-10-15',
      status: 'completed',
    },
    {
      id: 6,
      name: 'Service Agreement - XYZ Ltd',
      type: 'completed',
      parties: 'You, XYZ Ltd',
      completedDate: '2024-10-12',
      status: 'completed',
    },
  ];

  const getStatusTag = (status) => {
    const statusConfig = {
      sent: { color: 'blue', icon: <Send size={14} />, text: 'Sent' },
      viewed: { color: 'cyan', icon: <Eye size={14} />, text: 'Viewed' },
      signed: { color: 'success', icon: <CheckCircle size={14} />, text: 'Signed' },
      completed: { color: 'success', icon: <CheckCircle size={14} />, text: 'Completed' },
      awaiting_signature: { color: 'warning', icon: <Clock size={14} />, text: 'Awaiting Signature' },
    };
    const config = statusConfig[status] || statusConfig.sent;
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getActionMenuItems = (record) => {
    const baseItems = [
      {
        key: 'view',
        icon: <Eye size={16} />,
        label: 'View Document',
        onClick: () => navigate(`/document/${record.id}`),
      },
    ];

    if (record.type === 'sent') {
      return [
        ...baseItems,
        {
          key: 'resend',
          icon: <RefreshCw size={16} />,
          label: 'Resend',
        },
        {
          key: 'remind',
          icon: <Mail size={16} />,
          label: 'Send Reminder',
        },
        {
          type: 'divider',
        },
        {
          key: 'cancel',
          icon: <XCircle size={16} />,
          label: 'Cancel Request',
          danger: true,
        },
      ];
    }

    if (record.type === 'awaiting') {
      return [
        ...baseItems,
        {
          key: 'sign',
          icon: <FileSignature size={16} />,
          label: 'Sign Now',
          onClick: () => navigate(`/document/${record.id}?mode=sign`),
        },
      ];
    }

    return baseItems;
  };

  const columns = [
    {
      title: 'Document Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileSignature size={20} style={{ color: '#0A3746' }} />
          <span className="font-medium">{text}</span>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const typeMap = {
          sent: 'Sent for Signature',
          awaiting: 'Awaiting Your Signature',
          completed: 'Completed',
        };
        return <span className="capitalize">{typeMap[type] || type}</span>;
      },
      filters: [
        { text: 'Sent for Signature', value: 'sent' },
        { text: 'Awaiting Your Signature', value: 'awaiting' },
        { text: 'Completed', value: 'completed' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Sent', value: 'sent' },
        { text: 'Viewed', value: 'viewed' },
        { text: 'Awaiting Signature', value: 'awaiting_signature' },
        { text: 'Completed', value: 'completed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => {
        if (record.type === 'sent') {
          return (
            <div>
              <div className="font-medium text-sm">{record.recipient}</div>
              <div className="text-xs text-gray-500">{record.email}</div>
            </div>
          );
        }
        if (record.type === 'awaiting') {
          return (
            <div>
              <div className="font-medium text-sm">{record.sender}</div>
              <div className="text-xs text-gray-500">{record.email}</div>
            </div>
          );
        }
        return <span className="text-gray-500">{record.parties}</span>;
      },
    },
    {
      title: 'Date',
      key: 'date',
      render: (_, record) => {
        if (record.type === 'sent') {
          return (
            <div>
              <div className="text-sm">Sent: {record.sentDate}</div>
              <div className="text-xs text-gray-500">Due: {record.dueDate}</div>
            </div>
          );
        }
        if (record.type === 'awaiting') {
          return (
            <div>
              <div className="text-sm">Received: {record.receivedDate}</div>
              <div className="text-xs text-orange-600 font-medium">Due: {record.dueDate}</div>
            </div>
          );
        }
        return <span className="text-sm">Completed: {record.completedDate}</span>;
      },
      sorter: (a, b) => {
        const dateA = a.completedDate || a.sentDate || a.receivedDate;
        const dateB = b.completedDate || b.sentDate || b.receivedDate;
        return dateA.localeCompare(dateB);
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          {record.type === 'awaiting' && (
            <Button
              type="primary"
              size="small"
              icon={<FileSignature size={14} />}
              onClick={() => navigate(`/document/${record.id}?mode=sign`)}
              style={{ background: '#0A3746', borderColor: '#0A3746' }}
            >
              Sign
            </Button>
          )}
          <Dropdown menu={{ items: getActionMenuItems(record) }} placement="bottomRight">
            <Button type="text" icon={<MoreVertical size={16} />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Filter data based on search and filters
  const filteredData = allDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                         (doc.recipient && doc.recipient.toLowerCase().includes(searchValue.toLowerCase())) ||
                         (doc.sender && doc.sender.toLowerCase().includes(searchValue.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleOpenSignModal = (type) => {
    setSignModalType(type);
    setSignModalVisible(true);
    setCurrentStep(0);
    form.resetFields();
  };

  const handleCloseSignModal = () => {
    Modal.confirm({
      title: 'Close signature workflow?',
      content: 'All unsaved progress will be lost. Are you sure you want to close?',
      okText: 'Yes, close',
      cancelText: 'Cancel',
      okButtonProps: { danger: true },
      onOk: () => {
        if (filePreviewUrl) {
          URL.revokeObjectURL(filePreviewUrl);
        }
        setSignModalVisible(false);
        setCurrentStep(0);
        setUploadedFile(null);
        setFilePreviewUrl(null);
        setPlaceholders([]);
        setSelectedTool(null);
        form.resetFields();
      },
    });
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    message.success(signModalType === 'send' ? 'Document sent for signature!' : 'Document signed successfully!');
    handleCloseSignModal();
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.pdf,.doc,.docx',
    beforeUpload: (file) => {
      setUploadedFile(file);
      
      // Create preview URL for the file
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
      
      message.success(`${file.name} uploaded successfully!`);
      return false;
    },
    onRemove: () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
      setUploadedFile(null);
      setFilePreviewUrl(null);
      setPlaceholders([]);
    },
  };

  const handleDocumentClick = (e) => {
    if (!selectedTool) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newPlaceholder = {
      id: Date.now(),
      type: selectedTool,
      x: x,
      y: y,
      width: selectedTool === 'signature' ? 150 : selectedTool === 'text' ? 200 : 120,
      height: selectedTool === 'signature' ? 60 : selectedTool === 'checkbox' ? 20 : 40,
    };
    
    setPlaceholders([...placeholders, newPlaceholder]);
    message.success(`${selectedTool} field added`);
  };

  const removePlaceholder = (id) => {
    setPlaceholders(placeholders.filter(p => p.id !== id));
  };

  const toolButtons = [
    { type: 'signature', icon: <Pencil size={18} />, label: 'Signature', color: '#0A3746' },
    { type: 'text', icon: <Type size={18} />, label: 'Text Field', color: '#3B82F6' },
    { type: 'date', icon: <CalendarDays size={18} />, label: 'Date', color: '#10B981' },
    { type: 'checkbox', icon: <CheckCircle size={18} />, label: 'Checkbox', color: '#F59E0B' },
  ];

  const steps = [
    {
      title: 'Upload & Details',
      icon: <UploadCloud size={20} />,
    },
    {
      title: 'Place Signatures',
      icon: <MousePointer size={20} />,
    },
    {
      title: 'Review & Send',
      icon: <Send size={20} />,
    },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Dragger {...uploadProps} style={{ padding: '40px' }}>
              <p className="ant-upload-drag-icon">
                <UploadCloud size={64} style={{ color: '#0A3746' }} />
              </p>
              <p className="ant-upload-text" style={{ fontSize: '16px', fontWeight: 600, color: '#0A3746' }}>
                Click or drag file to upload
              </p>
              <p className="ant-upload-hint" style={{ fontSize: '14px', color: '#6b7280' }}>
                Support for PDF, DOCX, DOC files
              </p>
            </Dragger>

            <Form form={form} layout="vertical">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item label="Document Name" name="docName" rules={[{ required: true }]}>
                    <Input placeholder="Enter document name" prefix={<FileSignature size={16} />} size="large" />
                  </Form.Item>
                </Col>

                {signModalType === 'send' && (
                  <>
                    <Col span={12}>
                      <Form.Item label="Recipient Name" name="recipientName" rules={[{ required: true }]}>
                        <Input placeholder="Enter recipient name" prefix={<User size={16} />} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Recipient Email" name="recipientEmail" rules={[{ required: true, type: 'email' }]}>
                        <Input placeholder="recipient@email.com" prefix={<Mail size={16} />} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Due Date" name="dueDate">
                        <Input type="date" prefix={<CalendarDays size={16} />} />
                      </Form.Item>
                    </Col>
                  </>
                )}

                <Col span={12}>
                  <Form.Item label="Folder/Template" name="folder">
                    <Select placeholder="Select folder" prefix={<FolderOpen size={16} />}>
                      <Select.Option value="nda">NDA</Select.Option>
                      <Select.Option value="sales">Sales</Select.Option>
                      <Select.Option value="employment">Employment</Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label="Notes (Optional)" name="notes">
                    <Input.TextArea rows={3} placeholder="Add any additional notes..." />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Space>
        );

      case 1:
        return (
          <div style={{ display: 'flex', height: '100%', gap: '0' }}>
            {/* Document Preview - Center */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f9fafb', borderRadius: '8px 0 0 8px', overflow: 'hidden' }}>
              <div style={{ padding: '16px', background: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={20} style={{ color: '#0A3746' }} />
                  <span style={{ fontWeight: 600, color: '#0A3746' }}>
                    {uploadedFile ? uploadedFile.name : 'No document uploaded'}
                  </span>
                </div>
                {selectedTool && (
                  <Tag color="processing" icon={<MousePointer size={14} />}>
                    Click on document to place {selectedTool}
                  </Tag>
                )}
              </div>
              
              <div style={{ flex: 1, padding: '24px', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', background: '#e5e7eb' }}>
                {uploadedFile && filePreviewUrl ? (
                  <div 
                    style={{ 
                      position: 'relative',
                      width: '100%',
                      maxWidth: '900px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    {/* Document Container with Placeholders */}
                    <div 
                      onClick={handleDocumentClick}
                      style={{ 
                        position: 'relative',
                        width: '100%',
                        cursor: selectedTool ? 'crosshair' : 'default',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        background: 'white'
                      }}
                    >
                      {/* Actual Document Preview */}
                      {uploadedFile.type === 'application/pdf' ? (
                        <iframe
                          src={filePreviewUrl}
                          style={{
                            width: '100%',
                            minHeight: '1100px',
                            border: 'none',
                            display: 'block',
                            pointerEvents: selectedTool ? 'none' : 'auto'
                          }}
                          title="Document Preview"
                        />
                      ) : (
                        <div style={{ 
                          padding: '40px',
                          minHeight: '1000px',
                          background: 'white'
                        }}>
                          <div style={{ 
                            padding: '20px',
                            background: '#f9fafb',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            border: '1px solid #e5e7eb'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                              <FileText size={24} style={{ color: '#0A3746' }} />
                              <div>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A3746' }}>
                                  {uploadedFile.name}
                                </div>
                                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                                  {(uploadedFile.size / 1024).toFixed(2)} KB • {uploadedFile.type || 'Document'}
                                </div>
                              </div>
                            </div>
                            <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6' }}>
                              This document preview is available for PDF files. For other formats (.doc, .docx), the actual content will be processed and ready for signature placement.
                            </div>
                          </div>
                          
                          <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8', padding: '20px', background: 'white' }}>
                            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0A3746', marginBottom: '16px', textAlign: 'center' }}>
                              Document Ready for Signature Placement
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                              ✓ Your document has been uploaded successfully
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                              ✓ Select a tool from the right panel to add signature fields
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                              ✓ Click anywhere on this area to place fields
                            </div>
                            <div style={{ marginTop: '32px', padding: '24px', background: '#f9fafb', borderRadius: '8px', border: '2px dashed #d1d5db' }}>
                              <div style={{ fontStyle: 'italic', color: '#6b7280', textAlign: 'center' }}>
                                Your document content would appear here. Click on the document area after selecting a tool to place signature fields, text fields, dates, or checkboxes.
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Placed Placeholders Overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: selectedTool ? 'auto' : 'none'
                      }}>
                        {placeholders.map((placeholder) => (
                          <div
                            key={placeholder.id}
                            style={{
                              position: 'absolute',
                              left: `${placeholder.x}px`,
                              top: `${placeholder.y}px`,
                              width: `${placeholder.width}px`,
                              height: `${placeholder.height}px`,
                              border: `2px dashed ${toolButtons.find(t => t.type === placeholder.type)?.color || '#0A3746'}`,
                              background: `${toolButtons.find(t => t.type === placeholder.type)?.color || '#0A3746'}20`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'move',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: toolButtons.find(t => t.type === placeholder.type)?.color || '#0A3746',
                              gap: '8px',
                              pointerEvents: 'auto',
                              zIndex: 10
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {toolButtons.find(t => t.type === placeholder.type)?.icon}
                            {placeholder.type}
                            <Button
                              type="text"
                              size="small"
                              danger
                              icon={<X size={14} />}
                              onClick={(e) => {
                                e.stopPropagation();
                                removePlaceholder(placeholder.id);
                              }}
                              style={{ 
                                position: 'absolute', 
                                top: '-10px', 
                                right: '-10px',
                                width: '20px',
                                height: '20px',
                                padding: 0,
                                minWidth: '20px',
                                background: 'white',
                                borderRadius: '50%',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: '100px' }}>
                    <FileText size={64} style={{ color: '#d1d5db', marginBottom: '16px' }} />
                    <div style={{ fontSize: '16px', fontWeight: 500, color: '#6b7280' }}>
                      No document uploaded
                    </div>
                    <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '8px' }}>
                      Go back to step 1 to upload a document
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tools Panel - Right */}
            <div style={{ width: '280px', background: 'white', borderRadius: '0 8px 8px 0', borderLeft: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A3746', marginBottom: '4px' }}>
                  Field Tools
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  Select a tool and click on the document
                </div>
              </div>

              <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {toolButtons.map((tool) => (
                    <Button
                      key={tool.type}
                      type={selectedTool === tool.type ? 'primary' : 'default'}
                      onClick={() => setSelectedTool(selectedTool === tool.type ? null : tool.type)}
                      icon={tool.icon}
                      block
                      size="large"
                      style={{
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '12px',
                        background: selectedTool === tool.type ? tool.color : 'transparent',
                        borderColor: selectedTool === tool.type ? tool.color : '#e5e7eb',
                        color: selectedTool === tool.type ? 'white' : '#374151'
                      }}
                    >
                      {tool.label}
                    </Button>
                  ))}
                </Space>

                {placeholders.length > 0 && (
                  <>
                    <div style={{ margin: '24px 0 12px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A3746', marginBottom: '12px' }}>
                        Placed Fields ({placeholders.length})
                      </div>
                    </div>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      {placeholders.map((placeholder, idx) => (
                        <div
                          key={placeholder.id}
                          style={{
                            padding: '12px',
                            background: '#f9fafb',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ color: toolButtons.find(t => t.type === placeholder.type)?.color }}>
                              {toolButtons.find(t => t.type === placeholder.type)?.icon}
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 500 }}>
                              {placeholder.type} #{idx + 1}
                            </span>
                          </div>
                          <Button
                            type="text"
                            size="small"
                            danger
                            icon={<Trash2 size={14} />}
                            onClick={() => removePlaceholder(placeholder.id)}
                          />
                        </div>
                      ))}
                    </Space>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      case 2: {
        const formValues = form.getFieldsValue();
        return (
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div style={{ background: '#e6f0f3', padding: '24px', borderRadius: '12px', border: '1px solid #0A3746' }}>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#0A3746', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={24} />
                  Review Document Details
                </div>
                <Row gutter={[20, 16]}>
                  <Col span={8}>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>Document Name</div>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: '#0A3746' }}>
                      {formValues.docName || uploadedFile?.name || 'Not specified'}
                    </div>
                  </Col>
                  {signModalType === 'send' && (
                    <>
                      <Col span={8}>
                        <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>Recipient</div>
                        <div style={{ fontSize: '15px', fontWeight: 500, color: '#0A3746' }}>
                          {formValues.recipientName || 'Not specified'} ({formValues.recipientEmail || 'No email'})
                        </div>
                      </Col>
                      <Col span={8}>
                        <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>Due Date</div>
                        <div style={{ fontSize: '15px', fontWeight: 500, color: '#0A3746' }}>
                          {formValues.dueDate || 'Not specified'}
                        </div>
                      </Col>
                    </>
                  )}
                  <Col span={8}>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>Folder</div>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: '#0A3746' }}>
                      {formValues.folder || 'Not specified'}
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>Total Fields Placed</div>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: '#0A3746' }}>
                      {placeholders.length} field{placeholders.length !== 1 ? 's' : ''}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col span={24}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A3746', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={20} />
                  Final Document Preview
                </div>
                <div style={{ 
                  background: '#f9fafb', 
                  padding: '24px', 
                  borderRadius: '8px',
                  minHeight: '500px',
                  maxHeight: '600px',
                  overflow: 'auto',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {uploadedFile ? (
                    <div style={{ 
                      width: '100%',
                      maxWidth: '800px',
                      background: 'white',
                      padding: '40px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      borderRadius: '4px',
                      position: 'relative'
                    }}>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: '#0A3746', marginBottom: '12px' }}>
                        {uploadedFile.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.8', marginBottom: '20px' }}>
                        Document preview with {placeholders.length} signature field{placeholders.length !== 1 ? 's' : ''} ready to be sent.
                      </div>
                      <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px', fontSize: '13px', color: '#374151' }}>
                        ✓ All fields have been placed<br/>
                        ✓ Document is ready for signature<br/>
                        ✓ Recipient will be notified via email
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', marginTop: '80px' }}>
                      <FileText size={64} style={{ color: '#d1d5db', marginBottom: '16px' }} />
                      <div style={{ fontSize: '16px', fontWeight: 500, color: '#6b7280' }}>
                        No document to preview
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        );
      }

      default:
        return null;
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Header with Search, Filters and Action Buttons */}
      <Row gutter={[12, 12]} justify="space-between" align="middle">
        <Col xs={24} lg={12}>
          <Row gutter={[12, 12]}>
            <Col xs={24} sm={12} md={10}>
              <Input
                placeholder="Search documents, contacts..."
                prefix={<Search size={16} />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={12} sm={6} md={7}>
              <Select
                placeholder="Type"
                value={filterType}
                onChange={setFilterType}
                style={{ width: '100%' }}
                options={[
                  { value: 'all', label: 'All Types' },
                  { value: 'sent', label: 'Sent' },
                  { value: 'awaiting', label: 'Awaiting' },
                  { value: 'completed', label: 'Completed' },
                ]}
              />
            </Col>
            <Col xs={12} sm={6} md={7}>
              <Select
                placeholder="Status"
                value={filterStatus}
                onChange={setFilterStatus}
                style={{ width: '100%' }}
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'sent', label: 'Sent' },
                  { value: 'viewed', label: 'Viewed' },
                  { value: 'awaiting_signature', label: 'Awaiting' },
                  { value: 'completed', label: 'Completed' },
                ]}
              />
            </Col>
          </Row>
        </Col>

        <Col xs={24} lg={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button
              type="primary"
              icon={<Send size={18} />}
              onClick={() => handleOpenSignModal('send')}
              style={{ background: '#0A3746', borderColor: '#0A3746' }}
            >
              Send for Signature
            </Button>
            <Button
              icon={<Pencil size={18} />}
              onClick={() => handleOpenSignModal('self')}
            >
              Sign Yourself
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Table */}
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        pagination={{ 
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} documents`
        }}
        scroll={{ x: 1200 }}
      />

      {/* Full Screen Signature Workflow Modal */}
      <Modal
        open={signModalVisible}
        onCancel={handleCloseSignModal}
        footer={null}
        width="100vw"
        closable={true}
        maskClosable={false}
        keyboard={false}
        style={{ top: 0, maxWidth: '100vw', paddingBottom: 0 }}
        bodyStyle={{ 
          height: '100vh', 
          padding: 0,
          background: '#f8fafc'
        }}
        closeIcon={
          <div style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 1001,
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            <X size={20} style={{ color: '#6b7280' }} />
          </div>
        }
      >
        <div style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          background: '#f8fafc'
        }}>
          {/* Header */}
          <div style={{ 
            background: 'white', 
            padding: '24px 48px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#0A3746', marginBottom: '24px' }}>
              {signModalType === 'send' ? 'Send Document for Signature' : 'Sign Document Yourself'}
            </div>
            <Steps current={currentStep} items={steps} />
          </div>

          {/* Content */}
          <div style={{ 
            flex: 1, 
            overflow: 'hidden',
            padding: currentStep === 1 ? '0' : '32px 48px'
          }}>
            {currentStep === 1 ? (
              <div style={{ height: '100%', padding: '24px 48px' }}>
                {renderStepContent()}
              </div>
            ) : (
              <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto',
                background: 'white',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}>
                {renderStepContent()}
              </div>
            )}
          </div>

          {/* Footer with Navigation */}
          <div style={{ 
            background: 'white', 
            padding: '20px 48px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Step {currentStep + 1} of 3
            </div>
            <Space>
              <Button
                onClick={handleBack}
                disabled={currentStep === 0}
                icon={<ChevronLeft size={18} />}
                size="large"
              >
                Back
              </Button>
              {currentStep < 2 ? (
                <Button
                  type="primary"
                  onClick={handleNext}
                  icon={<ChevronRight size={18} />}
                  iconPosition="end"
                  size="large"
                  style={{ background: '#0A3746', borderColor: '#0A3746' }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={handleFinish}
                  icon={<Send size={18} />}
                  size="large"
                  style={{ background: '#10B981', borderColor: '#10B981' }}
                >
                  {signModalType === 'send' ? 'Send for Signature' : 'Complete Signature'}
                </Button>
              )}
            </Space>
          </div>
        </div>
      </Modal>
    </Space>
  );
};

export default SignQueue;
