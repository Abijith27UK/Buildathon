export const clients = [
    {
      id: 1,
      name: "Emily Carter",
      dob: "1984-07-15",
      address: "123 Maple Street, Anytown, USA",
      phone: "(555) 123-4567",
      email: "emily.carter@email.com",
      occupation: "Software Engineer",
      maritalStatus: "Married",
      dependents: 2,
      activePolicy: true,
      policies: [
        { type: "Auto", number: "A1234567", status: "Active", premium: "$1,200", coverage: "$500,000" },
        { type: "Home", number: "H9876543", status: "Active", premium: "$2,500", coverage: "$1,000,000" },
        { type: "Life", number: "L4567890", status: "Active", premium: "$800", coverage: "$250,000" },
      ],
    },
    { id: 2, name: "Olivia Carter", activePolicy: true, policies: [] },
    { id: 3, name: "Ethan Wong", activePolicy: false, policies: [] },
  ];
  
  export const documents = [
    { name: "Policy Agreement", type: "PDF", date: "2023-08-15", status: "Completed" },
    { name: "Claim Form", type: "PDF", date: "2023-08-10", status: "Pending" },
    { name: "Client Profile", type: "PDF", date: "2023-08-05", status: "Completed" },
    { name: "Coverage Details", type: "PDF", date: "2023-07-20", status: "Completed" },
    { name: "Payment Receipt", type: "PDF", date: "2023-07-15", status: "Completed" },
  ];
  