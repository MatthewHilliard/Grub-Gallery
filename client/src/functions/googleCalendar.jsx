// import { gapi } from '../Firebase'
import { signInWithGoogle } from "../Firebase"

// Function to add an event to the user's default calendar
export const addEventToCalendar = async (eventDetails) => {
    try {
        // reauthenticate with google (ensures gapi is loaded on page refresh)
        const { gapi } = await signInWithGoogle();
        
        // Ensure that gapi.client is available and wait if necessary
        while (!gapi.client) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 100 milliseconds
        }

        console.log("calling gapi")
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
  