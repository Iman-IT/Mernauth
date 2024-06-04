import React, { useContext } from 'react';
import { AuthContext } from '../context/useAuth';

function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used inside an AuthProvider');
    }
    return context;
}

export default useAuthContext;