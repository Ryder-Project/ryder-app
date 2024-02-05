
interface UserData {
  firstName: string;
  lastName: string;
  email:string;
  phone:string;
  password:string
}

export const registerUser = async (userData: UserData) => {
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
      console.log('Registration Successful:', data);
    } else {
      console.error('Registration Failed:', data.message);
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
};


