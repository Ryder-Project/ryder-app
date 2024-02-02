// utils/api.js
export const registerUser = async (userData: unknown) => {
    try {
      const response = await fetch('http://localhost:3500/api/v1/riders/registerRider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Registration successful, handle success
        console.log('Registration Successful:', data);
      } else {
        // Registration failed, handle error
        console.error('Registration Failed:', data.message);
      }
    } catch (error) {
        if (error instanceof Error) {
          console.error('Error during registration:', error.message);
        } else {
          console.error('Unexpected error during registration:', error);
        }
      }
    };
  
  