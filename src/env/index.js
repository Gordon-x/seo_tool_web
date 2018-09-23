const PROD = 'production';
const DEV = 'development';

let env = [PROD, DEV];

export function get_api(current_env) {
    if (env.indexOf(current_env) < 0) {
        throw new Error('the environment is fault');
    }
    return require('./' + current_env + '.env')
}