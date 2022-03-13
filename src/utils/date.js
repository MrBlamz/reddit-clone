import { formatDistanceToNowStrict } from 'date-fns';

export const getElapsedTimeAsString = (timestamp = Date.now()) =>
  formatDistanceToNowStrict(timestamp, {
    addSuffix: true,
    includeSeconds: true,
  });
