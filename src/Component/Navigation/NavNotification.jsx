import React, { useEffect,useState } from 'react';
import { Badge, Avatar, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useData } from "../../Context/DataProvider";
const NavNotification = () => {
  const { notificationData, handleGetAllNotificationList } = useData();
  useEffect(() => {
      handleGetAllNotificationList();
  }, []);
  
  const notificationList = (
    <div style={{ width: 300 }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0', fontWeight: '600' }}>
        Notification
      </div>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        {notificationData.map((item) => (
          <div key={item.NotificationId} style={{ display: 'flex', padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
            <Avatar style={{ marginRight: 12 }}>
              {item.Status.charAt(0).toUpperCase()}
            </Avatar>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600' }}>{item.NotificationType}</div>
              <div style={{ fontSize: 13 }}>{item.NotificationMessage}</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Popover 
      placement="bottomRight" 
      title={null} 
      content={notificationList} 
      trigger="click"
      overlayInnerStyle={{ padding: 0 }}
    >
      <div style={{ padding: '0 16px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <Badge count={notificationData.length}>
          <BellOutlined style={{ fontSize: 20 }} />
        </Badge>
      </div>
    </Popover>
  );
};

export default NavNotification;
