export const action = (type, payload) => ({ type, payload });

export const fillUrl = (url, args) => url.replace(/:([^\d\W]\w+)(?=(\/|\b))/g, (_, identifier) => args[identifier]);

export const createConstants = (namespace, type, constants) =>
  Object.freeze(
    constants.reduce(
      (obj, constant) => ({
        ...obj,
        [constant]: `${namespace}/${type}_${constant}`,
      }),
      {}
    )
  );

export const unpackTypes = ({ REQUEST, SUCCESS, FAILURE }) => [
  REQUEST,
  SUCCESS,
  FAILURE,
];

export const parseTime = time =>
  new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const getInitials = fullName => fullName.match(/\b\w/g) || [];

export const getLink = link => (Array.isArray(link) ? link[0] : link);

export const matchLink = (pathname, link) =>
  Array.isArray(link)
    ? link.some(l => pathname.startsWith(l))
    : pathname.startsWith(link);
