import { AbilityBuilder } from "@casl/ability";

/**
 * Defines how to detect object's type: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html
 */
function subjectName(item) {
  if (!item || typeof item === "string") {
    return item;
  }
  console.log(item)
  return item.type;
}

export default AbilityBuilder.define({ subjectName }, can => {
  can(["read", "create"], "Company");  
  can(['update', 'delete'], "Company", {RoleId:1}); 
  can(['update', 'delete'], "Department", {RoleId:2});
});