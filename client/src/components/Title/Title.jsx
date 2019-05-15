import React from 'react';

export default class Title extends React.Component {
  clearDatabase = () => {
    this.props.actions.acCclearDatabase()
      .then(() => {
        console.log('clesr success');
      });
  }

  render() {
    const { name } = this.props;
    return (
      <div style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold', color: '#F3F3F3' }} onClick={this.clearDatabase}>
        {name}
      </div>
    );
  }
}
