import uuidv1 from 'uuid/v1';

export default function createAction(type, payload, id) {
  return ({
    id: id || uuidv1(),
    type,
    payload,
  });
}
