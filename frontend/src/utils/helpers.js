// Helper function to format date
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}.`;
};

// Helper function to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('sr-RS', {
    style: 'currency',
    currency: 'RSD',
  }).format(amount);
};

// Helper function to validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Helper function to validate password
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Helper function to truncate text
export const truncateText = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Helper function to get initials from name
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};

// Helper function to sort array of objects
export const sortBy = (array, key, ascending = true) => {
  return [...array].sort((a, b) => {
    if (ascending) {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
};

// Helper function to filter array of objects
export const filterBy = (array, key, value) => {
  return array.filter((item) => item[key] === value);
};
