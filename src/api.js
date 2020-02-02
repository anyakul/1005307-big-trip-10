import Event from './models/event';
import Destination from './models/destination';
import Offer from './models/offer';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const toJSON = (response) => response.json();

const checkStatus = (response) => {
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response;
};

class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
      .then(toJSON)
      .then(Event.parseEvents);
  }

  getDestinations() {
    return this._load({url: `destinations`})
              .then(toJSON)
              .then(Destination.parseDestinations);
  }

  getOffers() {
    return this._load({url: `offers`})
              .then(toJSON)
              .then(Offer.parseOffers);
  }

  createPoint(events) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(events.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(Event.parseEvent);
  }

  updatePoint(id, data) { 
const toLOG = (response) => console.log(response) && response;  //  console.log('id',id,'data',data);
    return this._load({
      
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(toLOG)
      .then(Event.parseEvent);
  }

  deletePoint(id) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}

export default API;
