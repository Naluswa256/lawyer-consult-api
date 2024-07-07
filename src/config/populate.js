const specializations = [
    { name: 'Criminal Law', description: 'Focuses on crimes and punishments' },
    { name: 'Family Law', description: 'Deals with family-related issues' },
    { name: 'Corporate Law', description: 'Handles business and corporate matters' },
    { name: 'Immigration Law', description: 'Assists with immigration and naturalization' },
    { name: 'Intellectual Property Law', description: 'Protects intellectual property rights' },
    { name: 'Employment Law', description: 'Deals with employment-related issues' },
    { name: 'Personal Injury Law', description: 'Handles cases involving personal injury' },
    { name: 'Real Estate Law', description: 'Focuses on property and real estate transactions' },
    { name: 'Tax Law', description: 'Specializes in tax-related matters' },
    { name: 'Environmental Law', description: 'Deals with environmental protection and regulations' },
    { name: 'Bankruptcy Law', description: 'Assists with bankruptcy and financial restructuring' },
    { name: 'Civil Rights Law', description: 'Focuses on the protection of individual civil rights' },
    { name: 'Construction Law', description: 'Deals with construction-related legal issues' },
    { name: 'Consumer Protection Law', description: 'Protects consumers from fraudulent and unfair business practices' },
    { name: 'Contract Law', description: 'Handles the negotiation and enforcement of contracts' },
    { name: 'Education Law', description: 'Focuses on issues related to schools and education' },
    { name: 'Elder Law', description: 'Addresses legal issues affecting the elderly' },
    { name: 'Entertainment Law', description: 'Deals with legal matters in the entertainment industry' },
    { name: 'Health Care Law', description: 'Handles legal issues in the health care sector' },
    { name: 'Insurance Law', description: 'Focuses on insurance policies and claims' },
    { name: 'International Law', description: 'Deals with laws governing international relations' },
    { name: 'Labor Law', description: 'Focuses on legal issues between employers and employees' },
    { name: 'Maritime Law', description: 'Handles legal issues related to maritime activities' },
    { name: 'Medical Malpractice Law', description: 'Deals with professional negligence by health care providers' },
    { name: 'Military Law', description: 'Focuses on laws governing the armed forces' },
    { name: 'Municipal Law', description: 'Deals with legal issues related to local government' },
    { name: 'Nursing Home Abuse Law', description: 'Addresses abuse and neglect in nursing homes' },
    { name: 'Patent Law', description: 'Protects inventions and intellectual property' },
    { name: 'Privacy Law', description: 'Focuses on data protection and privacy issues' },
    { name: 'Probate Law', description: 'Deals with the administration of estates' },
    { name: 'Product Liability Law', description: 'Handles cases involving defective products' },
    { name: 'Securities Law', description: 'Regulates the trade of securities and financial instruments' },
    { name: 'Social Security Disability Law', description: 'Assists with social security disability claims' },
    { name: 'Sports Law', description: 'Focuses on legal issues in the sports industry' },
    { name: 'Telecommunications Law', description: 'Deals with legal issues in the telecommunications sector' },
    { name: 'Trademark Law', description: 'Protects brand names and logos' },
    { name: 'Transportation Law', description: 'Handles legal issues related to transportation and logistics' },
    { name: 'Trusts and Estates Law', description: 'Focuses on the management and distribution of estates' },
    { name: 'Veterans Law', description: 'Assists veterans with legal issues' },
    { name: 'Workers Compensation Law', description: 'Deals with compensation claims for workplace injuries' },
    { name: 'Cybersecurity Law', description: 'Focuses on legal issues related to cybersecurity and data breaches' },
    { name: 'Aviation Law', description: 'Handles legal issues related to air travel and aircraft' },
    { name: 'Agricultural Law', description: 'Deals with laws related to agriculture and farming' },
    { name: 'Antitrust Law', description: 'Regulates competition and prevents monopolies' },
    { name: 'Banking Law', description: 'Focuses on legal issues related to banks and financial institutions' },
    { name: 'Energy Law', description: 'Deals with legal issues in the energy sector' },
    { name: 'Gaming Law', description: 'Focuses on legal issues related to gambling and casinos' },
    { name: 'Franchise Law', description: 'Handles legal matters related to franchising businesses' },
    { name: 'Foreclosure Law', description: 'Deals with the process of foreclosing on properties' },
    { name: 'Child Custody Law', description: 'Focuses on legal issues related to child custody' },
    { name: 'Juvenile Law', description: 'Handles legal matters involving minors' },
    { name: 'Domestic Violence Law', description: 'Deals with cases of domestic abuse and violence' },
    { name: 'Asylum Law', description: 'Assists with legal matters related to asylum seekers' },
    { name: 'Land Use Law', description: 'Focuses on regulations related to the use of land' },
    { name: 'Eminent Domain Law', description: 'Handles cases involving government acquisition of private property' },
    { name: 'Zoning Law', description: 'Deals with the regulation of land use and development' },
    { name: 'Hospitality Law', description: 'Focuses on legal issues in the hospitality industry' },
    { name: 'Internet Law', description: 'Deals with legal issues related to the internet and online activities' },
    { name: 'Media Law', description: 'Handles legal matters in the media industry' },
    { name: 'Food and Drug Law', description: 'Regulates the safety and efficacy of food and pharmaceuticals' },
    { name: 'Mining Law', description: 'Deals with legal issues in the mining industry' },
    { name: 'Public Interest Law', description: 'Focuses on legal issues affecting the public good' },
    { name: 'Lobbying Law', description: 'Regulates the activities of lobbyists and lobbying firms' },
    { name: 'Civil Litigation', description: 'Handles disputes between individuals or organizations' },
    { name: 'Class Action Law', description: 'Deals with lawsuits involving a large group of people' },
    { name: 'Alternative Dispute Resolution', description: 'Focuses on resolving disputes outside of court' },
  ];
  

  const sampleLawyers = [
  
    {
      email: 'lawyer28@example.com',
      fullNames: 'Kakembo charles',
      phoneNumber: '1234567890',
      location: 'Kampala, Uganda',
      avatar: '',
      password: 'password@123',
      role: 'lawyer',
      about: 'With over a decade of experience in corporate law, I specialize in guiding businesses through complex legal landscapes. My expertise spans mergers, acquisitions, and contractual negotiations, ensuring compliance and strategic growth. Committed to delivering practical solutions that protect your business interests',
      appointments: [],
      bookings: [],
      reviewsReceived: [],
      reviewsGiven: [],
      isEmailVerified: true,
      isPhoneNumberVerified: true,
      isProfilePublic: true,
      isVerified: true,
      availableForWork: true,
      yearsOfExperience: 10,
      specializations: [], 
      availableSlots: [
        { day: 'Monday', timeSlots: ['9:00 AM', '2:00 PM'] },
        { day: 'Tuesday', timeSlots: ['10:00 AM', '3:00 PM'] },
      ],
      employmentHistory: [
        {
          companyName: 'Law Firm XYZ',
          jobTitle: 'Senior Associate',
          description: 'Handled complex corporate litigation cases.',
          startMonth: 'January',
          startYear: 2010,
          endMonth: 'December',
          endYear: 2020,
          isCurrent: false,
        },
      ],
      education: [
        {
          institutionName: 'Law School ABC',
          degree: 'Juris Doctor',
          fieldOfStudy: 'Law',
          startYear: 2006,
          endYear: 2009,
          currentlyAttending: false,
        },
      ],
      socialMediaLinkedAccounts: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/lawyer2' },
      ],
      averageRating: 0,
      numOfReviews: 0,
    },
 
    // Add more sample lawyers as needed
  ];

  const sampleAppointments = [
    {
      userId: '6676eb3cf63f8f006b4a7341', // Replace with actual user ID
      appointmentType: 'videoCall',
      lawyerId: '668548c3ae0af9006e958174', // Replace with actual lawyer ID
      date: new Date('2024-07-10'),
      startTime: new Date('2024-07-10T09:00:00Z'),
      endTime: new Date('2024-07-10T10:00:00Z'),
      topic: 'Legal Consultation',
      status: 'confirmed',
      transactionReference:'',
      notes:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ipsum nec purus imperdiet vestibulum. Fusce congue, risus eget tincidunt bibendum, nunc risus dignissim risus, non consequat eros lorem vel orci. Duis id velit eu ante fermentum lobortis. Integer vel aliquet neque, nec maximus enim. Vivamus fermentum, nisi ut varius condimentum, lorem nunc ultricies libero, nec tincidunt arcu neque sed dui. Mauris sed diam magna. Aliquam erat volutpat. Nullam rutrum tincidunt urna, non venenatis orci tristique id. Phasellus nec ante sed lacus congue venenatis. Nam vel tortor leo.',
      package: {
        duration: 60, // Duration in minutes
        price: 100, // Price in your currency
      },
      isAnonymous: false,
      iv:'',
      tag:''
    },
    {
      userId: '6676eb3cf63f8f006b4a7341', // Replace with actual user ID
      appointmentType: 'voiceCall',
      lawyerId: '668548c3ae0af9006e958174', // Replace with actual lawyer ID
      date: new Date('2024-07-12'),
      startTime: new Date('2024-07-12T14:00:00Z'),
      endTime: new Date('2024-07-12T15:00:00Z'),
      topic: 'Contract Review',
      notes:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ipsum nec purus imperdiet vestibulum. Fusce congue, risus eget tincidunt bibendum, nunc risus dignissim risus, non consequat eros lorem vel orci. Duis id velit eu ante fermentum lobortis. Integer vel aliquet neque, nec maximus enim. Vivamus fermentum, nisi ut varius condimentum, lorem nunc ultricies libero, nec tincidunt arcu neque sed dui. Mauris sed diam magna. Aliquam erat volutpat. Nullam rutrum tincidunt urna, non venenatis orci tristique id. Phasellus nec ante sed lacus congue venenatis. Nam vel tortor leo.',
      status: 'pending',
      transactionReference:'',
      package: {
        duration: 60, // Duration in minutes
        price: 150, // Price in your currency
      },
      isAnonymous: false,
      iv:'',
      tag:''
    },
    {
      userId: '6676eb3cf63f8f006b4a7341', // Replace with actual user ID
      appointmentType: 'physicalMeeting',
      lawyerId: '668548c3ae0af9006e958174', // Replace with actual lawyer ID
      date: new Date('2024-07-15'),
      startTime: new Date('2024-07-15T10:00:00Z'),
      endTime: new Date('2024-07-15T12:00:00Z'),
      topic: 'Litigation Strategy',
      notes:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ipsum nec purus imperdiet vestibulum. Fusce congue, risus eget tincidunt bibendum, nunc risus dignissim risus, non consequat eros lorem vel orci. Duis id velit eu ante fermentum lobortis. Integer vel aliquet neque, nec maximus enim. Vivamus fermentum, nisi ut varius condimentum, lorem nunc ultricies libero, nec tincidunt arcu neque sed dui. Mauris sed diam magna. Aliquam erat volutpat. Nullam rutrum tincidunt urna, non venenatis orci tristique id. Phasellus nec ante sed lacus congue venenatis. Nam vel tortor leo.',
      status: 'confirmed',
      transactionReference:'',
      package: {
        duration: 120, // Duration in minutes
        price: 200, // Price in your currency
      },
      isAnonymous: false,
      iv:'',
      tag:''
    },
    {
      userId: '6676eb3cf63f8f006b4a7341', // Replace with actual user ID
      appointmentType: 'videoCall',
      lawyerId: '668548c3ae0af9006e958174', // Replace with actual lawyer ID
      date: new Date('2024-07-18'),
      startTime: new Date('2024-07-18T16:00:00Z'),
      endTime: new Date('2024-07-18T17:00:00Z'),
      topic: 'Legal Advice on Property',
      notes:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ipsum nec purus imperdiet vestibulum. Fusce congue, risus eget tincidunt bibendum, nunc risus dignissim risus, non consequat eros lorem vel orci. Duis id velit eu ante fermentum lobortis. Integer vel aliquet neque, nec maximus enim. Vivamus fermentum, nisi ut varius condimentum, lorem nunc ultricies libero, nec tincidunt arcu neque sed dui. Mauris sed diam magna. Aliquam erat volutpat. Nullam rutrum tincidunt urna, non venenatis orci tristique id. Phasellus nec ante sed lacus congue venenatis. Nam vel tortor leo.',
      status: 'cancelled',
      transactionReference:'',
      package: {
        duration: 60, // Duration in minutes
        price: 120, // Price in your currency
      },
      isAnonymous: false,
      iv:'',
      tag:''
    },
    {
      userId: '6676eb3cf63f8f006b4a7341', // Replace with actual user ID
      appointmentType: 'voiceCall',
      lawyerId: '668548c3ae0af9006e958174', // Replace with actual lawyer ID
      date: new Date('2024-07-20'),
      startTime: new Date('2024-07-20T11:00:00Z'),
      endTime: new Date('2024-07-20T12:00:00Z'),
      topic: 'Consultation on Intellectual Property',
      notes:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ipsum nec purus imperdiet vestibulum. Fusce congue, risus eget tincidunt bibendum, nunc risus dignissim risus, non consequat eros lorem vel orci. Duis id velit eu ante fermentum lobortis. Integer vel aliquet neque, nec maximus enim. Vivamus fermentum, nisi ut varius condimentum, lorem nunc ultricies libero, nec tincidunt arcu neque sed dui. Mauris sed diam magna. Aliquam erat volutpat. Nullam rutrum tincidunt urna, non venenatis orci tristique id. Phasellus nec ante sed lacus congue venenatis. Nam vel tortor leo.',
      status: 'rejected',
      transactionReference:'',
      package: {
        duration: 60, // Duration in minutes
        price: 100, // Price in your currency
      },
      isAnonymous: false,
      iv:'',
      tag:''
    },
    {
      userId: '6676eb3cf63f8f006b4a7341', // Replace with actual user ID
      appointmentType: 'physicalMeeting',
      lawyerId: '668548c3ae0af9006e958174', // Replace with actual lawyer ID
      date: new Date('2024-07-22'),
      startTime: new Date('2024-07-22T15:00:00Z'),
      endTime: new Date('2024-07-22T17:00:00Z'),
      topic: 'Contract Negotiation',
      notes:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ipsum nec purus imperdiet vestibulum. Fusce congue, risus eget tincidunt bibendum, nunc risus dignissim risus, non consequat eros lorem vel orci. Duis id velit eu ante fermentum lobortis. Integer vel aliquet neque, nec maximus enim. Vivamus fermentum, nisi ut varius condimentum, lorem nunc ultricies libero, nec tincidunt arcu neque sed dui. Mauris sed diam magna. Aliquam erat volutpat. Nullam rutrum tincidunt urna, non venenatis orci tristique id. Phasellus nec ante sed lacus congue venenatis. Nam vel tortor leo.',
      status: 'completed',
      transactionReference:'',
      package: {
        duration: 120, // Duration in minutes
        price: 250, // Price in your currency
      },
      isAnonymous: false,
      iv:'',
      tag:''
    },
  ];
  


  module.exports = {
    specializations, 
    sampleLawyers,
    sampleAppointments
  }