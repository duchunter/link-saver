'use strict'

/*
  Parse condition (object) to query for WHERE and SET statement
  Condition will be divide into `key|operation|value`
  and connect using connector
*/

export default function (condition, connector) {
  return Object.keys(condition).map((key) => {
    // For comparision logic
    if (typeof(condition[key]) === 'object') {
      const { logic, value } = condition[key];

      // NOT
      if (logic === '!=') return `not ${key}=${value}`;

      // OR, AND, value will be an array of other values
      if (logic === '||' || logic === '&&') {
        // If value is not an array
        if (!value.length) return `${key}`;

        // Create a sub-query with connector 'or'
        return value.map((option) => {
          // If even option contain logic operation (fuk my life)
          if (typeof(option) === 'object') {
            // NOT
            if (option.logic === '!=') return `not ${key}=${option.value}`;

            // > < >= <=
            return `${key}${option.logic}${option.value}`
          }

          // No logic, just '='
          return `${key}=${option}`;
        }).join(logic === '||' ? ' or ' : ' and ');
      }

      // > < >= <=
      return `${key}${logic}${value}`;
    }

    // Common =
    return `${key}='${condition[key]}'`;
  }).join(connector);
}
