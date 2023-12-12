import { gapi } from '../Firebase'
const API_KEY = import.meta.env.VITE_GAPI_KEY
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const scope1 = import.meta.env.VITE_SCOPE1
const scope2 = import.meta.env.VITE_SCOPE2

// Function to add an event to the user's default calendar
export const addEventToCalendar = async (eventDetails) => {
    try {
        // // Ensure the gapi.client is initialized
        // await gapi.load('client:auth2', () => {
        //     gapi.client.init({
        //         apiKey: API_KEY,
        //         clientId: CLIENT_ID,
        //         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        //         scope: scope1 + " " + scope2,
        //     })
        // })
        console.log(gapi)

        // Use the gapi.client.calendar object to add an event
        const response = await gapi.client.calendar.events.insert({
        'calendarId': 'primary', // Use 'primary' for the user's default calendar
        'resource': {
            'summary': eventDetails.summary,
        //   'description': eventDetails.description,
            'start': {
            'dateTime': eventDetails.startTime, // Format: '2023-01-01T10:00:00'
            'timeZone': 'UTC', // Adjust timezone as needed
            },
            'end': {
            'dateTime': eventDetails.endTime, // Format: '2023-01-01T12:00:00'
            'timeZone': 'UTC',
            },
        },
        });
  
        console.log('Event added:', response.result);

        return response.result;
    } catch (error) {
      console.error('Error adding event to calendar:', error);
      throw error;
    }
  };
  