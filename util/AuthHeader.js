export const AuthHeaders = {
    'Content-Type': 'application/json',
    Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('token')}` : '',
};