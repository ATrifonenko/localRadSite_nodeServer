const models = require("../../database");

const getPhoneBook = (req, res) => {
  //   models.sequelize
  //     .query(
  //       'SELECT units.subdivision, persons.id, persons.fio, persons.position, persons.room, t1.line, t2. ip, t3.mobile, t4.count_sub FROM persons left join(select GROUP_CONCAT(phones.number separator ", ") as line, persons.id as person_id_line from persons left join persons_phones on persons_phones.persons_id = persons.id left join phones on phones.id = persons_phones.phones_id and phones.type_phone = "line"group by persons.id ) as t1 on person_id_line = persons.id left join(select GROUP_CONCAT(phones.number separator ", ") as ip, persons.id as person_id_ip from persons left join persons_phones on persons_phones.persons_id = persons.id left join phones on phones.id = persons_phones.phones_id and phones.type_phone = "ip"group by persons.id ) as t2 on person_id_ip = persons.id left join(select GROUP_CONCAT(phones.number separator ", ") as mobile, persons.id as person_id_mob from persons left join persons_phones on persons_phones.persons_id = persons.id left join phones on phones.id = persons_phones.phones_id and phones.type_phone = "mob"group by persons.id ) as t3 on person_id_mob = persons.id left join units on persons.idUnit = units.id join(SELECT units.subdivision as sub, COUNT(sort_id) as count_sub FROM units LEFT JOIN persons ON persons.idUnit = units.id GROUP BY units.subdivision ) as t4 on t4.sub = units.subdivision ORDER BY units.sort_id, persons.fio'
  //     )
  //     .spread((results, metadata) => {
  //       res.json({ phonebook: results });
  //     });
  // };

  models.Person.findAll({
    attributes: ["id", "fullName", "position"],
    include: [
      {
        model: models.Unit,
        attributes: [
          "subdivision",
          [
            models.sequelize.fn("COUNT", models.sequelize.col("sortId")),
            "count_sub"
          ]
        ],
        include: [
          {
            model: models.Person,
            attributes: []
          }
        ]
      },
      {
        model: models.Phone,
        attributes: ["number", "typePhone", "note"],
        through: {
          attributes: []
        },
        order: ["number"]
      }
    ],
    order: [[models.Unit, "sortId"], "lastName", [models.Phone, "number"]],
    group: ["id", "phones.id"]
  }).then(all => res.json({ phonebook: all }));
};
module.exports = getPhoneBook;
