export default class NotificationMessage {
  static  isShow;

  // element; // HTML element
  constructor(
    message = '',
    {duration = 1000, type = 'success'} = {}
  ) {
    this.message = message;
    this.durationInSeconds = (duration / 1000) + 's';
    this.duration = duration;
    this.type = type;
    // this.render(document.body);
    if (NotificationMessage.isShow) {
      NotificationMessage.isShow.remove();
    }
    this.render();
  }


  show(parElement = document.body) {

    parElement = parElement.append(this.element);
    const tmrId = setTimeout(() => {
      this.remove();
    }, this.duration);
    // just for chaining
    return this.element;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    NotificationMessage.isShow = this.element;
  }


  get template() {
    return `<div class="notification ${this.type}" style="--value:${this.durationInSeconds}">
                <div class="timer"></div>
                <div class="inner-wrapper">
                  <div class="notification-header">${this.type}</div>
                  <div class="notification-body">
                    ${this.message}
                  </div>
                </div>
              </div>
        `
  }


  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    NotificationMessage.isShow = null;
  }
}
