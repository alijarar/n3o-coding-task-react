export const fetchAllDonationData = async () => {
    try {
      const response = await fetch('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/all');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};
export const fetchLocationsData = async () => {
    try {
      const response = await fetch('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/locations');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};
export const fetchThemesData = async () => {
    try {
      const response = await fetch('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/themes');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};
  
export const postDonationData = async (payload: TObject) => {
    try {
      const response = await fetch('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to post data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };