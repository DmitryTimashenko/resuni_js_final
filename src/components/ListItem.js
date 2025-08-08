import { Component } from '../core/Component';
import { DeleteButton } from './DeleteButton';

export class ListItem extends Component {
  setup(props) {
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donate-item';

    const { amount } = props;
    
    const formattedDate = new Date().toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    this.$rootElement.innerHTML = `${formattedDate} - <b>$${amount}</b>`;
    
    // Create delete button component
    const deleteButton = new DeleteButton({ amount });
    this.$rootElement.appendChild(deleteButton.$rootElement);
  }
}
