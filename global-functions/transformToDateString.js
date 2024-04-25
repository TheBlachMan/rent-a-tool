import React from 'react';

const transformToDateString = timestamp => {
  let date;
  date = new Date(timestamp);
  // Extract the day, month, and year
  var day = date.getDate();
  var month = date.getMonth() + 1; // getMonth() returns 0-11
  var year = date.getFullYear();
  // Pad the day and month with leading zeros if necessary
  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;

  // Format the date string
  var formattedDate = day + '.' + month + '.' + year;
  return formattedDate;
};

export default transformToDateString;
