import { useState } from 'react';
import useAuthContext from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password,occupation) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password,occupation }),
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Login failed');
                setLoading(false);
            } else {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
                setLoading(false);
            }
        } catch (err) {
            setError('Network error');
            setLoading(false);
        }
    };

    return { login, error, isLoading: loading };
};
