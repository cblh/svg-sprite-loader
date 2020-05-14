// eslint-disable-next-line import/no-unresolved
const BasicEffectRulePlugin = require('webpack/lib/rules/BasicEffectRulePlugin');
// eslint-disable-next-line import/no-unresolved
const BasicMatcherRulePlugin = require('webpack/lib/rules/BasicMatcherRulePlugin');
// eslint-disable-next-line import/no-unresolved
const RuleSetCompiler = require('webpack/lib/rules/RuleSetCompiler');
// eslint-disable-next-line import/no-unresolved
const UseEffectRulePlugin = require('webpack/lib/rules/UseEffectRulePlugin');

const ruleSetCompiler = new RuleSetCompiler([
  new BasicMatcherRulePlugin('test', 'resource'),
  new BasicMatcherRulePlugin('include', 'resource'),
  new BasicMatcherRulePlugin('exclude', 'resource', true),
  new BasicMatcherRulePlugin('resource'),
  new BasicMatcherRulePlugin('conditions'),
  new BasicMatcherRulePlugin('resourceQuery'),
  new BasicMatcherRulePlugin('realResource'),
  new BasicMatcherRulePlugin('issuer'),
  new BasicMatcherRulePlugin('compiler'),
  new BasicEffectRulePlugin('type'),
  new BasicEffectRulePlugin('sideEffects'),
  new BasicEffectRulePlugin('parser'),
  new BasicEffectRulePlugin('resolve'),
  new UseEffectRulePlugin()
]);

const flattenAndExtractUse = rules => rules.reduce((pre, rule) => {
  if ('rules' in rule || 'oneOf' in rule) {
    return pre.concat(flattenAndExtractUse(rule.rules || rule.oneOf));
  }

  return pre.concat(rule.use || []);
}, []);

module.exports = (compiler) => {
  const rawRules = compiler.options.module.rules;
  const { rules } = ruleSetCompiler.compile([{
    rules: rawRules
  }]);
  const rule = flattenAndExtractUse(rules)
    .find((item) => {
      return /svg-sprite-loader/.test(item.loader);
    }) || {};

  return rule.options || {};
};
