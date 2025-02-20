export function timeElapsed(dateString: any) {
  const givenDate: any = new Date(dateString);
  const now: any = new Date();
  const elapsed: any = now - givenDate;

  if (elapsed < 0) {
    return "In the future";
  }

  if (elapsed < 1000) {
    return "now";
  }

  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds}s`;
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else if (weeks < 52) {
    return `${weeks}w`;
  } else {
    return `${years}y`;
  }
}
