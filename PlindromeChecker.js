function palindrome(str) {
  const strLower = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  const reverStr = strLower.split("").reverse().join("");
return strLower === reverStr
}

palindrome("eye");
palindrome("_eye");