import { Component } from '../core/Component';
import { Form } from './Form';
import { List } from './List';

export class App extends Component {
  setup(props) {
    this.state = { 
      amount: 0 
    };

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';

    const heading = document.createElement('h1');
    heading.innerHTML = `Итого: <span class="total-amount">${this.state.amount}</span>`;
    this.$heading = heading;
    this.$amountSpan = heading.querySelector('.total-amount');
    this.$rootElement.appendChild(heading);
    
    const donateForm = new Form();
    this.$donateForm = donateForm;
    this.$rootElement.appendChild(donateForm.$rootElement);
    
    const donateList = new List();
    this.$donateList = donateList;
    this.$rootElement.appendChild(donateList.$rootElement);
    
    // Listen for donate submissions
    this.$donateForm.$rootElement.addEventListener('donateSubmitted', (e) => {
      this.onItemCreate(e.detail.amount);
    });
    
    // Listen for donate removals
    this.$donateList.$rootElement.addEventListener('donateRemoved', (e) => {
      this.onItemRemove(e.detail.amount);
    });
  }
  
  onItemCreate(amount) {
    // Add item to list
    this.$donateList.addItem({ amount });
    
    // Update total
    this.state.amount += amount;
    this.$amountSpan.textContent = this.state.amount;
  }
  
  onItemRemove(amount) {
    // Update total
    this.state.amount -= amount;
    this.$amountSpan.textContent = this.state.amount;
  }
}
