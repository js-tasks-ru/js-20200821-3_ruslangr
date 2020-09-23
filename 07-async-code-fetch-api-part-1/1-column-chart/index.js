const BACK_URL = 'https://course-js.javascript.ru/';

export default class ColumnChart {
  element; // HTML element
  chartHeight = 50;
  data = {};

  constructor({
                url = '',
                label = '',
                range = {
                  from: new Date(),
                  to: new Date()
                },
                formatHeading = data => data,
                link = ''
              } = {}) {

    this.url = new URL(url, BACK_URL);
    this.range = range;
    this.formatHeading = formatHeading;
    this.link = link;
    this.label = label;

    this.render();
    // this.initEventListeners();
    this.getData(this.range.from, this.range.to);
  }

  initEventListeners() {
  };

  async getData() {
    this.element.classList.add('column-chart_loading');
    this.subElements.header.textContent = '';
    this.subElements.body.innerHTML = '';
    this.url.searchParams.set('from', this.range.from.toISOString());
    this.url.searchParams.set('to', this.range.to.toISOString());

    const response = await fetch(this.url.href);
    if (response.ok) {
      const json = await response.json();
      this.data = json;
      if(json && Object.values(json).length){
        this.subElements.header.textContent = this.getTotalValue();
        this.subElements.body.innerHTML = this.getChartBody(json);
        this.element.classList.remove('column-chart_loading');
      }


    } else {
      console.error('Datafeed error');
      this.render();
    }
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);
    if (Object.values(this.data).length) {
      this.element.classList.remove('column-chart_loading');
    }
  }

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  getChartBody(data) {
    let body = '';
    const maxValue = Math.max(...Object.values(data));
    const scale = this.chartHeight / maxValue;
    for (let [time , col] of Object.entries(data)) {
      let percent = (col / maxValue * 100).toFixed(0);
      body += `<div style="--value:${Math.floor(col * scale)}" data-tooltip="${percent}%"></div>`
    }
    return body;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }


  getTotalValue(){
    this.value = Object.values(this.data).reduce((accum, item) => (accum + item), 0);
    return this.formatHeading(this.value) || '';
  }
  get template() {
    return `
         <div class="column-chart column-chart_loading" style="--chart-height: 50">
          <div class="column-chart__title">
            Total ${this.label}
            ${this.getLink()}
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">
              ${this.getTotalValue()}
            </div>
            <div data-element="body" class="column-chart__chart">
            ${this.getChartBody(this.data)}
            </div>
          </div>
        </div>
        `
  }
  setRange(from, to){
    this.range.from = from;
    this.range.to = to;
  }

  async update(from, to) {
    this.setRange(from, to);
    await this.getData(this.range.from, this.range.to);
    this.subElements.body.innerHTML = this.getChartBody(this.data);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

