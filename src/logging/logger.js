let errorMonitor;

export function registerErrorMonitor(monitor) {
  errorMonitor = monitor;
}

export function logInfo(message, metadata = {}) {
  console.info(JSON.stringify({ level: 'info', message, metadata, ts: new Date().toISOString() }));
}

export function logError(error, metadata = {}) {
  console.error(
    JSON.stringify({
      level: 'error',
      message: error.message,
      stack: error.stack,
      metadata,
      ts: new Date().toISOString()
    })
  );

  if (errorMonitor) {
    errorMonitor.captureException(error, metadata);
  }
}
