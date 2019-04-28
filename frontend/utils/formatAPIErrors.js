export default ({ message }) => {
  const error = message.split(':');
  const field = error[1].trim();
  const value = error[2].trim();

  return {
    [field]: value
  }
}