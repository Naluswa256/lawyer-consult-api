const allRoles = {
  admin: [
    'getUsers',
    'manageUsers',
    'getLawyers',
    'manageLawyers',
    'getAppointments',
    'manageAppointments',
    'manageCategories',
<<<<<<< HEAD
    'manageSpecializations',
    'getSpecializations'
  ],
  lawyer: [
    'viewProfile',
    'updateProfile',
    'viewAppointments',
    'manageAppointments',
    'viewReviews',
    'manageAvailability',
    'getSpecializations'
  ],
  customer: [
    'viewLawyers',
    'bookAppointment',
    'viewAppointments',
    'cancelAppointment',
    'leaveReview',
    'updateProfile'
  ]
=======
  ],
  lawyer: ['viewProfile', 'updateProfile', 'viewAppointments', 'manageAppointments', 'viewReviews', 'manageAvailability'],
  customer: ['viewLawyers', 'bookAppointment', 'viewAppointments', 'cancelAppointment', 'leaveReview', 'updateProfile'],
>>>>>>> d8a2879a81ed21302050f1a3fa7f335f6dc57126
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
