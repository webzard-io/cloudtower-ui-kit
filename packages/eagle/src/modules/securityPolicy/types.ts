import {
  NetworkPolicyRuleType,
  SecurityPoliciesQuery,
  SecurityPolicyDetailQuery,
} from "../../generated/react-hooks";

type BaseSecurityPolicyType = SecurityPoliciesQuery["securityPolicies"][0];

type Selectors = BaseSecurityPolicyType["apply_to"][0]["selector"];

export type Selector = Pick<Selectors[0], "id" | "value" | "key"> & {
  vms?: Selectors[0]["vms"];
};

type BaseRule = NonNullable<
  NonNullable<SecurityPolicyDetailQuery["securityPolicy"]>["ingress"]
>[0];

export type RuleOfAll = { type: NetworkPolicyRuleType.All } & Pick<
  BaseRule,
  "ports"
>;
export type RuleOfIpBlock = { type: NetworkPolicyRuleType.IpBlock } & Pick<
  BaseRule,
  "ip_block" | "ports" | "except_ip_block"
>;
export type RuleOfLabel = { type: NetworkPolicyRuleType.Selector } & Pick<
  BaseRule,
  "selector_ids" | "selector" | "ports"
>;
export type RuleOfSecurityGroup = {
  type: NetworkPolicyRuleType.SecurityGroup;
} & Pick<BaseRule, "security_group_id" | "security_group" | "ports">;

export type Rule =
  | RuleOfAll
  | RuleOfIpBlock
  | RuleOfLabel
  | RuleOfSecurityGroup;
