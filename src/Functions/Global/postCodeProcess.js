export default function process(text) {
  text = text.toLowerCase();
  text = text.replace(/\s/g, '');
  return text;
}
