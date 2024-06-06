const allRoles = {
  admin: [
    'getUsers',
    'manageUsers',
    'getLawyers',
    'manageLawyers',
    'getAppointments',
    'manageAppointments',
    'manageCategories',
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
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
