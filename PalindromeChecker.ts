function palindrome(str: string): boolean {
  const strLower: string = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  const reverStr: string = strLower.split("").reverse().join("");
return strLower === reverStr
}

palindrome("eye");
palindrome("_eye"); 