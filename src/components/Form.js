import { Component } from '../core/Component';

export class Form extends Component {
  setup(props) {

    this.$rootElement = document.createElement('form');
    this.$rootElement.className = 'donate-form';

    this.$label = document.createElement("label");
    this.$label.className = "donate-form__input-label";
    this.$label.textContent = "Введите сумму в $";

    this.$input = document.createElement("input");
    this.$input.className = "donate-form__donate-input";
    this.$input.name = "amount";
    this.$input.type = "number";
    this.$input.min = "1";
    this.$input.max = "100";
    this.$input.required = true;

    this.$label.appendChild(this.$input);
    this.$rootElement.appendChild(this.$label);

    this.$button = document.createElement("button");
    this.$button.className = "donate-form__submit-button";
    this.$button.type = "submit";
    this.$button.disabled = true;
    this.$button.textContent = "Задонатить";

    this.$rootElement.appendChild(this.$button);

    this.$input.addEventListener('input', (e) => this.handleInput(e));
    this.$rootElement.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleInput(event) {
    const input = event.target;
    const value = input.value;
    const isValid =
      input.validity.valid &&
      !isNaN(value) &&
      value >= 1 &&
      value <= 100;

    this.$button.disabled = !isValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const amount = parseInt(this.$input.value);
    
    // Emit custom event for new donate
    const donateEvent = new CustomEvent('donateSubmitted', {
      detail: { amount }
    });
    this.$rootElement.dispatchEvent(donateEvent);
    
    // Reset form
    this.$rootElement.reset();
    this.$button.disabled = true;
  }
}
