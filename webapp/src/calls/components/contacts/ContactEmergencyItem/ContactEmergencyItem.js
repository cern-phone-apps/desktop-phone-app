import React, { Component } from 'react';
import { Icon, Item } from 'semantic-ui-react';
import styles from './ContactEmergencyItem.module.css';

class ContactEmergencyItem extends Component {
  state = {
    name: 'Emergencies',
    icon: 'emergency',
    description: 'Emergency Services'
  };

  openEmergencyModalAction = () => {
    const { openEmergencyModal } = this.props;
    openEmergencyModal();
  };

  render() {
    const { icon, description } = this.state;

    return (
      <Item className={styles.item} onClick={this.openEmergencyModalAction}>
        <div className={`ui tiny image ${styles.avatar}`}>
          <Icon name={icon} size="large" className="ui avatar" />
        </div>
        <Item.Content verticalAlign="middle">
          <Item.Description className={styles.description}>
            {description}
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}

export default ContactEmergencyItem;
