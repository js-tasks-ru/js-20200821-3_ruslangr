class Tooltip {

  static instance;
  element;

  constuctor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    return Tooltip.instance = this;
  }

  initialize() {
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener('pointerover', this.onMouseOver);
    document.addEventListener('pointerout', this.onMouseOut);
  }

  onMouseOut = event => {
    this.removeToolTip();
  }
  onMouseOver = event => {
    const element = event.target.closest('[data-tooltip]');
    if (element) {
      this.render(element.dataset.tooltip);

      this.moveToolTip(event);

      document.addEventListener('pointermove', this.onMouseMove);
    }

  }

  onMouseMove = event => {
    this.moveToolTip(event);
  }

  onMouseOut = event => {
    /* if (!event.target.dataset.tooltip) {
         return;
     }*/
    this.removeToolTip();

  }

  moveToolTip(event) {
    let target = event.target;
    let coords = target.getBoundingClientRect();

    let left = event.clientX + 10;
    let top = event.clientY + 10;
    /* if (left < 0) left = 0; // не заезжать за левый край окна
     // не заезжать за правый край окна
     if ((left + this.element.offsetWidth) > document.body.clientWidth) {
         left = document.body.clientWidth - this.element.offsetWidth - 10;
     }*/
    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }


  render(html) {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = html;

    document.body.append(this.element);
  }

  removeToolTip() {
    if (this.element) {
      this.element.remove();
      this.element = null;
      document.removeEventListener('pointermove', this.onMouseMove);
    }

  }

  destroy() {
    document.removeEventListener('pointerover', this.onMouseOver);
    document.removeEventListener('pointerout', this.onMouseOut);
    this.removeToolTip();
  }

}

const tooltip = new Tooltip();

export default tooltip;


