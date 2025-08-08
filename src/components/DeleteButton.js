import { Component } from '../core/Component';

export class DeleteButton extends Component {
  setup(props) {
    this.$rootElement = document.createElement('button');
    this.$rootElement.className = 'delete-button';
    this.$rootElement.textContent = 'Удалить';
    
    // Store the amount for when delete is clicked
    this.amount = props.amount;
    
    // Add click event listener
    this.$rootElement.addEventListener('click', () => this.handleDelete());
  }
  
  handleDelete() {
    // Emit custom event for deletion
    const deleteEvent = new CustomEvent('donateDeleted', {
      detail: { amount: this.amount }
    });
    this.$rootElement.dispatchEvent(deleteEvent);
  }
}
