export function getAppBadge(difficultyLevel) {
    switch (difficultyLevel) {
        case 'pending':
          return 'bg-warning';
        case 'accepted':
          return 'bg-success text-light';
        case 'rejected':
            return 'bg-danger';
      default:
        return ''; // Default or fallback class when difficultyLevel doesn't match any case
    }
  }
  