APP_NAME='window-ref'

# Correct path to root ESLint configuration
npx json -I -f libs/${APP_NAME}/.eslintrc.json -e "this.extends = '../' + this.extends;"

# Add Nx Angular ESLint plugin and the ESLint inline component template processor
npx json -I -f libs/${APP_NAME}/.eslintrc.json -e "this.overrides[0].extends = ['plugin:@nrwl/nx/angular', 'plugin:@angular-eslint/template/process-inline-templates'];"

# Match all TypeScript project configuration files
npx json -I -f libs/${APP_NAME}/.eslintrc.json -e "this.overrides[0].parserOptions.project = [this.overrides[0].parserOptions.project[0].replace('/tsconfig.lib.json', '/tsconfig.*?.json')];"

# This setting is not used by the Nrwl Linter
npx json -I -f libs/${APP_NAME}/.eslintrc.json -e "delete this.overrides[0].parserOptions.createDefaultProgram;"

# Use the ESLint component template processor and recommended component template rules from angular-eslint
npx json -I -f libs/${APP_NAME}/.eslintrc.json -e "this.overrides[1].extends = ['plugin:@nrwl/nx/angular-template', 'plugin:@angular-eslint/template/recommended'];"