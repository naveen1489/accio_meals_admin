import React, { useState } from 'react';
import { Badge, Avatar, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const NavNotification = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'new meals',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      time: '12:20 PM'
    },
    {
      id: 2,
      name: 'new meals',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      time: '11:31 PM'
    }
  ]);

  const notificationList = (
    <div style={{ width: 300 }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0', fontWeight: '600' }}>
        Notification
      </div>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        {data.map((item) => (
          <div key={item.id} style={{ display: 'flex', padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
            <Avatar style={{ marginRight: 12 }}>
              {item.name.charAt(0).toUpperCase()}
            </Avatar>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600' }}>{item.name}</div>
              <div style={{ fontSize: 13 }}>{item.desc}</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>{item.time}</div>
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
        <Badge count={data.length}>
          <BellOutlined style={{ fontSize: 20 }} />
        </Badge>
      </div>
    </Popover>
  );
};

export default NavNotification;
