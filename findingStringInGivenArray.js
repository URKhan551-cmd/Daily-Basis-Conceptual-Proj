// Issue Triage 2
// Given an issue title and an array of current labels, 
// return an updated array of labels based on the following rules:

// If the issue doesn't have any labels, add:

// "bug" and "needs triage" if the title contains "error" or "bug"
// "enhancement" and "discussing" if the title contains "feature" or "add"
// Otherwise, if the given labels contain:

// "needs triage" and the title contains "simple" or "easy", 
// remove "needs triage" and add "good first issue"
// "discussing" and the title contains "planned" or "next", 
// remove "discussing" and add "on the roadmap"
// Otherwise, if "needs triage" or "discussing" is present, remove it and add "help wanted"
// If the title contains:

// "security", add a "critical" label

// according to given sentence or a string as title. look at array found make some decision or you ddnot found
// make some decisiion based on the srimg and given array.

function triageIssue(title, labels) {
  let lowerTitle = title.toLowerCase();
  let result = [...labels];
  
  if (result.length === 0) {
    if (lowerTitle.includes("error") || lowerTitle.includes("bug")) {
      result.push("bug", "needs triage");
    } else if (lowerTitle.includes("feature") || lowerTitle.includes("add")) {
      result.push("enhancement", "discussing");
    }
  } else {
    if (
      result.includes("needs triage") &&
      (lowerTitle.includes("simple") || lowerTitle.includes("easy"))
    ) {
      const index = result.indexOf("needs triage");
      result[index] = "good first issue";
    } else if (
      result.includes("discussing") &&
      (lowerTitle.includes("planned") || lowerTitle.includes("next"))
    ) {
      const index = result.indexOf("discussing");
      result[index] = "on the roadmap";
    } else if (result.includes("needs triage")) {
      const index = result.indexOf("needs triage");
      result[index] = "help wanted";
    } else if (result.includes("discussing")) {
      const index = result.indexOf("discussing");
      result[index] = "help wanted";
    }
  }

 if (
    lowerTitle.includes("security") &&
    !result.includes("critical")
  ) {
    result.push("critical");
  }

  return result;

}
 
console.log(triageIssue("app crashes with error", ["bug", "needs triage"])); //["bug", "help wanted"]
console.log(triageIssue("add dark mode", []));  // ["enhancement", "discussing"]
console.log(triageIssue("easy a11y fix", ["bug", "needs triage"]));  // ["enhancement", "help wanted"]
console.log(triageIssue("planned api migration", ["enhancement", "discussing"]));
console.log(triageIssue("improve security", ["enhancement", "discussing"]))