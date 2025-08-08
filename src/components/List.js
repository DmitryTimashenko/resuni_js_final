import { Component } from '../core/Component';
import { ListItem } from './ListItem';

export class List extends Component {
  setup() {
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donates-container';

    // Create title element
    const titleElement = document.createElement('h2');
    titleElement.className = 'donates-container__title';
    titleElement.textContent = 'Список донатов';
    this.$rootElement.appendChild(titleElement);

    // Create donates container
    this.$donatesContainer = document.createElement('div');
    this.$donatesContainer.className = 'donates-container__donates';
    this.$rootElement.appendChild(this.$donatesContainer);
    
    // Track list items
    this.listItems = [];
  }

  addItem(item) {
    const listItem = new ListItem({
      amount: item.amount
    });
    
    // Store reference to list item
    this.listItems.push(listItem);
    
    // Add delete event listener
    const deleteButton = listItem.$rootElement.querySelector('.delete-button');
    deleteButton.addEventListener('donateDeleted', (e) => {
      this.removeItem(listItem, e.detail.amount);
    });
    
    this.$donatesContainer.appendChild(listItem.$rootElement);
  }
  
  removeItem(listItem, amount) {
    // Remove from DOM
    if (listItem.$rootElement.parentNode) {
      listItem.$rootElement.parentNode.removeChild(listItem.$rootElement);
    }
    
    // Remove from tracking array
    const index = this.listItems.indexOf(listItem);
    if (index > -1) {
      this.listItems.splice(index, 1);
    }
    
    // Emit event to update total
    const removeEvent = new CustomEvent('donateRemoved', {
      detail: { amount }
    });
    this.$rootElement.dispatchEvent(removeEvent);
  }
}