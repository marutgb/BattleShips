// api.js
export const login = async (email, password) => {
    const response = await fetch('http://163.172.177.98:8081/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    return response.json();
};

export const register = async (email, password) => {
    const response = await fetch('http://163.172.177.98:8081/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error('Registration failed');
    }
    return response.json();
};
