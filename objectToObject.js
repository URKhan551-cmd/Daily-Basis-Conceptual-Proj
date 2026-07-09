// Given two database objects, return the second object with any 
// missing properties from the first filled in.

// Fields that already exist in the record should not be overwritten.

function migrateRecord(schema, record) {
    const finalObj = {};
    const keys = new Set([...Object.keys(schema), ...Object.keys(record)]);
    console.log(keys);   // Set(3) {'username', 'age', 'class'} unique values

    keys.forEach(key => {
      const val1 = schema[key];
      const val2 = record[key];
      console.log(val1);
      console.log(val2);
      const isEmpty = (val) => val === undefined || val === "" || val === null;

      if(!isEmpty(val2)){
        finalObj[key] = val2;
      } else if(!isEmpty(val1)){
          finalObj[key] = val1;
      } else{
        finalObj[key] = val1;
      }
    })
    return finalObj;
}

console.log(migrateRecord({username: "khan", age: 55}, {username: "khann", class: 10})) // { username: 'khann', age: 55, class: 10 }

console.log(migrateRecord({ username: "", posts: 0 }, { username: "camper", posts: 5 }));
console.log(migrateRecord({ username: "", posts: 0, verified: false }, { username: "camper" }));

console.log(migrateRecord({ username: "", email: "", posts: 0, verified: false, role: "user", banned: false }, { username: "camper", email: "camper@freecodecamp.org", role: "admin" }))
