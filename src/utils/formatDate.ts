/**
 * image optimization
 * see https://app.clickup.com/t/au1hvy
 */
const formatDate = (date: string) => {
  const dateObject = new Date(date);

  return dateObject.toDateString();
};

export default formatDate;
