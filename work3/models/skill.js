const db = require('./db');

// Сохраняет в БД значения счетчиков из админки
module.exports.setSkills = function (skillsObj) {
  db
    .set('skills.age', skillsObj.age)
    .set('skills.concerts', skillsObj.concerts)
    .set('skills.cities', skillsObj.cities)
    .set('skills.years', skillsObj.years)
    .write();
};

// Возвращает объект для передачи в рендеринг главной страницы
module.exports.getSkills = function () {
  const defaultSkills = {
    'age': 12,
    'concerts': 76,
    'cities': 30,
    'years': 20
  };
  const skills = db.get('skills').value() || defaultSkills;
  return [
    {
      'number': skills.age,
      'text': 'Возраст начала занятий на скрипке'
    },
    {
      'number': skills.concerts,
      'text': 'Концертов отыграл'
    },
    {
      'number': skills.cities,
      'text': 'Максимальное число городов в туре'
    },
    {
      'number': skills.years,
      'text': 'Лет на сцене в качестве скрипача'
    }
  ];
};
