import { NetworkPolicyRuleType, SecurityPoliciesQuery, SecurityPolicyDetailQuery } from "@cloudtower/eagle/generated/react-hooks";
declare type BaseSecurityPolicyType = SecurityPoliciesQuery["securityPolicies"][0];
declare type Selectors = BaseSecurityPolicyType["apply_to"][0]["selector"];
export declare type Selector = Pick<Selectors[0], "id" | "value" | "key"> & {
    vms?: Selectors[0]["vms"];
};
declare type BaseRule = NonNullable<NonNullable<SecurityPolicyDetailQuery["securityPolicy"]>["ingress"]>[0];
export declare type RuleOfAll = {
    type: NetworkPolicyRuleType.All;
} & Pick<BaseRule, "ports">;
export declare type RuleOfIpBlock = {
    type: NetworkPolicyRuleType.IpBlock;
} & Pick<BaseRule, "ip_block" | "ports" | "except_ip_block">;
export declare type RuleOfLabel = {
    type: NetworkPolicyRuleType.Selector;
} & Pick<BaseRule, "selector_ids" | "selector" | "ports">;
export declare type RuleOfSecurityGroup = {
    type: NetworkPolicyRuleType.SecurityGroup;
} & Pick<BaseRule, "security_group_id" | "security_group" | "ports">;
export declare type Rule = RuleOfAll | RuleOfIpBlock | RuleOfLabel | RuleOfSecurityGroup;
export {};
