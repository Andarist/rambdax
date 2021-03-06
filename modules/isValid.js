import { type, toLower, contains, test, any, all } from 'rambda'

export default function isValid ({ input, schema }) {
  if (type(input) === 'Object' && type(schema) === 'Object') {

    let flag = true
    const boom = (boomFlag) => {
      if(!boomFlag){
        flag = false
      }
    }

    for (const requirement in schema) {
    
      if (flag) {
        const rule = schema[ requirement ]
        const ruleType = type(rule)
        const inputProp = input[ requirement ]
        const inputPropType = type(input[ requirement ])

        if (
          ruleType === 'Object'
        ) {
          /**
           * This rule is standalone schema - schema = {a: {b: 'string'}}
           */  
          const isValidResult = isValid({
            input: inputProp,
            schema: rule
          })
          boom(isValidResult)

        } else if (
          ruleType === 'String'
        ) {
          /**
           * rule is concrete rule such as 'number' so two types are compared
           */
          boom(toLower(inputPropType) === rule) 

        } else if (
          typeof rule === 'function'
        ) {
          /**
           * rule is function so we pass to it the input
           */
          boom(rule(inputProp))

        } else if (
          ruleType === 'Array' &&
          inputPropType === 'String'
        ) {
          /**
           * enum case | rule is like a: ['foo', 'bar']
           */
          boom(contains(inputProp, rule))

        } else if (
          ruleType === 'Array' &&
          rule.length === 1 &&  
          inputPropType === 'Array'
        ) {
          /**
           * 1. array of type | rule is like a: ['number']
           * 2. rule is like a: [{from: 'string'}]
           */
          const currentRule = rule[0]
          const currentRuleType = type(rule[0])
          // Check if rule is invalid
          boom(currentRuleType === 'String' || currentRuleType === 'Object')
          
          if(currentRuleType === 'String'){

            /**
             * 1. array of type
             */
            const isInvalidResult = any(
              inputPropInstance => type(inputPropInstance).toLowerCase() !== currentRule,
              inputProp
            )
            boom(!isInvalidResult)
          }
          
          if(currentRuleType === 'Object'){

            /**
             * 2. rule is like a: [{from: 'string'}]
             */
            const isValidResult = all(
              inputPropInstance => isValid({input: inputPropInstance, schema: currentRule}),
              inputProp
            )
            boom(isValidResult)
          }

        } else if (
          ruleType === 'RegExp' &&
          inputPropType === 'String'
        ) {

          boom(test(rule, inputProp))

        } else {

          boom(false)

        }
      }
    }

    return flag
  }

  return false
}
