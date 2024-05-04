import { formatDistanceToNow } from 'date-fns';

export function getTimeAgo(timestamp) {
  if(!timestamp) return;
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  
}
