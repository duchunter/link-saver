'use strict'

import { scanTable } from '../models/models';

// For checking string-type data like title
function checkStringData(target, string) {
  return target.includes(string);
}

// For checking tags, lib, report... data that need to split
function checkSplitData(target, dataString) {
  let qualified = true;
  const checkList = dataString.split(', ');
  checkList.forEach((item) => {
    qualified &= target.includes(item);
  });

  return qualified;
}

export default async function (req, res) {
  let { mode, table, condition, limit } = req.body;
  if (!mode) mode = 'all';

  // Add special data here
  let specialSplitData = ['tags', 'lib', 'report'];
  let specialStringData = ['title', 'link', 'doc', 'read', 'edit', 'relation'];
  let specialContent = {};

  // Check condition for special string data
  try {
    const allKeys = Object.keys(condition);
    specialStringData.forEach((item) => {
      if (allKeys.includes(item)) {
        /**
         *  Save value of special data to specialContent
         *  and delete it from condition because model
         *  cannot compare it the smart way
         */
        specialContent[item] = condition[item];
        delete condition[item];
      }
    });

    // Same thing for special split data
    specialSplitData.forEach((item) => {
      if (allKeys.includes(item)) {
        specialContent[item] = condition[item];
        delete condition[item];
      }
    });
  } catch (e) {
    // Do nothing, just make sure Object.keys won't crash the server
  }

  /**
   *  Special check function to put into filter()
   *  used to filter special data
   */
  let complexFilter = function (item) {
    let qualified = true;
    Object.keys(specialContent).forEach((key) => {
      if (specialStringData.includes(key)) {
        qualified &= checkStringData(item[key], specialContent[key]);
      } else {
        qualified &= checkSplitData(item[key], specialContent[key]);
      }
    });

    return qualified;
  }

  // If client want to request all at once
  if (mode === 'all') {
    let result = await scanTable({ condition, table });
    return res.json(result.filter(complexFilter));
  }

  // If client want to request some based on mode value
  if (mode > 0) {
    let result = await scanTable({
      condition,
      table,
      limit,
      offset: mode * limit
    });
    return res.json(result.filter(complexFilter));
  }

  // Invalid mode
  return res.status(400).json([]);
}
