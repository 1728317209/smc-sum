import React, { Component } from 'react';
import { Tag } from '@alifd/next';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import { abilityTags } from '../../../../const/commonData';

export default class TabTable extends Component {
  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 100,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 150,
    },
    {
      title: '用户组',
      dataIndex: 'role',
      key: 'role',
      width: 120,
    },
    {
      title: '能力标签',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      render: (value, index, record) => {
        const showTags = abilityTags.filter(item => record.tags.includes(`${item.value}`));
        return showTags.map(item => (
          <Tag
            size="small"
            key={item.value}
            type="primary"
            animation
            style={{ marginRight: '5px', color: '#3080FE' }}
          >{item.label}
          </Tag>
        ));
      },
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
    },
    {
      title: '最后操作时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (value, index, record) => {
        return (
          <span>
            <EditDialog
              index={index}
              record={record}
              getFormValues={this.getFormValues}
            />
            <DeleteBalloon
              handleRemove={() => this.handleRemove(value, index, record)}
            />
          </span>
        );
      },
    },
  ];

  componentWillMount() {
    const { memberActions, ownId } = this.props;
    memberActions.acQueryMemberList({ ownId });
  }

  getFormValues = (dataIndex, values) => {
    const { memberActions, ownId } = this.props;
    memberActions.acUpdateOneMember({ ownId, targetMemberData: values });
  };

  handleRemove = (value, index, record) => {
    const { memberActions, ownId } = this.props;
    memberActions.acDeleteOneMember({ ownId, targetId: record.id });
  };

  render() {
    const { memberList } = this.props;
    return (
      <div className="tab-table">
        <IceContainer style={{ padding: '20px' }}>
          <CustomTable
            dataSource={memberList}
            columns={this.columns}
            hasBorder={false}
          />
        </IceContainer>
      </div>
    );
  }
}
