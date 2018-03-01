'use strict'

/*
  Parse condition (object) to query for WHERE and SET statement
  Condition will be divide into `key|operation|value`
  and connect using connector
*/

export default function (condition, connector) {
  return Object.keys(condition)
    .filter(key => !!condition[key])
    .map((key) => {
    // For comparision logic
    if (typeof(condition[key]) === 'object') {
      const { logic, value } = condition[key];

      // NOT
      if (logic === '!=') {
        return `not ${key}=${value.replace(/[', "]/g, "//")}`;
      }

      // OR, AND, value will be an array of other values
      if (logic === '||' || logic === '&&') {
        // If value is not an array
        if (!value.length) return `${key}`;

        // Create a sub-query with connector 'or'
        return value.map((option) => {
          // If even option contain logic operation (fuk my life)
          if (typeof(option) === 'object') {
            // NOT
            if (option.logic === '!=') {
              return `not ${key}=${option.value.replace(/[', "]/g, "//")}`;
            }

            // > < >= <=
            return `${key}${option.logic.replace(/[', "]/g, "//")}`
                    + `${option.value.replace(/[', "]/g, "//")}`
          }

          // No logic, just '='
          return `${key}=${option.replace(/[', "]/g, "//")}`;
        }).join(logic === '||' ? ' or ' : ' and ');
      }

      // > < >= <=
      return `${key}${logic.replace(/[', "]/g, "//")}`
              + `${value.replace(/[', "]/g, "//")}`;
    }

    // Common =
    return `${key}='${condition[key].toString().replace(/[', "]/g, "//")}'`;
  }).join(connector);
}
