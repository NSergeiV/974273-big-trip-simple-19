// TODO: Кнопка создания новой точки маршрута

import View from './view';
import {html} from '../utils';
import PointTypeView from './common/point-type-view';
import DestinationView from './common/destination-view';
import DatesView from './common/dates-view';
import BasePriceView from './common/base-price-view';
import OffersView from './common/offers-view';
import DestinationDetailsView from './common/destination-details-view';
import {saveButtonTextMap} from '../maps';
import UiBlockerView from './ui-blocker-view';

/**
 * @implements {EventListenerObject}
 */
export default class NewPointEditorView extends View {
  constructor (listView) {
    super();

    /**
     * @type {ListView}
     */
    this.listView = listView;

    this.classList.add('trip-events__item');

    /**
     * @type {PointTypeView}
     */
    // NOTE: Доступ презентора к методам и свойствам дочерней view (PointTypeView)
    this.pointTypeView = this.querySelector(String(PointTypeView));

    /**
     * @type {DestinationView}
     */
    this.destinationView = this.querySelector(String(DestinationView));

    /**
     * @type {DatesView}
     */
    this.datesView = this.querySelector(String(DatesView));

    /**
     * @type {BasePriceView}
     */
    this.basePriceView = this.querySelector(String(BasePriceView));

    /**
     * @type {OffersView}
     */
    this.offersView = this.querySelector(String(OffersView));

    /**
     * @type {DestinationDetailsView}
     */
    this.destinationDetailsView = this.querySelector(String(DestinationDetailsView));

    this.uiBlockerView = new UiBlockerView();

  }

  /**
   * @override
   */
  createHtml() {
    return html`
		<form class="event event--edit" action="#" method="post" novalidate>
			<header class="event__header">
				<${PointTypeView}></${PointTypeView}>
				<${DestinationView}></${DestinationView}>
				<${DatesView}></${DatesView}>
				<${BasePriceView}></${BasePriceView}>
				<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
				<button class="event__reset-btn" type="reset">Cancel</button>
			</header>
			<section class="event__details">
				<${OffersView}></${OffersView}>
				<${DestinationDetailsView}></${DestinationDetailsView}>
			</section>
		</form>
		`;
  }

  open() {
    this.listView.prepend(this);
    this.datesView.createCalendars();

    document.addEventListener('keydown', this);
  }

  close(notify = true) {
    this.remove();
    this.datesView.destroyCalendars();

    document.removeEventListener('keydown', this);

    if (notify) {
      this.dispatchEvent(new CustomEvent('close'));
    }
  }

  /**
   * @param {boolean} flag
   */
  awaitSave(flag) {
    const text = saveButtonTextMap[Number(flag)];

    this.querySelector('[type="submit"]').textContent = text;

    this.uiBlockerView.toggle(flag);
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

customElements.define(String(NewPointEditorView), NewPointEditorView);
