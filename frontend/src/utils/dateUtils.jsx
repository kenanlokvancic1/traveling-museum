export const formatTimestamp = (timestamp) => {
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', timestamp);
      return 'Invalid date';
    }
    
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    const dateStr = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    const todayStr = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    const yesterdayStr = new Date(now - 86400000).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    if (dateStr === todayStr) return "Today";
    if (dateStr === yesterdayStr) return "Yesterday";
    if (days < 7) return "Last Week";
    if (days < 30) return "Last Month";
    
    return date.toLocaleDateString('en-GB');
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
};