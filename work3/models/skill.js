const db = require('./db');

module.exports.setSkills = function (skillsObj) {
  db
    .set('skills.age', skillsObj.age)
    .set('skills.concerts', skillsObj.concerts)
    .set('skills.cities', skillsObj.cities)
    .set('skills.years', skillsObj.years)
    .write();
};
