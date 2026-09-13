export const companyInfo = {
  name: 'AcademicEdge Writing & Publication Services',
  shortName: 'AcademicEdge',
  tagline: 'Writing & Publication Services',
  address: {
    line1: 'G1, Akansha Apartment',
    line2: 'Patel Nagar, City Centre',
    city: 'Gwalior',
    landmark: 'Near Raj Rajeshwari Apartment',
    state: 'Madhya Pradesh',
    postalCode: '474002',
    country: 'India',
  },
  phones: [
    { label: '+91-8077281918', value: '+918077281918' },
    { label: '+91-9319250172', value: '+919319250172' },
  ],
  email: 'lordtechdatus.kamal@gmail.com',
};

export const officeAddressLines = [
  companyInfo.address.line1,
  companyInfo.address.line2,
  companyInfo.address.city,
  companyInfo.address.landmark,
  `${companyInfo.address.state} – ${companyInfo.address.postalCode}, ${companyInfo.address.country}`,
];
export const officeAddress = officeAddressLines.join(', ');
export const officeMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(officeAddress)}`;
export const officeMapEmbedUrl = `${officeMapUrl}&output=embed`;
