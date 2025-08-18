import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Space, Avatar, Card } from 'antd';
import { BellOutlined, EyeOutlined } from '@ant-design/icons';
import { useData } from "../Context/DataProvider";
import { updateNotification } from "../api/notification/index";
import SidebarHeader from './Navigation/SidebarHeader';
import { useAlert } from '../Context/AlertContext';

const Allnotifications = () => {
  const { notificationData, handleGetAllNotificationList } = useData();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    setLoading(true);
    handleGetAllNotificationList().finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const processedNotifications = Array.isArray(notificationData)
      ? notificationData
      : (notificationData?.notifications || []);

    setNotifications(processedNotifications);
    setPagination(prev => ({
      ...prev,
      total: processedNotifications.length
    }));
  }, [notificationData]);

  const handleTableChange = (paginationInfo) => {
    setPagination({
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
      total: paginationInfo.total,
    });
  };

  const handleNotificationClick = async (NotificationId, menuId, status) => {
    if (status === 'unread') {
      try {
        const response = await updateNotification(NotificationId);
        if (response && response.status === 200 && response.data === true) {
          if (menuId) {
            localStorage.setItem('menuId', menuId);
            window.location.href = '/menu';
          }
        } else {
          showAlert("error", "Faild to view notification");
        }
      } catch (error) {
        console.error('Failed to update notification:', error);
      }
    } else {
      if (menuId) {
        localStorage.setItem('menuId', menuId);
        window.location.href = '/menu';
      }
    }
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'NotificationType',
      key: 'NotificationType',
      render: (type) => (
        <Space>
          <Avatar icon={<BellOutlined />} size="small" />
          <span>{type}</span>
        </Space>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'NotificationMessage',
      key: 'NotificationMessage',
      width: 520,
      ellipsis: true,
      render: (message) => (
        <div style={{ maxWidth: 400 }}>
          {message}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      width: 120,
      render: (status) => (
        <Tag color={status === 'unread' ? 'red' : 'green'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        const metaData = typeof record.NotificationMetadata === "string"
          ? JSON.parse(record.NotificationMetadata)
          : record.NotificationMetadata || {};

        const menuId = metaData.menuId;

        return (
          <Space size="middle">
            {menuId && (
              <Button
                size="small"
                icon={<EyeOutlined />}
                style={{
                  backgroundColor: '#ff4d4f',
                  borderColor: '#ff4d4f',
                  color: 'white'
                }}
                onClick={() => handleNotificationClick(record.NotificationId, menuId, record.Status)}
              >
                View
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <SidebarHeader headingText="All Notifications">
      <Card>
        <Table
          columns={columns}
          dataSource={notifications || []}
          rowKey="NotificationId"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: false,
          }}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
          rowClassName={(record) =>
            record.Status === 'unread' ? 'unread-notification' : ''
          }
          locale={{
            emptyText: 'No notifications available'
          }}
        />

        <style>
          {`
            .unread-notification {
              background-color: #f6ffed !important;
            }
            .unread-notification:hover {
              background-color: #f6ffed !important;
            }
          `}
        </style>
      </Card>
    </SidebarHeader>
  );
};

export default Allnotifications;
