/**
 * InTravel AI - Railway Service
 * Handles Indian Railways (IRCTC) data simulation/integration
 */

export const searchTrains = async (from, to, date) => {
  console.log(`Searching trains from ${from} to ${to} for ${date}...`);
  
  // Simulate network delay for a "premium" feel
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Realistic mock data for major Indian routes
  return [
    {
      id: 't1',
      number: '12431',
      name: 'Rajdhani Express',
      type: 'Superfast',
      departure: '04:00 PM',
      arrival: '08:15 AM',
      duration: '16h 15m',
      classes: ['1A', '2A', '3A'],
      price: '₹2,800',
      status: 'Available',
      availability: 'WL 5'
    },
    {
      id: 't2',
      number: '12002',
      name: 'Shatabdi Express',
      type: 'Shatabdi',
      departure: '06:00 AM',
      arrival: '11:45 AM',
      duration: '5h 45m',
      classes: ['CC', 'EC'],
      price: '₹1,250',
      status: 'Available',
      availability: 'RAC 12'
    },
    {
      id: 't3',
      number: '22436',
      name: 'Vande Bharat Express',
      type: 'Vande Bharat',
      departure: '03:00 PM',
      arrival: '11:00 PM',
      duration: '8h 00m',
      classes: ['CC', 'EC'],
      price: '₹1,850',
      status: 'Available',
      availability: '15'
    },
    {
      id: 't4',
      number: '12952',
      name: 'Mumbai Rajdhani',
      type: 'Superfast',
      departure: '04:30 PM',
      arrival: '08:30 AM',
      duration: '16h 00m',
      classes: ['1A', '2A', '3A'],
      price: '₹3,100',
      status: 'Available',
      availability: 'Available 02'
    }
  ];
};
