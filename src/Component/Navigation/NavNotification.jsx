import React, { useEffect, useState } from 'react';
import { Badge, Avatar, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useData } from "../../Context/DataProvider";
import { updateNotification } from "../../api/notification/index";
import { useAlert } from '../../Context/AlertContext';
const NavNotification = () => {
  const { notificationData, handleGetAllNotificationList } = useData();
  const { notificationCount } = useData();
  const { showAlert } = useAlert();


  useEffect(() => {
    handleGetAllNotificationList();
  }, []);

  const handleClick = async (NotificationId, menuId) => {
    const helpUrl = `/menu`;
    try {
      const response = await updateNotification(NotificationId);
      if (response && response.status === 200 && response.data === true) {
        localStorage.setItem('menuId', menuId);
        window.location.href = helpUrl;
      } else {
        showAlert("error", "Faild to view notification");
      }
    } catch (error) {
      console.error('Failed to update notification:', error);
    }
  };

  const notificationList = (
    <div style={{ width: 300 }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0', fontWeight: '600' }}>
        Notification
      </div>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        {notificationData
          .filter(item => item.Status === 'unread')
          .map((item) => {
            const metaData = typeof item.NotificationMetadata === "string"
              ? JSON.parse(item.NotificationMetadata)
              : item.NotificationMetadata || {};

            const menuId = metaData.menuId;

            return (
              <div
                key={item.NotificationId}
                style={{ display: 'flex', padding: '12px 16px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', alignItems: 'center' }}
                onClick={() => handleClick(item.NotificationId, menuId)}
              >
                <Avatar style={{ marginRight: 12 }}>
                  {item.Status?.charAt(0)?.toUpperCase()}
                </Avatar>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600' }}>{item.NotificationType}</div>
                  <div style={{ fontSize: 13 }}>{item.NotificationMessage}</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}></div>
                </div>
              </div>
            );
          })}
        {notificationData.filter(item => item.Status === 'unread')?.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
            No unread notifications
          </div>
        )}
      </div>
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #f0f0f0',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: '#fafafa',
          fontWeight: '500',
          color: '#1890ff'
        }}
        onClick={() => {
          window.location.href = '/notifications';
        }}
      >
        View All
      </div>
    </div>
  );

  return (
    <Popover
      placement="bottomRight"
      title={null}
      content={notificationList}
      trigger="click"
      styles={{ body: { padding: 0 } }}
    >
      <div style={{ padding: '0 16px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <Badge count={notificationCount.length}>
          <BellOutlined style={{ fontSize: 20 }} />
        </Badge>
      </div>
    </Popover>
  );
};

export default NavNotification;
