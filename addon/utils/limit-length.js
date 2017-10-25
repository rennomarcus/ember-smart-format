export default function limitLength(text, hash) {
  let limit = hash.limit || text.length+1;
  if (limit < text.length)
    return text.substr(0,limit) + "...";
  return text;
}
